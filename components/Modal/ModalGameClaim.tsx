import {
  claimPoint,
  getClaimPointInfo,
  startGame,
} from "@/config/socket_karas";
import {
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import StarIcon from "@/public/assets/arts/star.svg";

import { useAccount } from "@starknet-react/core";
import { CallData } from "starknet";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import { GameStatus, useGameStatus } from "@/hooks/useGameStatus";
import ResetGame from "../Stage/GameControl/ResetGame";
import AccountSetting from "../Stage/GameControl/AccountSetting";
// Claim When Game Lost Or Win
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  gameStatus: GameStatus;
}
const ModalGameClaim = ({ isOpen, onClose, gameStatus }: IProps) => {
  const { account } = useAccount();
  const handleClaimPoint = async () => {
    try {
      if (account != undefined) {
        claimPoint();
        const data = await getClaimPointInfo();
        await account.execute([
          {
            contractAddress: CONTRACT_ADDRESS.CLAIM_POINT,
            entrypoint: "rewardPoint",
            calldata: CallData.compile({
              point: data.point,
              timestamp: data.timestamp,
              proof: data.proof,
            }),
          },
        ]);
        startGame();
        onClose();
      }
    } catch (error) {
      console.log("Error ", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        background="none"
        minH={400}
        backgroundRepeat="no-repeat"
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundImage="url('/assets/arts/modal_finish.svg')"
      >
        <ModalBody as={VStack}>
          <HStack mt={20} gap={4}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Icon
                as={StarIcon}
                h={12}
                width={12}
                key={index}
                transform={index == 1 ? "translateY(-20px)" : ""}
              />
            ))}
          </HStack>

          <Text fontSize="40px" fontWeight="bold">
            {gameStatus.score}
          </Text>
          <Text textTransform="uppercase" color="#FFB35B" fontWeight="bold">
            Point
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center" alignItems="center">
          <ResetGame />
          <Button
            isDisabled={!gameStatus.isClaimable}
            onClick={async () => {
              await handleClaimPoint();
            }}
            variant="connect_wallet"
            sx={{
              maxWidth: "220px",
            }}
          >
            Claim Point
          </Button>
          <AccountSetting />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalGameClaim;
