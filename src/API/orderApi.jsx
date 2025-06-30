import axiosClient from "./axiosClient";
import { toast } from "react-toastify";

// ✅ Lấy danh sách đơn hàng theo trạng thái
export const getOrdersByStatus = async (status) => {
  try {
    if (!status) {
      throw new Error("Bạn phải cung cấp trạng thái đơn hàng!");
    }

    const response = await axiosClient.get(`/orders/status`, {
      params: { status },
    });
    console.log("getOrdersByStatus ➜ response.data:", response.data);

    const orders = response.data?.data;

    if (response.data.code === 200 && Array.isArray(orders)) {
      return orders;
    }

    throw new Error("Dữ liệu đơn hàng không hợp lệ!");
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng theo trạng thái:", error);
    toast.error("Không thể tải danh sách đơn hàng!");
    throw error;
  }
};
