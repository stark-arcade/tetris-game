import React, { useContext } from "react";
import StopIcon from "@/public/assets/icons/stop.svg";
import {
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
  Text,
  useDisclosure,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";

import {
  claimPoint,
  getClaimPointInfo,
  socketGame2048,
} from "@/config/socket_karas";
import { useAccount } from "@starknet-react/core";
import StarIcon from "@/public/assets/arts/star.svg";
import ResumeIcon from "@/public/assets/icons/play.svg";

import { CallData } from "starknet";

import { CONTRACT_ADDRESS } from "@/utils/constants";
import AccountSetting from "./AccountSetting";
import { useGameStatus } from "@/hooks/useGameStatus";
const StopGame = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { gameStatus, setGameStatus } = useGameStatus();
  const { account } = useAccount();
  const toast = useToast();
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

        onClose();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handlePauseGame = () => {
    if (gameStatus.status != "started") {
      socketGame2048.emit("pause");
    }
    if (gameStatus.status == "paused") {
      socketGame2048.emit("resume");
    }
  };
  return (
    <>
      {gameStatus.status != "lost" && (
        <>
          <Button
            variant="icon_btn"
            onClick={async () => {
              onOpen();
              handlePauseGame();
            }}
          >
            <Icon as={StopIcon} height={6} width={6} />
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
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
                <Text
                  textTransform="uppercase"
                  color="#FFB35B"
                  fontWeight="bold"
                >
                  Point
                </Text>
              </ModalBody>
              <ModalFooter justifyContent="center" alignItems="center">
                <Button
                  variant="icon_btn"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <Icon as={ResumeIcon} height={6} width={6} />
                </Button>
                <Button
                  variant="connect_wallet"
                  sx={{
                    maxWidth: "220px",
                  }}
                  onClick={async () => {
                    await handleClaimPoint();
                  }}
                >
                  Claim Point
                </Button>
                <AccountSetting />
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default StopGame;
