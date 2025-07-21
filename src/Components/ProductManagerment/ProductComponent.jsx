import { useState, useEffect } from "react";
import AdminLayout from "../../Page/Admin/AdminLayout";
import AddCategoryModal from "./AddCategoryModal";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import ViewProductModal from "./ViewProductModal";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../API/productApi";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../../API/categoryApi";

const ProductComponent = () => {
  // State cho dữ liệu từ API
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  // State cho UI
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("productName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Form state cho thêm/sửa sản phẩm
  const [formData, setFormData] = useState({
    productName: "",
    briDesc: "",
    fullDesc: "",
    technic: "",
    price: 0,
    imageURL: "",
    categoryID: "",
  });

  // Form state cho thêm danh mục
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
  });

  // Load dữ liệu ban đầu
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadCategories(), loadProducts()]);
    } catch (error) {
      console.error("Error loading initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load categories từ API
  const loadCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading categories:", error);
      setCategories([]);
    }
  };

  // Load products từ API
  const loadProducts = async () => {
    try {
      const productsData = await getAllProducts();
      // Map dữ liệu để có categoryName
      const productsWithCategoryName = productsData.map((product) => {
        const category = categories.find(
          (cat) => cat.categoryID === product.categoryID
        );
        return {
          ...product,
          categoryName: category?.categoryName || "No category",
        };
      });
      setProducts(productsWithCategoryName);
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    }
  };

  // Reload products khi categories thay đổi
  useEffect(() => {
    if (categories.length > 0) {
      loadProducts();
    }
  }, [categories]);

  //Phân trang
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory, sortBy, sortOrder]);

  // Hàm format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };


  // Hàm tìm kiếm và sắp xếp
  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesSearch =
        product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.briDesc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.categoryName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        filterCategory === "" ||
        product.categoryID?.toString() === filterCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "price") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  // Hàm phân trang
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Xử lý form sản phẩm
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý form danh mục
  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Thêm danh mục mới
  const handleAddCategory = async (e) => {
    e.preventDefault();
    setCategoryLoading(true);
    try {
      await createCategory({ categoryName: categoryFormData.name });
      await loadCategories(); // Reload categories
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setCategoryLoading(false);
    }
  };

  // Hiển thị modal danh mục
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      productName: product.productName,
      briDesc: product.briDesc || "",
      fullDesc: product.fullDesc || "",
      technic: product.technic || "",
      price: product.price,
      imageURL: product.imageURL,
      categoryID: product.categoryID,
    });
    setShowViewModal(true);
  };

  // Xóa danh mục
  const handleDeleteCategory = async (categoryId) => {
    const hasProducts = products.some(
      (product) => product.categoryID === categoryId
    );

    if (hasProducts) {
      alert(
        "This category cannot be deleted because there are products in the category!"
      );
      return;
    }

    if (window.confirm("Are you sure you want to delete this category ?")) {
      setCategoryLoading(true);
      try {
        await deleteCategory(categoryId);
        await loadCategories(); // Reload categories
      } catch (error) {
        console.error("Error deleting category:", error);
      } finally {
        setCategoryLoading(false);
      }
    }
  };

  // Thêm sản phẩm mới
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setProductLoading(true);
    try {
      const productData = {
        productName: formData.productName,
        briDesc: formData.briDesc,
        price: Number(formData.price),
        imageURL: formData.imageURL,
        categoryID: Number(formData.categoryID),
      };

      await createProduct(productData);
      setFormData({
        productName: "",
        briDesc: "",
        price: "",
        imageURL: "",
        categoryId: "",
      });
      setShowAddModal(false);
      await loadProducts(); // Reload products
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setProductLoading(false);
    }
  };

  // Sửa sản phẩm
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      productName: product.productName,
      briDesc: product.briDesc || "",
      fullDesc: product.fullDesc || "",
      technic: product.technic || "",
      price: product.price,
      imageURL: product.imageURL,
      categoryID: product.categoryID,
    });
    setShowEditModal(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setProductLoading(true);
    try {
      const productData = {
        productName: formData.productName,
        briDesc: formData.briDesc,
        fullDesc: formData.fullDesc,
        technic: formData.technic,
        price: Number(formData.price),
        imageURL: formData.imageURL,
        categoryID: Number(formData.categoryID),
      };

      await updateProduct(selectedProduct.productID, productData);

      setShowEditModal(false);
      setSelectedProduct(null);
      setFormData({
        productName: "",
        briDesc: "",
        fullDesc: "",
        technic: "",
        price: "",
        imageURL: "",
        categoryID: "",
      });
      await loadProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setProductLoading(false);
    }
  };

  // Xóa sản phẩm
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      setProductLoading(true);
      try {
        await deleteProduct(productId);
        await loadProducts(); // Reload products
      } catch (error) {
        console.error("Error deleting product:", error);
      } finally {
        setProductLoading(false);
      }
    }
  };

  // Modal Component
  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#78B3CE]">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#78B3CE]"></div>
      <span className="ml-3 text-[#78B3CE]">Loading...</span>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#78B3CE] mb-2">
                Product Management
              </h1>
              <p className="text-gray-600">Manage all products in the system</p>
            </div>

            {/* Category Management Button */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCategoryModal(true)}
                className="bg-[#78B3CE] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5a8ba3] transition-colors shadow-lg"
                disabled={categoryLoading}
              >
                📂 Category Management
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by product name, description, category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border-2 border-[#C9E6F0] rounded-xl focus:border-[#78B3CE] outline-none transition-colors"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-3 border-2 border-[#C9E6F0] rounded-xl focus:border-[#78B3CE] outline-none bg-white min-w-[200px]"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category.categoryID} value={category.categoryID}>
                  {category.categoryName}
                </option>
              ))}
            </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortBy(field);
                setSortOrder(order);
              }}
              className="p-3 border-2 border-[#C9E6F0] rounded-xl focus:border-[#78B3CE] outline-none bg-white min-w-[200px]"
            >
              <option value="productName-asc">A-Z Name</option>
              <option value="productName-desc">Z-A Name</option>
              <option value="price-asc">Price increases </option>
              <option value="price-desc">Price decreasing</option>
              <option value="categoryName-asc">A-Z Category</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total product</p>
                <p className="text-2xl font-bold text-[#78B3CE]">
                  {products.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#C9E6F0] rounded-full flex items-center justify-center text-2xl">
                📦
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Search results</p>
                <p className="text-2xl font-bold text-[#F96E2A]">
                  {filteredAndSortedProducts.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                🔍
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Category</p>
                <p className="text-2xl font-bold text-green-600">
                  {categories.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                📂
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#78B3CE]">
              Product List ({filteredAndSortedProducts.length})
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#F96E2A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#e55a1f] transition-colors shadow-lg"
              disabled={productLoading}
            >
              ➕ Add new product
            </button>
          </div>

          {productLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#C9E6F0]">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <span className="font-semibold text-[#78B3CE]">
                        Image
                      </span>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort("productName")}
                        className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                      >
                        <span>Tên sản phẩm</span>
                        <span className="text-xs">
                          {sortBy === "productName"
                            ? sortOrder === "asc"
                              ? "↑"
                              : "↓"
                            : "↕"}
                        </span>
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <span className="font-semibold text-[#78B3CE]">
                        Describe
                      </span>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort("price")}
                        className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                      >
                        <span>Price</span>
                        <span className="text-xs">
                          {sortBy === "price"
                            ? sortOrder === "asc"
                              ? "↑"
                              : "↓"
                            : "↕"}
                        </span>
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort("categoryName")}
                        className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                      >
                        <span>Category</span>
                        <span className="text-xs">
                          {sortBy === "categoryName"
                            ? sortOrder === "asc"
                              ? "↑"
                              : "↓"
                            : "↕"}
                        </span>
                      </button>
                    </th>
                    <th className="px-6 py-4 text-center">
                      <span className="font-semibold text-[#78B3CE]">
                        Action
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedProducts.map((product, index) => (
                    <tr
                      key={product.productID}
                      className={`hover:bg-[#FBF8EF] transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <img
                          src={product.imageURL}
                          alt={product.productName}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {product.productName}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <p
                            className="text-gray-900 truncate"
                            title={product.briDesc}
                          >
                            {product.briDesc}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-[#F96E2A]">
                          {formatPrice(product.price)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#C9E6F0] text-[#78B3CE]">
                          {product.categoryName}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleViewProduct(product)}
                            className="p-2 text-[#78B3CE] hover:bg-[#C9E6F0] rounded-lg transition-colors"
                            title="View Details"
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-2 text-[#F96E2A] hover:bg-orange-100 rounded-lg transition-colors"
                            title="Edit"
                            disabled={productLoading}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteProduct(product.productID)
                            }
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                            disabled={productLoading}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredAndSortedProducts.length === 0 && !productLoading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try changing your search keywords or filters
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredAndSortedProducts.length > 0 && (
          <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-4">
            <div className="text-sm text-gray-700">
              Page {currentPage} / {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPage === i + 1
                      ? "bg-[#F96E2A] text-white"
                      : "bg-white text-gray-500 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Category Management Modal */}
      <AddCategoryModal
        show={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        categoryFormData={categoryFormData}
        categoryLoading={categoryLoading}
        handleCategoryInputChange={handleCategoryInputChange}
        handleAddCategory={handleAddCategory}
        categories={categories}
        products={products}
        handleDeleteCategory={handleDeleteCategory}
      />

      {/* Add Product Modal */}
      <AddProductModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddProduct={handleAddProduct}
        productLoading={productLoading}
        categories={categories}
      />

      <EditProductModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        handleUpdateProduct={handleUpdateProduct}
        productLoading={productLoading}
        categories={categories}
      />

      <ViewProductModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        formData={formData}
        categories={categories}
      />
    </AdminLayout>
  );
};

export default ProductComponent;
