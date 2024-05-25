"use client";
import { useGameStatus } from "@/hooks/useGameStatus";
import { usePlayer } from "@/hooks/usePlayer";
import { useStage } from "@/hooks/useStage";
import { createStage, isColliding } from "@/utils/gameHelpers";
import React, { useEffect } from "react";
import { StyledTetris, StyledTetrisWrapper } from "./PlayScreen.styles";
import { useInterval } from "@/hooks/useInterval";

import Stage from "@/components/Stage/Stage";
import { StyledBlockCorner } from "../StartScreen/StartScreen.styles";
import Image from "next/image";

import Modal from "@/components/Modal";
import StarScore from "@/components/Stage/StarScore";
import { StyledPlayButton } from "@/components/Button/Button.styles";
import { useWalletContext } from "@/Provider/ProviderWalletContext";
import {
  connectSocket,
  getBoardData,
  senderCommand,
  startGame,
} from "@/config/socket_karas";
const PlayScreen = () => {
  const [gameOver, setGameOver] = React.useState(false);

  const gameArea = React.useRef<HTMLDivElement>(null);

  const { player, resetPlayer } = usePlayer();
  const { stage, setStage } = useStage(player, resetPlayer);
  const { gameStatus } = useGameStatus();

  const keyUp = ({ keyCode }: { keyCode: number }): void => {
    if (!gameOver) {
      // Change the droptime speed when user releases down arrow
      if (keyCode === 40) {
      }
    }
  };

  const handleStartGame = async () => {
    // Need to focus the window with the key events on start
    connectSocket();
    if (gameArea.current) gameArea.current.focus();
    // Reset everything
    startGame();
    const data = await getBoardData();
    setStage(() => data);
    await resetPlayer();
    setGameOver(false);
  };

  const move = ({
    keyCode,
    repeat,
  }: {
    keyCode: number;
    repeat: boolean;
  }): void => {
    if (!gameOver) {
      if (keyCode === 37) {
        senderCommand("left");
      } else if (keyCode === 39) {
        senderCommand("right");
      } else if (keyCode === 40) {
        // Just call once
        // if (repeat) return;
        // setDroptime(30);
        senderCommand("down");
      } else if (keyCode === 38) {
        senderCommand("up");
      }
    }
  };

  useEffect(() => {
    handleStartGame();
  }, []);

  const { disconnectWallet } = useWalletContext();
  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex={0}
      onKeyDown={move}
      onKeyUp={keyUp}
      ref={gameArea}
    >
      <StyledTetris>
        <div className="display">
          {gameOver ? (
            <>
              <Modal isOpen={gameOver} onClose={() => {}}>
                <div className="modal-game-over">
                  <div className="modal-game-star">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <StarScore isFill={false} key={index} />
                    ))}
                  </div>

                  <p className="score_txt">{gameStatus.score}</p>
                  <p className="point_txt ">POINT</p>

                  <div className="modal-finish-bottom">
                    <button
                      className="icon_btn"
                      onClick={() => {
                        handleStartGame();
                      }}
                    >
                      <Image
                        src="/assets/icons/restart.svg"
                        alt=""
                        height={24}
                        width={24}
                      />
                    </button>

                    <StyledPlayButton>Claim</StyledPlayButton>
                    <button
                      className="icon_btn"
                      onClick={async () => {
                        await disconnectWallet();
                      }}
                    >
                      <Image
                        src="/assets/icons/home.svg"
                        alt=""
                        height={24}
                        width={24}
                      />
                    </button>
                  </div>
                </div>
              </Modal>
            </>
          ) : (
            <>
              <div className="stat-control">
                <div className="stat-rows">
                  <div className="stat-col">
                    <p className="title">Score</p>
                    <p className="value">{gameStatus.score}</p>
                  </div>
                  <div className="stat-col">
                    <p className="title">Row(s)</p>
                    <p className="value">{gameStatus.rows}</p>
                  </div>
                  <div className="stat-col">
                    <p className="title">Level</p>
                    <p className="value">{gameStatus.level}</p>
                  </div>

                  <StyledBlockCorner top={0} left={0} rotate={0} />
                  <StyledBlockCorner bottom={0} left={0} rotate={-90} />
                  <StyledBlockCorner right={0} top={0} rotate={90} />
                  <StyledBlockCorner bottom={0} right={0} rotate={180} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className="icon_btn"
                    onClick={() => {
                      disconnectWallet();
                    }}
                  >
                    <Image
                      src="/assets/icons/profile.svg"
                      alt=""
                      height={24}
                      width={24}
                    />
                  </button>
                  <button className="icon_btn" onClick={async () => {}}>
                    <Image
                      src="/assets/icons/sound_on.svg"
                      alt=""
                      height={24}
                      width={24}
                    />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <Stage />
        <Image
          src="/assets/arts/teris_game.svg"
          alt=""
          height={112}
          width={112}
        />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default PlayScreen;
