import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Catalog from './components/Catalog/Catalog';
import Cart from './components/Cart/Cart';

import Navbar from "./Navbar";
import Login from "./components/Login/Login";

const pages = [
  {
    name: "Catalog",
    path: "/catalog",
  }
];
const settings = ["Dashboard", "Logout"];

const Routing = () => {
  return (
    <Router>
      <>
      <Navbar pages={pages} settings={settings} />
      <Routes>
        <Route path="/" element={<Catalog/>}/>
        <Route path="/catalog" element={<Catalog/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </>
    </Router>
  );
};

export default Routing;
