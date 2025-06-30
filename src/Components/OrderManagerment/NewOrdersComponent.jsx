import { useEffect, useState } from "react";
import AdminLayout from "../../Page/Admin/AdminLayout";
import { getOrdersByStatus } from "../../API/orderApi";
import { toast } from "react-toastify";

const NewOrdersComponent = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("orderDate");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const orderList = await getOrdersByStatus("Pending"); // vì getOrdersByStatus đã return data.data
        if (orderList && Array.isArray(orderList)) {
          const mappedOrders = orderList.map((order) => ({
            id: order.id,
            customerName: order.user?.username || "Không rõ",
            customerEmail: order.user?.email || "Không rõ",
            customerPhone: order.user?.phoneNumber || "Không rõ",
            orderDate: order.orderDate,
            shippingAddress: order.bill || "Không rõ",
            status: order.orderStatus || "Pending",
            paymentMethod: order.pmMethod || "Không rõ",
            items: [], // chưa có API trả items nên để rỗng
          }));
          console.log("mappedOrders", mappedOrders);
          setOrders(mappedOrders);
        }
      } catch (error) {
        console.error(error);
        toast.error("Lỗi tải đơn hàng pending!");
      }
    };

    fetchPendingOrders();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN");
  };

  const filteredAndSortedOrders = orders
    .filter(
      (order) =>
        order.id?.toString().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm)
    )
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "orderDate") {
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
      toast.success("Đơn hàng đã được chuyển sang trạng thái đang xử lý!");
    }
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      toast.success("Đơn hàng đã được hủy!");
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

          {/* Search and Sort */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo mã, tên, email, SĐT..."
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
              <option value="customerName-asc">Tên khách hàng A-Z</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <th className="px-6 py-4 text-left">Mã đơn hàng</th>
                  <th className="px-6 py-4 text-left">Khách hàng</th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("orderDate")}
                      className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A]"
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
                    Phương thức thanh toán
                  </th>
                  <th className="px-6 py-4 text-left">Địa chỉ giao</th>
                  <th className="px-6 py-4 text-center">Thao tác</th>
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
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.id}
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
                    <td className="px-6 py-4 text-gray-900">
                      {formatDateTime(order.orderDate)}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {order.paymentMethod}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {order.shippingAddress}
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button
                        className="p-2 text-[#78B3CE] hover:bg-[#C9E6F0] rounded transition-colors"
                        title="Xem chi tiết"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => handleProcessOrder(order.id)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
                        title="Xử lý"
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                        title="Hủy"
                      >
                        ❌
                      </button>
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
                Không có đơn hàng
              </h3>
              <p className="text-gray-500">
                Chưa có đơn hàng pending nào hoặc thử thay đổi từ khóa tìm kiếm
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewOrdersComponent;
