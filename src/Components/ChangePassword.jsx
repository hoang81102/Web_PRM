import React, { useState } from "react";
import { changePassword } from "../API/authApi";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !oldPassword || !newPassword) return;

    setLoading(true);
    try {
      await changePassword({ email, oldPassword, newPassword });
      navigate("/");
    } catch (error) {
      // Toast handled inside API
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#78B3CE] flex items-center justify-center p-5 font-sans">
      <div className="bg-[#FBF8EF] p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-[#78B3CE] rounded-full mx-auto mb-5 flex items-center justify-center text-3xl text-[#FBF8EF] font-bold">
            🔒
          </div>
          <h1 className="text-[#78B3CE] text-3xl font-bold mb-3">
            Change Password
          </h1>
          <p className="text-gray-600 text-sm">
            Please enter your current password and a new one.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-4">
            <label className="block text-[#78B3CE] text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-[#C9E6F0] rounded-xl text-base outline-none focus:border-[#78B3CE]"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#78B3CE] text-sm font-semibold mb-2">
              Old Password
            </label>
            <input
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-3 border-2 border-[#C9E6F0] rounded-xl text-base outline-none focus:border-[#78B3CE]"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#78B3CE] text-sm font-semibold mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border-2 border-[#C9E6F0] rounded-xl text-base outline-none focus:border-[#78B3CE]"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-4 rounded-xl text-base font-semibold cursor-pointer shadow-lg transition-all duration-300 mb-5 ${
              loading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-[#F96E2A] text-white shadow-[#F96E2A]/30 hover:bg-[#e55a1f] hover:-translate-y-1"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              "Change Password"
            )}
          </button>
        </form>

        <div className="mt-8 pt-5 border-t border-[#C9E6F0] text-gray-400 text-xs">
          © 2025 Admin Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
