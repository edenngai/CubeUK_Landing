import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Logo from "@/public/cube_logo.png";
// import { ThemeToggle } from "../ThemeToggle";
import { Button } from "@/components/ui/button";
import { NavbarLinks } from "./NavbarLinks";
import { MobileMenu } from "./MobileMenu";
import LocaleSwitcher from "./LocaleSwitcher";

const Navbar = () => {
  return (
    <nav className="relative w-full justify-between flex md:grid md:grid-cols-12 items-center py-5">
      <div className="md:col-span-1">
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" className="h-14 w-fit" />
        </Link>
      </div>

      <NavbarLinks />

      <div className="hidden md:flex items-end gap-x-4 ms-auto md:col-span-5">
        {/* <ThemeToggle /> */}
        <Button asChild className="w-24 font-medium" size="lg">
          <Link href="/login">Login</Link>
        </Button>
        <Button
          asChild
          className="w-24 font-medium"
          size="lg"
          variant="secondary"
        >
          <Link href="/signup">Signup</Link>
        </Button>
        <LocaleSwitcher />
      </div>

      <div className="md:hidden flex gap-x-2">
        {/* <ThemeToggle /> */}
        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
