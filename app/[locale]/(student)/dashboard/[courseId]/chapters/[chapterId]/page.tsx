import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Banner } from "@/app/[locale]/components/banner";
import { ChapterView } from "@/app/[locale]/components/coursesPage/ChapterView";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

async function getChapterbyId(chapterId: string, userId: string) {
  const supabase = await createClient();

  try {
    // Fetch chapter details
    const { data: chapter, error: chapterError } = await supabase
      .from("Chapter")
      .select("*")
      .eq("id", chapterId)
      .eq("is_published", true)
      .single();

    if (chapterError) throw chapterError;

    if (!chapter) {
      throw new Error("Chapter not found");
    }

    // Check if the user has purchased the course
    const { data: purchase, error: purchaseError } = await supabase
      .from("Purchase")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", chapter.course_id)
      .maybeSingle();

    if (purchaseError) {
      console.error("Error checking purchase status:", purchaseError);
      return { chapter, hasPurchased: false };
    }

    return { chapter, hasPurchased: !!purchase };
  } catch (error) {
    console.error("Error fetching chapter data:", error);
    if (error instanceof Error && error.message === "Chapter not found") {
      return { chapter: null, hasPurchased: false };
    }
    return { chapter: null, hasPurchased: false };
  }
}

interface iAppProps {
  params: {
    courseId: string;
    chapterId: string;
    locale: string;
  };
}

export default async function chapterPage({ params }: Props) {
  const supabase = await createClient();
  const locale = await getLocale();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect({ href: "/login", locale });
  }

  const { chapterId } = params;
  const { chapter, hasPurchased } = await getChapterbyId(
    chapterId,
    data.user!.id
  );

  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  const isLocked = !chapter.is_free && !hasPurchased;

  return (
    <div>
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      {/* Pass data to the client component */}
      {!isLocked && (
        <div className="mx-auto w-full xl:max-w-7xl">
          <ChapterView chapter={chapter} />
        </div>
      )}
    </div>
  );
}
