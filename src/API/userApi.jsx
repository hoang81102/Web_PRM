import axiosClient from "./axiosClient";
import { toast } from "react-toastify";

// ✅ Get all users
export const getAllUsers = async () => {
  try {
    const response = await axiosClient.get("/users");
    console.log("getAllUsers ➜ response.data:", response.data);

    const userList = response.data?.data;

    if (response.data.code === 200 && Array.isArray(userList)) {
      return userList;
    }

    throw new Error("Invalid user data!");
  } catch (error) {
    console.error("Error fetching user list:", error);
    toast.error("Failed to load user list!");
    throw error;
  }
};

// ✅ Get user by ID
export const getUserById = async (userID) => {
  try {
    const response = await axiosClient.get(`/users/${userID}`);
    const user = response.data?.data;

    if (response.data.code === 200 && user) {
      return user;
    }

    throw new Error("User not found!");
  } catch (error) {
    console.error("Error fetching user details:", error);
    toast.error("Failed to get user details!");
    throw error;
  }
};
