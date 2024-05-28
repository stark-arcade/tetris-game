import BlockConner from "@/components/BlockCorner";
import { useGameStatus } from "@/hooks/useGameStatus";
import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
interface IProps {
  rows: number;
  point: number;
  level: number;
}
const Score = ({ rows, point, level }: IProps) => {
  return (
    <HStack position="relative" bg="#007AC780" gap={0} justifyContent="center">
      <Box
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        px={6}
      >
        <Text color="#3BF1FE">Score</Text>
        <Text color="#BDFBFF" fontWeight="bold" fontSize="lg">
          {point}
        </Text>
      </Box>
      <Box
        flexDirection="column"
        position="relative"
        justifyContent="center"
        textAlign="center"
        px={6}
      >
        <Text color="#3BF1FE">Levels</Text>
        <Text color="#BDFBFF" fontWeight="bold" fontSize="lg">
          {level}
        </Text>
      </Box>
      <Box
        flexDirection="column"
        position="relative"
        justifyContent="center"
        textAlign="center"
        px={6}
      >
        <Text color="#3BF1FE">Rows</Text>
        <Text color="#BDFBFF" fontWeight="bold" fontSize="lg">
          {rows}
        </Text>
      </Box>
      <BlockConner top={0} left={0} rotate={0} />
      <BlockConner bottom={0} left={0} rotate={-90} />
      <BlockConner right={0} top={0} rotate={90} />
      <BlockConner bottom={0} right={0} rotate={180} />
    </HStack>
  );
};

export default Score;
