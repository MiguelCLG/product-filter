import React from "react";
import { useGlobalStore } from "../../Store/GlobalStore";
import { useFilters } from "../../Hooks/useFilters";
import { EOperatorType } from "../../Utils/enums";

const Operators: React.FC = () => {
  const { state, dispatch } = useGlobalStore();
  const { operators } = useFilters();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "SET_OPERATOR",
      payload: event.target.value as EOperatorType,
    });
  };

  return (
    <select className="dropdown" value={state.operator} onChange={handleChange}>
      <option value={EOperatorType.Default}>Select an Operator</option>
      {operators?.map((operator) => (
        <option key={operator.id} value={operator.id}>
          {operator.text}
        </option>
      ))}
    </select>
  );
};

export default Operators;
