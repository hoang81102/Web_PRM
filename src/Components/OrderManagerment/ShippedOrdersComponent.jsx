import { useState, useEffect } from "react";
import AdminLayout from "../../Page/Admin/AdminLayout";
import { getOrdersByStatus } from "../../API/orderApi";
import { toast } from "react-toastify";

const ShippedOrdersComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("orderDate");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrdersByStatus("Shipped");
        if (Array.isArray(data)) {
          setOrders(
            data.map((order) => ({
              id: `ORD${String(order.id).padStart(3, "0")}`,
              customerName: order.user.username,
              customerEmail: order.user.email,
              customerPhone: order.user.phoneNumber,
              customerAddress: order.user.address,
              paymentMethod: order.pmMethod,
              billAddress: order.bill,
              status: order.orderStatus,
              orderDate: order.orderDate,
            }))
          );
        }
      } catch (error) {
        toast.error("Không thể tải danh sách đơn hàng Shipped!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
      const aDate = new Date(a[sortBy]);
      const bDate = new Date(b[sortBy]);
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#78B3CE] mb-2">
                Đơn hàng Shipped
              </h1>
              <p className="text-gray-600">
                Quản lý danh sách đơn hàng trạng thái Shipped
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
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#78B3CE]">
              Danh sách đơn Shipped ({filteredAndSortedOrders.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">Đang tải dữ liệu...</div>
          ) : filteredAndSortedOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#C9E6F0]">
                  <tr>
                    <th className="px-6 py-4 text-left">Mã đơn</th>
                    <th className="px-6 py-4 text-left">Khách hàng</th>
                    <th className="px-6 py-4 text-left">Ngày đặt</th>
                    <th className="px-6 py-4 text-left">Phương thức</th>
                    <th className="px-6 py-4 text-left">Địa chỉ hóa đơn</th>
                    <th className="px-6 py-4 text-left">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAndSortedOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4">{order.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-xs text-gray-500">
                            {order.customerEmail}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.customerPhone}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.customerAddress}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {formatDateTime(order.orderDate)}
                      </td>
                      <td className="px-6 py-4">{order.paymentMethod}</td>
                      <td className="px-6 py-4">{order.billAddress}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block rounded-full px-3 py-1 text-xs bg-green-100 text-green-800">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không có đơn hàng Shipped
              </h3>
              <p className="text-gray-500">
                Chưa có đơn nào ở trạng thái Shipped.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ShippedOrdersComponent;
