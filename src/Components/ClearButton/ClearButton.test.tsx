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
    render(<ClearButton />);

    expect(screen.getByRole("button")).toHaveTextContent("Clear Filters");
  });

  it("should dispatch the 'CLEAR_FILTERS' action when clicked", () => {
    render(<ClearButton />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "CLEAR_FILTERS" });
  });
});
