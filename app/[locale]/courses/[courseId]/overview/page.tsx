import Image from "next/image";
import { CalendarDays, CircleCheck, Clock } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import PurchaseButton from "../../../components/coursesPage/PurchaseButton";

interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string; // Add this if your course data includes an image
  features: string[];
}

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
    console.error(error);
    return null; // Return null on error
  }
}

export default async function CourseOverviewPage({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId } = await params;
  const course = await fetchDatabyId(courseId);

  return (
    <section className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-8 xl:gap-x-16 p-10 mx-auto lg:max-w-7xl">
      <div className="lg:row-end-1 lg:col-span-4">
        <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
          <Image
            src={course.image_url}
            alt="Course Image"
            width={400}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className=" mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {course.title}
        </h1>
        <div className="flex gap-10 text-sm mt-4 md:text-base ">
          <div className="flex gap-2">
            <CalendarDays className="size-5 md:size-6 text-primary" />
            <span>{course.lesson_dates}</span>
          </div>
          <div className="flex gap-2">
            {" "}
            <Clock className="size-5 md:size-6 text-primary" />
            <span>{course.lesson_time}</span>
          </div>
        </div>
        <PurchaseButton
          price={course.price}
          courseId={course.id}
          fromCoursePage={true}
        />

        <div className="border-t border-gray-200 mt-8 pt-10">
          <div className="grid grid-cols-2 w-full gap-y-3">
            <h3 className="font-medium text-muted-foreground col-span-1">
              Subject:
            </h3>
            <h3 className="col-span-1">{course.subject}</h3>
            <h3 className="font-medium text-muted-foreground  col-span-1">
              Exam Board:
            </h3>
            <h3 className="col-span-1">{course.exam_board}</h3>
            <h3 className="font-medium text-muted-foreground  col-span-1">
              Course Tutor:
            </h3>
            <h3 className="col-span-1">{course.tutor}</h3>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8"></div>
      </div>

      <div className="w-full mx-auto mt-6 lg:max-w-none lg:mt-0 lg:col-span-7 flex flex-col gap-y-3">
        <p className="text-lg font-bold">Overview:</p>
        <p className="text-lg">{course.description}</p>
      </div>
      <div className="w-full mx-auto mt-6 lg:max-w-none lg:col-span-7 ">
        <p className="text-lg font-bold">What this course offers:</p>
        <ul className="flex flex-col gap-6 mt-6">
          {course.features.map((feature: string, index: number) => (
            <li className="flex gap-2 text-lg " key={index}>
              <CircleCheck className="size-5 md:size-6" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
