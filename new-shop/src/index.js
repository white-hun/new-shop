import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import NewProduct from "./pages/NewProduct";
import ProductDetail from "./pages/ProductDetail";
import MyCart from "./pages/MyCart";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <App />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/products", element: <AllProducts /> },
      { path: "/product/:id", element: <ProductDetail /> },
      {
        path: "/product/new",
        element: (
          <ProtectedRoute requireAdmin text="접근 권한이 없습니다.">
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/carts",
        element: (
          <ProtectedRoute text="로그인 해주세요.">
            <MyCart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

reportWebVitals();
