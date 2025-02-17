import { render, screen, fireEvent } from "@testing-library/react";
import CartTotal from "../components/CartTotal"; // Adjust the import path as needed
import "@testing-library/jest-dom"; // for extended matchers

describe("CartTotal Component", () => {
  const mockGoToCartHandler = jest.fn(); // Mock function for the button handler
  const cartTotal = 50.0; // Example total amount

  beforeEach(() => {
    render(
      <CartTotal cartTotal={cartTotal} goToCartHandler={mockGoToCartHandler} />
    );
  });

  test("renders the correct subtotal", () => {
    // Check if the subtotal is rendered correctly
    expect(screen.getByText("SubTotal")).toBeInTheDocument();
    expect(screen.getByText(`$${cartTotal}`)).toBeInTheDocument();
  });

  test('renders "Go to Cart" button', () => {
    // Check if the button is present
    const button = screen.getByText("Go to Cart");
    expect(button).toBeInTheDocument();
  });

  test("calls goToCartHandler when button is clicked", () => {
    // Simulate the button click
    fireEvent.click(screen.getByText("Go to Cart"));

    // Ensure the handler is called
    expect(mockGoToCartHandler).toHaveBeenCalledTimes(1);
  });
});
