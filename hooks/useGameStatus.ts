import React from "react";
import { ROWPOINTS } from "../utils/setup";
import { getGamePoint } from "@/config/socket_karas";

export type TetrisGameStatus = "started" | "lost" | "paused";

export const useGameStatus = (rowsCleared: number) => {
  const [score, setScore] = React.useState(0);
  const [isClaimable, setIsClaimable] = React.useState(false);

  const [rows, setRows] = React.useState(0);
  const [level, setLevel] = React.useState(1);
  const [dropTime, setDropTime] = React.useState(null);
  const [statusGame, setStatusGame] = React.useState("start");

  React.useEffect(() => {
    const handleLoadGamePoint = async () => {
      if (rowsCleared > 0) {
        const data = await getGamePoint();
        setScore(() => data.point);
        setRows((prev) => prev + rowsCleared);
      }
    };
    handleLoadGamePoint();
  }, [rowsCleared]);

  return { score, setScore, rows, setRows, level, setLevel };
};
