import React, { useEffect } from "react";
import Cell from "../Cell/Cell";
import { StyledStage } from "./Stage.styles";
import { TETROMINOS, createStage } from "../../utils/setup";
import {
  getBoardData,
  getGameStatus,
  socketGame2048,
} from "@/config/socket_karas";

import { useGameStatus } from "@/hooks/useGameStatus";
import { Box } from "@chakra-ui/react";

export type STAGECELL = [keyof typeof TETROMINOS, string];
export type STAGE = STAGECELL[][];

const Stage: React.FC = () => {
  const [stage, setStage] = React.useState<STAGE>(createStage());

  if (socketGame2048) {
    socketGame2048.on("board-updated", (data) => {
      setStage(() => data);
    });
  }

  return (
    <StyledStage>
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </StyledStage>
  );
};

export default Stage;
