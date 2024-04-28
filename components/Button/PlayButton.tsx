import React from "react";
import { StyledPlayButton } from "./Button.styles";
import Image from "next/image";
interface IProps {
  onClick: () => void;
}
const PlayButton = ({ onClick }: IProps) => {
  return (
    <StyledPlayButton onClick={onClick}>
      <Image src="/assets/icons/stark.svg" alt="" height={24} width={24} />
      <span> {`Let's Stark`} </span>
    </StyledPlayButton>
  );
};

export default PlayButton;
