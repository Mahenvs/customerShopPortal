import { render, screen, fireEvent } from '@testing-library/react';  
import Button from '../../UI_Elements/Button';  
import '@testing-library/jest-dom';  
  
describe('Button Component', () => {  
  test('renders button with title', () => {  
    const mockClick = jest.fn();  
    render(<Button title="Test Button" onClickButton={mockClick} />);  
      
    const button = screen.getByText('Test Button');  
    expect(button).toBeInTheDocument();  
  });  
    
  test('applies custom class when provided', () => {  
    const mockClick = jest.fn();  
    render(<Button title="Custom Button" onClickButton={mockClick} class="custom-class" />);  
      
    const button = screen.getByText('Custom Button');  
    expect(button).toHaveClass('custom-class');  
  });  
    
  test('calls onClick handler when clicked', () => {  
    const mockClick = jest.fn();  
    render(<Button title="Click Me" onClickButton={mockClick} />);  
      
    fireEvent.click(screen.getByText('Click Me'));  
    expect(mockClick).toHaveBeenCalledTimes(1);  
  });  
});