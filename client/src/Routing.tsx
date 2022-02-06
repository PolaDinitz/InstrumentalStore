import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";
import ProductsList from "./ProductsList";
import Cart from "./Cart";
import ProductsDashboard from "./components/ProductsDashboard";
import AddProduct from "./components/AddProduct";
import Login from "./components/Login";

const pages = [
  {
    name: "Products",
    path: "/Products",
    component: ProductsList,
  },
  {
    name: "Products Dashboard",
    path: "/products/dashboard",
    component: ProductsDashboard,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
  },
  {
    name: "Add Product",
    path: "/products/add",
    component: AddProduct,
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Routing = () => {
  return (
    <Router>
      <Navbar pages={pages} settings={settings} />
      <Routes>
        {pages.map((page) => (
          <Route
            key={page.name}
            path={page.path}
            element={<page.component />}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default Routing;
