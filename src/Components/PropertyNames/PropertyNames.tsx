import React from "react";
import { useGlobalStore } from "../../Store/GlobalStore";
import { useFilters } from "../../Hooks/useFilters";
import { EOperatorType } from "../../Utils/enums";

const PropertyNames: React.FC = () => {
  const { state, dispatch } = useGlobalStore();
  const { propertyNames } = useFilters();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // the property ids are what drives the other filters, so when changed, we reset the other values
    dispatch({
      type: "SET_PROPERTY_ID",
      payload: parseFloat(event.target.value),
    });
    dispatch({ type: "SET_OPERATOR", payload: EOperatorType.Default });
    dispatch({ type: "SET_PROPERTY_VALUES", payload: [] });
  };

  return (
    <select
      className="dropdown"
      value={state.propertyId}
      onChange={handleChange}
    >
      <option value={-1}>Select a Property Name</option>
      {propertyNames?.map((propertyName) => (
        <option key={propertyName.id} value={propertyName.id}>
          {propertyName.name}
        </option>
      ))}
    </select>
  );
};

export default PropertyNames;
