import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, CalendarDays, CircleCheck, Clock } from "lucide-react";
import BusinessImage from "@/public/business.png";
import EconomicsImage from "@/public/economics.png";
import MathematicsImage from "@/public/mathematics.png";
import Image, { StaticImageData } from "next/image";

const courses = [
  {
    backgroundImage: MathematicsImage,
    title: "GCSE Mathematics Crash Course",
    subject: "Mathematics",
    exam_board: "GCSE",
    date: "19 March, 2025 ",
    time: "UKT 8-9:30PM",
    results: [
      { title: "Last-Minute Revision Strategies" },
      { title: "Exam Structure & Point Maximization" },
      { title: "Past Paper Walkthroughs" },
      { title: "Clearing Misconceptions & Q&A" },
    ],
    link: "/courses",
  },
  {
    backgroundImage: EconomicsImage,
    title: "GCSE Economics Crash Course",
    subject: "Economics",
    exam_board: "GCSE",
    date: "26 March, 2025 ",
    time: "UKT 8-9:30PM",
    results: [
      { title: "Last-Minute Revision Strategies" },
      { title: "Exam Structure & Point Maximization" },
      { title: "Past Paper Walkthroughs" },
      { title: "Clearing Misconceptions & Q&A" },
    ],
    link: "/courses",
  },
  {
    backgroundImage: BusinessImage,
    title: "GCSE Business Crash Course",
    subject: "Business",
    exam_board: "GCSE",
    date: "2 April, 2025 ",
    time: "UKT 8-9:30PM",
    results: [
      { title: "Last-Minute Revision Strategies" },
      { title: "Exam Structure & Point Maximization" },
      { title: "Past Paper Walkthroughs" },
      { title: "Clearing Misconceptions & Q&A" },
    ],
    link: "/courses",
  },
];

interface iAppProps {
  backgroundImage: StaticImageData; // This can remain a string for class names
  title: string;
  subject: string;
  exam_board: string;
  date: string;
  time: string;
  results: { title: string }[];
  link: string;
}

