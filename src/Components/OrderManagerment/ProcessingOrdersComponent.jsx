import { useState } from "react";
import AdminLayout from "../../Page/Admin/AdminLayout";

const ProcessingOrdersComponent = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD004",
      customerName: "Phạm Thị Dung",
      customerEmail: "phamthidung@email.com",
      customerPhone: "0741258963",
      orderDate: "2024-01-14T09:15:00",
      processDate: "2024-01-14T10:30:00",
      totalAmount: 25980000,
      items: [
        { productName: "Samsung Galaxy S24", quantity: 1, price: 22990000 },
        { productName: "Ốp lưng Samsung", quantity: 1, price: 299000 },
      ],
      shippingAddress: "321 Cách Mạng Tháng 8, Quận 10, TP.HCM",
      status: "processing",
      estimatedDelivery: "2024-01-17T17:00:00",
    },
    {
      id: "ORD005",
      customerName: "Hoàng Văn Em",
      customerEmail: "hoangvanem@email.com",
      customerPhone: "0258147369",
      orderDate: "2024-01-13T16:20:00",
      processDate: "2024-01-14T08:45:00",
      totalAmount: 9990000,
      items: [
        { productName: "Apple Watch Series 9", quantity: 1, price: 9990000 },
      ],
      shippingAddress: "654 Nguyễn Thị Minh Khai, Quận 1, TP.HCM",
      status: "processing",
      estimatedDelivery: "2024-01-16T15:00:00",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("processDate");
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

      if (sortBy === "totalAmount") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortBy === "processDate" || sortBy === "estimatedDelivery") {
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

  const handleCompleteOrder = (orderId) => {
    if (window.confirm("Bạn có chắc chắn đơn hàng này đã hoàn thành?")) {
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      alert("Đơn hàng đã được chuyển sang trạng thái hoàn thành!");
    }
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      alert("Đơn hàng đã được hủy!");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#78B3CE] mb-2">
                Đơn hàng đang xử lý
              </h1>
              <p className="text-gray-600">
                Quản lý các đơn hàng đang được xử lý và chuẩn bị giao
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
              <option value="processDate-desc">Xử lý mới nhất</option>
              <option value="processDate-asc">Xử lý cũ nhất</option>
              <option value="estimatedDelivery-asc">Giao sớm nhất</option>
              <option value="estimatedDelivery-desc">Giao muộn nhất</option>
              <option value="totalAmount-desc">Giá trị cao nhất</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Đang xử lý</p>
                <p className="text-2xl font-bold text-blue-600">
                  {orders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                ⏳
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tổng giá trị</p>
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
              Danh sách đơn hàng đang xử lý ({filteredAndSortedOrders.length})
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
                      onClick={() => handleSort("processDate")}
                      className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                    >
                      <span>Ngày xử lý</span>
                      <span className="text-xs">
                        {sortBy === "processDate"
                          ? sortOrder === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("estimatedDelivery")}
                      className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                    >
                      <span>Dự kiến giao</span>
                      <span className="text-xs">
                        {sortBy === "estimatedDelivery"
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
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          ⏳ Đang xử lý
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
                        {formatDateTime(order.processDate)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">
                        {formatDateTime(order.estimatedDelivery)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-[#F96E2A]">
                        {formatPrice(order.totalAmount)}
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
                          onClick={() => handleCompleteOrder(order.id)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Hoàn thành đơn hàng"
                        >
                          ✅
                        </button>
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Hủy đơn hàng"
                        >
                          ❌
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
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không có đơn hàng đang xử lý
              </h3>
              <p className="text-gray-500">
                Chưa có đơn hàng nào đang được xử lý
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProcessingOrdersComponent;