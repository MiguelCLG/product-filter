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
    <>
      <div className="App">
        <h1 className="title">Product Filter</h1>
        <div className="AppWrapper">
          <div className="filters">
            <PropertyNames />
            <Operators />
            <PropertyValues />
            <ClearButton />
          </div>
          <FilteredList />
        </div>
      </div>
    </>
  );
};

export default App;
