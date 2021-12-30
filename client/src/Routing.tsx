import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";
import ProductsList from "./ProductsList";
import Cart from "./Cart";

const pages = [
  {
    name: "Products",
    path: "/Products",
    component: ProductsList,
  },
  {
    name: "Cart",
    path: "/Cart",
    component: Cart,
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
