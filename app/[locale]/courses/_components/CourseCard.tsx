"use client";

import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface iAppProps {
  courseId: string;
  image: StaticImageData /*string*/;
  name: string;
  price: number;
  description: string;
}

export function CourseCard({
  courseId,
  image,
  name,
  price,
  description,
}: iAppProps) {
  const router = useRouter();

  // Handle navigation
  const onClick = () => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <div className="rounded-lg">
      <div className="relative h-[230px]">
        <Image
          src={image}
          alt="Course Image"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      <div className="flex justify-between items-center mt-2">
        <h1 className="font-semibold text-xl">{name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          {price === 0 ? "free" : `$${price}`}
        </h3>
      </div>

      <p className="text-muted-foreground line-clamp-2 mt-2">{description}</p>

      <Button /*onClick={onClick}*/ className="w-full mt-5">
        Coming Soon!
      </Button>
    </div>
  );
}
