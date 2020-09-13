import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}> 
      {props.value}
    </button>
  ); 
}
  
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null
    };
  }

  clearBoard() {
    const squares = Array(9).fill(null);
    const currentPlayer = 'X';
    const winner = null;
    this.setState({
      squares: squares, 
      currentPlayer: currentPlayer,
      winner: winner});
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    // Create a copy of the squares property array
    const squares = this.state.squares.slice();

    // Prevent overriding existing square value
    if (squares[i] !== null) {
      return;
    }

    // if board is in winning state, prevent updating the game board
    if (this.getWinner()) {
      return;
    }

    // Set the chosen square's value to match the current player's marker
    squares[i] = this.state.currentPlayer;
    // Set the property state to the modified squares array
    this.setState({squares: squares});
    // Switch Players
    this.setState({currentPlayer: this.switchPlayers()});
  }

  // Check board state and return a winner if one exists
  getWinner() {
    var winner = null;
    var mark = 'X';
    if (this.rowFilled(0, mark) || 
        this.rowFilled(1, mark) || 
        this.rowFilled(2, mark) ||
        this.columnFilled(0, mark) ||
        this.columnFilled(1, mark) ||
        this.columnFilled(2, mark) || 
        this.diagonalFilled('southeast', mark) ||
        this.diagonalFilled('southwest', mark)) {
      winner = mark;
    }
    else {
      mark = 'O';
      if (
        this.rowFilled(0, mark) || 
        this.rowFilled(1, mark) || 
        this.rowFilled(2, mark) ||
        this.columnFilled(0, mark) ||
        this.columnFilled(1, mark) ||
        this.columnFilled(2, mark) || 
        this.diagonalFilled('southeast', mark) ||
        this.diagonalFilled('southwest', mark)
      ) {
        winner = mark;
      }

    }
    return winner;
  }

  // Returns true if a horizontal row is filled with given character
  rowFilled(row, mark) {
    const squares = this.state.squares.slice();
    var start = row*3;
    return (squares[start] === mark && 
            squares[start+1] === mark &&
            squares[start+2] === mark
    );
  }

  // Returns true if a vertical column is filled with given character
  columnFilled(column, mark) {
    const squares = this.state.squares.slice();
    return (squares[column] === mark &&
            squares[column+3] === mark &&
            squares[column+6] === mark
    );
  }

  // Returns true if the given diagonal is filled with the given character
  diagonalFilled(diag, mark) {
    var start = null;
    const squares = this.state.squares.slice();
    if (diag === 'southeast') {
      start = 0;
      return (squares[start] === mark &&
              squares[start + 4] === mark &&
              squares[start + 8] === mark
      );
    }
    else if (diag === 'southwest') {
      start = 2;
      return (squares[start] === mark &&
        squares[start + 2] === mark &&
        squares[start + 4] === mark
      ); 
    }
    else {
      return false;
    }
  }

  // Switches the current player
  switchPlayers() {
    if (this.state.currentPlayer === 'X') {
      return 'O';
    }
    else {
      return 'X';
    }
  }

  render() {
    let status = 'Next player: ' + this.state.currentPlayer;
    // See if board is in winning state
    const winner = this.getWinner();
    if (winner) {
      status = 'Player ' + winner + ' wins!';
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <hr></hr>
        <button 
          className="start-over" 
          onClick={() => this.clearBoard()}>
            Start Over
        </button>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);