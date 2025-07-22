import axiosClient from "./axiosClient";
import { toast } from "react-toastify";

// ✅ Get order list by status
export const getOrdersByStatus = async (status) => {
  try {
    if (!status) {
      throw new Error("You must provide an order status!");
    }

    const response = await axiosClient.get(`/orders/status`, {
      params: { status },
    });
    console.log("getOrdersByStatus ➜ response.data:", response.data);

    const orders = response.data?.data;

    if (response.data.code === 200 && Array.isArray(orders)) {
      return orders;
    }

    throw new Error("Invalid order data!");
  } catch (error) {
    console.error("Error fetching order list by status:", error);
    toast.error("Failed to load order list!");
    throw error;
  }
};
// ✅ Update order status
export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axiosClient.put(`/orders/update-status`, null, {
      params: { id, status },
    });

    console.log("updateOrderStatus ➜ response.data:", response.data);

    if (response.data.code === 200) {
      return response.data;
    }

    throw new Error("Failed to update order status!");
  } catch (error) {
    console.error("Error updating order status:", error);
    toast.error("Failed to update order status!");
    throw error;
  }
};
