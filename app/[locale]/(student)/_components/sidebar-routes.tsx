"use client";

import { BarChart, Compass, Layout, List, Settings } from "lucide-react";
import SidebarItem from "./sidebar-items";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "All Courses",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col justify-between h-full overflow-y-auto">
      <div className="flex flex-col w-full">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>
      <div className="border-t w-full">
        <SidebarItem
          icon={Settings}
          label="Settings"
          href="/settings"
          className="w-full pr-6"
        />
      </div>
    </div>
  );
};

export default SidebarRoutes;