const Course = ({
  backgroundImage,
  title,
  subject,
  exam_board,
  date,
  time,
  results,
  link,
}: iAppProps) => {
  return (
    <div className=" bg-white rounded-3xl relative z-0 overflow-hidden after:z-10 after:content-[''] after:absolute after:inset-0 after:outline-2 after:-outline-offset-2 after:rounded-3xl after:outline-black/20 px-8 pt-8 md:pt-12 md:px-10 lg:pt-16 lg:px-20 lg:min-w-[1000px] lg:h-[540px] lg:hide-scrollbar after:pointer-events-none">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16">
        <div className="lg:pb-16">
          <div className="bg-gradient-to-r from-emerald-400 to-primary inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
            <span>{subject}</span>
            <span>&bull;</span>
            <span>{exam_board}</span>
          </div>
          <h3 className="font-semibold text-2xl mt-2 md:mt-5 md:text-4xl">
            {title}
          </h3>
          <div className="flex gap-10 text-sm mt-4 md:text-base ">
            <div className="flex gap-2">
              <CalendarDays className="size-5 md:size-6 text-primary" />
              <span>{date}</span>
            </div>
            <div className="flex gap-2">
              {" "}
              <Clock className="size-5 md:size-6 text-primary" />
              <span>{time}</span>
            </div>
          </div>
          <hr className="border-t-2 border-black/5 mt-4 md:mt-5" />
          <ul className="flex flex-col gap-4 mt-4">
            {results.map((result, index) => (
              <li className="flex gap-2 text-sm md:text-base " key={index}>
                <CircleCheck className="size-5 md:size-6" />
                <span>{result.title}</span>
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="h-12 w-full px-10! md:w-auto font-semibold inline-flex items-center justify-center gap-2 mt-8"
          >
            <Link href={link}>
              <span>View Course</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="relative">
          <Image
            src={backgroundImage}
            alt={title}
            className="mt-8 -mb-4 md:-mb-0 rounded-lg lg:rounded-2xl lg:mt=0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
          />
        </div>
      </div>
    </div>
  );
};

export function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();

  return (
    <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="text-center">
        <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
          {t("title")}
        </span>
        <h1 className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
          {t.rich("headline", {
            span: (chunks) =>
              locale === "en" ? (
                <span className="block text-primary -mt-2">{chunks}</span>
              ) : (
                <span className="text-primary block">{chunks}</span>
              ),
          })}
        </h1>
        <p
          className={`max-w-xl mx-auto text-base lg:text-2xl text-muted-foreground ${
            locale === "zh" ? "mt-10" : "mt-4"
          }`}
        >
          {t("subheading")}
        </p>

        <div className={`mb-12 ${locale === "zh" ? "mt-10" : "mt-5"}`}>
          <Button asChild className="w-52" size="xl">
            <Link href="/signup">Signup</Link>
          </Button>
        </div>
      </div>

      <div className="relative w-full py-12 mx-auto mt-12">
        <svg
          className="absolute inset-0 mt-52 blur-3xl py-36"
          style={{ zIndex: -1 }}
          fill="none"
          viewBox="0 0 400 400"
          height="100%"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_10_20)">
            <g filter="url(#filter0_f_10_20)">
              <path
                d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                fill="#03FFE0"
              ></path>
              <path
                d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                fill="#7C87F8"
              ></path>
              <path
                d="M320 400H400V78.75L106.2 134.75L320 400Z"
                fill="#4C65E4"
              ></path>
              <path
                d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                fill="#043AFF"
              ></path>
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="720.666"
              id="filter0_f_10_20"
              width="720.666"
              x="-160.333"
              y="-160.333"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              ></feBlend>
              <feGaussianBlur
                result="effect1_foregroundBlur_10_20"
                stdDeviation="80.1666"
              ></feGaussianBlur>
            </filter>
          </defs>
        </svg>

        <section className="pb-16 lg:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-semibold lg:text-xl leading-7 text-primary">
              {t("course")}
            </p>
            <h1 className="mt-2 text-4xl lg:text-5xl font-bold tracking-tight">
              {t("featured")}
            </h1>
            <p className="mt-6 text-base lg:text-lg leading-snug text-muted-foreground">
              {t("explore")}
            </p>
          </div>
          <div className="mt-10 md:mt-20 flex flex-col gap-8 hide-scrollbar lg:flex-row lg:w-full lg:h-full lg:items-start lg:justify-start lg:gap-8 lg:overflow-x-auto">
            {courses.map((course, index) => (
              <div key={index} className="relative">
                {/* Gradient SVG Background */}
                <svg
                  className="absolute inset-0 blur-3xl"
                  style={{ zIndex: -1 }}
                  fill="none"
                  viewBox="0 0 400 400"
                  height="100%"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_10_20)">
                    <g filter="url(#filter0_f_10_20)">
                      <path
                        d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                        fill="#03FFE0"
                      ></path>
                      <path
                        d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                        fill="#7C87F8"
                      ></path>
                      <path
                        d="M320 400H400V78.75L106.2 134.75L320 400Z"
                        fill="#4C65E4"
                      ></path>
                      <path
                        d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                        fill="#043AFF"
                      ></path>
                    </g>
                  </g>
                  <defs>
                    <filter
                      colorInterpolationFilters="sRGB"
                      filterUnits="userSpaceOnUse"
                      height="720.666"
                      id="filter0_f_10_20"
                      width="720.666"
                      x="-160.333"
                      y="-160.333"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feBlend
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        mode="normal"
                        result="shape"
                      ></feBlend>
                      <feGaussianBlur
                        result="effect1_foregroundBlur_10_20"
                        stdDeviation="80.1666"
                      ></feGaussianBlur>
                    </filter>
                  </defs>
                </svg>

                {/* Course Component */}
                <Course
                  backgroundImage={course.backgroundImage}
                  title={course.title}
                  subject={course.subject}
                  exam_board={course.exam_board}
                  date={course.date}
                  time={course.time}
                  results={course.results}
                  link={course.link}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center mt-8">
            <Button asChild className="w-52 mt-8" size="xl">
              <Link href="/courses">View all</Link>
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
}
