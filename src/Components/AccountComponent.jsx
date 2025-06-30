import { useState, useEffect } from "react";
import AdminLayout from "../Page/Admin/AdminLayout";
import { getAllUsers } from "../API/userApi";
import { toast } from "react-toastify";

const AccountComponent = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        const mappedUsers = data.map((user) => ({
          username: user.username || "",
          email: user.email || "",
          phone: user.phoneNumber || "",
          address: user.address || "",
          role: user.role || "User",
        }));
        setUsers(mappedUsers);
      } catch (error) {
        toast.error("Tải danh sách người dùng thất bại!");
      }
    };

    fetchUsers();
  }, []);

  const filteredAndSortedUsers = users
    .filter((user) =>
      [user.username, user.email, user.phone, user.address, user.role]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortBy]?.toString().toLowerCase() || "";
      const bVal = b[sortBy]?.toString().toLowerCase() || "";
      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
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
          <h1 className="text-3xl font-bold text-[#78B3CE] mb-2">
            Quản lý tài khoản người dùng
          </h1>
          <p className="text-gray-600 mb-4">
            Danh sách thông tin chi tiết của tất cả người dùng trong hệ thống
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm theo username, email, SĐT, địa chỉ, quyền..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border-2 border-[#C9E6F0] rounded-xl"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
              className="p-3 border-2 border-[#C9E6F0] rounded-xl bg-white"
            >
              <option value="username-asc">Username A-Z</option>
              <option value="username-desc">Username Z-A</option>
              <option value="email-asc">Email A-Z</option>
              <option value="email-desc">Email Z-A</option>
              <option value="phone-asc">SĐT tăng dần</option>
              <option value="phone-desc">SĐT giảm dần</option>
              <option value="role-asc">Quyền A-Z</option>
              <option value="role-desc">Quyền Z-A</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#78B3CE]">
              Danh sách người dùng ({filteredAndSortedUsers.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#C9E6F0]">
                <tr>
                  {["username", "email", "phone", "role"].map((field) => (
                    <th key={field} className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort(field)}
                        className="flex items-center space-x-1 font-semibold text-[#78B3CE] hover:text-[#F96E2A]"
                      >
                        <span>{field.toUpperCase()}</span>
                        <span className="text-xs">
                          {sortBy === field
                            ? sortOrder === "asc"
                              ? "↑"
                              : "↓"
                            : "↕"}
                        </span>
                      </button>
                    </th>
                  ))}
                  <th className="px-6 py-4 text-left text-[#78B3CE] font-semibold">
                    Địa chỉ
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
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.address}</td>
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
      </div>
    </AdminLayout>
  );
};

export default AccountComponent;
