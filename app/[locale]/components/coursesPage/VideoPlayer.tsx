export function VideoPlayer() {
  return (
    <div className="relative w-full">
      {/* 16:9 Aspect Ratio for large screens */}
      <div className="block" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src="https://www.youtube.com/embed/yspCHUNXuLY?si=pBWEAQwLn4l2d0MT"
          title="Lecture Video"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
