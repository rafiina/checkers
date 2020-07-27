import React from 'react'
import { Piece } from './piece.js'

export function CheckersPiece({ row, column, owner, color }) {
    function findMoves() {
        // TODO
    }

    return (
        <Piece 
            row={ row }
            column={ column }
            owner={ owner }
            color={ color }
        />
    )
}