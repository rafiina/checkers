import { width, height, armyRows, boardColors, players } from './constants.js';
import { unfold, indexToCoordinates } from './utils.js';

export const createCheckerBoard = () =>
    unfold(
        (next, done, position) =>
            position >= width * height  ? done()
                                        : next(createSquareInfo(position), position + 1) 
        , 0)


function squareColor(position) {
    const { row, column } = indexToCoordinates(position);
    return column % 2 === row % 2 ? boardColors.first : boardColors.second;
}

function createSquareInfo(position) {
    const piece = createPiece(position, 'checker');
    const newSquareColor = squareColor(position);
    const pieceColor = null !== piece ? piece.color : '';
    return (
        {
            piece: piece,
            classes: `square`,
            styles: { 
                color: `${pieceColor}`,
                backgroundColor: `${newSquareColor}`
            },
        }
    );
}

const isPlayer1 = (position) => 
    position >= 0 && position < armyRows * width ? 'player1' : null;
const isPlayer2 = (position) => 
    position >= (height - armyRows) * width && position < width * height ? 'player2' : null;

function createPiece(position, pieceType) {
    const { row, column } = indexToCoordinates(position);
    const player = isPlayer1(position) || isPlayer2(position)
    
    if (squareColor(position) === boardColors.second && null !== player) {
        return (
                {
                    row: row, 
                    column: column, 
                    owner: players[player].man, 
                    color: players[player.color],
                    type: pieceType,
                }
            );
    }

    return null;
}