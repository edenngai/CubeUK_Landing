import { useTranslations } from "next-intl";

import { Footer } from "../components/landingPage/Footer";
import Navbar from "../components/landingPage/Navbar";
import Image from "next/image";

export default function AboutCube() {
  const t = useTranslations("AboutCube");
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-bold text-3xl text-center tracking-tight mt-16">
          {t("story.title")}
        </div>
        <p className="text-2xl font-bold font-serif leading-relaxed mt-12">
          {t("story.paragraph1")}
        </p>
        <p className="text-lg mt-5 font-light">{t("story.paragraph2")}</p>
        <p className="text-2xl font-bold font-serif leading-relaxed mt-5">
          {t("story.paragraph3")}
        </p>
        <p className="text-lg mt-5 font-light">{t("story.paragraph4")}</p>
        <p className="text-lg mt-5 font-light">{t("story.paragraph5")}</p>
        <p className="text-2xl mt-5 font-bold font-serif leading-relaxed">
          {t("story.paragraph6")}
        </p>

        <div className="font-bold text-3xl text-center tracking-tight mt-24">
          {t("teachers.title")}
        </div>
        <p className="text-2xl text-primary font-light font-serif leading-relaxed mt-12">
          {t("teachers.slogan")}
        </p>
        <p className="text-lg mt-5">{t("teachers.text")}</p>

        <div className="flex justify-center gap-x-4 mt-8">
          <div className="flex-1 flex flex-col justify-center">
            <Image
              src="/TerryLao.webp"
              alt="Terry"
              width={256}
              height={256}
              className="size-64 rounded-lg object-cover"
            />
            <div className="flex-1 flex flex-col gap-y-1 text-center">
              <h1 className="text-2xl font-semibold text-primary mt-2">
                Terry Lao
              </h1>
              <h2 className="text-base font-semibold">Economics / Business</h2>
              <h2 className="text-base">MEd, BA (Hons)</h2>
              <h2 className="text-base">Diploma Examiner – Economics</h2>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <Image
              src="/EdenNgai.webp"
              alt="Eden"
              width={256}
              height={256}
              className="size-64 rounded-lg object-cover"
            />
            <div className="flex-1 flex flex-col gap-y-1 text-center">
              <h1 className="text-2xl font-semibold text-primary mt-2">
                Eden Ngai
              </h1>
              <h2 className="text-base font-semibold">Science</h2>
              <h2 className="text-base">MSc, Imperial College London</h2>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <Image
              src="/Michael.png"
              alt="Michael"
              width={256}
              height={256}
              className="size-64 rounded-lg object-cover"
            />
            <div className="flex-1 flex flex-col gap-y-1 text-center">
              <h1 className="text-2xl font-semibold text-primary mt-2">
                Michael Chung
              </h1>
              <h2 className="text-base font-semibold">Mathematics</h2>
              <h2 className="text-base">MSc, Imperial College London</h2>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
