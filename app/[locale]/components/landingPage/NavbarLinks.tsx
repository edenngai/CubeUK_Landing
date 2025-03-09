"use client";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "Courses",
    href: "/courses",
  },
  {
    id: 2,
    name: "About",
    href: "/about",
  },
];

export function NavbarLinks() {
  const location = usePathname();

  return (
    <div className="hidden md:flex items-center col-span-6 gap-x-10 md:pl-10 xl:gap-x-12">
      {navbarLinks.map((item) => {
        return (
          <Link
            href={item.href}
            key={item.id}
            className="group flex items-center px-2 py-2 font-medium rounded-md hover:bg-muted hover:bg-opacity-75"
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
