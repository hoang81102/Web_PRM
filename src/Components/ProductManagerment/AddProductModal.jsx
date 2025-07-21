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

  const formatUSD = (value) => {
    if (isNaN(value)) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#78B3CE]">Add New Product</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Add Product Form */}
        <form onSubmit={handleAddProduct} className="space-y-4">
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

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Description
            </label>
            <textarea
              name="briDesc"
              value={formData.briDesc}
              onChange={handleInputChange}
              placeholder="Enter short description"
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Description
            </label>
            <textarea
              name="fullDesc"
              value={formData.fullDesc}
              onChange={handleInputChange}
              placeholder="Enter full description"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            />
          </div>

          {/* Technical Specifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technical Specifications
            </label>
            <textarea
              name="technic"
              value={formData.technic}
              onChange={handleInputChange}
              placeholder="Enter technical specifications"
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
              placeholder="Enter price"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={productLoading}
            />
            <p className="text-sm text-gray-500 mt-1">
              {formatUSD(formData.price)}
            </p>
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

          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#F96E2A] text-white rounded-lg hover:bg-[#e55a1f] transition-colors disabled:opacity-50"
            disabled={productLoading}
          >
            {productLoading ? "Adding..." : "➕ Add Product"}
          </button>
        </form>

        <div className="pt-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            disabled={productLoading}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
