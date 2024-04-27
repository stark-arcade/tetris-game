import React from "react";
import { StyledPlayButton } from "./Button.styles";
interface IProps {
  onClick: () => void;
}
const PlayButton = ({ onClick }: IProps) => {
  return <StyledPlayButton onClick={onClick}>Play Game</StyledPlayButton>;
};

export default PlayButton;
