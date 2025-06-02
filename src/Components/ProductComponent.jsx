import { useState } from "react";
import AdminLayout from "../Page/Admin/AdminLayout";

const ProductComponent = () => {
  // Dữ liệu mẫu cho categories
  const [categories, setCategories] = useState([
    { id: 1, name: "Điện thoại" },
    { id: 2, name: "Laptop" },
    { id: 3, name: "Tablet" },
    { id: 4, name: "Phụ kiện" },
    { id: 5, name: "Đồng hồ thông minh" },
  ]);

  // Dữ liệu mẫu cho sản phẩm với ảnh từ Unsplash
  const [products, setProducts] = useState([
    {
      id: 1,
      productName: "iPhone 15 Pro Max",
      briefDescription: "Điện thoại thông minh cao cấp với chip A17 Pro",
      price: 29990000,
      imageURL:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop&crop=center",
      categoryId: 1,
      categoryName: "Điện thoại",
    },
    {
      id: 2,
      productName: "MacBook Pro M3",
      briefDescription: "Laptop chuyên nghiệp với chip M3 mạnh mẽ",
      price: 45990000,
      imageURL:
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop&crop=center",
      categoryId: 2,
      categoryName: "Laptop",
    },
    {
      id: 3,
      productName: "iPad Air",
      briefDescription: "Máy tính bảng đa năng cho công việc và giải trí",
      price: 15990000,
      imageURL:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop&crop=center",
      categoryId: 3,
      categoryName: "Tablet",
    },
    {
      id: 4,
      productName: "AirPods Pro",
      briefDescription: "Tai nghe không dây với chống ồn chủ động",
      price: 5990000,
      imageURL:
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop&crop=center",
      categoryId: 4,
      categoryName: "Phụ kiện",
    },
    {
      id: 5,
      productName: "Apple Watch Series 9",
      briefDescription: "Đồng hồ thông minh với nhiều tính năng sức khỏe",
      price: 9990000,
      imageURL:
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop&crop=center",
      categoryId: 5,
      categoryName: "Đồng hồ thông minh",
    },
    {
      id: 6,
      productName: "Samsung Galaxy S24",
      briefDescription: "Smartphone Android flagship với camera AI",
      price: 22990000,
      imageURL:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&crop=center",
      categoryId: 1,
      categoryName: "Điện thoại",
    },
    {
      id: 7,
      productName: "Dell XPS 13",
      briefDescription: "Laptop ultrabook mỏng nhẹ cho doanh nhân",
      price: 35990000,
      imageURL:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop&crop=center",
      categoryId: 2,
      categoryName: "Laptop",
    },
    {
      id: 8,
      productName: "Sony WH-1000XM5",
      briefDescription:
        "Tai nghe chống ồn cao cấp với chất lượng âm thanh tuyệt vời",
      price: 8990000,
      imageURL:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
      categoryId: 4,
      categoryName: "Phụ kiện",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("productName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Form state cho thêm/sửa sản phẩm
  const [formData, setFormData] = useState({
    productName: "",
    briefDescription: "",
    price: "",
    imageURL: "",
    categoryId: "",
  });

  // Form state cho thêm danh mục
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
  });

  // Hàm format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Hàm tìm kiếm và sắp xếp
  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesSearch =
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.briefDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        filterCategory === "" ||
        product.categoryId.toString() === filterCategory;
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
  const handleAddCategory = (e) => {
    e.preventDefault();
    const newCategory = {
      id: Date.now(),
      name: categoryFormData.name,
    };

    setCategories((prev) => [...prev, newCategory]);
    setCategoryFormData({ name: "" });
    setShowCategoryModal(false);
  };

  // Xóa danh mục
  const handleDeleteCategory = (categoryId) => {
    const hasProducts = products.some(
      (product) => product.categoryId === categoryId
    );

    if (hasProducts) {
      alert("Không thể xóa danh mục này vì còn sản phẩm thuộc danh mục!");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    }
  };

  // Thêm sản phẩm mới
  const handleAddProduct = (e) => {
    e.preventDefault();
    const category = categories.find(
      (cat) => cat.id.toString() === formData.categoryId
    );
    const newProduct = {
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
      categoryId: Number(formData.categoryId),
      categoryName: category?.name || "",
    };

    setProducts((prev) => [...prev, newProduct]);
    setFormData({
      productName: "",
      briefDescription: "",
      price: "",
      imageURL: "",
      categoryId: "",
    });
    setShowAddModal(false);
  };

  // Sửa sản phẩm
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      productName: product.productName,
      briefDescription: product.briefDescription,
      price: product.price.toString(),
      imageURL: product.imageURL,
      categoryId: product.categoryId.toString(),
    });
    setShowEditModal(true);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const category = categories.find(
      (cat) => cat.id.toString() === formData.categoryId
    );
    const updatedProduct = {
      ...selectedProduct,
      ...formData,
      price: Number(formData.price),
      categoryId: Number(formData.categoryId),
      categoryName: category?.name || "",
    };

    setProducts((prev) =>
      prev.map((p) => (p.id === selectedProduct.id ? updatedProduct : p))
    );
    setShowEditModal(false);
    setSelectedProduct(null);
    setFormData({
      productName: "",
      briefDescription: "",
      price: "",
      imageURL: "",
      categoryId: "",
    });
  };

  // Xóa sản phẩm
  const handleDeleteProduct = (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  // Hàm tạo URL ảnh ngẫu nhiên cho sản phẩm mới
  const generateRandomImageURL = () => {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    return `https://picsum.photos/300/300?random=${randomId}`;
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#78B3CE] mb-2">
                Quản lý sản phẩm
              </h1>
              <p className="text-gray-600">
                Quản lý toàn bộ sản phẩm trong hệ thống
              </p>
            </div>

            {/* Category Management Button */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCategoryModal(true)}
                className="bg-[#78B3CE] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5a8ba3] transition-colors shadow-lg"
              >
                📂 Quản lý danh mục
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên sản phẩm, mô tả, danh mục..."
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
              <option value="">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
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
              <option value="productName-asc">Tên A-Z</option>
              <option value="productName-desc">Tên Z-A</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="categoryName-asc">Danh mục A-Z</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tổng sản phẩm</p>
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
                <p className="text-gray-500 text-sm">Kết quả tìm kiếm</p>
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
                <p className="text-gray-500 text-sm">Danh mục</p>
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
              Danh sách sản phẩm ({filteredAndSortedProducts.length})
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#F96E2A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#e55a1f] transition-colors shadow-lg"
            >
              ➕ Thêm sản phẩm mới
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#C9E6F0]">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <span className="font-semibold text-[#78B3CE]">
                      Hình ảnh
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
                    <span className="font-semibold text-[#78B3CE]">Mô tả</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("price")}
                      className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                    >
                      <span>Giá</span>
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
                      <span>Danh mục</span>
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
                      Thao tác
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`hover:bg-[#FBF8EF] transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <img
                        src={product.imageURL}
                        alt={product.productName}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        onError={(e) => {
                          e.target.src = `https://picsum.photos/64/64?random=${product.id}`;
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {product.productName}
                        </p>
                        <p className="text-sm text-gray-500">
                          ID: {product.id}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p
                          className="text-gray-900 truncate"
                          title={product.briefDescription}
                        >
                          {product.briefDescription}
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
                          className="p-2 text-[#78B3CE] hover:bg-[#C9E6F0] rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-2 text-[#F96E2A] hover:bg-orange-100 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Xóa"
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

          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy sản phẩm
              </h3>
              <p className="text-gray-500">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredAndSortedProducts.length > 0 && (
          <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-4">
            <div className="text-sm text-gray-700">
              Hiển thị{" "}
              <span className="font-medium">
                {filteredAndSortedProducts.length}
              </span>{" "}
              sản phẩm
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                Trước
              </button>
              <button className="px-3 py-2 text-sm font-medium text-white bg-[#F96E2A] border border-transparent rounded-lg hover:bg-[#e55a1f]">
                1
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Category Management Modal */}
      <Modal
        show={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        title="Quản lý danh mục"
      >
        <div className="space-y-6">
          {/* Add Category Form */}
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên danh mục mới
              </label>
              <input
                type="text"
                name="name"
                value={categoryFormData.name}
                onChange={handleCategoryInputChange}
                placeholder="Nhập tên danh mục"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#78B3CE] text-white rounded-lg hover:bg-[#5a8ba3] transition-colors"
            >
              ➕ Thêm danh mục
            </button>
          </form>

          {/* Categories List */}
          <div>
            <h4 className="text-lg font-semibold text-[#78B3CE] mb-3">
              Danh sách danh mục ({categories.length})
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {categories.map((category) => {
                const productCount = products.filter(
                  (p) => p.categoryId === category.id
                ).length;
                return (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium text-gray-900">
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({productCount} sản phẩm)
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                      title="Xóa danh mục"
                      disabled={productCount > 0}
                    >
                      🗑️
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setShowCategoryModal(false)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Đóng
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Product Modal */}
      <Modal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Thêm sản phẩm mới"
      >
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả ngắn
            </label>
            <textarea
              name="briefDescription"
              value={formData.briefDescription}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả chi tiết
            </label>
            <textarea
              name="briefDescription"
              value={formData.briefDescription}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá (VNĐ)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL hình ảnh
            </label>
            <div className="space-y-2">
              <input
                type="url"
                name="imageURL"
                value={formData.imageURL}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    imageURL: generateRandomImageURL(),
                  }))
                }
                className="text-sm text-[#F96E2A] hover:text-[#e55a1f] underline"
              >
                Tạo ảnh ngẫu nhiên
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Danh mục
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#F96E2A] text-white rounded-lg hover:bg-[#e55a1f]"
            >
              Thêm sản phẩm
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Chỉnh sửa sản phẩm"
      >
        <form onSubmit={handleUpdateProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả ngắn
            </label>
            <textarea
              name="briefDescription"
              value={formData.briefDescription}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá (VNĐ)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL hình ảnh
            </label>
            <div className="space-y-2">
              <input
                type="url"
                name="imageURL"
                value={formData.imageURL}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    imageURL: generateRandomImageURL(),
                  }))
                }
                className="text-sm text-[#F96E2A] hover:text-[#e55a1f] underline"
              >
                Tạo ảnh ngẫu nhiên
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Danh mục
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#F96E2A] text-white rounded-lg hover:bg-[#e55a1f]"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default ProductComponent;
