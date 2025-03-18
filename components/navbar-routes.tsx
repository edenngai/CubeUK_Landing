import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

const NavbarRoutes = () => {

  return (
    <div className="flex gap-x-2 ml-auto items-center">
      <Link href="/profile">
        <div className="p-4 hover:bg-gray-100 rounded-full transition">
          <User className="h-[24px] w-[24px]" strokeWidth={2} />
        </div>
      </Link>
    </div>
  );
};

export default NavbarRoutes;
