import { useEffect, useRef, useState } from "react";

interface PDFViewerProps {
  fileUrl: string; // Prop for the PDF file URL
}

export function DocViewer({ fileUrl }: PDFViewerProps) {
  const viewerUrl = fileUrl;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(0);

  // Calculate the height based on the width and aspect ratio
  useEffect(() => {
    const calculateHeight = () => {
      if (iframeRef.current) {
        const width = iframeRef.current.offsetWidth;
        const aspectRatio = 16 / 9; // Standard aspect ratio for slides (16:9)
        const height = width / aspectRatio;
        setIframeHeight(height);
      }
    };

    // Calculate height on mount and window resize
    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    // Cleanup
    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  return (
    <div className="w-full rounded-lg">
      <iframe
        id="pdf-js-viewer"
        ref={iframeRef}
        src={viewerUrl}
        title="webviewer"
        className="w-full"
        style={{ height: `${iframeHeight}px` }}
      />
    </div>
  );
}
