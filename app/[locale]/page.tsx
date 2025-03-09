import { AboutUs } from "./components/landingPage/AboutUs";
import { CTA } from "./components/landingPage/CTA";
import { Features } from "./components/landingPage/Features";
import { Footer } from "./components/landingPage/Footer";
import { Hero } from "./components/landingPage/Hero";
import Navbar from "./components/landingPage/Navbar";
import { Testimonial } from "./components/landingPage/Testimonial";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <AboutUs />
      <Features />
      <Testimonial />
      <CTA />
      <Footer />
    </div>
  );
}
