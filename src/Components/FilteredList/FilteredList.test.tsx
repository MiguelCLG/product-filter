import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilteredList from "./FilteredList";
import { useFilters } from "../../Hooks/useFilters";

jest.mock("../../Hooks/useFilters");

describe("FilteredList Component", () => {
  // Mock data for property names
  const mockPropertyNames = [
    { id: 1, name: "Product Name" },
    { id: 2, name: "Color" },
    { id: 3, name: "Weight" },
    { id: 4, name: "Category" },
    { id: 5, name: "Wireless" },
  ];

  // Mock data for filteredData
  const mockFilteredData = [
    {
      productName: "Product 1",
      color: "Red",
      weight: "1",
      category: "Electronics",
      wireless: "Yes",
    },
    {
      productName: "Product 2",
      color: "Blue",
      weight: "5",
      category: "Furniture",
      wireless: "No",
    },
  ];

  beforeEach(() => {
    (useFilters as jest.Mock).mockReturnValue({
      propertyNames: mockPropertyNames,
      filteredData: mockFilteredData,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading when propertyNames is null", () => {
    // Mock the case where propertyNames is null (loading state)
    (useFilters as jest.Mock).mockReturnValue({
      propertyNames: null,
      filteredData: [],
    });

    render(<FilteredList />);

    // Assert loading is displayed
    expect(screen.getByText("loading")).toBeInTheDocument();
  });

  it("should render table headers based on propertyNames", () => {
    // Render the component with mock data
    render(<FilteredList />);

    // Assert that the correct headers are rendered
    mockPropertyNames.forEach((propertyName) => {
      expect(screen.getByText(propertyName.name)).toBeInTheDocument();
    });
  });

  it("should render table rows based on filteredData", () => {
    // Render the component with mock data
    render(<FilteredList />);

    // Assert that the correct data is displayed in the table rows
    mockFilteredData.forEach((item) => {
      expect(screen.getByText(item.productName)).toBeInTheDocument();
      expect(screen.getByText(item.color)).toBeInTheDocument();
      expect(screen.getByText(item.weight)).toBeInTheDocument();
      expect(screen.getByText(item.category)).toBeInTheDocument();
      expect(screen.getByText(item.wireless)).toBeInTheDocument();
    });
  });

  it("should render the correct number of rows", () => {
    // Render the component with mock data
    render(<FilteredList />);

    // Assert the correct number of rows (excluding the header)
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3); // 1 header row + 2 data rows
  });
});
