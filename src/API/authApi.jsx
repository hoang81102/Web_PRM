import axiosClient from "./axiosClient";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const TOKEN_KEY = "token";
const USER_INFO_KEY = "userInfo";

// ✅ Login
export const loginUser = async (email, password) => {
  try {
    const response = await axiosClient.post("/authentication/login", null, {
      params: { email, password },
      skipAuth: true, // ⚡ Skip Bearer token for login
    });

    console.log("Login response.data:", response.data);

    const token = response.data?.data;
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      const userInfo = jwtDecode(token);
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));

      toast.success("Login successful!");
      return { success: true, token, user: userInfo };
    }

    toast.error("No token received.");
    return { success: false, message: "No token received." };
  } catch (error) {
    console.error("ERROR RESPONSE", error.response);
    const msg = error.response?.data?.message || "Login failed!";
    toast.error(msg);
    return { success: false, message: msg };
  }
};

// ✅ Forgot Password (Sửa đúng theo Swagger)
export const forgotPassword = async (email) => {
  try {
    const response = await axiosClient.post(
      "/authentication/forgot-password",
      null, // body null vì API nhận query param
      {
        params: { email },
        skipAuth: true, // ⚡ Nếu API này không cần token
      }
    );
    toast.success("Reset password email sent successfully!");
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to send email!";
    toast.error(msg);
    throw error;
  }
};

// ✅ Change Password
export const changePassword = async ({ email, oldPassword, newPassword }) => {
  try {
    const response = await axiosClient.put(
      "/authentication/password-change",
      null, // Không có body
      {
        params: { email, oldPassword, newPassword },
      }
    );
    toast.success("Password changed successfully!");
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to change password!";
    toast.error(msg);
    throw error;
  }
};


// ✅ Send Verification Code
export const sendVerificationCode = async (email) => {
  try {
    const response = await axiosClient.post(
      "/authentication/verification-code",
      { email }
    );
    toast.success("Verification code sent!");
    return response.data;
  } catch (error) {
    const msg =
      error.response?.data?.message || "Failed to send verification code!";
    toast.error(msg);
    throw error;
  }
};

// ✅ Logout
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
  toast.info("Logged out!");
};

// ✅ Get user info from localStorage
export const getUserInfo = () => {
  const raw = localStorage.getItem(USER_INFO_KEY);
  return raw ? JSON.parse(raw) : null;
};

// ✅ Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token;
};

// ✅ Refresh user info from token
export const refreshUserInfo = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(decoded));
      return decoded;
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
      return null;
    }
  }
  return null;
};

// ✅ Get current token
export const getToken = () => localStorage.getItem(TOKEN_KEY);
