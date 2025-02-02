import { renderHook, waitFor } from "@testing-library/react";
import { useFilters } from "./useFilters";
import { useGlobalStore } from "../Store/GlobalStore";
import datastore from "../Data/datastore";
import { mappedColumns, mappedOperators } from "../Utils/constants";
import { EOperatorType, EPropertyNames } from "../Utils/enums";

jest.mock("../Store/GlobalStore");
jest.mock("../Data/datastore");
jest.mock("../Utils/constants");

describe("useFilters Hook", () => {
  const mockState = {
    propertyName: "color",
    operator: EOperatorType.Equals,
    propertyValues: ["red"],
  };

  const mockDispatch = jest.fn();

  const mockProperties = [
    { id: 0, name: "Product Name" },
    { id: 1, name: "color" },
    { id: 2, name: "weight" },
    { id: 3, name: "category" },
    { id: 4, name: "wireless" },
  ];

  const mockProducts = [
    {
      property_values: [
        { property_id: 0, value: "Product 1" },
        { property_id: 1, value: "red" },
        { property_id: 2, value: "10" },
        { property_id: 3, value: "Category 1" },
        { property_id: 4, value: "true" },
      ],
    },
    {
      property_values: [
        { property_id: 0, value: "Product 2" },
        { property_id: 1, value: "blue" },
        { property_id: 2, value: "20" },
        { property_id: 3, value: "Category 2" },
        { property_id: 4, value: "false" },
      ],
    },
    {
      property_values: [
        { property_id: 0, value: "Product 3" },
        { property_id: 1, value: "blue" },
        { property_id: 2, value: "30" },
        { property_id: 3, value: "Category 2" },
        { property_id: 4, value: "" },
      ],
    },
  ];

  const mockOperators = [
    { id: EOperatorType.Equals, text: "Equals" },
    { id: EOperatorType.GreaterThan, text: "Greater Than" },
    { id: EOperatorType.LessThan, text: "Less Than" },
    { id: EOperatorType.Contains, text: "Contains" },
    { id: EOperatorType.In, text: "In" },
    { id: EOperatorType.Any, text: "Has any value" },
    { id: EOperatorType.None, text: "Has no value" },
  ];

  const mockMappedColumns = {
    color: "color",
    productName: "productName",
    weight: "weight",
    category: "category",
    wireless: "wireless",
  };

  const mockMappedOperators = {
    string: [mockOperators[0]],
    number: [mockOperators[1]],
  };

  beforeEach(() => {
    (datastore.getProperties as jest.Mock).mockReturnValue(mockProperties);
    (datastore.getProducts as jest.Mock).mockReturnValue(mockProducts);
    (datastore.getOperators as jest.Mock).mockReturnValue(mockOperators);

    (useGlobalStore as jest.Mock).mockReturnValue({
      state: mockState,
      dispatch: mockDispatch,
    });

    mappedColumns[1] = mockMappedColumns.color;
    mappedOperators.string = mockMappedOperators.string;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all products when propertyName is Default", () => {
    (useGlobalStore as jest.Mock).mockReturnValue({
      state: { propertyId: -1 },
      dispatch: mockDispatch,
    });

    const { result } = renderHook(() => useFilters());

    expect(result.current.products).toEqual(mockProducts);
  });
  it("should return all with weight greater than 10", () => {
    (useGlobalStore as jest.Mock).mockReturnValue({
      state: {
        propertyId: 2,
        operator: EOperatorType.GreaterThan,
        propertyValues: ["10"],
      },
      dispatch: mockDispatch,
    });

    const { result } = renderHook(() => useFilters());

    const expectedData = [
      {
        category: "Category 2",
        color: "blue",
        productName: "Product 2",
        weight: "20",
        wireless: "false",
      },
      {
        category: "Category 2",
        color: "blue",
        productName: "Product 3",
        weight: "30",
        wireless: "",
      },
    ];
    waitFor(() => expect(result.current.filteredData).toEqual(expectedData));
  });

  it("should return all with weight less than 20", () => {
    (useGlobalStore as jest.Mock).mockReturnValue({
      state: {
        propertyId: 2,
        operator: EOperatorType.LessThan,
        propertyValues: ["20"],
      },
      dispatch: mockDispatch,
    });

    const { result } = renderHook(() => useFilters());

    const expectedData = [
      {
        category: "Category 1",
        color: "red",
        productName: "Product 1",
        weight: "10",
        wireless: "true",
      },
    ];
    waitFor(() => expect(result.current.filteredData).toEqual(expectedData));
  });

  it("should return all that have any value", () => {
    (useGlobalStore as jest.Mock).mockReturnValue({
      state: {
        propertyId: 4,
        operator: EOperatorType.Any,
        propertyValues: [],
      },
      dispatch: mockDispatch,
    });

    const { result } = renderHook(() => useFilters());

    const expectedData = [
      {
        category: "Category 1",
        color: "red",
        productName: "Product 1",
        weight: "10",
        wireless: "true",
      },
      {
        category: "Category 2",
        color: "blue",
        productName: "Product 2",
        weight: "20",
        wireless: "false",
      },
    ];
    waitFor(() => expect(result.current.filteredData).toEqual(expectedData));
  });
  it("should return all that have no value", () => {
    (useGlobalStore as jest.Mock).mockReturnValue({
      state: {
        propertyId: 4,
        operator: EOperatorType.None,
        propertyValues: ["20"],
      },
      dispatch: mockDispatch,
    });

    const { result } = renderHook(() => useFilters());

    const expectedData = [
      {
        category: "Category 2",
        color: "blue",
        productName: "Product 3",
        weight: "30",
        wireless: "",
      },
    ];
    waitFor(() => expect(result.current.filteredData).toEqual(expectedData));
  });

  it("should return if value exactly matches one of several values", () => {
    (useGlobalStore as jest.Mock).mockReturnValue({
      state: {
        propertyId: 4,
        operator: EOperatorType.In,
        propertyValues: ["true", "false"],
      },
      dispatch: mockDispatch,
    });

    const { result } = renderHook(() => useFilters());

    const expectedData = [
      {
        category: "Category 1",
        color: "red",
        productName: "Product 1",
        weight: "10",
        wireless: "true",
      },
      {
        productName: "Product 2",
        weight: "20",
        wireless: "false",
        category: "Category 2",
        color: "blue",
      },
    ];
    waitFor(() => expect(result.current.filteredData).toEqual(expectedData));
  });
  it("should return value contains the specified text", () => {
    (useGlobalStore as jest.Mock).mockReturnValue({
      state: {
        propertyId: 0,
        operator: EOperatorType.Contains,
        propertyValues: ["Product 1", "Product 2"],
      },
      dispatch: mockDispatch,
    });

    const { result } = renderHook(() => useFilters());

    const expectedData = [
      {
        category: "Category 1",
        color: "red",
        productName: "Product 1",
        weight: "10",
        wireless: "true",
      },
      {
        productName: "Product 2",
        weight: "20",
        wireless: "false",
        category: "Category 2",
        color: "blue",
      },
    ];
    waitFor(() => expect(result.current.filteredData).toEqual(expectedData));
  });
  it("should return filtered data, property names, property values, and operators", () => {
    const { result } = renderHook(() => useFilters());

    expect(result.current.propertyNames).toEqual(mockProperties);
    expect(result.current.products).toEqual(mockProducts);
    waitFor(() => {
      expect(result.current.operators).toEqual(mockOperators);
    });
  });
});
