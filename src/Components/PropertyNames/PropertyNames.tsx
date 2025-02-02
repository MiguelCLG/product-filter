import React from "react";
import { useGlobalStore } from "../../Store/GlobalStore";
import { useFilters } from "../../Hooks/useFilters";
import { EOperatorType, EPropertyNames } from "../../Utils/enums";

const PropertyNames: React.FC = () => {
  const { state, dispatch } = useGlobalStore();
  const { propertyNames } = useFilters();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // the property names are what drives the other filters, so when changed, we reset the other values
    dispatch({
      type: "SET_PROPERTY_NAME",
      payload: event.target.value as EPropertyNames,
    });
    dispatch({ type: "SET_OPERATOR", payload: EOperatorType.Default });
    dispatch({ type: "SET_PROPERTY_VALUES", payload: [] });
  };

  return (
    <select value={state.propertyName} onChange={handleChange}>
      <option value={EPropertyNames.Default}>Select a Property Name</option>
      {propertyNames?.map((propertyName) => (
        <option key={propertyName.id} value={propertyName.name}>
          {propertyName.name}
        </option>
      ))}
    </select>
  );
};

export default PropertyNames;
