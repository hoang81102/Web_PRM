import React from "react";
import { Link } from "react-router-dom";

const NoPermission = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F8F8] text-center p-5">
      <h1 className="text-6xl font-bold text-[#F96E2A] mb-4">403</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-3">Access Denied</h2>
      <p className="text-gray-500 mb-6">
        You do not have permission to access this page.
      </p>
      <Link
        to="/"
        className="bg-[#78B3CE] text-white px-6 py-3 rounded-xl text-base font-semibold transition-all hover:bg-[#5a8ba3]"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default NoPermission;
