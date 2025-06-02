import React from "react";
import SideBar from "./SideBar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#FBF8EF]">
      <SideBar />
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
