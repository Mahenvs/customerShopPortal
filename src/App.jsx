import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import CheckOut from "./components/CheckOut";
import Home from "./components/Home";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import CustomerLayOut from "./components/CustomerLayOut";
import ProductDetail from "./components/ProductDetail";
import getData from "./Loaders/getData";

const router = createBrowserRouter([
 
  {
    path: "/",
    element: <CustomerLayOut />,
    children: [
      {
        path: "/:storeDomain", // Combined path with the parent route
        element: <Home />, // This will render at '/Customer/shopping-cart'
        
      },
      {
        path: '/:storeDomain/:product', // Combined path with the parent route
        element: <ProductDetail />, // This will render at '/Customer/shopping-cart'
        loader: getData,
      }
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </Provider>
  );
}

export default App;
