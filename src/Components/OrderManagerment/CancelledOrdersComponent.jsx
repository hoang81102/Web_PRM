import { useState, useEffect } from "react";
import AdminLayout from "../../Page/Admin/AdminLayout";
import { getOrdersByStatus } from "../../API/orderApi";

const CancelledOrdersComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("orderDate");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrdersByStatus("cancelled");
        if (Array.isArray(data)) {
          setOrders(
            data.map((order) => ({
              id: `ORD${String(order.id).padStart(3, "0")}`,
              customerName: order.user.username,
              customerEmail: order.user.email,
              customerPhone: order.user.phoneNumber,
              orderDate: order.orderDate,
              paymentMethod: order.pmMethod,
              billAddress: order.bill,
              status: order.orderStatus,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to load cancelled orders:", error);
        // Removed toast.error here
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US");
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-red-600 mb-2">
                Cancelled Orders
              </h1>
              <p className="text-gray-600">
                Manage orders that have been cancelled or rejected.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by Order ID, Customer Name, Email, Phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border-2 border-red-200 rounded-xl focus:border-red-500 outline-none transition-colors"
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
              className="p-3 border-2 border-red-200 rounded-xl focus:border-red-500 outline-none bg-white min-w-[200px]"
            >
              <option value="orderDate-desc">Newest Cancelled</option>
              <option value="orderDate-asc">Oldest Cancelled</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-red-600">
              Cancelled Orders List ({filteredAndSortedOrders.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading data...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-red-100">
                  <tr>
                    <th className="px-6 py-4 text-left">Order ID</th>
                    <th className="px-6 py-4 text-left">Customer</th>
                    <th className="px-6 py-4 text-left">Cancelled Date</th>
                    <th className="px-6 py-4 text-left">Payment Method</th>
                    <th className="px-6 py-4 text-left">Billing Address</th>
                    <th className="px-6 py-4 text-left">Status</th>
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
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {formatDateTime(order.orderDate)}
                      </td>
                      <td className="px-6 py-4">{order.paymentMethod}</td>
                      <td className="px-6 py-4">{order.billAddress}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block rounded-full px-3 py-1 text-xs bg-red-100 text-red-800">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filteredAndSortedOrders.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No cancelled orders
              </h3>
              <p className="text-gray-500">
                There are currently no orders that have been cancelled or
                rejected.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CancelledOrdersComponent;
