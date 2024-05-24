import React from "react";
import Cell from "../Cell/Cell";
import { StyledStage } from "./Stage.styles";
import { TETROMINOS } from "../../utils/setup";
import { getBoardData } from "@/config/socket_karas";
import { createStage } from "@/utils/gameHelpers";
import { useGameStatus } from "@/hooks/useGameStatus";

export type STAGECELL = [keyof typeof TETROMINOS, string];
export type STAGE = STAGECELL[][];

type Props = {
  stage: STAGE;
};

const Stage: React.FC<Props> = () => {
  const [stage, setStage] = React.useState<STAGE>(createStage());
  const { gameStatus, setGameStatus } = useGameStatus();
  setInterval(() => {
    const handleLoadData = async () => {
      const data = await getBoardData();
      setStage(() => data);
    };
    // socketGame2048.on("board-updated", (data: any) => {
    //   if (data) {
    //     setStage(() => data);
    //   }
    // });
    // socketGame2048.on("game-status", (data) => {
    //   if (data) {
    //     setGameStatus(() => data);
    //   }
    // });
    handleLoadData();
  }, gameStatus.interval);

  return (
    <StyledStage>
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </StyledStage>
  );
};

export default Stage;
