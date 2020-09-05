import {
  CheckersPawn,
  CheckersKing,
} from "./Components/Games/Checkers/CheckersPieces/checkersPieces.js";
import { CheckersBoard } from "./Components/Games/Checkers/CheckersBoard/checkersBoard.js";

export const checkersWidth = 8;
export const checkersHeight = 8;
export const checkersArmyRows = 3;

export const pieceTypes = {
  pawn: CheckersPawn,
  king: CheckersKing,
};

export const gameBoards = {
  checkers: CheckersBoard,
};
