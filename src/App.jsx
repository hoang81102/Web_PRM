import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import Dashboard from "./Components/DashboardAdmin";
import AccountComponent from "./Components/AccountComponent";

import NewOrdersComponent from "./Components/OrderManagerment/NewOrdersComponent";
import ProcessingOrdersComponent from "./Components/OrderManagerment/ProcessingOrdersComponent";
import CompletedOrdersComponent from "./Components/OrderManagerment/CompletedOrdersComponent";
import CancelledOrdersComponent from "./Components/OrderManagerment/CancelledOrdersComponent";
import PrivateRoute from "./Components/PrivateRoute";
import ProductComponent from "./Components/ProductManagerment/ProductComponent";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected /admin routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<AccountComponent />} />
          <Route path="/admin/products" element={<ProductComponent />} />
          <Route path="/admin/orders/new" element={<NewOrdersComponent />} />
          <Route
            path="/admin/orders/processing"
            element={<ProcessingOrdersComponent />}
          />
          <Route
            path="/admin/orders/completed"
            element={<CompletedOrdersComponent />}
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
