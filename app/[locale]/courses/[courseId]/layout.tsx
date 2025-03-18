import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ReactNode } from "react";
import Sidebar from "../../components/coursesPage/Sidebar";

export default async function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { courseId: string };
}) {
  const { courseId } = params;

  return (
    <section className="h-screen flex">
      {/* Sidebar (Desktop) */}
      <div className="hidden md:flex h-full w-80">
        <Sidebar courseId={courseId} />
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
              <Sidebar courseId={courseId} />
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
