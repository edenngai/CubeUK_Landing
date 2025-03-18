import { redirect } from "@/i18n/navigation";
import { createClient } from "@/utils/supabase/server";
import { getLocale } from "next-intl/server";
import { MyCourses } from "../../components/coursesPage/MyCourses";
import Sidebar from "../_components/sidebar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const locale = await getLocale();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect({ href: "/login", locale });
  }

  const userId = data.user!.id;

  return (
    <section className="h-screen flex">
      {/* Sidebar (Desktop) */}
      <div className="hidden md:flex h-full w-60">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="w-full flex-1 flex flex-col justify-center">
        <div className="flex items-center md:h-[80px] border-b border-primary">
          {/* Mobile Layout */}
          <Sheet>
            <SheetTrigger className="hover:opacity-75 transition md:hidden flex justify-start py-4 pl-7">
              <Menu />
            </SheetTrigger>
            <SheetTitle className="hidden"></SheetTitle>
            <SheetContent side="left" className="p-0 w-60">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        {/* Children (Page Content) */}
        <main className="flex-1 overflow-y-auto mx-auto w-full min-w-0 px-8">
          <MyCourses userId={userId} basePath="/dashboard" />
        </main>
      </div>
    </section>
  );
}
