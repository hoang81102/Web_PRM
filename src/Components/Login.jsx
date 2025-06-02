import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleLogin = (event) => {
    event.preventDefault();
    if (email === "admin@example.com" && password === "admin") {
      alert("Admin logged in successfully");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials for admin");
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot password functionality will be implemented");
  };

  return (
    <div
      className=" min-h-screen bg-[#78B3CE] flex items-center justify-center p-5 font-sans"
      style={{
        minHeight: "100vh",
        backgroundColor: "#78B3CE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="bg-[#FBF8EF] p-10 rounded-3xl shadow-2xl w-full max-w-md text-center"
        style={{
          backgroundColor: "#FBF8EF",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        {/* Logo/Header Section */}
        <div className="mb-8">
          <div
            className="w-20 h-20 bg-[#78B3CE] rounded-full mx-auto mb-5 flex items-center justify-center text-3xl text-[#FBF8EF] font-bold"
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#78B3CE",
              borderRadius: "50%",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              color: "#FBF8EF",
              fontWeight: "bold",
            }}
          >
            A
          </div>
          <h1
            className="text-[#78B3CE] text-3xl font-bold mb-3"
            style={{
              color: "#78B3CE",
              fontSize: "28px",
              fontWeight: "bold",
              margin: "0 0 10px 0",
            }}
          >
            Admin Portal
          </h1>
          <p
            className="text-gray-600 text-sm"
            style={{
              color: "#666",
              fontSize: "14px",
              margin: "0",
            }}
          >
            Đăng nhập để truy cập hệ thống quản trị
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="text-left">
          <div className="mb-5">
            <label
              className="block text-[#78B3CE] text-sm font-semibold mb-2"
              style={{
                display: "block",
                color: "#78B3CE",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Nhập email admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-[#C9E6F0] rounded-xl text-base outline-none transition-colors duration-300 focus:border-[#78B3CE]"
              onFocus={(e) => (e.target.style.borderColor = "#78B3CE")}
              onBlur={(e) => (e.target.style.borderColor = "#C9E6F0")}
              required
            />
          </div>

          <div className="mb-5">
            <label
              className="block text-[#78B3CE] text-sm font-semibold mb-2"
              style={{
                display: "block",
                color: "#78B3CE",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-12 border-2 border-[#C9E6F0] rounded-xl text-base outline-none transition-colors duration-300 focus:border-[#78B3CE]"
                onFocus={(e) => (e.target.style.borderColor = "#78B3CE")}
                onBlur={(e) => (e.target.style.borderColor = "#C9E6F0")}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#78B3CE] text-sm hover:text-[#5a8ba3] transition-colors"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#F96E2A] text-white p-4 rounded-xl text-base font-semibold cursor-pointer shadow-lg shadow-[#F96E2A]/30 transition-all duration-300 hover:bg-[#e55a1f] hover:-translate-y-1 mb-5"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#e55a1f";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#F96E2A";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Đăng nhập
          </button>
        </form>

        {/* Forgot Password Link - Updated */}
        <div className="text-center">
          <Link
            to="/forgot-password"
            className="bg-transparent border-none text-[#F96E2A] text-sm cursor-pointer underline transition-colors duration-300 hover:text-[#e55a1f]"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {/* Footer */}
        <div
          className="mt-8 pt-5 border-t border-[#C9E6F0] text-gray-400 text-xs"
          style={{
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid #C9E6F0",
            color: "#999",
            fontSize: "12px",
          }}
        >
          © 2025 Admin Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
