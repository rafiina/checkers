import React from "react";

export function Piece({ onClick, className, position, shape, color }) {
  return <span onClick={() => onClick()}>{shape}</span>;
}
