import {
  CheckersMan,
  CheckersKing,
} from "./Components/Games/Checkers/CheckersPieces/checkersPieces.js";
import { CheckersBoard } from "./Components/Games/Checkers/CheckersBoard/checkersBoard.js";

const pieceTypes = {
  checkersMan: CheckersMan,
  checkersKing: CheckersKing,
};

const gameBoards = {
  checkers: CheckersBoard,
};

export { pieceTypes, gameBoards };
