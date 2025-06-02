import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleBackToLogin = () => {
    // This would typically use React Router navigation
    window.history.back();
  };

  if (isSubmitted) {
    return (
      <div className=" min-h-screen bg-[#78B3CE] flex items-center justify-center p-5 font-sans rounded-4xl">
        <div className="bg-[#FBF8EF] p-10 rounded-3xl shadow-2xl w-full max-w-md text-center ">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-5 flex items-center justify-center text-3xl text-white font-bold">
              ✓
            </div>
            <h1 className="text-[#78B3CE] text-3xl font-bold mb-3">
              Email đã được gửi!
            </h1>
            <p className="text-gray-600 text-sm">
              Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-[#C9E6F0] p-4 rounded-xl mb-6 text-left">
            <h3 className="text-[#78B3CE] font-semibold mb-2">
              Bước tiếp theo:
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Kiểm tra hộp thư đến của bạn</li>
              <li>• Tìm email từ Admin Portal</li>
              <li>• Nhấp vào liên kết đặt lại mật khẩu</li>
              <li>• Tạo mật khẩu mới</li>
            </ul>
          </div>

          {/* Back to Login Button */}
          <button
            onClick={handleBackToLogin}
            className="w-full bg-[#F96E2A] text-white p-4 rounded-xl text-base font-semibold cursor-pointer shadow-lg shadow-[#F96E2A]/30 transition-all duration-300 hover:bg-[#e55a1f] hover:-translate-y-1 mb-5"
          >
            Quay lại đăng nhập
          </button>

          {/* Resend Email */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Không nhận được email?</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-transparent border-none text-[#F96E2A] text-sm cursor-pointer underline transition-colors duration-300 hover:text-[#e55a1f]"
            >
              Gửi lại email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-[#78B3CE] flex items-center justify-center p-5 font-sans">
      <div className="bg-[#FBF8EF] p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
        {/* Logo/Header Section */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-[#78B3CE] rounded-full mx-auto mb-5 flex items-center justify-center text-3xl text-[#FBF8EF] font-bold">
            🔑
          </div>
          <h1 className="text-[#78B3CE] text-3xl font-bold mb-3">
            Quên mật khẩu?
          </h1>
          <p className="text-gray-600 text-sm">
            Nhập email admin để nhận hướng dẫn đặt lại mật khẩu
          </p>
        </div>

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-6">
            <label className="block text-[#78B3CE] text-sm font-semibold mb-2">
              Email Admin
            </label>
            <input
              type="email"
              placeholder="Nhập email admin của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-[#C9E6F0] rounded-xl text-base outline-none transition-colors duration-300 focus:border-[#78B3CE]"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-4 rounded-xl text-base font-semibold cursor-pointer shadow-lg transition-all duration-300 mb-5 ${
              isLoading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-[#F96E2A] text-white shadow-[#F96E2A]/30 hover:bg-[#e55a1f] hover:-translate-y-1"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Đang gửi...
              </div>
            ) : (
              "Gửi email đặt lại"
            )}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="text-center">
          <button
            onClick={handleBackToLogin}
            className="bg-transparent border-none text-[#F96E2A] text-sm cursor-pointer underline transition-colors duration-300 hover:text-[#e55a1f]"
          >
            ← Quay lại đăng nhập
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-[#C9E6F0] rounded-xl">
          <p className="text-xs text-gray-600">
            <strong>Lưu ý bảo mật:</strong> Chỉ email admin đã được đăng ký mới
            có thể nhận được hướng dẫn đặt lại mật khẩu.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-[#C9E6F0] text-gray-400 text-xs">
          © 2025 Admin Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
