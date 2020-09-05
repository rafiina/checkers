import { unfold, indexToCoordinates } from "../../../../utils.js";
import { Square } from "../../../Square/square.js";
import React from "react";

export const width = 8;
export const height = 8;
export const armyRows = 3;
export const players = {
  player1: { man: "⛀", king: "⛁", color: "#E7ECE4" },
  player2: { man: "⛂", king: "⛃", color: "#0F1108" },
};
export const boardColors = { first: "#F0A868", second: "#907F9F" };

export class CheckersBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      board: this.createCheckerBoard(),
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(piece) {
    console.error(piece);
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
      <div className="wrapper">
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
      ? players["player1"]
      : this.isPlayer2(position)
      ? players["player2"]
      : null;

  createPiece(position) {
    const player = this.getPlayer(position);

    if (
      this.getSquareColor(position) === boardColors.second &&
      null !== player
    ) {
      return {
        position: position,
        type: "checkersMan",
        player: player,
      };
    }

    return null;
  }

  render() {
    return <div>{this.renderBoard()}</div>;
  }
}
