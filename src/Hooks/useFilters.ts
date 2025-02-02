import { useEffect, useMemo, useState } from "react";
import { useGlobalStore } from "../Store/GlobalStore";
import datastore from "../Data/datastore";
import {
  IProduct,
  IProperty,
  IOperator,
  IFilteredData,
  IPropertyValues,
} from "../Utils/interfaces";
import { mappedColumns, mappedOperators } from "../Utils/constants";
import { EOperatorType } from "../Utils/enums";

// This hook returns the filtered data based on the currently selected filter
// properties. It also provides the property names, property values, products and
// operators as separate values to fill in the filter components.
export const useFilters = () => {
  const { state } = useGlobalStore();

  const [propertyNames, setPropertyNames] = useState<IProperty[]>();
  const [products, setProducts] = useState<IProduct[]>();
  const [operators, setOperators] = useState<IOperator[]>();
  const [propertyValues, setPropertyValues] = useState<IPropertyValues[]>([]);

  // Fetch property names and products from the datastore and save them in our state
  // So that the filter components can get this data
  useEffect(() => {
    setPropertyNames(datastore.getProperties());
    setProducts(datastore.getProducts());
  }, []); // having no dependencies means it will run once on render

  // Filter the operators and the property values based on the selection of the Property Name dropdown
  useEffect(() => {
    // first we map the operators based on the property, using the mappedOperators defined in the constants file
    const { propertyId } = state;
    if (propertyNames) {
      const pn = propertyNames.find((p) => p.id === propertyId);
      if (!pn) {
        setOperators([]);
        setPropertyValues([]);
        return;
      }

      setOperators(mappedOperators[pn?.type]);

      // then we filter the property values based on the property,
      // using reduce to have only unique property values
      // reduce has an accumulator, that we push to it the property values
      // with the corresponding property_id, making sure
      // there isn't the same value in the accumulator
      var filteredPropertyValues = Object.values(products).reduce(
        (acc, product) => {
          if (
            !acc.find(
              (item) =>
                item?.value ===
                product?.property_values[item?.property_id]?.value
            )
          )
            acc.push(
              product.property_values.find((v) => v.property_id === pn.id)
            );
          return acc;
        },
        []
      );

      setPropertyValues(filteredPropertyValues ? filteredPropertyValues : []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.propertyId]); // this hook will only run when the propertyId from the store changes

  // filteredData will be used to display the list / cards on the FilteredList Component
  // we construct an array based on all products with a IFilteredData interface so it is easier to work with
  // we then filter this array based on the currently selected filters (Property Name, Operator and Property Values)
  const filteredData: IFilteredData[] = useMemo(() => {
    if (!products) return [];
    const { propertyId, operator, propertyValues: statePropertyValues } = state;
    const filteredProducts: IFilteredData[] = [];

    products?.forEach((product) => {
      filteredProducts.push({
        productName:
          product.property_values
            ?.find((v) => v.property_id === 0)
            ?.value.toString() || "",
        color:
          product.property_values
            ?.find((v) => v.property_id === 1)
            ?.value.toString() || "",
        weight:
          product.property_values
            ?.find((v) => v.property_id === 2)
            ?.value.toString() || "",
        category:
          product.property_values
            ?.find((v) => v.property_id === 3)
            ?.value.toString() || "",
        wireless:
          product.property_values
            ?.find((v) => v.property_id === 4)
            ?.value.toString() || "",
      });
    });

    if (propertyId === -1 || operator === "default") return filteredProducts;

    const propertyName = mappedColumns[propertyId];

    const result = filteredProducts.filter((product) => {
      var value = product[propertyName];
      switch (operator) {
        case EOperatorType.Any:
          return value && value.length > 0;
        case EOperatorType.None: {
          return !value || value.length === 0;
        }
        case EOperatorType.In: {
          return statePropertyValues?.find((v) => v === value) !== undefined;
        }
        case EOperatorType.Equals: {
          return value === statePropertyValues?.find((v) => v === value);
        }
        case EOperatorType.LessThan: {
          return (
            statePropertyValues?.find(
              (v) => parseFloat(value) < parseFloat(v)
            ) !== undefined
          );
        }
        case EOperatorType.GreaterThan: {
          return (
            statePropertyValues?.find(
              (v) => parseFloat(value) > parseFloat(v)
            ) !== undefined
          );
        }
        case EOperatorType.Contains: {
          return statePropertyValues?.includes(value);
        }
        default:
          return false;
      }
    });
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, products]); // Using a useMemo hook to avoid unnecessary re-renders and only re-render when the state of our global store or products change.

  return { filteredData, propertyNames, propertyValues, products, operators };
};
