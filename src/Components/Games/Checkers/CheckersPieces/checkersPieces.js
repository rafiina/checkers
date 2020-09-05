import React from "react";
import { Piece } from "../../../Piece/piece.js";

export class CheckersPawn extends React.Component {
  constructor() {
    super();

    this.clickyclick = this.clickyclick.bind(this);
  }
  clickyclick() {
    console.log("Hello");
  }

  render() {
    const { position, piece } = this.props;
    return (
      <Piece
        position={position}
        shape={piece.player[piece.shape]}
        color={piece.player.color}
        onClick={this.clickyclick}
      />
    );
  }
}

export class CheckersKing extends React.Component {
  render() {
    const { position, piece } = this.props;
    return (
      <Piece
        position={position}
        shape={piece.player[piece.shape]}
        color={piece.player.color}
      />
    );
  }
}
