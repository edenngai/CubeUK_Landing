import React from "react";
import { Mail, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const Links = [
    { name: "Home", link: "/" },
    { name: "Courses", link: "/courses" },
    { name: "Contact", link: "/contact" },
    { name: "About", link: "/about" },
  ];

  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-14 mx-auto my-10">
      <footer className="mx-auto flex flex-col justify-center">
        <Separator className="mt-12 mb-6 md:hidden" />
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {Links.map((item, index) => (
            <React.Fragment key={item.name}>
              <Link
                href={item.link}
                className="block text-left pl-4 md:text-center md:pl-0 hover:underline hover:underline-offset-4"
              >
                <div className="font-medium">{item.name}</div>
              </Link>
              {index < 3 && <Separator className="md:hidden" />}
            </React.Fragment>
          ))}
        </div>
        <Separator className="mt-6 md:hidden" />
        <div className="grid items-center justify-center gap-4 mt-10 ">
          <div className="flex items-center gap-4">
            <Phone />
            <div className="text-muted-foreground">
              +852 6209 2199  
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="h-6 w-6" />
            <div className="text-muted-foreground">admin@cubeedu.com.hk</div>
          </div>
        </div>
        <Separator className="mt-12" />
        <div className="flex justify-between mt-6">
          <div className="text-sm text-muted-foreground">©2025 CUBE EDUCATION</div>
          <div className="flex gap-6">
            {/* <Link
              href={"/privacy-policy"}
              className="hover:underline hover:underline-offset-4"
            >
              <div className="text-sm text-muted-foreground">Privacy</div>
            </Link>
            <Link
              href={"/terms"}
              className="hover:underline hover:underline-offset-4"
            >
              <div className="text-sm text-muted-foreground">Terms</div>
            </Link> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
