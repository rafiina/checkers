import React from "react";
import { gameBoards } from "../../constants.js";

export class App extends React.Component {
  constructor() {
    super();
    const initialGameBoard = "checkers";
    this.state = {
      currentPlayer: "player1",
      gameBoard: gameBoards[initialGameBoard],
    };
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(e) {
    this.setState({
      gameBoard: gameBoards[e.target.value],
    });
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <this.state.gameBoard />
        </div>
        <div className="game-info">
          Current Players turn: {this.state.currentPlayer}
          <select
            name="game-type"
            defaultValue={this.state.gameType}
            onChange={this.handleSelection}
          >
            <option value="checkers">Checkers</option>
            <option value="chess">Chess</option>
          </select>
        </div>
      </div>
    );
  }
}
