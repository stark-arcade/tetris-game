import { DEFAULT_DROP_TIME } from "./../utils/constants";
import React from "react";

import { getGamePoint } from "@/config/socket_karas";

export type TetrisGameStatus = "started" | "lost" | "paused";
export interface GameStatus {
  status?: "started" | "lost" | "paused";
  score: number;
  level: number;
  rows: number;
  isClaimable: boolean;
}
const initialStatus: GameStatus = {
  status: undefined,
  score: 0,
  level: 1,
  rows: 0,
  isClaimable: false,
};

export const useGameStatus = () => {
  const [gameStatus, setGameStatus] = React.useState<GameStatus>(initialStatus);

  return {
    gameStatus,
    setGameStatus,
  };
};
