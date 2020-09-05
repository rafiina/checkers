import React from "react";
import { pieceTypes } from "../../constants.js";

export function Square({ position, board, onClick }) {
  const square = board[position];
  const GamePiece =
    null !== square.piece ? pieceTypes[square.piece.shape] : null;

  return (
    <button
      className={square.classes}
      onClick={() => onClick(square.piece)}
      style={square.styles}
    >
      {null !== GamePiece ? (
        <GamePiece board={board} position={position} piece={square.piece} />
      ) : null}
    </button>
  );
}
