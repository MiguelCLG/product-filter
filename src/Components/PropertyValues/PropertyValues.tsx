import React from "react";
import { useGlobalStore } from "../../Store/GlobalStore";
import { useFilters } from "../../Hooks/useFilters";

const PropertyValues: React.FC = () => {
  const { state, dispatch } = useGlobalStore();
  const { propertyValues } = useFilters();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    let updatedValues;
    if (isChecked) {
      updatedValues = [...state.propertyValues, value];
    } else {
      updatedValues = state.propertyValues.filter((v) => v !== value);
    }

    dispatch({ type: "SET_PROPERTY_VALUES", payload: updatedValues });
  };

  return (
    <div>
      {propertyValues?.map(
        (property) =>
          property && (
            <label
              key={`${property.id}_${property.value}`}
              data-testid={`checkbox-${property.id}`}
            >
              <input
                type="checkbox"
                value={property.value}
                onChange={handleChange}
              />
              {property.value}
            </label>
          )
      )}
    </div>
  );
};

export default PropertyValues;
