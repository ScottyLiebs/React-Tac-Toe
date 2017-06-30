import React from 'react';
import Board from './Board';
import '../styles/index.css';

function Square(props) {
  if (props.highlight) {
    return (
      <button className="square" onClick={props.whenClick} style={{color: "blue"}}>
        {props.value}
      </button>
    );
  } else {
    return (
      <button className="square" onClick={props.whenClick}>
        {props.value}
      </button>
    );
  }
}

export default Square;
