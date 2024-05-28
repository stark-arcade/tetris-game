import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import StopGame from "./StopGame";
import ResetGame from "./ResetGame";
import AccountSetting from "./AccountSetting";
import ToggleSound from "./ToggleSound";
import Score from "./Score";
import { GameStatus } from "@/hooks/useGameStatus";
interface IProps {
  gameStatus: GameStatus;
}
const GameControl = ({ gameStatus }: IProps) => {
  return (
    <Box textAlign="left">
      <Score
        point={gameStatus.score}
        level={gameStatus.level}
        rows={gameStatus.rows}
      />
      <HStack>
        <StopGame gameStatus={gameStatus} />
        <ResetGame />
        <AccountSetting />
        <ToggleSound />
      </HStack>
    </Box>
  );
};

export default GameControl;
