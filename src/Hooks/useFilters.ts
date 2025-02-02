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

export const useFilters = () => {
  const { state } = useGlobalStore();
  const [propertyNames, setPropertyNames] = useState<IProperty[]>();
  const [products, setProducts] = useState<IProduct[]>();

  const [operators, setOperators] = useState<IOperator[]>();
  const [propertyValues, setPropertyValues] = useState<IPropertyValues[]>([]);

  useEffect(() => {
    setPropertyNames(datastore.getProperties());
    setProducts(datastore.getProducts());
  }, []);

  useEffect(() => {
    const { propertyName } = state;
    if (propertyNames) {
      const pn = propertyNames.find((p) => p.name === propertyName);
      if (!pn) {
        setOperators([]);
        setPropertyValues([]);
        return;
      }

      setOperators(mappedOperators[pn?.type]);

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
  }, [state.propertyName]);

  const filteredData: IFilteredData[] = useMemo(() => {
    if (!products) return [];
    const {
      propertyName,
      operator,
      propertyValues: statePropertyValues,
    } = state;
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
    if (propertyName === "default" || operator === "default")
      return filteredProducts;

    const property = mappedColumns[propertyName];

    const result = filteredProducts.filter((product) => {
      var value = product[property];
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
  }, [state, products]);

  return { filteredData, propertyNames, propertyValues, products, operators };
};
