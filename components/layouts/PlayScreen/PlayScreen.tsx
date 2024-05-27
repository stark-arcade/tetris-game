"use client";
import { useGameStatus } from "@/hooks/useGameStatus";

import React, { useEffect } from "react";
import { StyledTetris, StyledTetrisWrapper } from "./PlayScreen.styles";

import Stage from "@/components/Stage/Stage";
import { StyledBlockCorner } from "../StartScreen/StartScreen.styles";
import Image from "next/image";

import Modal from "@/components/Modal";

import { useWalletContext } from "@/Provider/ProviderWalletContext";
import {
  connectSocket,
  senderCommand,
  socketGame2048,
  startGame,
} from "@/config/socket_karas";
import { Button } from "@chakra-ui/react";
import StarScore from "@/components/Stage/GameControl/StarScore";
import GameControl from "@/components/Stage/GameControl";
import ModalGameClaim from "@/components/Modal/ModalGameClaim";

const PlayScreen = () => {
  const gameArea = React.useRef<HTMLDivElement>(null);

  const { gameStatus, setGameStatus } = useGameStatus();

  const handleStartGame = async () => {
    // Need to focus the window with the key events on start
    connectSocket();
    if (gameArea.current) gameArea.current.focus();
    startGame();
  };

  const move = ({
    keyCode,
    repeat,
  }: {
    keyCode: number;
    repeat: boolean;
  }): void => {
    if (gameStatus.status != "lost" && gameStatus.status) {
      if (keyCode === 37) {
        senderCommand("left");
      } else if (keyCode === 39) {
        senderCommand("right");
      } else if (keyCode === 40) {
        // Just call once
        // if (repeat) return;
        // setDroptime(30);
        senderCommand("down");
      } else if (keyCode === 38) {
        senderCommand("up");
      }
    }
  };
  // useEffect(() => {
  //   if (initialized.current === false && gameState.board.length === 0) {
  //     connectSocket();
  //     startGame();
  //     initialized.current = true;
  //   }
  // }, [startGame]);
  useEffect(() => {
    handleStartGame();
  }, []);
  if (socketGame2048) {
    socketGame2048.on("game-row", (data) => {
      setGameStatus((prev) => ({
        ...prev,
        rows: data,
      }));
    });
    socketGame2048.on("game-level", (data) => {
      setGameStatus((prev) => ({
        ...prev,
        level: data,
      }));
      socketGame2048.on("game-point", (data) => {
        setGameStatus((prev) => ({
          ...prev,
          score: data.point,
          isClaimable: data.claimable,
        }));
      });
    });
    socketGame2048.on("game-status", (data) => {
      setGameStatus((prev) => ({
        ...prev,
        status: data,
      }));
    });
  }
  const { disconnectWallet } = useWalletContext();
  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex={0}
      onKeyDown={move}
      ref={gameArea}
    >
      <StyledTetris>
        <GameControl />
        <Stage />
        <Image
          src="/assets/arts/teris_game.svg"
          alt=""
          height={112}
          width={112}
        />
        <ModalGameClaim
          isOpen={gameStatus.status == "lost"}
          onClose={() => {}}
        />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default PlayScreen;
