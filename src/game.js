import React from 'react';
import { Board } from './board.js';
import { createCheckerBoard } from './checkerboard.js'

export class Game extends React.Component {

    constructor() {
        super();
        const initialGameType = 'checkers';
        this.state = {
            board: this.createBoard(initialGameType),
            currentPlayer: 'Player1',
            gameType: initialGameType,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }
    
    createBoard(gameType) {
        switch (gameType || 'checkers') {
            case 'checkers':
                return createCheckerBoard();
        
            default:
                return null;
        }
    }

    handleClick(piece)
    {
        console.error(piece);
    }
   
    handleSelection(e) {
        this.setState({ 
            board: this.createBoard(e.target.value),
            currentPlayer: 'Player1',
            gameType: e.target.value,
        });
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        board = { this.state.board }
                        onClick = { this.handleClick } />
                </div>
                <div className="game-info">
                    Current Players turn: { this.state.currentPlayer }
                    <select name="game-type" defaultValue = { this.state.gameType } onChange={ this.handleSelection }>
                        <option value="checkers">Checkers</option>
                        <option value="chess">Chess</option>
                    </select>
                </div>
            </div>
        );
    }

}