import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Operators from "./Operators";
import { useGlobalStore } from "../../Store/GlobalStore";
import { useFilters } from "../../Hooks/useFilters";
import { EOperatorType } from "../../Utils/enums";

const mockDispatch = jest.fn();

jest.mock("../../Store/GlobalStore");
jest.mock("../../Hooks/useFilters");

describe("Operators Component", () => {
  // Mock data for operators
  const mockOperators = [
    { id: EOperatorType.Equals, text: "Equals" },
    { id: EOperatorType.GreaterThan, text: "Greater Than" },
    { id: EOperatorType.LessThan, text: "Less Than" },
    { id: EOperatorType.Contains, text: "Contains" },
    { id: EOperatorType.In, text: "In" },
  ];

  beforeEach(() => {
    // Mocking the global store hook return values
    (useGlobalStore as jest.Mock).mockReturnValue({
      state: { operator: EOperatorType.Default },
      dispatch: mockDispatch,
    });

    // Mocking the filters hook return values
    (useFilters as jest.Mock).mockReturnValue({
      operators: mockOperators,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render dropdown options based on operators", () => {
    // Render the component
    render(<Operators />);

    // Get the dropdown options
    const selectElement = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");

    // Assert the number of options (including the default one)
    expect(options.length).toBe(6); // 5 mock operators + 1 default

    // Assert the values and content of the options
    expect((options[0] as HTMLOptionElement).value).toBe(EOperatorType.Default);
    expect(options[0] as HTMLOptionElement).toHaveTextContent(
      "Select an Operator"
    );
    expect((options[1] as HTMLOptionElement).value).toBe(EOperatorType.Equals);
    expect(options[1] as HTMLOptionElement).toHaveTextContent("Equals");
    expect((options[2] as HTMLOptionElement).value).toBe(
      EOperatorType.GreaterThan
    );
    expect(options[2] as HTMLOptionElement).toHaveTextContent("Greater Than");
    expect((options[3] as HTMLOptionElement).value).toBe(
      EOperatorType.LessThan
    );
    expect(options[3] as HTMLOptionElement).toHaveTextContent("Less Than");
    expect((options[4] as HTMLOptionElement).value).toBe(
      EOperatorType.Contains
    );
    expect(options[4] as HTMLOptionElement).toHaveTextContent("Contains");
    expect((options[5] as HTMLOptionElement).value).toBe(EOperatorType.In);
    expect(options[5] as HTMLOptionElement).toHaveTextContent("In");
  });

  it("should update global store when selecting an operator", () => {
    // Render the component
    render(<Operators />);

    // Get the dropdown element
    const selectElement = screen.getByRole("combobox");

    // Simulate changing the dropdown value
    fireEvent.change(selectElement, {
      target: { value: EOperatorType.Equals },
    });

    // Assert that the dispatch method was called with the correct actions
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_OPERATOR",
      payload: EOperatorType.Equals,
    });

    // Assert the selected value in the dropdown
    waitFor(() => {
      expect(selectElement).toHaveValue(EOperatorType.Equals);
    });
  });
});
