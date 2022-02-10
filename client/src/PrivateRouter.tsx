import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "./type";

const PrivateRoute = () => {
    const isLoggedIn = useSelector((state: RootState) => state.userState.loggedIn);

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;

