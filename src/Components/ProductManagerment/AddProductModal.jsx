import React from "react";

const AddProductModal = ({
  show,
  onClose,
  formData,
  productLoading,
  handleInputChange,
  handleAddProduct,
  categories,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#78B3CE]">
            Thêm sản phẩm mới
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Add Product Form */}
        <form onSubmit={handleAddProduct} className="space-y-4">
          {/* Tên sản phẩm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="Nhập tên sản phẩm"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            />
          </div>

          {/* Mô tả ngắn (briDesc) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả ngắn
            </label>
            <textarea
              name="briDesc"
              value={formData.briDesc}
              onChange={handleInputChange}
              placeholder="Mô tả ngắn"
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            />
          </div>

          {/* Mô tả đầy đủ (fullDesc) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả chi tiết
            </label>
            <textarea
              name="fullDesc"
              value={formData.fullDesc}
              onChange={handleInputChange}
              placeholder="Mô tả chi tiết sản phẩm"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            />
          </div>

          {/* Thông số kỹ thuật (technic) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thông số kỹ thuật
            </label>
            <textarea
              name="technic"
              value={formData.technic}
              onChange={handleInputChange}
              placeholder="Thông số kỹ thuật"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            />
          </div>

          {/* Giá */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá (VNĐ)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Nhập giá"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            />
          </div>

          {/* URL hình ảnh */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL hình ảnh
            </label>
            <input
              type="url"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            />
          </div>

          {/* Danh mục */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Danh mục
            </label>
            <select
              name="categoryID"
              value={formData.categoryID}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.categoryID} value={category.categoryID}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#F96E2A] text-white rounded-lg hover:bg-[#e55a1f] transition-colors disabled:opacity-50"
            disabled={productLoading}
          >
            {productLoading ? "Đang thêm..." : "➕ Thêm sản phẩm"}
          </button>
        </form>

        <div className="pt-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            disabled={productLoading}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
