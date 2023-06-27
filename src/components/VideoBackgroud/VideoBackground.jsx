import React, { useEffect, useRef } from "react";
import videoBg from "../../assets/videoBg.mp4";
import "./VideoBackground.css";

const VideoBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handlePlay = () => {
      if (
        videoRef.current &&
        videoRef.current.paused &&
        videoRef.current.readyState === 4
      ) {
        videoRef.current.play();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoRef.current.pause();
      } else {
        handlePlay();
      }
    };

    const handleBatteryChange = () => {
      if (navigator.getBattery) {
        navigator.getBattery().then((battery) => {
          if (battery.charging || battery.level > 0.5) {
            handlePlay();
          } else {
            videoRef.current.pause();
          }
        });
      } else {
        handlePlay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handlePlay);
    window.addEventListener("focus", handlePlay);
    window.addEventListener("batterychange", handleBatteryChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handlePlay);
      window.removeEventListener("focus", handlePlay);
      window.removeEventListener("batterychange", handleBatteryChange);
    };
  }, []);
  return (
    <>
      <video
        ref={videoRef}
        className="video_bg"
        src={videoBg}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      ></video>
    </>
  );
};

export default VideoBackground;
