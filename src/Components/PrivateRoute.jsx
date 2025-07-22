import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getUserInfo } from "../API/authApi";

const PrivateRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const user = getUserInfo();

  // Ưu tiên lấy scope vì token trả về scope thay cho role
  const role = (
    user?.role ||
    user?.Role ||
    user?.scope || // <-- Thêm dòng này để hỗ trợ scope
    user?.roles?.[0] ||
    ""
  ).toUpperCase();

  if (role !== "ADMIN") {
    return <Navigate to="/no-permission" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
