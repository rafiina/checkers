import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as CONSTANTS from './constants.js';


function Square({piece, row, column}) {
    return (
        <button className={row % 2 === column %2 ? "square-red" : "square-black"}>
            {piece}
        </button>
    );
}

class Board extends React.Component {

    range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

    renderSquare(row, column, cell) {
        return (
            <Square 
            piece={this.props.squares[cell]} 
            row={row}
            column={column} />
        );
    }

    renderBoard() {
        const {width, height} = this.props;

        this.range(0, height - 1).map(row => (
            <div className="board-row">
                {
                    this.range(row * width, row * width + width - 1)
                    .map((cell, column) => 
                        this.renderSquare(row, column, cell))
                }
            </div>
        ))
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
        const initialBoard = 
            [...Array(width * armyRows).fill('R'),
            ...Array(width * height - 2 * width * armyRows).fill(null),
            ...Array(width * armyRows).fill('B')
            ];
        this.state = {
            squares: initialBoard,
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
                        armyRows = {CONSTANTS.ARMY_ROWS} />
                </div>
                <div className="game-info">
                    "Placeholder Text"
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
