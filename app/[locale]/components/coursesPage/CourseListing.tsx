import { CourseCard } from "./CourseCard";
import { createClient } from "@/utils/supabase/server";

interface Course {
  id: string;
  image_url: string;
  title: string;
  price: number;
  description: string;
}

interface Purchase {
  course_id: string;
}

async function fetchData(): Promise<Course[]> {
  const supabase = await createClient();

  try {
    const { data: Course, error } = await supabase.from("Courses").select("*");

    if (error) throw error;
    return (Course as Course[]) || [];
  } catch (error) {
    console.error(error);
    return []; // Return an empty array on error
  }
}

async function fetchEnrolledCourses(userId: string): Promise<string[]> {
  const supabase = await createClient();

  try {
    const { data: purchases, error: purchaseError } = await supabase
      .from("Purchase")
      .select("course_id")
      .eq("user_id", userId);

    if (purchaseError) throw purchaseError;
    return ((purchases as Purchase[]) || []).map((p) => p.course_id);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return [];
  }
}

export async function CourseListing({ basePath }: { basePath?: string }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only fetch enrolled courses if we're not on the /courses page
  const [courses, enrolledCourseIds] = await Promise.all([
    fetchData(),
    basePath && user ? fetchEnrolledCourses(user.id) : ([] as string[]),
  ]);

  const showEnrolledStatus = basePath !== undefined;

  return (
    <section className="my-8">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">
          All Courses
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-10">
        {courses.map((course) => (
          <CourseCard
            courseId={course.id}
            image={course.image_url}
            title={course.title}
            price={course.price}
            description={course.description}
            basePath={basePath}
            key={course.id}
            isEnrolled={
              showEnrolledStatus && enrolledCourseIds.includes(course.id)
            }
          />
        ))}
      </div>
    </section>
  );
}
