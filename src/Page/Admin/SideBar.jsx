import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "users",
      title: "User Management",
      icon: "👥",
      path: "/admin/users",
      hasDropdown: false,
    },
    {
      id: "products",
      title: "Product Management",
      icon: "📦",
      path: "/admin/products",
      hasDropdown: false,
    },
    {
      id: "orders",
      title: "Order Management",
      icon: "🛒",
      path: "/admin/orders",
      hasDropdown: true,
      subItems: [
        { title: "New Orders", path: "/admin/orders/new" },
        { title: "Processing", path: "/admin/orders/delivered" },
        { title: "Completed", path: "/admin/orders/shipped" },
        { title: "Cancelled", path: "/admin/orders/cancelled" },
      ],
    },
  ];

  const handleDropdownToggle = (itemId) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const isActiveRoute = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      // Clear authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // Show toast notification
      toast.success("Successfully logged out");

      // Redirect to login page
      navigate("/");
    }
  };

  return (
    <div
      className={`bg-[#FBF8EF] h-screen shadow-2xl transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="p-6 border-b border-[#C9E6F0]">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#78B3CE] rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <h2 className="text-[#78B3CE] font-bold text-lg">
                  Admin Portal
                </h2>
                <p className="text-gray-500 text-xs">Management System</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg bg-[#C9E6F0] text-[#78B3CE] hover:bg-[#78B3CE] hover:text-white transition-colors duration-200"
          >
            {isCollapsed ? "→" : "←"}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <div>
                {item.hasDropdown ? (
                  <button
                    onClick={() => handleDropdownToggle(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                      isActiveRoute(item.path)
                        ? "bg-[#F96E2A] text-white shadow-lg"
                        : "text-[#78B3CE] hover:bg-[#C9E6F0]"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{item.icon}</span>
                      {!isCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <span
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.id ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    )}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                      isActiveRoute(item.path)
                        ? "bg-[#F96E2A] text-white shadow-lg"
                        : "text-[#78B3CE] hover:bg-[#C9E6F0]"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {!isCollapsed && (
                      <span className="font-medium">{item.title}</span>
                    )}
                  </Link>
                )}
              </div>

              {/* Dropdown Menu */}
              {item.hasDropdown &&
                activeDropdown === item.id &&
                !isCollapsed && (
                  <ul className="mt-2 ml-6 space-y-1">
                    {item.subItems.map((subItem, index) => (
                      <li key={index}>
                        <Link
                          to={subItem.path}
                          className={`block p-2 pl-4 rounded-lg text-sm transition-colors duration-200 ${
                            isActiveRoute(subItem.path)
                              ? "bg-[#F96E2A] text-white"
                              : "text-gray-600 hover:bg-[#C9E6F0] hover:text-[#78B3CE]"
                          }`}
                        >
                          • {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer - Logout */}
      <div className="p-4 border-t border-[#C9E6F0] flex justify-center">
        <button
          onClick={handleLogout}
          className={`flex items-center justify-center p-3 bg-red-400 hover:bg-red-500 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg ${
            isCollapsed ? "w-12 h-12" : "space-x-2 px-6"
          }`}
          title="Logout"
        >
          <span className="text-lg">🚪</span>
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
