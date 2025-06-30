import axiosClient from "./axiosClient";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const TOKEN_KEY = "token";
const USER_INFO_KEY = "userInfo";

// ✅ Đăng nhập
export const loginUser = async (email, password) => {
  try {
    const response = await axiosClient.post("/authentication/login", null, {
      params: { email, password },
      skipAuth: true, // ⚡ không thêm Bearer token khi login
    });

    console.log("Login response.data:", response.data);

    const token = response.data?.data;
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      const userInfo = jwtDecode(token);
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));

      toast.success("Đăng nhập thành công!");
      return { success: true, token, user: userInfo };
    }

    toast.error("Không nhận được token.");
    return { success: false, message: "Không nhận được token." };
  } catch (error) {
    console.error("ERROR RESPONSE", error.response);
    const msg = error.response?.data?.message || "Đăng nhập thất bại!";
    toast.error(msg);
    return { success: false, message: msg };
  }
};

// ✅ Quên mật khẩu
export const forgotPassword = async (email) => {
  try {
    const response = await axiosClient.post("/authentication/forgot-password", {
      email,
    });
    toast.success("Gửi email đặt lại mật khẩu thành công!");
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Gửi email thất bại!";
    toast.error(msg);
    throw error;
  }
};

// ✅ Đổi mật khẩu
export const changePassword = async (data) => {
  try {
    const response = await axiosClient.put(
      "/authentication/password-change",
      data
    );
    toast.success("Đổi mật khẩu thành công!");
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Đổi mật khẩu thất bại!";
    toast.error(msg);
    throw error;
  }
};

// ✅ Gửi mã xác thực
export const sendVerificationCode = async (email) => {
  try {
    const response = await axiosClient.post(
      "/authentication/verification-code",
      { email }
    );
    toast.success("Mã xác thực đã được gửi!");
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Không gửi được mã xác thực!";
    toast.error(msg);
    throw error;
  }
};

// ✅ Đăng xuất
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
  toast.info("Đã đăng xuất!");
};

// ✅ Lấy thông tin người dùng từ localStorage
export const getUserInfo = () => {
  const raw = localStorage.getItem(USER_INFO_KEY);
  return raw ? JSON.parse(raw) : null;
};

// ✅ Kiểm tra đã đăng nhập chưa
export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token;
};

// ✅ Làm mới thông tin người dùng từ token
export const refreshUserInfo = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(decoded));
      return decoded;
    } catch (error) {
      console.error("Token không hợp lệ:", error);
      logout();
      return null;
    }
  }
  return null;
};

// ✅ Lấy token hiện tại
export const getToken = () => localStorage.getItem(TOKEN_KEY);
