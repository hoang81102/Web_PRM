import { useState } from "react";
import AdminLayout from "../../Page/Admin/AdminLayout";

const CancelledOrdersComponent = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD008",
      customerName: "Trần Văn Hùng",
      customerEmail: "tranvanhung@email.com",
      customerPhone: "0987123456",
      orderDate: "2024-01-12T09:30:00",
      cancelledDate: "2024-01-12T15:45:00",
      totalAmount: 12990000,
      items: [{ productName: "iPad Air", quantity: 1, price: 12990000 }],
      shippingAddress: "123 Lê Lợi, Quận 1, TP.HCM",
      status: "cancelled",
      cancelReason: "Khách hàng thay đổi ý định",
      cancelledBy: "customer",
    },
    {
      id: "ORD009",
      customerName: "Lê Thị Mai",
      customerEmail: "lethimai@email.com",
      customerPhone: "0912987654",
      orderDate: "2024-01-11T16:20:00",
      cancelledDate: "2024-01-12T10:15:00",
      totalAmount: 8990000,
      items: [{ productName: "Sony WH-1000XM5", quantity: 1, price: 8990000 }],
      shippingAddress: "456 Nguyễn Huệ, Quận 1, TP.HCM",
      status: "cancelled",
      cancelReason: "Sản phẩm hết hàng",
      cancelledBy: "admin",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("cancelledDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterBy, setFilterBy] = useState("");

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
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm) ||
        order.cancelReason.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = filterBy === "" || order.cancelledBy === filterBy;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "totalAmount") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortBy === "cancelledDate" || sortBy === "orderDate") {
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

  const customerCancelledCount = orders.filter(
    (order) => order.cancelledBy === "customer"
  ).length;
  const adminCancelledCount = orders.filter(
    (order) => order.cancelledBy === "admin"
  ).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#78B3CE] mb-2">
                Đơn hàng đã hủy
              </h1>
              <p className="text-gray-600">Quản lý các đơn hàng đã bị hủy bỏ</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo mã đơn hàng, tên khách hàng, email, SĐT, lý do hủy..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border-2 border-[#C9E6F0] rounded-xl focus:border-[#78B3CE] outline-none transition-colors"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>

            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="p-3 border-2 border-[#C9E6F0] rounded-xl focus:border-[#78B3CE] outline-none bg-white min-w-[200px]"
            >
              <option value="">Tất cả</option>
              <option value="customer">Khách hàng hủy</option>
              <option value="admin">Admin hủy</option>
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
              <option value="cancelledDate-desc">Hủy mới nhất</option>
              <option value="cancelledDate-asc">Hủy cũ nhất</option>
              <option value="orderDate-desc">Đặt hàng mới nhất</option>
              <option value="totalAmount-desc">Giá trị cao nhất</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tổng đơn hủy</p>
                <p className="text-2xl font-bold text-red-600">
                  {orders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">
                ❌
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Khách hàng hủy</p>
                <p className="text-2xl font-bold text-orange-600">
                  {customerCancelledCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Admin hủy</p>
                <p className="text-2xl font-bold text-purple-600">
                  {adminCancelledCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                🛡️
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tổng giá trị mất</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatPrice(
                    orders.reduce((sum, order) => sum + order.totalAmount, 0)
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">
                💸
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#78B3CE]">
              Danh sách đơn hàng đã hủy ({filteredAndSortedOrders.length})
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
                      onClick={() => handleSort("cancelledDate")}
                      className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                    >
                      <span>Ngày hủy</span>
                      <span className="text-xs">
                        {sortBy === "cancelledDate"
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
                    <span className="font-semibold text-[#78B3CE]">
                      Lý do hủy
                    </span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-semibold text-[#78B3CE]">
                      Người hủy
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

                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          ❌ Đã hủy
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
                        {formatDateTime(order.cancelledDate)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-red-600">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p
                          className="text-gray-900 truncate"
                          title={order.cancelReason}
                        >
                          {order.cancelReason}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.cancelledBy === "customer"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {order.cancelledBy === "customer"
                          ? "👤 Khách hàng"
                          : "🛡️ Admin"}
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
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="In báo cáo"
                        >
                          📄
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
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không có đơn hàng đã hủy
              </h3>
              <p className="text-gray-500">
                Chưa có đơn hàng nào bị hủy hoặc thử thay đổi từ khóa tìm kiếm
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CancelledOrdersComponent;