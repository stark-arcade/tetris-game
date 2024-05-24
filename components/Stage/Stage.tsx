import React from "react";
import Cell from "../Cell/Cell";
import { StyledStage } from "./Stage.styles";
import { TETROMINOS } from "../../utils/setup";
import { connectSocket, socketGame2048 } from "@/config/socket_karas";
import { createStage } from "@/utils/gameHelpers";

export type STAGECELL = [keyof typeof TETROMINOS, string];
export type STAGE = STAGECELL[][];

type Props = {
  stage: STAGE;
};

// const Stage: React.FC<Props> = ({ stage }) => (
//   <StyledStage>
//     {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
//   </StyledStage>
// );
const Stage: React.FC<Props> = () => {
  const [stage, setStage] = React.useState<STAGE>(createStage());
  setInterval(() => {
    socketGame2048.on("board-updated", (data: any) => {
      if (data) {
        setStage(() => data);
      }
    });
  }, 1000);
  return (
    <StyledStage>
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </StyledStage>
  );
};

export default Stage;
