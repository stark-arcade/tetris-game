import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import React from "react";
import SoundOnIcon from "@/public/assets/icons/sound_on.svg";
import SoundOffIcon from "@/public/assets/icons/sound_off.svg";
import { useWalletContext } from "@/Provider/ProviderWalletContext";

const ToggleSound = ({ ...sx }: ButtonProps) => {
  const { sound, handleToggleSound } = useWalletContext();
  return (
    <>
      <Button
        variant="icon_btn"
        {...sx}
        onClick={async () => {
          handleToggleSound();
        }}
      >
        <Icon as={sound ? SoundOnIcon : SoundOffIcon} height={6} width={6} />
      </Button>
    </>
  );
};

export default ToggleSound;
