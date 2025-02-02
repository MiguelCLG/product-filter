// components/FilteredList.tsx
import React from "react";
import { useFilters } from "../../Hooks/useFilters";
import Card from "../Card/Card";

const FilteredList: React.FC = () => {
  const { propertyNames, filteredData } = useFilters();

  return !propertyNames ? (
    <div> loading... </div>
  ) : (
    <div className="card-list">
      {filteredData?.map((item, index) => (
        <Card
          key={`${item.productName}_${index}`}
          productName={item.productName}
          color={item.color}
          weight={item.weight}
          category={item.category}
          wireless={item.wireless}
        />
      ))}
    </div>
  );
};

export default FilteredList;
