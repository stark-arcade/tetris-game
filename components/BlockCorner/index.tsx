import { Box } from "@chakra-ui/react";
import React from "react";
interface IProps {
  top?: number;

  right?: number;
  left?: number;
  bottom?: number;
  rotate: number;
}

const BlockConner = ({ top, left, right, bottom, rotate }: IProps) => {
  return (
    <Box
      position="absolute"
      h="14px"
      width="14px"
      border=" 1px solid rgba(64, 233, 241, 1)"
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      borderRight="none"
      borderBottom="none"
      transform={`rotate(${rotate}deg)`}
    />
  );
};

export default BlockConner;
