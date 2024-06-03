import React, { useState } from "react";
import "./App.css";

function Square({ value, onClick, isWinningSquare }) {
  return (
    <button
      className={`square ${isWinningSquare ? "winner" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board({ squares, onClick, winningSquares }) {
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinningSquare={winningSquares.includes(i)}
      />
    );
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [draws, setDraws] = useState(0);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const winnerInfo = calculateWinner(newSquares);
    if (winnerInfo) {
      setWinner(winnerInfo.player);
      if (winnerInfo.player === "X") {
        setXScore(xScore + 1);
      } else if (winnerInfo.player === "O") {
        setOScore(oScore + 1);
      }
    } else if (!newSquares.includes(null)) {
      setDraws(draws + 1);
      setWinner("Draw");
    }
  };

  const handlePlayAgain = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const winnerInfo = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;
  const winningSquares = winnerInfo ? winnerInfo.line : [];

  return (
    <div className="game">
      <div className="scoreboard">
        <div>Player X: {xScore}</div>
        <div>Player O: {oScore}</div>
        <div>Draws: {draws}</div>
      </div>
      <div className="game-board">
        <div className="status">{status}</div>
        <Board
          squares={squares}
          onClick={handleClick}
          winningSquares={winningSquares}
        />
        <button className="play-again-button" onClick={handlePlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: lines[i] };
    }
  }
  return null;
}

function App() {
  return (
    <div className="game">
      <div className="game-board">
        <Game />
      </div>
    </div>
  );
}

export default App;
