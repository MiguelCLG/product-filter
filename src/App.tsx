// src/App.tsx
import React from "react";
import {
  Operators,
  PropertyNames,
  PropertyValues,
  ClearButton,
  FilteredList,
} from "./Components";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="filters">
        <PropertyNames />
        <Operators />
        <PropertyValues />
        <ClearButton />
      </div>
      <FilteredList />
    </div>
  );
};

export default App;
