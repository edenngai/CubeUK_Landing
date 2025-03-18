"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DocViewer } from "./DocViewer";
import {
  Download,
  File,
  Loader2,
  PlayCircle,
  Presentation,
  FileText,
  Video,
  FileQuestion,
} from "lucide-react";
import { fetchFileData } from "@/app/[locale]/actions/downloadFile";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { VideoPlayer } from "./VideoPlayer";

interface iAppProp {
  chapter: {
    id: string;
    is_free: boolean;
    ppt_url?: string; // Assuming this is the file path in Supabase Storage
    exercise_url?: string; // Assuming this is the file path in Supabase Storage
  };
}

type View = "video" | "ppt" | "notes";

export function ChapterView({ chapter }: iAppProp) {
  const [activeView, setActiveView] = useState<View>("video");
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  const toggleView = (view: View) => {
    setActiveView(view);
  };

  const handleDownload = async (bucketName: string, fileName: string) => {
    setDownloadingFile(fileName); // Set the file being downloaded
    try {
      const fileData = await fetchFileData(bucketName, `/${fileName}`);
      const url = URL.createObjectURL(fileData);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setDownloadingFile(null); // Reset the downloading state
    }
  };

  const files = [
    {
      key: "course-ppt-files",
      url: chapter.ppt_url,
      filename: chapter.ppt_url
        ? decodeURIComponent(
            new URL(chapter.ppt_url).pathname.split("/").pop() || ""
          )
        : undefined,
    },
    {
      key: "exercise-ppt-files",
      url: chapter.exercise_url,
      filename: chapter.exercise_url
        ? decodeURIComponent(
            new URL(chapter.exercise_url).pathname.split("/").pop() || ""
          )
        : undefined,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col p-6 lg:p-10">
      {activeView === "video" && (
        <div className="flex-1">
          {true ? (
            <VideoPlayer />
          ) : (
            <div className="w-full aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-muted-foreground bg-muted/50">
              <Video className="h-12 w-12 mb-4" />
              <p className="text-lg font-medium">No Video Available</p>
              <p className="text-sm">This video content is not yet available</p>
            </div>
          )}
        </div>
      )}
      {activeView === "ppt" && (
        <div className="flex-1">
          {chapter.ppt_url ? (
            <DocViewer fileUrl={chapter.ppt_url} />
          ) : (
            <div className="w-full aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-muted-foreground bg-muted/50">
              <Presentation className="h-12 w-12 mb-4" />
              <p className="text-lg font-medium">No Presentation Available</p>
              <p className="text-sm">
                The presentation file is not yet available
              </p>
            </div>
          )}
        </div>
      )}
      {activeView === "notes" && (
        <div className="flex-1">
          {chapter.exercise_url ? (
            <DocViewer fileUrl={chapter.exercise_url} />
          ) : (
            <div className="w-full aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-muted-foreground bg-muted/50">
              <FileQuestion className="h-12 w-12 mb-4" />
              <p className="text-lg font-medium">No Exercises Available</p>
              <p className="text-sm">Exercise content is not yet available</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-4">
        <ButtonGroup>
          <Button
            onClick={() => toggleView("video")}
            className="w-full transition-all duration-300 ease-in-out hover:border-primary/50 data-[state=active]:border-primary"
            variant={activeView === "video" ? "default" : "outline"}
          >
            <PlayCircle className="h-4 w-4 mr-2" />
            Video
          </Button>
          <Button
            onClick={() => toggleView("ppt")}
            className="w-full transition-all duration-300 ease-in-out  hover:border-primary/50 data-[state=active]:border-primary"
            variant={activeView === "ppt" ? "default" : "outline"}
          >
            <Presentation className="h-4 w-4 mr-2" />
            PPT
          </Button>
          <Button
            onClick={() => toggleView("notes")}
            className="w-full transition-all duration-300 ease-in-out hover:border-primary/50 data-[state=active]:border-primary"
            variant={activeView === "notes" ? "default" : "outline"}
          >
            <FileText className="h-4 w-4 mr-2" />
            Exercises
          </Button>
        </ButtonGroup>
      </div>

      <h1 className="font-medium mt-8">Download:</h1>
      <div className="w-full flex flex-col mt-5 border rounded-lg overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3 border-b bg-accent px-4">
          <div className="w-6 mr-3"></div>
          <h1 className="text-sm">Name</h1>
          <span className="text-sm text-gray-500 text-end">
            {files.filter((file) => file.url).length} items
          </span>
        </div>

        {files.map(
          (file, index) =>
            file.url && (
              <div key={file.key}>
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 px-4">
                  <File className="size-6 mr-3 flex-shrink-0" />
                  <h1 className="truncate text-sm flex-1 min-w-0 pr-2">
                    {file.filename}
                  </h1>
                  <button
                    className="text-end"
                    onClick={() =>
                      handleDownload(file.key, file.filename as string)
                    }
                  >
                    <div className="flex items-center gap-x-2 hover:text-green-500 transition-colors duration-300 flex-shrink-0">
                      {downloadingFile === file.filename ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-green-500" />
                          <span className="text-sm text-green-500">
                            Downloading...
                          </span>
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          <span className="text-sm">Download</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
                {index < files.length - 1 && <div className="border-b"></div>}
              </div>
            )
        )}
      </div>
    </div>
  );
}
