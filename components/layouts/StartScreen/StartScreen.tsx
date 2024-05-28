import Image from "next/image";
import React from "react";

import {
  StyleStartScreenWrapper,
  StyledStartScreen,
} from "./StartScreen.styles";

import { useWalletContext } from "@/Provider/ProviderWalletContext";
import BlockConner from "@/components/BlockCorner";
import ConnectWallet from "@/components/ConnectWallet";

const StartScreen = () => {
  const { sound, handleToggleSound } = useWalletContext();

  return (
    <StyledStartScreen>
      <StyleStartScreenWrapper>
        <button
          className="icon_btn"
          style={{
            position: "absolute",
            top: 0,
            right: "10px",
          }}
          onClick={async () => {
            handleToggleSound();
          }}
        >
          <Image
            src={
              sound
                ? "/assets/icons/sound_off.svg"
                : "/assets/icons/sound_on.svg"
            }
            alt=""
            height={24}
            width={24}
          />
        </button>
        <Image
          src="/assets/arts/teris_game.svg"
          alt=""
          height={101}
          width={179}
        />
        <ConnectWallet />
        <BlockConner top={0} left={0} rotate={0} />
        <BlockConner bottom={0} left={0} rotate={-90} />
        <BlockConner right={0} top={0} rotate={90} />
        <BlockConner bottom={0} right={0} rotate={180} />
      </StyleStartScreenWrapper>
    </StyledStartScreen>
  );
};

export default StartScreen;
