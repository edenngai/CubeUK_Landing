import Sidebar from "@/app/[locale]/components/coursesPage/Sidebar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { redirect } from "@/i18n/navigation";
import { createClient } from "@/utils/supabase/server";
import { Menu } from "lucide-react";
import { getLocale } from "next-intl/server";
import { ReactNode } from "react";

export default async function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { courseId: string };
}) {
  const supabase = await createClient();
  const locale = await getLocale();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect({ href: "/login", locale });
  }

  const { courseId } = await params;

  return (
    <section className="h-screen flex">
      {/* Sidebar (Desktop) */}
      <div className="hidden md:flex h-full w-80">
        <Sidebar courseId={courseId} basePath="/dashboard" />
      </div>

      {/* Main Content Area */}
      <div className="w-full flex-1 flex flex-col justify-center">
        {/* Navbar */}
        <div className="flex items-center md:h-[89px] border-b border-primary">
          {/* Mobile Layout */}
          <Sheet>
            <SheetTrigger className="hover:opacity-75 transition md:hidden flex justify-start p-4">
              <Menu />
            </SheetTrigger>
            <SheetTitle className="hidden"></SheetTitle>
            <SheetContent side="left" className="p-0 w-72">
              <Sidebar courseId={courseId} basePath="/dashboard" />
            </SheetContent>
          </Sheet>
        </div>

        {/* Children (Page Content) */}
        <main className="flex-1 overflow-y-auto mx-auto w-full min-w-0">
          {children}
        </main>
      </div>
    </section>
  );
}
