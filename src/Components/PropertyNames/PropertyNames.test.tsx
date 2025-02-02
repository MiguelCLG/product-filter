// PropertyNames.test.tsx
import React, { SelectHTMLAttributes } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyNames from "./PropertyNames";
import { useGlobalStore } from "../../Store/GlobalStore";
import { useFilters } from "../../Hooks/useFilters";
import { EOperatorType, EPropertyNames } from "../../Utils/enums";

const mockDispatch = jest.fn();

jest.mock("../../Store/GlobalStore");
jest.mock("../../Hooks/useFilters");

describe("PropertyNames Component", () => {
  // Mock data for property names
  const mockPropertyNames = [
    { id: 1, name: EPropertyNames.ProductName },
    { id: 2, name: EPropertyNames.Color },
    { id: 3, name: EPropertyNames.Weight },
    { id: 4, name: EPropertyNames.Category },
    { id: 5, name: EPropertyNames.Wireless },
  ];

  beforeEach(() => {
    // Mocking the global store to return mocked values before each test

    (useGlobalStore as jest.Mock).mockReturnValue({
      state: { propertyName: EPropertyNames.Default },
      dispatch: mockDispatch,
    });

    // Mocking the useFilters hook before each test
    (useFilters as jest.Mock).mockReturnValue({
      propertyNames: mockPropertyNames,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render dropdown options based on propertyNames", () => {
    render(<PropertyNames />);

    const options = screen.getAllByRole("option");
    expect(options.length).toBe(6);

    expect((options[0] as HTMLOptionElement).value).toBe("-1"); // default state
    expect(options[0] as HTMLOptionElement).toHaveTextContent(
      "Select a Property Name"
    );
    expect((options[1] as HTMLOptionElement).value).toBe(
      mockPropertyNames[0].id.toString()
    );
    expect(options[1] as HTMLOptionElement).toHaveTextContent(
      mockPropertyNames[0].name
    );
    expect((options[2] as HTMLOptionElement).value).toBe(
      mockPropertyNames[1].id.toString()
    );
    expect(options[2] as HTMLOptionElement).toHaveTextContent(
      mockPropertyNames[1].name
    );
    expect((options[3] as HTMLOptionElement).value).toBe(
      mockPropertyNames[2].id.toString()
    );
    expect(options[3] as HTMLOptionElement).toHaveTextContent(
      mockPropertyNames[2].name
    );
    expect((options[4] as HTMLOptionElement).value).toBe(
      mockPropertyNames[3].id.toString()
    );
    expect(options[4] as HTMLOptionElement).toHaveTextContent(
      mockPropertyNames[3].name
    );
    expect((options[5] as HTMLOptionElement).value).toBe(
      mockPropertyNames[4].id.toString()
    );
    expect(options[5] as HTMLOptionElement).toHaveTextContent(
      mockPropertyNames[4].name
    );
  });

  it("should update global store when selecting an option", () => {
    render(<PropertyNames />);

    const selectElement = screen.getByRole("combobox");

    fireEvent.change(selectElement, {
      target: { value: 1 },
    });

    // checking if we sent the right actions with the right payload to the global store
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_PROPERTY_ID",
      payload: 1,
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_OPERATOR",
      payload: EOperatorType.Default,
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_PROPERTY_VALUES",
      payload: [],
    });
    waitFor(() => {
      expect(selectElement).toHaveValue(1);
    });
  });
});
