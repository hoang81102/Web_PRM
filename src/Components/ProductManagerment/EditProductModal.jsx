import React from "react";

const EditProductModal = ({
  show,
  onClose,
  formData,
  productLoading,
  handleInputChange,
  handleUpdateProduct,
  categories,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#78B3CE]">Edit Product</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Edit Product Form */}
        <form onSubmit={handleUpdateProduct} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            />
          </div>

          {/* Short Description (briDesc) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Description
            </label>
            <textarea
              name="briDesc"
              value={formData.briDesc}
              onChange={handleInputChange}
              placeholder="Short description"
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            />
          </div>

          {/* Full Description (fullDesc) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Description
            </label>
            <textarea
              name="fullDesc"
              value={formData.fullDesc}
              onChange={handleInputChange}
              placeholder="Detailed product description"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            />
          </div>

          {/* Technical Specification (technic) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technical Specifications
            </label>
            <textarea
              name="technic"
              value={formData.technic}
              onChange={handleInputChange}
              placeholder="Technical details"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (USD)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price in USD"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
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

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="categoryID"
              value={formData.categoryID}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.categoryID} value={category.categoryID}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={productLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#F96E2A] text-white rounded-lg hover:bg-[#e55a1f] disabled:opacity-50"
              disabled={productLoading}
            >
              {productLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
