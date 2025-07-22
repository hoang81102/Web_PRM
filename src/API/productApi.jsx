import axiosClient from "./axiosClient";
import { toast } from "react-toastify";

// ✅ Get all products
export const getAllProducts = async () => {
  try {
    const response = await axiosClient.get("/products");
    return response.data.data; // Assuming API returns { data: [...] }
  } catch (error) {
    toast.error("Failed to load product list!");
    throw error;
  }
};

// ✅ Get product by ID
export const getProductById = async (productId) => {
  try {
    const response = await axiosClient.get(`/products/${productId}`);
    return response.data.data; // Assuming API returns { data: {...} }
  } catch (error) {
    toast.error("Failed to get product details!");
    throw error;
  }
};

// ✅ Create new product
export const createProduct = async (productData) => {
  try {
    const response = await axiosClient.post("/products", productData);
    toast.success("Product created successfully!");
    return response.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create product!");
    throw error;
  }
};

// ✅ Update product
export const updateProduct = async (productId, productData) => {
  try {
    const response = await axiosClient.put(
      `/products/${productId}`,
      productData
    );
    toast.success("Product updated successfully!");
    return response.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update product!");
    throw error;
  }
};

// ✅ Delete product
export const deleteProduct = async (productId) => {
  try {
    const response = await axiosClient.delete(`/products/${productId}`);
    toast.success("Product deleted successfully!");
    return response.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete product!");
    throw error;
  }
};
