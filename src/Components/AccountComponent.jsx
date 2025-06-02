import { useState } from "react";
import AdminLayout from "../Page/Admin/AdminLayout";

const AccountComponent = () => {
  // Dữ liệu mẫu cho danh sách người dùng
  const [users, setUsers] = useState([
    {
      username: "nguyenvanan",
      email: "nguyenvanan@email.com",
      phone: "0123456789",
      address: "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
    },
    {
      username: "tranthibinh",
      email: "tranthibinh@email.com",
      phone: "0987654321",
      address: "456 Lê Văn Việt, Quận 9, TP.HCM",
    },
    {
      username: "lehoangcuong",
      email: "lehoangcuong@email.com",
      phone: "0369852147",
      address: "789 Võ Văn Tần, Quận 3, TP.HCM",
    },
    {
      username: "phamthidung",
      email: "phamthidung@email.com",
      phone: "0741258963",
      address: "321 Cách Mạng Tháng 8, Quận 10, TP.HCM",
    },
    {
      username: "hoangvanem",
      email: "hoangvanem@email.com",
      phone: "0258147369",
      address: "654 Nguyễn Thị Minh Khai, Quận 1, TP.HCM",
    },
    {
      username: "vuthiphuong",
      email: "vuthiphuong@email.com",
      phone: "0159753486",
      address: "987 Phan Văn Trị, Gò Vấp, TP.HCM",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");

  // Hàm tìm kiếm và sắp xếp
  const filteredAndSortedUsers = users
    .filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

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
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#78B3CE] mb-2">
                Quản lý tài khoản người dùng
              </h1>
              <p className="text-gray-600">
                Danh sách thông tin chi tiết của tất cả người dùng trong hệ
                thống
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo username, email, SĐT, địa chỉ..."
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
              <option value="username-asc">Username A-Z</option>
              <option value="username-desc">Username Z-A</option>
              <option value="email-asc">Email A-Z</option>
              <option value="email-desc">Email Z-A</option>
              <option value="phone-asc">SĐT tăng dần</option>
              <option value="phone-desc">SĐT giảm dần</option>
            </select>
          </div>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tổng người dùng</p>
                <p className="text-2xl font-bold text-[#78B3CE]">
                  {users.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#C9E6F0] rounded-full flex items-center justify-center text-2xl">
                👥
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Kết quả tìm kiếm</p>
                <p className="text-2xl font-bold text-[#F96E2A]">
                  {filteredAndSortedUsers.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                🔍
              </div>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#78B3CE]">
              Danh sách người dùng ({filteredAndSortedUsers.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#C9E6F0]">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("username")}
                      className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                    >
                      <span>Username</span>
                      <span className="text-xs">
                        {sortBy === "username"
                          ? sortOrder === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("email")}
                      className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                    >
                      <span>Email</span>
                      <span className="text-xs">
                        {sortBy === "email"
                          ? sortOrder === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("phone")}
                      className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A] transition-colors"
                    >
                      <span>Số điện thoại</span>
                      <span className="text-xs">
                        {sortBy === "phone"
                          ? sortOrder === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-semibold text-[#78B3CE]">
                      Địa chỉ
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
                {filteredAndSortedUsers.map((user, index) => (
                  <tr
                    key={user.email}
                    className={`hover:bg-[#FBF8EF] transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#78B3CE] rounded-full flex items-center justify-center text-white font-bold">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.username}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`mailto:${user.email}`}
                        className="text-[#F96E2A] hover:text-[#e55a1f] transition-colors"
                      >
                        {user.email}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`tel:${user.phone}`}
                        className="text-gray-900 hover:text-[#78B3CE] transition-colors"
                      >
                        {user.phone}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p
                          className="text-gray-900 truncate"
                          title={user.address}
                        >
                          {user.address}
                        </p>
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
                          className="p-2 text-[#F96E2A] hover:bg-orange-100 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          ✏️
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy người dùng
              </h3>
              <p className="text-gray-500">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredAndSortedUsers.length > 0 && (
          <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-4">
            <div className="text-sm text-gray-700">
              Hiển thị{" "}
              <span className="font-medium">
                {filteredAndSortedUsers.length}
              </span>{" "}
              người dùng
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                Trước
              </button>
              <button className="px-3 py-2 text-sm font-medium text-white bg-[#F96E2A] border border-transparent rounded-lg hover:bg-[#e55a1f]">
                1
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AccountComponent;
