import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Profiler, Suspense } from "react";
import Home from "./components/Home";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import CustomerLayOut from "./components/CustomerLayOut";
import getData from "./Loaders/getData";
import UpdateProfile from "./components/UpdateProfile";
import { RedirectHome } from "./components/RedirectHome";
import CategoriesView from "./components/CategoriesView";
import CartView from "./components/CartView";
import OrderConfirmation from "./components/OrderConfirmation";

import BodyRoute from "./components/BodyRoute";
// import ProductDetail from "./components/ProductDetail";
import Account from "./components/Account";
import Categories from "./components/Categories";
import StoreNotExist from "./components/storeNotExist";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ErrorPage } from "./components/ErrorPage";
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const Orders = lazy(() => import("./components/Orders"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayOut />,
    errorElement: <ErrorPage />,
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
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: ":product",
            loader: getData,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <ProductDetail />
              </Suspense>
            ),
          },
          {
            path: "auth",
            element: <RedirectHome />,
          },
          {
            path: "categories",
            element: <CategoriesView />,
            children: [
              {
                path: "/:storeDomain/categories/?categoryId",
                element: <Categories />,
              },
            ],
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
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Orders />
              </Suspense>
            ),
          },
          {
            path: "my-profile",
            element: <Account />,
          },
        ],
      },
      {
        path: "/store-not-exist",
        element: <StoreNotExist />,
      },
    ],
  },
]);
const onRenderCallback = (
  id, // The "id" prop of the Profiler tree that just committed
  phase, // Either "mount" (first render) or "update" (re-render)
  actualDuration, // Time spent rendering the committed update
  baseDuration, // Estimated time to render the entire subtree without memoization
  startTime, // When React began rendering this update
  commitTime, // When React committed this update
  interactions // Set of interactions that were tracked
) => {
  console.log(`[Profiler: ${id}]`);
  console.log(`Phase: ${phase}`);
  console.log(`Actual Duration: ${actualDuration}`);
  console.log(`Base Duration: ${baseDuration}`);
  console.log(`Start Time: ${startTime}`);
  console.log(`Commit Time: ${commitTime}`);
  console.log(`Interactions:`, interactions);
};
function App() {
  return (
    <Profiler id="SomeComponentProfiler" onRender={onRenderCallback}>
      <GoogleOAuthProvider clientId="423823754952-m2033bpa6uit6r44krnlk3hk29ea19r1.apps.googleusercontent.com">
        <Provider store={appStore}>
          <RouterProvider router={router}>
            <Outlet />
          </RouterProvider>
        </Provider>
      </GoogleOAuthProvider>
    </Profiler>
  );
}

export default App;
