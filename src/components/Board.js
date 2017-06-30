import React, { Component } from 'react';
import Square from './Square';
import '../styles/index.css';

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key = {i}
        value={this.props.squares[i]}
        whenClick={() => this.props.whenClick(i)}
        highlight={this.props.winnerLine.includes(i)}
      />
    );
  }

  render() {
    var wrapper = [];
    for (var i = 0; i <= 2; i++) {
      var row = [];
      for (var j = 3 * i; j <= 3 * i + 2; j++) {
        row.push(this.renderSquare(j));
      }
      wrapper.push(<div className="board-row" key={i}>{row}</div>);
    }
    return (
      <div>
        {wrapper}
      </div>
    );
  }
}

export default Board;
