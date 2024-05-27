import React, { useEffect } from "react";
import Cell from "../Cell/Cell";
import { StyledStage } from "./Stage.styles";
import { TETROMINOS } from "../../utils/setup";
import {
  getBoardData,
  getGameStatus,
  socketGame2048,
} from "@/config/socket_karas";
import { createStage } from "@/utils/gameHelpers";
import { useGameStatus } from "@/hooks/useGameStatus";
import { Box } from "@chakra-ui/react";

export type STAGECELL = [keyof typeof TETROMINOS, string];
export type STAGE = STAGECELL[][];

const Stage: React.FC = () => {
  const [stage, setStage] = React.useState<STAGE>(createStage());
  const { gameStatus, setGameStatus } = useGameStatus();

  if (socketGame2048) {
    socketGame2048.on("board-updated", (data) => {
      setStage(() => data);
    });
  }
  socketGame2048.on("game-point", (data) => {
    setGameStatus((prev) => ({
      ...prev,
      isClaimable: data.claimable,
      score: data.point,
    }));
    console.log("Data", data);
  });
  return (
    <StyledStage>
      <>
        {stage.map((row) =>
          row.map((cell, x) => <Cell key={x} type={cell[0]} />)
        )}
      </>
    </StyledStage>
  );
};

export default Stage;
