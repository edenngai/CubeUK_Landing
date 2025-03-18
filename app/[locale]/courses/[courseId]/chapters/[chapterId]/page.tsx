import React from "react";
import { ChapterView } from "../../../../components/coursesPage/ChapterView";
import { createClient } from "@/utils/supabase/server";
import { Banner } from "@/app/[locale]/components/banner";

async function getChapterbyId(chapterId: string) {
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

    return { chapter };
  } catch (error) {
    console.error(error);
    return { chapter: null, course: null }; // Return null on error
  }
}

export default async function chapterPage({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const { chapterId } = await params;
  const { chapter } = await getChapterbyId(chapterId);

  const isLocked = !chapter.is_free;

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
