import axiosClient from "./axiosClient";
import { toast } from "react-toastify";

// ✅ Lấy đơn hàng theo orderStatus
export const getOrdersByStatus = async (orderStatus) => {
  try {
    const response = await axiosClient.get(
      `/orders?orderStatus=${orderStatus}`
    );
    console.log("getOrdersByStatus ➜ response.data:", response.data);

    const orderList = response.data?.data;

    if (response.data.code === 200 && Array.isArray(orderList)) {
      return orderList;
    }

    throw new Error("Dữ liệu đơn hàng không hợp lệ!");
  } catch (error) {
    console.error(
      `Lỗi khi lấy danh sách đơn hàng orderStatus=${orderStatus}:`,
      error
    );
    toast.error("Không thể tải danh sách đơn hàng!");
    throw error;
  }
};
