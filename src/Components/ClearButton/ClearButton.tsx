// components/ClearButton.tsx
import React from "react";
import { useGlobalStore } from "../../Store/GlobalStore";

const ClearButton: React.FC = () => {
  const { dispatch } = useGlobalStore();

  const handleClick = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  return (
    <button data-testid="clear-button" onClick={handleClick}>
      Clear Filters
    </button>
  );
};

export default ClearButton;
