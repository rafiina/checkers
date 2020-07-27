import { Square } from './square.js';
import React from 'react';

export class Board extends React.Component {

    renderSquare(index) {
        const { board } = this.props;

        return (
            <Square
                key={ index }
                position={ index }
                board={ board }
                onClick={ this.props.onClick }
            >
            </Square>
        );
    }

    renderBoard() {
        const { board } = this.props;
        return (
            <div className="wrapper">
                {
                    board.map((_, index) =>
                        this.renderSquare(index))
                }
            </div>
        );
    }

    render() {
        return (
            <div>
                { this.renderBoard() }
            </div>
        );
    }
}