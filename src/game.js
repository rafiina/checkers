import { width, height, armyRows, players, boardColors } from './constants.js';
import { indexToCoordinates, unfold } from './utils.js';
import React from 'react';
import {Board} from './board.js';

export class Game extends React.Component {

    constructor() {
        super();
        this.state = {
            board: this.createBoard(),
            currentPlayer: 'Player1'
        }
        this.clickHandler = this.clickHandler.bind(this);
    }
    
    createBoard = () =>
        unfold(
            (next, done, position) =>
                position >= width * height  ? done()
                                            : next(this.createSquareInfo(position), position + 1) 
            , 0)


    squareColor(position) {
        const {row, column} = indexToCoordinates(position);
        return column % 2 === row % 2 ? boardColors.first : boardColors.second;
    }

    createSquareInfo(position) {
        const piece = this.createPiece(position);
        const squareColor = this.squareColor(position);
        const pieceColor = null !== piece ? piece.color : '';
        return (
            {
                piece: piece,
                classes: `square`,
                styles: { 
                    color: `${pieceColor}`,
                    backgroundColor: `${squareColor}`
                },
            }
        );
    }

    isPlayer1 = (position) => 
        position >= 0 && position < armyRows * width ? 'player1' : null;
    isPlayer2 = (position) => 
        position >= (height - armyRows) * width && position < width * height ? 'player2' : null;

    createPiece(position) {
        const {row, column} = indexToCoordinates(position);
        const player = this.isPlayer1(position) || this.isPlayer2(position)
        
        if (this.squareColor(position) === boardColors.second && null !== player) {
                return ({
                    row: row,
                    column: column,
                    owner: players[player].man,
                    color: players[player].color,
                });
        }

        return null;
    }

    GeneratePieces = ( start, stop, piece ) => Array.from(
        {length: (stop - start)}, 
        (_, i) => 
            ({
                row: indexToCoordinates(start + i).row,
                column: indexToCoordinates(start + i).column,
                owner: piece,
            })
        );

    clickHandler(row, column)
    {

    }
    
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        board = {this.state.board}
                        clickHandler = {this.clickHandler} />
                </div>
                <div className="game-info">
                    Current Players turn: {this.state.currentPlayer}
                </div>
            </div>
        );
    }

}