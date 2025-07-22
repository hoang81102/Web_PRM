import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import ChangePassword from "./Components/ChangePassword";
import NoPermission from "./Components/NoPermission"; // Thêm vào

import AccountComponent from "./Components/AccountComponent";
import ProductComponent from "./Components/ProductManagerment/ProductComponent";
import NewOrdersComponent from "./Components/OrderManagerment/NewOrdersComponent";
import DeliveredOrdersComponent from "./Components/OrderManagerment/DeliveredOrdersComponent";
import ShippedOrdersComponent from "./Components/OrderManagerment/ShippedOrdersComponent";
import CancelledOrdersComponent from "./Components/OrderManagerment/CancelledOrdersComponent";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/no-permission" element={<NoPermission />} />{" "}
        {/* Thêm route này */}
        {/* Protected /admin routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin/users" element={<AccountComponent />} />
          <Route path="/admin/products" element={<ProductComponent />} />
          <Route path="/admin/orders/new" element={<NewOrdersComponent />} />
          <Route
            path="/admin/orders/delivered"
            element={<DeliveredOrdersComponent />}
          />
          <Route
            path="/admin/orders/shipped"
            element={<ShippedOrdersComponent />}
          />
          <Route
            path="/admin/orders/cancelled"
            element={<CancelledOrdersComponent />}
          />
        </Route>
      </Routes>

      {/* Global Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
