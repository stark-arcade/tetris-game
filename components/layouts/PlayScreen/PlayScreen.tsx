"use client";
import { useGameStatus } from "@/hooks/useGameStatus";

import React, { useEffect } from "react";
import { StyledTetris, StyledTetrisWrapper } from "./PlayScreen.styles";

import Stage from "@/components/Stage/Stage";

import Image from "next/image";

import {
  connectSocket,
  senderCommand,
  socketGame2048,
  startGame,
} from "@/config/socket_karas";

import GameControl from "@/components/Stage/GameControl";
import ModalGameClaim from "@/components/Modal/ModalGameClaim";

const PlayScreen = () => {
  const gameArea = React.useRef<HTMLDivElement>(null);

  const { gameStatus, setGameStatus } = useGameStatus();

  const handleStartGame = async () => {
    if (gameArea.current) gameArea.current.focus();
    connectSocket();
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

  useEffect(() => {
    handleStartGame();
  }, []);
  useEffect(() => {
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
  }, [socketGame2048]);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex={0}
      onKeyDown={move}
      ref={gameArea}
    >
      <StyledTetris>
        <GameControl gameStatus={gameStatus} />
        <Stage />
        <Image
          src="/assets/arts/teris_game.svg"
          alt=""
          height={112}
          width={112}
        />
        <ModalGameClaim
          gameStatus={gameStatus}
          isOpen={gameStatus.status == "lost"}
          onClose={() => {}}
        />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default PlayScreen;
