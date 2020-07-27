import React from 'react';
import { indexToCoordinates } from './utils.js';
import { CheckersPiece } from './checkersPiece.js';

const pieceTypes = {
    checker: CheckersPiece,
}

export function Square({ position, board, onClick }) {
    const square = board[position];
    const coordinates = indexToCoordinates(position);
    const GamePiece = null !== square.piece ? pieceTypes[square.piece.type] : null;

    return (
        <button className={ square.classes } onClick={ () => onClick(square.piece) } style={ square.styles }>
            { 
                null !== GamePiece
                    ? 
                        <GamePiece
                            row = { coordinates.row }
                            column = { coordinates.column }
                            owner = { square.piece.owner }
                            color = { square.piece.color }
                        />
                    : null 
            }
        </button>
    );
}