import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import Dashboard from "./Components/DashboardAdmin";
import AccountComponent from "./Components/AccountComponent";
import ProductComponent from "./Components/ProductComponent";
import NewOrdersComponent from "./Components/OrderManagerment/NewOrdersComponent";
import ProcessingOrdersComponent from "./Components/OrderManagerment/ProcessingOrdersComponent";
import CompletedOrdersComponent from "./Components/OrderManagerment/CompletedOrdersComponent";
import CancelledOrdersComponent from "./Components/OrderManagerment/CancelledOrdersComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/users" element={<AccountComponent />} />
      <Route path="/admin/products" element={<ProductComponent />} />
      <Route path="/admin/orders/new" element={<NewOrdersComponent />} />
      <Route path="/admin/orders/processing" element={<ProcessingOrdersComponent />} />
      <Route path="/admin/orders/completed" element={<CompletedOrdersComponent />} />
      <Route path="/admin/orders/cancelled" element={<CancelledOrdersComponent />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
