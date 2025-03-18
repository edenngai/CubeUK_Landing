import { Footer } from "../components/landingPage/Footer";
import Navbar from "../components/landingPage/Navbar";
import { CourseListing } from "../components/coursesPage/CourseListing";

export default function Courses() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <CourseListing />
      <Footer />
    </section>
  );
}
