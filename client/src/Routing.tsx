import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Catalog from './components/Catalog/Catalog';
import Cart from './components/Cart/Cart';

import Navbar from "./Navbar";
import Login from "./components/Login/Login";
import ProductsDashboard from "./components/ProductsDashboard/ProductsDashboard";
import AddProduct from "./components/AddProduct/AddProduct";
import PrivateRoute from "./PrivateRouter";

const pages = [
    {
    name: "Catalog",
    path: "/catalog",
    }
];
const settings = [
    {
        name: "Dashboard",
        path: "/products/dashboard"
    }
];

const Routing = () => {
    return (
        <Router>
            <>
            <Navbar pages={pages} settings={settings} />
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path='/' element={<PrivateRoute/>}>
                    <Route path='/' element={<Catalog/>}/>
                </Route>
                <Route path='/catalog' element={<PrivateRoute/>}>
                    <Route path='/catalog' element={<Catalog/>}/>
                </Route>
                <Route path='/cart' element={<PrivateRoute/>}>
                    <Route path='/cart' element={<Cart/>}/>
                </Route>
                <Route path='/products/dashboard' element={<PrivateRoute/>}>
                    <Route path='/products/dashboard' element={<ProductsDashboard/>}/>
                </Route>
                <Route path='/products/add' element={<PrivateRoute/>}>
                    <Route path='/products/add' element={<AddProduct/>}/>
                </Route>
            </Routes>
            </>
    </Router>
  );
};

export default Routing;
