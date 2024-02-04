import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./components/Home";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import CustomerLayOut from "./components/CustomerLayOut";
import ProductDetail from "./components/ProductDetail";
import getData from "./Loaders/getData";
import UpdateProfile from "./components/UpdateProfile";

import { RedirectHome } from "./components/RedirectHome";
import SignUp from "./components/SignUp";
import CategoriesView from "./components/CategoriesView";
import CheckOut from "./components/CheckOut";
import CartView from "./components/CartView";
import Home1 from "./components/Home1";
const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayOut />,
    children: [
      {
        path: "/",
        element: <RedirectHome />,
      },
      {
        path: "?signup",
        element: <SignUp />,
      },
      {
        path: "/updateProfile",
        element: <UpdateProfile />,
      },
      {
        path: "/:storeDomain/",
        element: <Home/>,
        children: [
          
          
        ]
      },
      {
        path: "/:storeDomain/:product",
        element: <ProductDetail />,
        loader: getData,
      },
      {
        path: "categories",
        element: <CategoriesView/>
        
      },
      {
        path: "/cart",
        element: <CartView/>
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
