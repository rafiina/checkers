import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as CONSTANTS from './constants.js';


function Square({piece, pieceState, row, column, clickHandler}) {
    function handleClick() {
        clickHandler(piece, row, column);
    }

    return (
        <button className={row % 2 === column %2 ? "square-red" : "square-black"} style={pieceState} onClick={handleClick}>
            {piece}
        </button>
    );
}

class Board extends React.Component {

    range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

    renderSquare(row, column, cell) {
        return (
            <Square 
            piece={this.props.squares.pieces[cell]} 
            pieceState={this.props.squares.state[cell]}
            row={row}
            column={column} 
            clickHandler={this.props.clickHandler} />
        );
    }
    
    renderBoard() {
        const {width, height} = this.props;
        return this.range(0, height - 1).map(row => (
            <div className="board-row">
                {
                    this.range(row * width, row * width + width - 1)
                        .map((cell, column) => this.renderSquare(row, column, cell))
                }
            </div>
        ));
    }
    render() {
        return (
            <div>
                {this.renderBoard()}
            </div>
        );
    }
}

class Game extends React.Component {

    constructor() {
        super();
        const width = CONSTANTS.BOARD_WIDTH;
        const height = CONSTANTS.BOARD_HEIGHT;
        const armyRows = CONSTANTS.ARMY_ROWS;
        const initialBoardPieces = 
            [...Array(width * armyRows).fill('R'),
            ...Array(width * height - 2 * width * armyRows).fill(null),
            ...Array(width * armyRows).fill('B')
            ];
        const initialPieceStates = Array(width * height).fill(null);
        this.state = {
            squares: 
            {
                pieces: initialBoardPieces,
                state: initialPieceStates,
            },
            turn: 'R'
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(piece, row, column)
    {
        if (piece == this.state.turn)
        {
            const newStates = Array(CONSTANTS.BOARD_WIDTH * CONSTANTS.BOARD_HEIGHT).fill(null);
            const newPieces = this.state.squares.pieces;

            newStates[row * CONSTANTS.BOARD_WIDTH + column] = {backgroundColor: '#550'}
            this.setState({
                squares: {
                    pieces: newPieces, 
                    state: newStates,
                },
            });
        }
    }
    
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares = {this.state.squares} 
                        width = {CONSTANTS.BOARD_WIDTH}
                        height = {CONSTANTS.BOARD_HEIGHT}
                        armyRows = {CONSTANTS.ARMY_ROWS}
                        clickHandler = {this.clickHandler} />
                </div>
                <div className="game-info">
                    Current Players turn: {this.state.turn == 'R' ? 'Red' : 'Black'}
                </div>
            </div>
        );
    }

}

ReactDOM.render (
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
}
