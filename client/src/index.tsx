import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./redux/store";
import "react-toastify/dist/ReactToastify.min.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
            <ToastContainer autoClose={3000} theme='colored' position="bottom-right"/>
        </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
