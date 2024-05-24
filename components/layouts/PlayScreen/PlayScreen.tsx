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
  const [dropTime, setDroptime] = React.useState<null | number>(null);
  const [gameOver, setGameOver] = React.useState(false);

  const gameArea = React.useRef<HTMLDivElement>(null);

  const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } =
    useGameStatus(rowsCleared);

  const movePlayer = (dir: number) => {
    if (!isColliding(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const keyUp = ({ keyCode }: { keyCode: number }): void => {
    if (!gameOver) {
      // Change the droptime speed when user releases down arrow
      if (keyCode === 40) {
        setDroptime(1000 / level + 200);
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
    setDroptime(1000);
    await resetPlayer();
    setLevel(1);
    setRows(0);
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

  const drop = async () => {
    const data = await getBoardData();
    console.log("Now Data", data);
    // setStage(() => data);
    // Increase level when player has cleared 10 rows
    // if (rows > level * 10) {
    //   setLevel((prev) => prev + 1);
    //   // Also increase speed
    //   setDroptime(1000 / level + 200);
    // }

    if (!isColliding(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        setGameOver(true);
        setDroptime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  // useInterval(() => {
  //   drop();
  // }, dropTime);
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

                  <p className="score_txt">{score}</p>
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
                    <p className="value">{score}</p>
                  </div>
                  <div className="stat-col">
                    <p className="title">Row(s)</p>
                    <p className="value">{rows}</p>
                  </div>
                  <div className="stat-col">
                    <p className="title">Level</p>
                    <p className="value">{level}</p>
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
        <Stage stage={stage} />
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
