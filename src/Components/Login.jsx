import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../API/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const result = await loginUser(email, password);

    if (result.success) {
      navigate("/admin/users");
    }
    // Do nothing when login fails (no toast)
  };

  return (
    <div className="min-h-screen bg-[#78B3CE] flex items-center justify-center p-5 font-sans">
      <div className="bg-[#FBF8EF] p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-[#78B3CE] rounded-full mx-auto mb-5 flex items-center justify-center text-3xl text-[#FBF8EF] font-bold">
            A
          </div>
          <h1 className="text-[#78B3CE] text-3xl font-bold mb-3">
            Admin Portal
          </h1>
          <p className="text-gray-600 text-sm">
            Please log in to access the admin dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="text-left">
          <div className="mb-5">
            <label className="block text-[#78B3CE] text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-[#C9E6F0] rounded-xl text-base outline-none transition-colors duration-300 focus:border-[#78B3CE]"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-[#78B3CE] text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-12 border-2 border-[#C9E6F0] rounded-xl text-base outline-none transition-colors duration-300 focus:border-[#78B3CE]"
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
          >
            Log In
          </button>
        </form>

        <div className="text-center">
          <Link
            to="/forgot-password"
            className="bg-transparent border-none text-[#F96E2A] text-sm cursor-pointer underline transition-colors duration-300 hover:text-[#e55a1f]"
          >
            Forgot password?
          </Link>
        </div>

        <div className="mt-8 pt-5 border-t border-[#C9E6F0] text-gray-400 text-xs">
          © 2025 Admin Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
