"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navbarLinks } from "./NavbarLinks";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator"; // Import the Separator component
import React from "react";
import LocaleSwitcher from "./LocaleSwitcher";

export function MobileMenu() {
  const location = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetTitle className="hidden"></SheetTitle>
      <SheetContent className="pt-8">
        {/* Links Section */}
        <div className="mt-5 flex flex-col space-y-1 px-2">
          {navbarLinks.map((item) => (
            <React.Fragment key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  location === item.href
                    ? "bg-muted"
                    : "hover:bg-muted hover:bg-opacity-75",
                  "group flex items-center px-2 py-2 font-medium rounded-md"
                )}
              >
                {item.name}
              </Link>
              <Separator className="my-1" />{" "}
              {/* Add a separator below each link */}
            </React.Fragment>
          ))}
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col space-y-3 px-4">
          <Button asChild className="w-full">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="w-full" variant="secondary">
            <Link href="/signup">Signup</Link>
          </Button>
          <LocaleSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}
