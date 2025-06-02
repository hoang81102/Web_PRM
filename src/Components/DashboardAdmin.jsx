import React from "react";
import AdminLayout from "../Page/Admin/AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-[#78B3CE] mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Chào mừng bạn đến với hệ thống quản trị
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tổng người dùng</p>
                <p className="text-2xl font-bold text-[#78B3CE]">1,234</p>
              </div>
              <div className="w-12 h-12 bg-[#C9E6F0] rounded-full flex items-center justify-center text-2xl">
                👥
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Đơn hàng hôm nay</p>
                <p className="text-2xl font-bold text-[#F96E2A]">56</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                🛒
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Doanh thu tháng</p>
                <p className="text-2xl font-bold text-green-600">₫125M</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                💰
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Sản phẩm</p>
                <p className="text-2xl font-bold text-purple-600">789</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                📦
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#78B3CE] mb-4">
            Hoạt động gần đây
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-[#C9E6F0] rounded-lg">
              <div className="w-10 h-10 bg-[#F96E2A] rounded-full flex items-center justify-center text-white">
                🛒
              </div>
              <div>
                <p className="font-medium">Đơn hàng mới #12345</p>
                <p className="text-sm text-gray-600">2 phút trước</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-[#C9E6F0] rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                👤
              </div>
              <div>
                <p className="font-medium">Người dùng mới đăng ký</p>
                <p className="text-sm text-gray-600">5 phút trước</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
