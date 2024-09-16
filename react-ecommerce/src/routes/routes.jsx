import { createBrowserRouter, useParams } from "react-router-dom";
import App from "../App";
import { lazy, Suspense } from "react";
import Layout from "../pages/Auth/Layout/Layout";

import { AuthProtectedRoute, UserProtectedRoute,
} from "../ProtectedRoute/ProtectedRoute";
const Signup = lazy(() => import("../pages/Auth/Signup/Signup"));
const Signin = lazy(() => import("../pages/Auth/Signin/Signin"));
const Home = lazy(() => import("../pages/Home/home"));
const Posts = lazy(() => import("../pages/Posts/Posts"));
const ProductDetails = lazy(() => import("../pages/Home/components/ProductDetails"));

const ProductDetailsWrapper = () => {
  const { id } = useParams(); // This will extract the 'id' from the URL
  console.log("Product ID:", id);
  
  return (
    <Suspense fallback={<h1>loading... </h1>}>
      <ProductDetails productId={id} />  {/* Passing the ID as prop to the ProductDetails component */}
    </Suspense>
  );
};

const routes = createBrowserRouter([
    {
      path: "/home",
      element: <App />,
      errorElement: <h1>it's is invalid route</h1>,
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<h1>loading... </h1>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/home/posts",
          element: (
            <Suspense fallback={<h1>loading... </h1>}>
              <Posts />
            </Suspense>
          ),
        },
        // <Route path="/product-details/:id" element={<ProductDetails />} />
        {
          path: "/home/product-details/:id",
          element: <ProductDetailsWrapper />,  // Using the wrapper to extract 'id'
        },
      ],
    },
    {
      path: "/auth",
      element: (
        <AuthProtectedRoute>
          <Layout />
        </AuthProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<h1>loading... </h1>}>
              <Signin />
            </Suspense>
          ),
        },
        {
          path: "signup",
          element: (
            <Suspense fallback={<h1>loading... </h1>}>
              <Signup />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  
  export default routes;
  