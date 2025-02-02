import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyValues from "./PropertyValues";
import { useGlobalStore } from "../../Store/GlobalStore";
import { useFilters } from "../../Hooks/useFilters";

const mockDispatch = jest.fn();

jest.mock("../../Store/GlobalStore");
jest.mock("../../Hooks/useFilters");

describe("PropertyValues Component", () => {
  const mockPropertyValues = [
    { id: 1, value: "Red" },
    { id: 2, value: "Blue" },
    { id: 3, value: "Green" },
    { id: 4, value: "Yellow" },
    { id: 5, value: "Black" },
  ];

  beforeEach(() => {
    (useGlobalStore as jest.Mock).mockReturnValue({
      state: { propertyValues: [] },
      dispatch: mockDispatch,
    });

    (useFilters as jest.Mock).mockReturnValue({
      propertyValues: mockPropertyValues,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render checkbox options based on propertyValues", () => {
    render(<PropertyValues />);

    const checkboxes = screen.getAllByRole("checkbox");

    expect(checkboxes.length).toBe(5);

    mockPropertyValues.forEach((propertyValue, index) => {
      const checkbox = screen.getByTestId(
        `checkbox-${mockPropertyValues[index].id}`
      );
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveTextContent(propertyValue.value);
      expect(checkbox).not.toBeChecked();
    });
  });

  it("should update global store when a checkbox is selected or deselected", () => {
    render(<PropertyValues />);

    const checkboxRed = screen.getByTestId(
      `checkbox-${mockPropertyValues[0].id}`
    ).firstChild as HTMLInputElement;

    const checkboxBlue = screen.getByTestId(
      `checkbox-${mockPropertyValues[1].id}`
    ).firstChild as HTMLInputElement;

    fireEvent.click(checkboxRed);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_PROPERTY_VALUES",
      payload: ["Red"],
    });

    fireEvent.click(checkboxBlue);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_PROPERTY_VALUES",
      payload: ["Red"],
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_PROPERTY_VALUES",
      payload: ["Blue"],
    });

    fireEvent.click(checkboxRed);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_PROPERTY_VALUES",
      payload: ["Blue"],
    });
  });
});
