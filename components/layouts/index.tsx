"use client";
import React from "react";

import StartScreen from "./StartScreen/StartScreen";

import PlayScreen from "./PlayScreen/PlayScreen";
import { useWalletContext } from "@/Provider/ProviderWalletContext";

const MainScreen = () => {
  const { address, sound } = useWalletContext();

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
      <audio autoPlay={sound} style={{}}>
        <source src="/sounds/bg_music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default MainScreen;
