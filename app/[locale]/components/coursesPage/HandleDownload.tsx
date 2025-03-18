import { createClient } from "@/utils/supabase/server";

// Function to handle file download from Supabase Storage
export const handleDownload = async (
  bucketName: string,
  filePath: string,
  fileName: string
) => {
  const supabase = await createClient();

  try {
    // Fetch the file from Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName) // Replace with your actual bucket name
      .download(filePath);

    if (error) {
      console.error("Supabase Storage Error:", error);
      throw error;
    }

    // Create a downloadable link for the file

    // Create a URL for the file
    const url = URL.createObjectURL(data);

    // Create a link element to download the file
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // Set download attribute with the file name

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up

    // Clean up the URL object
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
