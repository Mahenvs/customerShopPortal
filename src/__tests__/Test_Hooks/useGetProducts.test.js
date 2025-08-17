import { renderHook } from '@testing-library/react-hooks';  
import { useDispatch, useSelector } from 'react-redux';  
import useGetProducts from '../../Hooks/useGetProducts';  
import { listOfProducts } from '../../store/productSlice';  
  
// Mocking dependencies  
jest.mock('react-redux', () => ({  
  useDispatch: jest.fn(),  
  useSelector: jest.fn(),  
}));  
  
global.fetch = jest.fn();  
  
describe('useGetProducts Hook', () => {  
  let dispatchMock;  
    
  beforeEach(() => {  
    dispatchMock = jest.fn();  
    useDispatch.mockReturnValue(dispatchMock);  
      
    // Mock environment variables  
    process.env.VITE_API_URL_PRODUCT = 'https://test-api.com';  
      
    // Mock fetch implementation  
    global.fetch.mockImplementation(() =>   
      Promise.resolve({  
        ok: true,  
        json: () => Promise.resolve([{ id: 1, name: 'Test Product' }]),  
      })  
    );  
  });  
    
  afterEach(() => {  
    jest.clearAllMocks();  
  });  
    
  it('should fetch products when storeId and categoryId are available', async () => {  
    // Set up the selector mock values  
    useSelector.mockImplementation((selector) => {  
      if (selector.name === 'storeId') return '123';  
      if (selector.name === 'categoryId') return '456';  
      return null;  
    });  
      
    // Render the hook  
    renderHook(() => useGetProducts());  
      
    // Wait for async operations  
    await new Promise(resolve => setTimeout(resolve, 0));  
      
    // Check if fetch was called correctly  
    expect(global.fetch).toHaveBeenCalled();  
      
    // Check if dispatch was called with the right action  
    expect(dispatchMock).toHaveBeenCalledWith(  
      listOfProducts([{ id: 1, name: 'Test Product' }])  
    );  
  });  
    
  it('should not fetch products when storeId is missing', async () => {  
    // Set up the selector mock values  
    useSelector.mockImplementation((selector) => {  
      if (selector.name === 'storeId') return null;  
      if (selector.name === 'categoryId') return '456';  
      return null;  
    });  
      
    // Render the hook  
    renderHook(() => useGetProducts());  
      
    // Wait for async operations  
    await new Promise(resolve => setTimeout(resolve, 0));  
      
    // Check that fetch was not called  
    expect(global.fetch).not.toHaveBeenCalled();  
  });  
});