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
import ProductDetail from './components/ProductDetail';
import CategoryPage from './components/CategoryPage';

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
  },
  {
    path:"/product/:pId",
    element:(<ProductDetail/>)
  },
  {
    path:"/category/:catName",
    element:(<CategoryPage/>)
  }
  
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
