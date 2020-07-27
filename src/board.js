import {Square} from './square.js';
import React from 'react';

export class Board extends React.Component {

    renderSquare(square, index) {
        return (
            <Square
                key={index}
                piece={square.piece}
                classes={square.classes}
                inlineStyles={square.styles}
                onClick={() => this.props.clickHandler(1, 2)}
            >
            </Square>
        );
    }

    renderBoard() {
        const {board} = this.props;
        return (
            <div className="wrapper">
                {
                    board.map((square, index) =>
                        this.renderSquare(square, index))
                }
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderBoard()}
            </div>
        );
    }
}