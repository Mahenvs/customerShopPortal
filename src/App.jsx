import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import CheckOut from "./components/CheckOut";
import Home from "./components/Home";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import CustomerLayOut from "./components/CustomerLayOut";

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <RootLayout />,
  // },

  {},
  {
    path: "/",
    element: <CustomerLayOut />,
    children: [
      {
        path: "/:storeDomain", // Combined path with the parent route
        element: <Home />, // This will render at '/Customer/shopping-cart'
      },
      // {
      //   path: 'shopping-cart', // Combined path with the parent route
      //   element: <CheckOut />, // This will render at '/Customer/shopping-cart'
      // }
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
