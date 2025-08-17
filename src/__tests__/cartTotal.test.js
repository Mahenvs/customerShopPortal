import { render, screen, fireEvent } from '@testing-library/react';  
import CartTotal from '../../components/CartTotal';  
import '@testing-library/jest-dom';  
  
describe('CartTotal Component', () => {  
  const mockGoToCartHandler = jest.fn();  
  const cartTotal = 100.0;  
  
  beforeEach(() => {  
    render(  
      <CartTotal cartTotal={cartTotal} goToCartHandler={mockGoToCartHandler} />  
    );  
  });  
  
  test('renders the correct subtotal', () => {  
    expect(screen.getByText('SubTotal')).toBeInTheDocument();  
    expect(screen.getByText(`$${cartTotal}`)).toBeInTheDocument();  
  });  
  
  test('renders "Go to Cart" button', () => {  
    const button = screen.getByText('Go to Cart');  
    expect(button).toBeInTheDocument();  
  });  
  
  test('calls goToCartHandler when button is clicked', () => {  
    fireEvent.click(screen.getByText('Go to Cart'));  
    expect(mockGoToCartHandler).toHaveBeenCalledTimes(1);  
  });  
});