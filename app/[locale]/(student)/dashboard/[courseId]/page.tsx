import { redirect } from "@/i18n/navigation";
import { createClient } from "@/utils/supabase/server";
import { getLocale } from "next-intl/server";

async function fetchDatabyId(courseId: string) {
  const supabase = await createClient();
  const locale = await getLocale();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect({ href: "/login", locale });
  }

  try {
    // Fetch the course details
    const { data: course, error: courseError } = await supabase
      .from("Courses")
      .select(
        `
        id,
        title,
        description,
        price
      `
      )
      .eq("id", courseId)
      .single();

    if (courseError) throw courseError;

    // Fetch the chapters for the course, ordered by position
    const { data: chapters, error: chaptersError } = await supabase
      .from("Chapter")
      .select(
        `
        id,
        title,
        position,
        is_published,
        is_free
      `
      )
      .eq("course_id", courseId) // Assuming `course_id` is the foreign key in the `Chapter` table
      .order("position", { ascending: true });

    if (chaptersError) throw chaptersError;

    // Combine the course details with the ordered chapters
    return {
      ...course,
      Chapter: chapters,
    };
  } catch (error) {
    console.error(error);
    return null; // Return null on error
  }
}

export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const locale = await getLocale();

  const { courseId } = await params;
  const course = await fetchDatabyId(courseId);

  if (!course) {
    return redirect({ href: "/", locale });
  }

  return redirect({ href: `/dashboard/${course.id}/overview`, locale });
}
