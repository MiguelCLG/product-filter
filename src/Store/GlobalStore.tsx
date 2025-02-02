import React, { createContext, useContext, useReducer } from "react";
import { EOperatorType } from "../Utils/enums";
import { IFilterState, IGlobalStoreProviderProps } from "../Utils/interfaces";

// Typing the actions for the reducer
// This defines what actions can be performed
type FilterAction =
  | { type: "SET_PROPERTY_ID"; payload: number }
  | { type: "SET_OPERATOR"; payload: EOperatorType }
  | { type: "SET_PROPERTY_VALUES"; payload: string[] }
  | { type: "CLEAR_FILTERS" };

// Initial state of the reducer, defines default values when the store is initialized or when the filters are cleared
const initialState: IFilterState = {
  propertyId: -1,
  operator: EOperatorType.Default,
  propertyValues: [],
};

// Using react context to create the global store, declaring its type explicitly by adding a state variable and a dispatch function
const GlobalStoreContext = createContext<{
  state: IFilterState;
  dispatch: React.Dispatch<FilterAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// defines the reducer function that will be used to update the state depending on the action
const filterReducer = (
  state: IFilterState,
  action: FilterAction
): IFilterState => {
  switch (action.type) {
    case "SET_PROPERTY_ID":
      return { ...state, propertyId: action.payload };
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

// Provider creation to wrap around the App component so that any children component can access the store
export const GlobalStoreProvider = ({
  children,
}: IGlobalStoreProviderProps) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  return (
    <GlobalStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStore = () => useContext(GlobalStoreContext);
