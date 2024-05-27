import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import StopGame from "./StopGame";
import ResetGame from "./ResetGame";
import AccountSetting from "./AccountSetting";
import ToggleSound from "./ToggleSound";
import Score from "./Score";
const GameControl = () => {
  return (
    <Box textAlign="left">
      <Score />
      <HStack>
        <StopGame />
        <ResetGame />
        <AccountSetting />
        <ToggleSound />
      </HStack>
    </Box>
  );
};

export default GameControl;
