// context/GlobalStoreContext.tsx
import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { EOperatorType, EPropertyNames } from "../Utils/enums";

interface FilterState {
  propertyName: EPropertyNames;
  operator: EOperatorType;
  propertyValues: string[];
}

type FilterAction =
  | { type: "SET_PROPERTY_NAME"; payload: EPropertyNames }
  | { type: "SET_OPERATOR"; payload: EOperatorType }
  | { type: "SET_PROPERTY_VALUES"; payload: string[] }
  | { type: "CLEAR_FILTERS" };

const initialState: FilterState = {
  propertyName: EPropertyNames.Default,
  operator: EOperatorType.Default,
  propertyValues: [],
};

// Create context with explicit type
const GlobalStoreContext = createContext<{
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Define props type for the provider
interface GlobalStoreProviderProps {
  children: ReactNode;
}

// Create a named provider component
export const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <GlobalStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SET_PROPERTY_NAME":
      return { ...state, propertyName: action.payload };
    case "SET_OPERATOR":
      return { ...state, operator: action.payload };
    case "SET_PROPERTY_VALUES":
      return { ...state, propertyValues: action.payload };
    case "CLEAR_FILTERS":
      return initialState;
    default:
      return state;
  }
};

export const useGlobalStore = () => useContext(GlobalStoreContext);
