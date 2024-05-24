import { PLAYER } from "@/hooks/usePlayer";
import { ACCESS_TOKEN, Direction } from "@/utils/constants";
import { getCookie } from "@/utils/cookie";

import { Socket, io } from "socket.io-client";

export let socketGame2048: Socket;

export const connectSocket = () => {
  socketGame2048 = io(
    process.env.PUBLIC_NEXT_TETRIS || "http://localhost:5003",
    {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`,
          },
        },
      },
    }
  );

  socketGame2048.on("connect", () => {
    console.log("Connected to the server");
  });
};

// Sender Action
export const senderCommand = (direction: Direction) => {
  socketGame2048.emit("command", {
    direction,
  });
};

export const startGame = () => {
  socketGame2048.emit("startNewGame");
};
export const pauseGame = () => {
  socketGame2048.emit("pause");
};

export const resumeGame = () => {
  socketGame2048.emit("resume");
};

export const claimPoint = () => {
  socketGame2048.emit("claimPoint");
};
export const disconnectSocket = () => {
  socketGame2048.disconnect();
};

export function getBoardData(): Promise<number[][]> {
  return new Promise((resolve) => {
    socketGame2048.on("board-updated", (data) => {
      resolve(data);
    });
  });
}

export function getPlayerData(): Promise<PLAYER> {
  return new Promise((resolve) => {
    socketGame2048.on("player-updated", (data) => {
      resolve(data);
    });
  });
}

type GetPointData = {
  point: number;
  claimable: boolean;
};
export function getGamePoint(): Promise<GetPointData> {
  return new Promise((resolve) => {
    socketGame2048.on("game-point", (data) => {
      resolve(data);
    });
  });
}

export type InFoClaimPoint = {
  userAddress: string;
  point: number;
  timestamp: number;
  proof: string[];
};
export function getClaimPointInfo(): Promise<InFoClaimPoint> {
  return new Promise((resolve) => {
    socketGame2048.on("claim-point", (data) => {
      resolve(data);
    });
  });
}
