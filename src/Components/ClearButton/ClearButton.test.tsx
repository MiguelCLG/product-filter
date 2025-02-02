import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClearButton from "./ClearButton";
import { useGlobalStore } from "../../Store/GlobalStore";

jest.mock("../../Store/GlobalStore");

describe("ClearButton Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useGlobalStore as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the button with the text 'Clear Filters'", () => {
    // Render the ClearButton component
    render(<ClearButton />);

    // Assert that the button is rendered with the correct text
    expect(screen.getByRole("button")).toHaveTextContent("Clear Filters");
  });

  it("should dispatch the 'CLEAR_FILTERS' action when clicked", () => {
    // Render the ClearButton component
    render(<ClearButton />);

    // Get the button element
    const button = screen.getByRole("button");

    // Simulate a click event on the button
    fireEvent.click(button);

    // Assert that the dispatch method was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith({ type: "CLEAR_FILTERS" });
  });
});
