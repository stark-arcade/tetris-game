import React, { useContext } from "react";
import RestartIcon from "@/public/assets/icons/restart.svg";
import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { startGame } from "@/config/socket_karas";

const ResetGame = ({ ...sx }: ButtonProps) => {
  return (
    <Button
      variant="icon_btn"
      {...sx}
      onClick={async () => {
        startGame();
      }}
    >
      <Icon as={RestartIcon} height={6} width={6} />
    </Button>
  );
};

export default ResetGame;
