import React from "react";
import { Piece } from "../../../Piece/piece.js";

export class CheckersMan extends React.Component {
  render() {
    const { position, piece } = this.props;
    return (
      <Piece
        position={position}
        shape={piece.player.man}
        color={piece.player.color}
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
        shape={piece.player.man}
        color={piece.player.color}
      />
    );
  }
}
