import { useState } from "react";
import AdminLayout from "../../Page/Admin/AdminLayout";

const CompletedOrdersComponent = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD006",
      customerName: "Vũ Thị Phương",
      customerEmail: "vuthiphuong@email.com",
      customerPhone: "0159753486",
      orderDate: "2024-01-10T14:30:00",
      processDate: "2024-01-10T15:45:00",
      completedDate: "2024-01-13T16:20:00",
      totalAmount: 35990000,
      items: [{ productName: "Dell XPS 13", quantity: 1, price: 35990000 }],
      shippingAddress: "987 Phan Văn Trị, Gò Vấp, TP.HCM",
      status: "completed",
      rating: 5,
      feedback: "Sản phẩm tuyệt vời, giao hàng nhanh!",
    },
    {
      id: "ORD007",
      customerName: "Nguyễn Minh Tuấn",
      customerEmail: "nguyenminhtuan@email.com",
      customerPhone: "0912345678",
      orderDate: "2024-01-08T10:15:00",
      processDate: "2024-01-08T11:30:00",
      completedDate: "2024-01-11T14:45:00",
      totalAmount: 14980000,
      items: [
        { productName: "Sony WH-1000XM5", quantity: 1, price: 8990000 },
        { productName: "iPad Air", quantity: 1, price: 5990000 },
      ],
      shippingAddress: "456 Điện Biên Phủ, Quận 3, TP.HCM",
      status: "completed",
      rating: 4,
      feedback: "Chất lượng tốt, đóng gói cẩn thận",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("completedDate");
  const [sortOrder, setSortOrder] = useState("desc");

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN");
  };

  const renderStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

  const filteredAndSortedOrders = orders
    .filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm)
    )
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "totalAmount" || sortBy === "rating") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortBy === "completedDate" || sortBy === "orderDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
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

  const averageRating =
    orders.reduce((sum, order) => sum + order.rating, 0) / orders.length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#78B3CE] mb-2">
                Đơn hàng đã hoàn thành
              </h1>
              <p className="text-gray-600">
                Quản lý các đơn hàng đã giao thành công
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo mã đơn hàng, tên khách hàng, email, SĐT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border-2 border-[#C9E6F0] rounded-xl focus:border-[#78B3CE] outline-none transition-colors"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortBy(field);
                setSortOrder(order);
              }}
              className="p-3 border-2 border-[#C9E6F0] rounded-xl focus:border-[#78B3CE] outline-none bg-white min-w-[200px]"
            >
              <option value="completedDate-desc">Hoàn thành mới nhất</option>
              <option value="completedDate-asc">Hoàn thành cũ nhất</option>
              <option value="rating-desc">Đánh giá cao nhất</option>
              <option value="rating-asc">Đánh giá thấp nhất</option>
              <option value="totalAmount-desc">Giá trị cao nhất</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Đã hoàn thành</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                ✅
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tổng doanh thu</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatPrice(
                    orders.reduce((sum, order) => sum + order.totalAmount, 0)
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                💰
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Đánh giá trung bình</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {averageRating.toFixed(1)} ⭐
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                ⭐
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Kết quả tìm kiếm</p>
                <p className="text-2xl font-bold text-[#78B3CE]">
                  {filteredAndSortedOrders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#C9E6F0] rounded-full flex items-center justify-center text-2xl">
                🔍
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#78B3CE]">
              Danh sách đơn hàng đã hoàn thành ({filteredAndSortedOrders.length}
              )
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#C9E6F0]">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <span className="font-semibold text-[#78B3CE]">
                      Mã đơn hàng
                    </span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-semibold text-[#78B3CE]">
                      Khách hàng
                    </span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("completedDate")}
                      className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                    >
                      <span>Ngày hoàn thành</span>
                      <span className="text-xs">
                        {sortBy === "completedDate"
                          ? sortOrder === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-semibold text-[#78B3CE]">
                      Tổng tiền
                    </span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("rating")}
                      className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                    >
                      <span>Đánh giá</span>
                      <span className="text-xs">
                        {sortBy === "rating"
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
                {filteredAndSortedOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`hover:bg-[#FBF8EF] transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✅ Hoàn thành
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.customerName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.customerEmail}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.customerPhone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">
                        {formatDateTime(order.completedDate)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-green-600">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-yellow-600">
                          {renderStars(order.rating)}
                        </p>
                        {order.feedback && (
                          <p
                            className="text-sm text-gray-500 mt-1 max-w-xs truncate"
                            title={order.feedback}
                          >
                            "{order.feedback}"
                          </p>
                        )}
                      </div>
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
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="In hóa đơn"
                        >
                          🖨️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không có đơn hàng đã hoàn thành
              </h3>
              <p className="text-gray-500">
                Chưa có đơn hàng nào được hoàn thành
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CompletedOrdersComponent;
