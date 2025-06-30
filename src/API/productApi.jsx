import axiosClient from "./axiosClient";
import { toast } from "react-toastify";

// ✅ Lấy tất cả sản phẩm
export const getAllProducts = async () => {
  try {
    const response = await axiosClient.get("/products");
    return response.data.data; // Giả định API trả về { data: [...] }
  } catch (error) {
    toast.error("Không thể tải danh sách sản phẩm!");
    throw error;
  }
};

// ✅ Lấy sản phẩm theo ID
export const getProductById = async (productId) => {
  try {
    const response = await axiosClient.get(`/products/${productId}`);
    return response.data.data; // Giả định API trả về { data: {...} }
  } catch (error) {
    toast.error("Không thể lấy chi tiết sản phẩm!");
    throw error;
  }
};

// ✅ Thêm sản phẩm mới
export const createProduct = async (productData) => {
  try {
    const response = await axiosClient.post("/products", productData);
    toast.success("Thêm sản phẩm thành công!");
    return response.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Thêm sản phẩm thất bại!");
    throw error;
  }
};

// ✅ Cập nhật sản phẩm
export const updateProduct = async (productId, productData) => {
  try {
    const response = await axiosClient.put(
      `/products/${productId}`,
      productData
    );
    toast.success("Cập nhật sản phẩm thành công!");
    return response.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Cập nhật sản phẩm thất bại!");
    throw error;
  }
};

// ✅ Xóa sản phẩm
export const deleteProduct = async (productId) => {
  try {
    const response = await axiosClient.delete(`/products/${productId}`);
    toast.success("Xóa sản phẩm thành công!");
    return response.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Xóa sản phẩm thất bại!");
    throw error;
  }
};
