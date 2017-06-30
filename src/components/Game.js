import React, { Component } from 'react';
import Board from './Board';
import calculateWinner from '../helpers/calculateWinner';
import '../styles/index.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        clickedCell: [0, 0],
      }],
      stepNumber: 0,
      xIsNext: true,
      sort: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        clickedCell: [i % 3 + 1, Math.floor(i / 3) + 1],
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  toggleSort() {
    this.setState ({
      sort: !this.state.sort,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerData = calculateWinner(current.squares);
    const winnerLine = (winnerData ? winnerData.line : []);
    const winner = (winnerData ? winnerData.winner : null);
    const moves = history.map((step, move) => {
      const clickedCell = step.clickedCell;
      const desc = move ?
        'Move #' + move + ' | cell coordinate - (' + clickedCell[0] + ',' + clickedCell[1] + ')':
        'Game start';
      if (move == history.length - 1) {
        return (
          <li key={move}>
            <a href="#" onClick={() => this.jumpTo(move)} className="active-move" style={{fontWeight: "bold"}}>{desc}</a>
          </li>
        );
      } else {
        return (
          <li key={move}>
            <a href="#" onClick={() => this.jumpTo(move)} className="active-move">{desc}</a>
          </li>
        );
      }
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <h1>React-Tac-Toe</h1>
        <div className="game-space">
          <div className="game-board">
            <Board
              squares={current.squares}
              whenClick={(i) => this.handleClick(i)}
              winnerLine = {winnerLine}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <hr />
            <button className="btn" onClick={() => this.toggleSort()}>{ this.state.sort ? 'Toggle Ascending' : 'Toggle Descending' }</button>
            <ol>{ this.state.sort ? moves : moves.reverse() }</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
