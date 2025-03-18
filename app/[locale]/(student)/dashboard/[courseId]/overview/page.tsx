import Image from "next/image";
import { CalendarDays, CircleCheck, Clock } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import PurchaseButton from "@/app/[locale]/components/coursesPage/PurchaseButton";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

async function fetchDatabyId(courseId: string) {
  const supabase = await createClient();
  try {
    const { data: course, error } = await supabase
      .from("Courses")
      .select(`*`)
      .eq("id", courseId)
      .single();

    if (error) throw error;
    return course;
  } catch (error) {
    console.error("Error fetching course data:", error);
    return null; // Return null on error
  }
}

async function checkIfPurchased(courseId: string, userId: string) {
  const supabase = await createClient();
  try {
    const { data: purchase, error } = await supabase
      .from("Purchase")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .maybeSingle();

    if (error) {
      console.error("Error checking course purchase status:", error);
      return false;
    }

    return !!purchase; // Return true if purchase exists, false otherwise
  } catch (error) {
    console.error("Unexpected error checking course purchase status:", error);
    return false; // Return false on error
  }
}

export default async function CourseOverviewPage({
  params,
}: {
  params: { courseId: string };
}) {
  const supabase = await createClient();
  const locale = await getLocale();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect({ href: "/login", locale });
  }

  const { courseId } = await params;
  const course = await fetchDatabyId(courseId);
  const hasPurchased = await checkIfPurchased(courseId, data.user!.id);

  return (
    <section className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-4 xl:gap-x-16 p-6 md:p-10 mx-auto lg:max-w-7xl">
      <div className="lg:row-end-1 lg:col-span-4">
        <div className="aspect-w-4 aspect-h-3 rounded-2xl bg-gray-100 overflow-hidden shadow-md">
          <Image
            src={course.image_url}
            alt={course.title}
            width={400}
            height={200}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>
      </div>
      <div className="mt-8 lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {course.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="size-5" />
              <span className="text-sm">{course.lesson_dates}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-5" />
              <span className="text-sm">{course.lesson_time}</span>
            </div>
          </div>
        </div>
        {hasPurchased ? (
          <div className="flex items-center justify-center gap-2 w-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300 h-11 px-4 rounded-lg text-sm font-medium border border-emerald-500/20 shadow-sm">
            <CircleCheck className="h-5 w-5" />
            Enrolled
          </div>
        ) : (
          <PurchaseButton price={course.price} courseId={course.id} />
        )}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Subject</p>
              <p className="font-medium">{course.subject}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Exam Board</p>
              <p className="font-medium">{course.exam_board}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Course Tutor</p>
              <p className="font-medium">{course.tutor}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-8 lg:mt-0 lg:col-span-7 space-y-6">
        <div className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {course.description}
            </p>
          </div>
          <div className="pt-4 border-t">
            <h2 className="text-xl font-semibold mb-4">
              What this course offers
            </h2>
            <ul className="grid gap-3">
              {course.features.map((feature: string, index: number) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <CircleCheck className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
