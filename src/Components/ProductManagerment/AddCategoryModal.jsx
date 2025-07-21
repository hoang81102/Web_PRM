import React from "react";

const AddCategoryModal = ({
  show,
  onClose,
  categoryFormData,
  categoryLoading,
  handleCategoryInputChange,
  handleAddCategory,
  categories,
  products,
  handleDeleteCategory,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#78B3CE]">
            Category Management
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Add Category Form */}
        <form onSubmit={handleAddCategory} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Category Name
            </label>
            <input
              type="text"
              name="name"
              value={categoryFormData.name}
              onChange={handleCategoryInputChange}
              placeholder="Enter category name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#78B3CE] outline-none"
              required
              disabled={categoryLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#78B3CE] text-white rounded-lg hover:bg-[#5a8ba3] transition-colors disabled:opacity-50"
            disabled={categoryLoading}
          >
            {categoryLoading ? "Adding..." : "➕ Add Category"}
          </button>
        </form>

        {/* Categories List */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-[#78B3CE] mb-3">
            Category List ({categories.length})
          </h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {categories.map((category) => {
              const productCount = products.filter(
                (p) => p.categoryID === category.categoryID
              ).length;

              return (
                <div
                  key={category.categoryID}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-gray-900">
                      {category.categoryName}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({productCount} products)
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(category.categoryID)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors disabled:opacity-50"
                    title="Delete category"
                    disabled={productCount > 0 || categoryLoading}
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
            onClick={onClose}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
