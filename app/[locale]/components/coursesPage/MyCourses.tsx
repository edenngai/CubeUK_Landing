import { CourseCard } from "./CourseCard";
import { createClient } from "@/utils/supabase/server";

async function fetchEnrolledCourses(userId: string) {
  const supabase = await createClient();

  try {
    const { data: purchases, error: purchaseError } = await supabase
      .from("Purchase")
      .select("course_id")
      .eq("user_id", userId);

    if (purchaseError) throw purchaseError;

    if (!purchases || purchases.length === 0) {
      return [];
    }

    const courseIds = purchases.map((purchase) => purchase.course_id);

    const { data: courses, error: coursesError } = await supabase
      .from("Courses")
      .select("*")
      .in("id", courseIds);

    if (coursesError) throw coursesError;
    return courses || [];
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return [];
  }
}

export async function MyCourses({
  userId,
  basePath,
}: {
  userId: string;
  basePath?: string;
}) {
  const enrolledCourses = await fetchEnrolledCourses(userId);

  if (enrolledCourses.length === 0) {
    return null;
  }

  return (
    <section className="my-8">
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tighter">
            My Courses
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-10">
        {enrolledCourses.map((course) => (
          <CourseCard
            courseId={course.id}
            image={course.image_url}
            title={course.title}
            price={course.price}
            description={course.description}
            basePath={basePath}
            key={course.id}
            isEnrolled={true}
          />
        ))}
      </div>
    </section>
  );
}
