"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { useState } from "react";
import { SubmitButton } from "../../components/SubmitButton";

interface iAppProps {
  courseId: string;
  image: string;
  title: string;
  price: number;
  description: string;
  basePath?: string;
  isEnrolled?: boolean;
}

export function CourseCard({
  courseId,
  image,
  title,
  price,
  description,
  basePath = "/courses",
  isEnrolled = false,
}: iAppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Handle navigation
  const onClick = async () => {
    setIsLoading(true);
    try {
      await router.push(`${basePath}/${courseId}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg">
      <div className="relative h-[230px]">
        <Image
          src={image}
          alt="Course Image"
          fill={true}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      <div className="flex justify-between items-center mt-2">
        <h1 className="font-semibold text-xl">{title}</h1>
        <div className="flex items-center gap-2">
          {isEnrolled ? (
            <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-500/20">
              Enrolled
            </span>
          ) : (
            <h3 className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
              {price === 0 ? "Free" : `$${price}`}
            </h3>
          )}
        </div>
      </div>

      <p className="text-muted-foreground line-clamp-2 mt-3">{description}</p>

      <div onClick={onClick}>
        <SubmitButton
          text="View Course"
          isLoading={isLoading}
          className="w-full mt-4"
        />
      </div>
    </div>
  );
}
