import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../API/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      setIsLoading(true);
      await forgotPassword(email);
      setIsSubmitted(true);

      // Redirect to Change Password after success (e.g., /change-password)
      setTimeout(() => {
        navigate("/change-password");
      }, 1500);
    } catch (error) {
      // Toast handled in API
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#78B3CE] flex items-center justify-center p-5 font-sans rounded-4xl">
        <div className="bg-[#FBF8EF] p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-5 flex items-center justify-center text-3xl text-white font-bold">
              ✓
            </div>
            <h1 className="text-[#78B3CE] text-3xl font-bold mb-3">
              Email Sent!
            </h1>
            <p className="text-gray-600 text-sm">
              We've sent password reset instructions to your email.
            </p>
          </div>

          <div className="bg-[#C9E6F0] p-4 rounded-xl mb-6 text-left">
            <h3 className="text-[#78B3CE] font-semibold mb-2">Next Steps:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Check your inbox</li>
              <li>• Look for the email from Admin Portal</li>
              <li>• Click the reset password link</li>
              <li>• Set a new password</li>
            </ul>
          </div>

          <p className="text-gray-500 text-sm">
            Redirecting to Change Password...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#78B3CE] flex items-center justify-center p-5 font-sans">
      <div className="bg-[#FBF8EF] p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-[#78B3CE] rounded-full mx-auto mb-5 flex items-center justify-center text-3xl text-[#FBF8EF] font-bold">
            🔑
          </div>
          <h1 className="text-[#78B3CE] text-3xl font-bold mb-3">
            Forgot Password?
          </h1>
          <p className="text-gray-600 text-sm">
            Enter your admin email to receive password reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-6">
            <label className="block text-[#78B3CE] text-sm font-semibold mb-2">
              Admin Email
            </label>
            <input
              type="email"
              placeholder="Enter your admin email"
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
                Sending...
              </div>
            ) : (
              "Send Reset Email"
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-[#C9E6F0] rounded-xl text-xs text-gray-600">
          <strong>Security Notice:</strong> Only registered admin emails can
          receive password reset instructions.
        </div>

        <div className="mt-8 pt-5 border-t border-[#C9E6F0] text-gray-400 text-xs">
          © 2025 Admin Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
