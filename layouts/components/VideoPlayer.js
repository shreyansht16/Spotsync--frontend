import React from "react";

const VideoPlayer = ({ videoSrc, width, height, className }) => {
  return (
    <div className={`relative ${className}`}>
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 object-cover"
        style={{ width: width || "100%", height: height || "100%" }}
      >
        <source src={vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
