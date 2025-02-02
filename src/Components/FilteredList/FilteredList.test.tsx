import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilteredList from "./FilteredList";
import { useFilters } from "../../Hooks/useFilters";

jest.mock("../../Hooks/useFilters");

describe("FilteredList Component", () => {
  const mockPropertyNames = [
    { id: 1, name: "Product Name" },
    { id: 2, name: "Color" },
    { id: 3, name: "Weight" },
    { id: 4, name: "Category" },
    { id: 5, name: "Wireless" },
  ];

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
    (useFilters as jest.Mock).mockReturnValue({
      propertyNames: null,
      filteredData: [],
    });

    render(<FilteredList />);

    expect(screen.getByText(/loading/)).toBeInTheDocument();
  });

  it("should render cards based on filteredData", () => {
    render(<FilteredList />);

    mockFilteredData.forEach((item) => {
      expect(screen.getByText(item.productName)).toBeInTheDocument();
      expect(screen.getByText(item.color)).toBeInTheDocument();
      expect(screen.getByText(item.weight)).toBeInTheDocument();
      expect(screen.getByText(item.category)).toBeInTheDocument();
      expect(screen.getByText(item.wireless)).toBeInTheDocument();
    });
  });

  it("should render the correct number of cards", () => {
    render(<FilteredList />);

    const cards = screen.getAllByTestId("card");
    expect(cards.length).toBe(2);
  });
});
