import { useState } from "react";
import AdminLayout from "../../Page/Admin/AdminLayout";

const NewOrdersComponent = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customerName: "Nguyễn Văn An",
      customerEmail: "nguyenvanan@email.com",
      customerPhone: "0123456789",
      orderDate: "2024-01-15T10:30:00",
      totalAmount: 29990000,
      items: [
        { productName: "iPhone 15 Pro Max", quantity: 1, price: 29990000 },
      ],
      shippingAddress: "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
      status: "new",
    },
    {
      id: "ORD002",
      customerName: "Trần Thị Bình",
      customerEmail: "tranthibinh@email.com",
      customerPhone: "0987654321",
      orderDate: "2024-01-15T14:20:00",
      totalAmount: 51980000,
      items: [
        { productName: "MacBook Pro M3", quantity: 1, price: 45990000 },
        { productName: "AirPods Pro", quantity: 1, price: 5990000 },
      ],
      shippingAddress: "456 Lê Văn Việt, Quận 9, TP.HCM",
      status: "new",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("orderDate");
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
      } else if (sortBy === "orderDate") {
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

  const handleProcessOrder = (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn xử lý đơn hàng này?")) {
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      alert("Đơn hàng đã được chuyển sang trạng thái đang xử lý!");
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
                Đơn hàng mới
              </h1>
              <p className="text-gray-600">
                Quản lý các đơn hàng mới chờ xử lý
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
              <option value="orderDate-desc">Mới nhất</option>
              <option value="orderDate-asc">Cũ nhất</option>
              <option value="totalAmount-desc">Giá trị cao nhất</option>
              <option value="totalAmount-asc">Giá trị thấp nhất</option>
              <option value="customerName-asc">Tên khách hàng A-Z</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tổng đơn hàng mới</p>
                <p className="text-2xl font-bold text-[#F96E2A]">
                  {orders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                🆕
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
              Danh sách đơn hàng mới ({filteredAndSortedOrders.length})
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
                    <button
                      onClick={() => handleSort("customerName")}
                      className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                    >
                      <span>Khách hàng</span>
                      <span className="text-xs">
                        {sortBy === "customerName"
                          ? sortOrder === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("orderDate")}
                      className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                    >
                      <span>Ngày đặt</span>
                      <span className="text-xs">
                        {sortBy === "orderDate"
                          ? sortOrder === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("totalAmount")}
                      className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                    >
                      <span>Tổng tiền</span>
                      <span className="text-xs">
                        {sortBy === "totalAmount"
                          ? sortOrder === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-semibold text-[#78B3CE]">
                      Sản phẩm
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
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          🆕 Mới
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
                        {formatDateTime(order.orderDate)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-[#F96E2A]">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-sm text-gray-900">
                            {item.productName} x{item.quantity}
                          </p>
                        ))}
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
                          onClick={() => handleProcessOrder(order.id)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Xử lý đơn hàng"
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
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không có đơn hàng mới
              </h3>
              <p className="text-gray-500">
                Chưa có đơn hàng mới nào hoặc thử thay đổi từ khóa tìm kiếm
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewOrdersComponent;
