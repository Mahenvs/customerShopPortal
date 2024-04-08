import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";

import Home from "./components/Home";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import CustomerLayOut from "./components/CustomerLayOut";
// import ProductDetail from "./components/ProductDetail";
import getData from "./Loaders/getData";
import UpdateProfile from "./components/UpdateProfile";

import { RedirectHome } from "./components/RedirectHome";
import CategoriesView from "./components/CategoriesView";
import CartView from "./components/CartView";
import OrderConfirmation from "./components/OrderConfirmation";
import Orders from "./components/Orders";
import BodyRoute from "./components/BodyRoute";
import ProductDetail from "./components/ProductDetail";
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
        path: "/updateProfile",
        element: <UpdateProfile />,
      },
      {
        path: "/:storeDomain",
        element: <BodyRoute />,
        children: [
          {
            path: "",
            element: <Home />,
          },  {
            path: ":product",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <ProductDetail />
              </Suspense>
            ),
            loader: getData,
            lazy: () => import("./components/ProductDetail"),
          },
          {
            path: "auth",
            element: <RedirectHome />,
          },
          {
            path: "categories",
            element: <CategoriesView />,
          },
          {
            path: "cart",
            element: <CartView />,
          },
          {
            path: "orderConfirmed",
            element: <OrderConfirmation />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
      // {
      //   path: "/:storeDomain/:product",
      //   element: <ProductDetail />,
      //   loader: getData,
      // },
      // {
      //   path: "categories",
      //   element: <CategoriesView />,
      // },
      // {
      //   path: "/cart",
      //   element: <CartView />,
      // },
      // {
      //   path: "/orderConfirmed",
      //   element: <OrderConfirmation />,
      // },
      // {
      //   path: "/orders",
      //   element: <Orders />,
      // },
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
