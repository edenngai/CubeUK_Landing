import { createClient } from "@/utils/supabase/server";
import ProfileForm from "./profile-form";
import Sidebar from "../_components/sidebar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutUser } from "./action";

export default async function ProfilePage() {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="container max-w-5xl mx-auto py-8">
        Please sign in to view your profile
      </div>
    );
  }

  // Get profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

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
            <SheetTrigger className="hover:opacity-75 transition md:hidden flex justify-start p-4">
              <Menu />
            </SheetTrigger>
            <SheetTitle className="hidden"></SheetTitle>
            <SheetContent side="left" className="p-0 w-60">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        {/* Children (Page Content) */}
        <main className="flex-1 overflow-y-auto mx-auto w-full min-w-0 space-y-8 p-8">
          <h2 className="text-2xl font-extrabold tracking-tighter">Settings</h2>

          <ProfileForm initialProfile={profile || {}} userId={user.id} />

          <div className="w-full">
            <form action={logoutUser}>
              <Button
                type="submit"
                variant="destructive"
                className="w-full gap-2 hover:bg-red-600"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
