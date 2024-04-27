"use client";
import React, { useEffect } from "react";
import PlayScreen from "./PlayScreen";
import { useAuth } from "@/hooks/useAuth";
import { useAccount, useConnect } from "@starknet-react/core";
import { useDispatch } from "react-redux";
import { setChainId, setUser } from "@/redux/user/user-slice";
import StartScreen from "./StartScreen";

const MainScreen = () => {
  const { user, isLoading, chainId } = useAuth();
  const { address, status } = useAccount();
  const { connect, connectors } = useConnect();

  const dispatch = useDispatch();
  useEffect(() => {
    if (address && address != user) {
      dispatch(setUser(address));
    }
  }, [address]);

  useEffect(() => {
    if (chainId != null) {
      dispatch(setChainId(chainId));
    }
  }, []);

  useEffect(() => {
    const handleReConenct = async () => {
      if (user && status === "disconnected" && chainId != null) {
        await connect({ connector: connectors[chainId] });
      }
    };
    handleReConenct();
  }, [isLoading, address, chainId]);

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
      {user ? <PlayScreen /> : <StartScreen />}

      <div className="asset-bg " />
    </div>
  );
};

export default MainScreen;
