import cartReducer, { setOrdersData, resetCart } from '../../store/cartSlice';  
  
describe('Cart Slice', () => {  
  const initialState = { ordersData: null };  
    
  test('should return the initial state', () => {  
    expect(cartReducer(undefined, {})).toEqual(initialState);  
  });  
    
  test('should handle setOrdersData', () => {  
    const ordersData = { id: 1, items: [] };  
    const action = setOrdersData(ordersData);  
    const state = cartReducer(initialState, action);  
    expect(state.ordersData).toEqual(ordersData);  
  });  
    
  test('should handle resetCart', () => {  
    const filledState = { ordersData: { id: 1, items: [] } };  
    const action = resetCart();  
    const state = cartReducer(filledState, action);  
    expect(state.ordersData).toBeNull();  
  });  
});