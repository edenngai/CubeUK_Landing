"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import { MoveDown } from "lucide-react";

export function AboutUs() {
  const t = useTranslations("AboutUs");

  // Extract phrases from translations
  const phrases: string[] = Object.values(t.raw("phrases"));

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [phrases]);

  return (
    <div className="flex w-4/5 mx-auto py-12 lg:py-20">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 flex flex-col text-5xl gap-16">
            <div
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl
        font-semibold leading-none"
            >
              {t("headline")}
              <span className="text-yellow-500 ml-1 sm:ml- sm:block">
                {phrases[index]}
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-16 mt-6 sm:mt-0 sm:ml-8">
            <div className="lg:text-xl text-muted-foreground">
              {t.rich("about", {
                span: (chunks) => (
                  <span className="font-semibold text-primary"> {chunks}</span>
                ),
              })}
            </div>
            <Link href="/about" className="flex justify-center">
              <Button className="w-52" size="xl">
                Learn more
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 mt-16">
          <MoveDown className="h-6 w-6 animate-bounce" />
          <div className="font-semibold text-2xl">{t("track record")}</div>
          <MoveDown className="h-6 w-6 animate-bounce" />
        </div>

        <div className="flex flex-col sm:flex-row mt-10 gap-10">
          <div className="flex-1 flex flex-row sm:flex-col gap-6">
            <div className="sm:text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-none text-primary">
              92%
            </div>
            <p className=" sm:mx-auto sm:mt-4 text-lg lg:text-xl sm:text-center text-muted-foreground">
              {t("IB")}
            </p>
          </div>
          <div className="flex-1 flex flex-row sm:flex-col gap-6">
            <div className="sm:text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-none text-primary">
              93%
            </div>
            <p className=" sm:mx-auto sm:mt-4 text-lg lg:text-xl sm:text-center text-muted-foreground">
              {t("IGCSE")}
            </p>
          </div>
          <div className="flex-1 flex flex-row sm:flex-col gap-6">
            <div className="sm:text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-none text-primary">
              88%
            </div>
            <p className=" sm:mx-auto sm:mt-4 text-lg lg:text-xl sm:text-center text-muted-foreground">
              {t("A-Levels")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
