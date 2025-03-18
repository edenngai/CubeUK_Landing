"use client";

import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full w-60 border-r flex flex-col overflow-y-auto shadow-sm">
      {/* Course Header */}
      <div className="h-[80px] flex flex-col justify-center pl-6 border-b">
        <Logo />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
