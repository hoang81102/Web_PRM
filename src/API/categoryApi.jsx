import axiosClient from "./axiosClient";
import { toast } from "react-toastify";

// ✅ Get all categories
export const getAllCategories = async () => {
  try {
    const response = await axiosClient.get("/categories");
    return response.data.data; // Return category array only
  } catch (error) {
    toast.error("Failed to load category list!");
    throw error;
  }
};

// ✅ Get category by ID
export const getCategoryById = async (categoryID) => {
  try {
    const response = await axiosClient.get(`/categories/${categoryID}`);
    return response.data.data; // Return a single category object
  } catch (error) {
    toast.error("Failed to get category details!");
    throw error;
  }
};

// ✅ Create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await axiosClient.post("/categories", categoryData);
    toast.success("Category created successfully!");
    return response.data.data; // Return the newly created category
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create category!");
    throw error;
  }
};

// ✅ Update category
export const updateCategory = async (categoryID, categoryData) => {
  try {
    const response = await axiosClient.put(
      `/categories/${categoryID}`,
      categoryData
    );
    toast.success("Category updated successfully!");
    return response.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update category!");
    throw error;
  }
};

// ✅ Delete category
export const deleteCategory = async (categoryID) => {
  try {
    const response = await axiosClient.delete(`/categories/${categoryID}`);
    toast.success("Category deleted successfully!");
    return response.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete category!");
    throw error;
  }
};
