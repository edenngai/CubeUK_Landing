import { CourseCard } from "./CourseCard";
import BusinessImage from "@/public/business.png";
import EconomicsImage from "@/public/economics.png";
import MathematicsImage from "@/public/mathematics.png";
import SciencesImage from "@/public/sceiences.png";
// import supabase from "@/lib/supabase";

// async function fetchData() {
//   try {
//     const { data: Course, error } = await supabase.from("Course").select("*");

//     if (error) throw error;
//     return Course;
//   } catch (error) {
//     console.error(error);
//     return []; // Return an empty array on error
//   }
// }

// Hardcoded data
const data = [
  {
    id: "1",
    name: "GCSE Business",
    price: 0,
    description:
      "Join our free GCSE Business exam crash course! Get access to last-minute revision strategies, master the exam structure and point maximization techniques, and walkthrough past papers with our experts. Don’t miss this chance to boost your confidence and ace your exam!",
    image: BusinessImage,
  },
  {
    id: "2",
    name: "GCSE Economics",
    price: 0,
    description:
      "Join our free GCSE Economics exam crash course! Get access to last-minute revision strategies, master the exam structure and point maximization techniques, and walkthrough past papers with our experts. Don’t miss this chance to boost your confidence and ace your exam!",
    image: EconomicsImage,
  },
  {
    id: "3",
    name: "GCSE Mathematics",
    price: 0,
    description:
      "Join our free GCSE Mathematics exam crash course! Get access to last-minute revision strategies, master the exam structure and point maximization techniques, and walkthrough past papers with our experts. Don’t miss this chance to boost your confidence and ace your exam!",
    image: MathematicsImage,
  },
  // {
  //   id: "4",
  //   name: "GCSE Sciences",
  //   price: 0,
  //   description:
  //     "Join our free GCSE Sciences exam crash course! Get access to last-minute revision strategies, master the exam structure and point maximization techniques, and walkthrough past papers with our experts. Don’t miss this chance to boost your confidence and ace your exam!",
  //   image: SciencesImage,
  // },
  // Add more courses as needed
];

export async function CourseListing() {
  // const data = await fetchData(); // Call fetchData

  return (
    <section className="my-12">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">
          Latest Courses
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-10">
        {data.map((course) => (
          <CourseCard
            courseId={course.id}
            image={course.image}
            name={course.name}
            price={course.price}
            description={course.description}
            key={course.id}
          />
        ))}
      </div>
    </section>
  );
}
