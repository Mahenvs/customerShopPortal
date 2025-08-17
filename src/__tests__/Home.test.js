import { render, screen } from '@testing-library/react';  
import { Provider } from 'react-redux';  
import { BrowserRouter } from 'react-router-dom';  
import configureStore from 'redux-mock-store';  
import Home from '../../components/Home';  
import '@testing-library/jest-dom';  
  
// Mock the hooks and child components  
jest.mock('../../Hooks/useGetProducts', () => jest.fn());  
jest.mock('../../components/Categories', () => () => <div data-testid="categories">Categories Component</div>);  
jest.mock('../../components/CustomerViewProducts', () => () => <div data-testid="products">Products Component</div>);  
jest.mock('../../components/Cart', () => () => <div data-testid="cart">Cart Component</div>);  
  
const mockStore = configureStore([]);  
  
describe('Home Component', () => {  
  let store;  
  
  beforeEach(() => {  
    store = mockStore({  
      product: { activeCategory: '123' },  
      store: { storeId: '456' },  
    });  
  
    render(  
      <Provider store={store}>  
        <BrowserRouter>  
          <Home />  
        </BrowserRouter>  
      </Provider>  
    );  
  });  
  
  test('renders Categories component', () => {  
    expect(screen.getByTestId('categories')).toBeInTheDocument();  
  });  
  
  test('renders CustomerViewProducts component', () => {  
    expect(screen.getByTestId('products')).toBeInTheDocument();  
  });  
  
  test('renders Cart component', () => {  
    expect(screen.getByTestId('cart')).toBeInTheDocument();  
  });  
});