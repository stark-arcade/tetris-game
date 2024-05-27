import React, { useContext } from "react";
import RestartIcon from "@/public/assets/icons/restart.svg";
import { Button, ButtonProps, Icon } from "@chakra-ui/react";

const ResetGame = ({ ...sx }: ButtonProps) => {
  return (
    <Button variant="icon_btn" {...sx} onClick={async () => {}}>
      <Icon as={RestartIcon} height={6} width={6} />
    </Button>
  );
};

export default ResetGame;
