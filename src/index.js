import './index.css';
import App from './App';
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';
import LikedProducts from './components/LikedProducts';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home/>),
  },
  {
    path: "/login",
    element: (<Login/>),
  },
  {
  path: "/signup",
  element: (<Signup/>),
  },
  {
    path:"/add-product",
    element:(<AddProduct/>),
  },
  {
    path:"/liked-product",
    element:(<LikedProducts/>),
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
