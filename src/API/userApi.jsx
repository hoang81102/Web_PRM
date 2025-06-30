import axiosClient from "./axiosClient";
import { toast } from "react-toastify";

// ✅ Lấy tất cả người dùng
export const getAllUsers = async () => {
  try {
    const response = await axiosClient.get("/users");
    console.log("getAllUsers ➜ response.data:", response.data);

    const userList = response.data?.data;

    if (response.data.code === 200 && Array.isArray(userList)) {
      return userList;
    }

    throw new Error("Dữ liệu người dùng không hợp lệ!");
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    toast.error("Không thể tải danh sách người dùng!");
    throw error;
  }
};

// ✅ Lấy người dùng theo ID
export const getUserById = async (userID) => {
  try {
    const response = await axiosClient.get(`/users/${userID}`);
    const user = response.data?.data;

    if (response.data.code === 200 && user) {
      return user;
    }

    throw new Error("Không tìm thấy người dùng!");
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    toast.error("Không thể lấy thông tin người dùng!");
    throw error;
  }
};
