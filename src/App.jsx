import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import CheckOut from "./components/CheckOut";
import Home from "./components/Home";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import CustomerLayOut from "./components/CustomerLayOut";
import ProductDetail from "./components/ProductDetail";
import getData from "./Loaders/getData";
import SignUp from "./components/SignUp";
import UpdateProfile from "./components/UpdateProfile";

const router = createBrowserRouter([
 
  {
    path: "/",
    element: <CustomerLayOut />,
    children: [
      {
        path: "/",   
        element: <SignUp />,  
      },
      {
        path: "/signup",   
        element: <SignUp />,  
      },
      {
        path: "/updateProfile",   
        element: <UpdateProfile />,  
      },
      {
        path: "/:storeDomain",   
        element: <Home/>,
      },
      {
        path: '/:storeDomain/:product',   
        element: <ProductDetail />,  
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
