// components/FilteredList.tsx
import React from "react";
import { useFilters } from "../../Hooks/useFilters";

const FilteredList: React.FC = () => {
  const { propertyNames, filteredData } = useFilters();

  return !propertyNames ? (
    <div> loading </div>
  ) : (
    <table data-testid="filter-list-table">
      <thead>
        <tr>
          {propertyNames.map((propertyName) => (
            <th key={`${propertyName.id}_header`}>{propertyName.name}</th>
          ))}
          {/* Add more headers as needed */}
        </tr>
      </thead>
      <tbody>
        {filteredData?.map((item, index) => (
          <tr key={`${item.productName}_${index}`}>
            <td>{item.productName}</td>
            <td>{item.color}</td>
            <td>{item.weight}</td>
            <td>{item.category}</td>
            <td>{item.wireless}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FilteredList;
