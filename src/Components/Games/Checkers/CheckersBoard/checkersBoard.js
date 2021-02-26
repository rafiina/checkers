import {
  unfold,
  indexToCoordinates,
  coordinatesToIndex,
} from "../../../../utils.js";
import { Square } from "../../../Square/square.js";
import React from "react";
import {
  checkersArmyRows as armyRows,
  checkersHeight as height,
  checkersWidth as width,
} from "../../../../constants.js";

const players = {
  player1: { name: "player1", pawn: "⛀", king: "⛁", color: "#E7ECE4" },
  player2: { name: "player2", pawn: "⛂", king: "⛃", color: "#0F1108" },
};
const boardColors = { first: "#F0A868", second: "#907F9F" };
const pieceShapes = { pawn: "pawn", king: "king" };
const cssStyle = () => ({ gridTemplateColumns: `repeat(${ width }, 1fr)` });

export class CheckersBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPlayer: players.player1,
      board: this.createCheckerBoard(),
    };
    this.state = {
      board: this.getValidMoves(),
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(piece) {
    console.error(piece);
  }

  getValidMoves() {
    const newBoard = this.state.board.map((square, position, board) => {
      if (null !== square.piece) {
        const validMoves = this.calculateValidMoves(square.piece);
        const newPiece = { ...square.piece, validMoves: validMoves };
        const newSquare = { ...square, piece: newPiece };
        return newSquare;
      }
      return square;
    });
    return newBoard;
  }

  calculateValidMoves(piece) {
    const pawnPatterns = {
      player1: {
        downLeft: { row: 1, column: -1 },
        downRight: { row: 1, column: 1 },
      },
      player2: {
        upLeft: { row: -1, column: -1 },
        upRight: { row: -1, column: 1 },
      },
    };

    const kingPatterns = {
      ...pawnPatterns.player1,
      ...pawnPatterns.player2,
    };

    const { row: pieceRow, column: pieceColumn } = indexToCoordinates(
      width,
      piece.position
    );

    let validMoves = [];
    switch (piece.shape) {
      case pieceShapes.pawn:
        {
          const playerMoves = Object.values(pawnPatterns[piece.player.name]);
          playerMoves.forEach((move) => {
            const newRow = pieceRow + move["row"];
            const newColumn = pieceColumn + move["column"];
            if (this.isValidMove(newRow, newColumn)) {
              validMoves.push(coordinatesToIndex(width, newRow, newColumn));
            }
          });
        }
        break;
      case pieceShapes.king:
        {
          const playerMoves = Object.values(kingPatterns);
          playerMoves.forEach((move) => {
            const newRow = pieceRow + move["row"];
            const newColumn = pieceColumn + move["column"];
            if (this.isValidMove(newRow, newColumn)) {
              validMoves.push(coordinatesToIndex(width, newRow, newColumn));
            }
          });
        }
        break;

      default:
        break;
    }

    return validMoves;
  }

  isValidMove(row, column) {
    return this.isOnBoard(row, column) && this.squareIsEmpty(row, column);
  }

  isOnBoard(row, column) {
    return row < width && row >= 0 && column < height && column >= 0;
  }

  squareIsEmpty(row, column) {
    return (
      null === this.state.board[coordinatesToIndex(width, row, column)].piece
    );
  }

  renderSquare(index) {
    const { board } = this.state;

    return (
      <Square
        key={index}
        position={index}
        board={board}
        onClick={this.handleClick}
      ></Square>
    );
  }

  renderBoard() {
    const { board } = this.state;
    return (
      <div className="wrapper" style={cssStyle()}>
        {board.map((_, index) => this.renderSquare(index))}
      </div>
    );
  }

  createCheckerBoard = () =>
    unfold(
      (next, done, position) =>
        position >= width * height
          ? done()
          : next(this.createSquareInfo(position), position + 1),
      0
    );

  getSquareColor(position) {
    const { row, column } = indexToCoordinates(width, position);
    return column % 2 === row % 2 ? boardColors.first : boardColors.second;
  }

  createSquareInfo(position) {
    const piece = this.createPiece(position);
    const squareColor = this.getSquareColor(position);
    const pieceColor = null !== piece ? piece.player.color : "";
    return {
      piece: piece,
      classes: "square",
      styles: {
        color: `${pieceColor}`,
        backgroundColor: `${squareColor}`,
      },
    };
  }

  isPlayer1 = (position) => position >= 0 && position < armyRows * width;
  isPlayer2 = (position) =>
    position >= (height - armyRows) * width && position < width * height;
  getPlayer = (position) =>
    this.isPlayer1(position)
      ? players.player1
      : this.isPlayer2(position)
      ? players.player2
      : null;

  createPiece(position) {
    const player = this.getPlayer(position);

    if (
      this.getSquareColor(position) === boardColors.second &&
      null !== player
    ) {
      return {
        position: position,
        shape: pieceShapes.pawn,
        player: player,
        validMoves: [],
      };
    }

    return null;
  }

  render() {
    return <div>{this.renderBoard()}</div>;
  }
}
