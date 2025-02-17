import React from "react"; // Add this line at the top of your test file
import { render, screen } from "@testing-library/react";
import Shimmer from "../components/Shimmer.jsx";

// eslint-disable-next-line no-undef
describe("Shimmer Component", () => {
  test("renders correct number of shimmer items", () => {
    render(<Shimmer />);
    const shimmerItems = screen.getAllByTestId("shimmer-item");
    // eslint-disable-next-line no-undef
    expect(shimmerItems).toHaveLength(7);
  });
});
