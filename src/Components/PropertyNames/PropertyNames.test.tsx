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
    // Mocking the global store hook return values

    (useGlobalStore as jest.Mock).mockReturnValue({
      state: { propertyName: EPropertyNames.Default },
      dispatch: mockDispatch,
    });
    (useFilters as jest.Mock).mockReturnValue({
      propertyNames: mockPropertyNames,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render dropdown options based on propertyNames", () => {
    // Render the component
    render(<PropertyNames />);

    // Get the dropdown options
    const selectElement = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");

    // Assert the number of options (including the default one)
    expect(options.length).toBe(6);

    // Assert the values and content of the options
    expect((options[0] as HTMLOptionElement).value).toBe(
      EPropertyNames.Default
    );
    expect(options[0] as HTMLOptionElement).toHaveTextContent(
      "Select a Property Name"
    );
    expect((options[1] as HTMLOptionElement).value).toBe(
      mockPropertyNames[0].name
    );
    expect(options[1] as HTMLOptionElement).toHaveTextContent(
      mockPropertyNames[0].name
    );
    expect((options[2] as HTMLOptionElement).value).toBe(
      mockPropertyNames[1].name
    );
    expect(options[2] as HTMLOptionElement).toHaveTextContent(
      mockPropertyNames[1].name
    );
    expect((options[3] as HTMLOptionElement).value).toBe(
      mockPropertyNames[2].name
    );
    expect(options[3] as HTMLOptionElement).toHaveTextContent(
      mockPropertyNames[2].name
    );
    expect((options[4] as HTMLOptionElement).value).toBe(
      mockPropertyNames[3].name
    );
    expect(options[4] as HTMLOptionElement).toHaveTextContent(
      mockPropertyNames[3].name
    );
    expect((options[5] as HTMLOptionElement).value).toBe(
      mockPropertyNames[4].name
    );
    expect(options[5] as HTMLOptionElement).toHaveTextContent(
      mockPropertyNames[4].name
    );
  });

  it("should update global store when selecting an option", () => {
    // Render the component
    render(<PropertyNames />);

    // Get the dropdown element
    const selectElement = screen.getByRole("combobox");

    // Simulate changing the dropdown value
    fireEvent.change(selectElement, {
      target: { value: EPropertyNames.ProductName },
    });

    // Assert that the dispatch method was called with the correct actions
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_PROPERTY_NAME",
      payload: EPropertyNames.ProductName,
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
      expect(selectElement).toHaveValue(EPropertyNames.ProductName);
    });
    // Assert the selected value in the dropdown
  });
});
