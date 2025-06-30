import axiosClient from "./axiosClient";
import { toast } from "react-toastify";

// ✅ Lấy tất cả category
export const getAllCategories = async () => {
  try {
    const response = await axiosClient.get("/categories");
    return response.data.data; // chỉ trả về mảng categories
  } catch (error) {
    toast.error("Không thể tải danh sách danh mục!");
    throw error;
  }
};

// ✅ Lấy category theo ID
export const getCategoryById = async (categoryID) => {
  try {
    const response = await axiosClient.get(`/categories/${categoryID}`);
    return response.data.data; // trả về 1 object category
  } catch (error) {
    toast.error("Không thể lấy thông tin danh mục!");
    throw error;
  }
};

// ✅ Thêm danh mục
export const createCategory = async (categoryData) => {
  try {
    const response = await axiosClient.post("/categories", categoryData);
    toast.success("Thêm danh mục thành công!");
    return response.data.data; // trả về danh mục vừa tạo
  } catch (error) {
    toast.error(error.response?.data?.message || "Thêm danh mục thất bại!");
    throw error;
  }
};

// ✅ Cập nhật danh mục
export const updateCategory = async (categoryID, categoryData) => {
  try {
    const response = await axiosClient.put(
      `/categories/${categoryID}`,
      categoryData
    );
    toast.success("Cập nhật danh mục thành công!");
    return response.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Cập nhật danh mục thất bại!");
    throw error;
  }
};

// ✅ Xóa danh mục
export const deleteCategory = async (categoryID) => {
  try {
    const response = await axiosClient.delete(`/categories/${categoryID}`);
    toast.success("Xóa danh mục thành công!");
    return response.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Xóa danh mục thất bại!");
    throw error;
  }
};
