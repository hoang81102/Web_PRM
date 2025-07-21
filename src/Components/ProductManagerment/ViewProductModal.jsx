import React from "react";

const ViewProductModal = ({ show, onClose, formData, categories }) => {
  if (!show) return null;

  const categoryName =
    categories.find((c) => c.categoryID === Number(formData.categoryID))
      ?.categoryName || "Unknown";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#78B3CE]">Product Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Product Image */}
        <div className="mb-4">
          <img
            src={formData.imageURL}
            alt="Product"
            className="w-full rounded-lg border border-gray-300"
          />
        </div>

        {/* Statistics Table */}
        <table className="w-full text-sm border border-gray-300 rounded overflow-hidden">
          <tbody>
            <tr className="odd:bg-gray-50 even:bg-white">
              <td className="font-semibold p-2 border">Product Name</td>
              <td className="p-2 border">{formData.productName}</td>
            </tr>
            <tr className="odd:bg-gray-50 even:bg-white">
              <td className="font-semibold p-2 border">Short Description</td>
              <td className="p-2 border">{formData.briDesc}</td>
            </tr>
            <tr className="odd:bg-gray-50 even:bg-white">
              <td className="font-semibold p-2 border">Full Description</td>
              <td className="p-2 border whitespace-pre-wrap">
                {formData.fullDesc}
              </td>
            </tr>
            <tr className="odd:bg-gray-50 even:bg-white">
              <td className="font-semibold p-2 border">Technical Specs</td>
              <td className="p-2 border whitespace-pre-wrap">
                {formData.technic}
              </td>
            </tr>
            <tr className="odd:bg-gray-50 even:bg-white">
              <td className="font-semibold p-2 border">Price (VND)</td>
              <td className="p-2 border">
                {Number(formData.price).toLocaleString()} đ
              </td>
            </tr>
            <tr className="odd:bg-gray-50 even:bg-white">
              <td className="font-semibold p-2 border">Category</td>
              <td className="p-2 border">{categoryName}</td>
            </tr>
          </tbody>
        </table>

        {/* Close button */}
        <div className="pt-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
