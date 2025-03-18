"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation"; // Import usePathname
import { LogOut } from "lucide-react";

export default function ExitButton() {
  const router = useRouter(); // Initialize the router
  const pathname = usePathname(); // Get the current path

  // Function to handle the Exit button click
  const handleExit = () => {
    if (pathname?.startsWith("/dashboard")) {
      // If the current path is under /dashboard, navigate to /dashboard
      router.push("/dashboard");
    } else {
      // Otherwise, navigate to /courses
      router.push("/courses");
    }
  };

  return (
    <Button
      variant="secondary"
      className="relative flex items-center gap-x-2 text-black text-sm font-[500] pl-6 pr-4 transition-all hover:text-white hover:bg-primary dark:hover:bg-slate-700/20 w-full text-left justify-start h-14 rounded-none"
      onClick={handleExit} // Add onClick handler
    >
      <div className="flex items-center gap-x-2 py-4">
        <LogOut size={22} className=" hover:text-white" />
        <span className="flex-1">Exit</span>
      </div>
    </Button>
  );
}
