"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchFileData(bucketName: string, filePath: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .download(filePath);

    if (error) {
      console.error("Supabase Storage Error:", error);
      throw error;
    }

    return data; // Return the Blob
  } catch (error) {
    console.error("Error fetching file data:", error);
    throw error;
  }
}
