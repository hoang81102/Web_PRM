import React from "react";

const ViewProductModal = ({ show, onClose, formData, categories }) => {
  if (!show) return null;

  const categoryName =
    categories.find((c) => c.categoryID === Number(formData.categoryID))
      ?.categoryName || "Không rõ";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#78B3CE]">
            Chi tiết sản phẩm
          </h3>
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
              <td className="font-semibold p-2 border">Tên sản phẩm</td>
              <td className="p-2 border">{formData.productName}</td>
            </tr>
            <tr className="odd:bg-gray-50 even:bg-white">
              <td className="font-semibold p-2 border">Mô tả ngắn</td>
              <td className="p-2 border">{formData.briDesc}</td>
            </tr>
            <tr className="odd:bg-gray-50 even:bg-white">
              <td className="font-semibold p-2 border">Mô tả chi tiết</td>
              <td className="p-2 border whitespace-pre-wrap">
                {formData.fullDesc}
              </td>
            </tr>
            <tr className="odd:bg-gray-50 even:bg-white">
              <td className="font-semibold p-2 border">Thông số kỹ thuật</td>
              <td className="p-2 border whitespace-pre-wrap">
                {formData.technic}
              </td>
            </tr>
            <tr className="odd:bg-gray-50 even:bg-white">
              <td className="font-semibold p-2 border">Giá (VNĐ)</td>
              <td className="p-2 border">
                {Number(formData.price).toLocaleString()} đ
              </td>
            </tr>
            <tr className="odd:bg-gray-50 even:bg-white">
              <td className="font-semibold p-2 border">Danh mục</td>
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
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
