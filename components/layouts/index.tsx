"use client";
import React, { useEffect, useRef } from "react";

import StartScreen from "./StartScreen/StartScreen";

import PlayScreen from "./PlayScreen/PlayScreen";
import { useWalletContext } from "@/Provider/ProviderWalletContext";

const MainScreen = () => {
  const { address, sound } = useWalletContext();
  const tickRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (tickRef.current) {
      console.log("Sound", sound);
      if (sound) {
        tickRef.current.volume = 1;
        console.log("Now Ref", tickRef.current.volume);
      } else {
        tickRef.current.volume = 0;
      }
    }
  }, [sound, tickRef]);
  return (
    <div>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          top: 0,
          zIndex: -1,
        }}
      >
        <source src="/video/bg_motion.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {address ? <PlayScreen /> : <StartScreen />}

      <div className="asset-bg " />
      <audio autoPlay={sound} loop src="/sounds/bg_music.mp3" ref={tickRef} />
    </div>
  );
};

export default MainScreen;
