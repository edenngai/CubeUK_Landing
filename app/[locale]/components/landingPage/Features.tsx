import { useTranslations } from "next-intl";

import { BookCheck, Languages, Laptop, TvMinimalPlay } from "lucide-react";

export function Features() {
  const t = useTranslations("Features");

  const features = [
    {
      name: t("feature1.name"),
      description: t("feature1.description"),
      icon: TvMinimalPlay,
    },
    {
      name: t("feature2.name"),
      description: t("feature2.description"),
      icon: Languages,
    },
    {
      name: t("feature3.name"),
      description: t("feature3.description"),
      icon: Laptop,
    },
    {
      name: t("feature4.name"),
      description: t("feature4.description"),
      icon: BookCheck,
    },
  ];

  return (
    <div className="my-12 sm:my-16 md:my-20 lg:my-24 py-24 px-12 bg-tertiary/80 rounded-4xl">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-semibold lg:text-xl leading-7 text-primary">
          {t("heading")}
        </p>
        <h1 className="mt-2 text-4xl lg:text-5xl font-bold tracking-tight text-black">
          {t("subheading")}
        </h1>
        <p className="mt-6 text-base lg:text-lg leading-snug text-muted-foreground">
          {t("text")}
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
        <div className="grid max-w-2xl grid-cols-1 gap-x-16 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base lg:text-xl font-semibold leading-7">
                <div className="absolute left-0 top-0 flex size-10 lg:size-12 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="size-6 lg:size-8 text-white" />
                </div>
                <p className="text-black">{feature.name}</p>
              </div>
              <p className="mt-2 text-sm lg:text-lg text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
