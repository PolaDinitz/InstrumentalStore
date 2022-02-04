import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Catalog from './components/Catalog/Catalog';
import Cart from './components/Cart/Cart';

import Navbar from "./Navbar";

const pages = [
  {
    name: "Catalog",
    path: "/catalog",
  },
  {
    name: "Cart",
    path: "/cart",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Routing = () => {
  return (
    <Router>
      <>
      <Navbar pages={pages} settings={settings} />
      <Routes>
        <Route path="/" element={<Catalog/>}/>
        <Route path="/catalog" element={<Catalog/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      </>
    </Router>
  );
};

export default Routing;
