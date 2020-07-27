import { CheckersPiece } from "./checkersPiece";

export const width = 8;
export const height = 8;
export const armyRows = 3;
export const players = 
    {
        player1: { man: '⛀', king: '⛁', color: '#D7FCD4' },
        player2: { man: '⛂', king: '⛃', color: '#0F1108'},
    }
export const boardColors = { first: '#F0A868', second: '#907F9F' }
export const pieceTypes = {
    checker: CheckersPiece,
}