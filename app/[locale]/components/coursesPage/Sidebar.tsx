import { createClient } from "@/utils/supabase/server";
import SidebarItem from "./SidebarItem";
import ExitButton from "./ExitButton";

type Chapter = {
  id: string;
  title: string;
  position: number;
  is_free: boolean;
};

interface iAppProps {
  courseId: string; // Pass courseId instead of the entire course object
  basePath?: string;
}

export default async function Sidebar({ courseId, basePath }: iAppProps) {
  const supabase = await createClient();

  try {
    // Fetch course data
    const { data: course, error: courseError } = await supabase
      .from("Courses")
      .select(`*, Chapter(*)`)
      .eq("id", courseId)
      .single();

    if (courseError) throw courseError;

    // Fetch purchase status (only if the user is authenticated)
    let hasPurchased = false;
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (!userError && userData.user) {
      // User is authenticated, check purchase status
      const { data: purchase, error: purchaseError } = await supabase
        .from("Purchase")
        .select("*")
        .eq("user_id", userData.user.id)
        .eq("course_id", courseId)
        .single();

      if (!purchaseError) {
        hasPurchased = !!purchase;
      }
    }

    // If the user is not authenticated, hasPurchased remains false
    // and all non-free chapters will be locked

    return (
      <div className="h-full w-full border-r flex flex-col overflow-y-auto shadow-sm">
        {/* Course Header */}
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold">{course.title}</h1>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Render Course Overview */}
          <SidebarItem
            chapterId="overview" // Unique ID for the overview
            label={"Course Overview"}
            courseId={course.id}
            isLocked={false} // Always unlocked
            isOverview={true} // Flag to indicate this is an overview
            basePath={basePath}
          />
          {/* Render Chapters */}
          {course.Chapter.sort(
            (a: Chapter, b: Chapter) => a.position - b.position
          ).map((chapter: Chapter) => (
            <SidebarItem
              key={chapter.id}
              chapterId={chapter.id}
              label={chapter.title}
              courseId={course.id}
              isLocked={!chapter.is_free && !hasPurchased} // Lock if not free and not purchased
              isOverview={false} // Regular chapter
              basePath={basePath}
            />
          ))}
        </div>

        {/* Exit Button (Always at the Bottom) */}
        <div className="mt-auto">
          <ExitButton />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Course not found.</div>; // Handle errors
  }
}
