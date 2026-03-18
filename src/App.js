import { useState } from 'react';
/*
un componente es un fragmento de código reutilizable que representa una parte de una interfaz de usuario. 
Los componentes se utilizan para renderizar, gestionar y actualizar los elementos de la interfaz de usuario en tu aplicación.
*/


//--------------------------------------------------
/*
export default function Square() {
  return <button className="square">X</button>;
}
*/
//--------------------------------------------------

//Los componentes de React deben devolver un solo elemento JSX y no varios elementos JSX adyacentes como dos botones.

//Solucion:


//--------------------------------------------------
/*
export default function Board()  { //Cambamos de Square a Board
  return (
    <>
      <div className="board-row">
        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
      </div>
      <div className="board-row">
        <button className="square">4</button>
        <button className="square">5</button>
        <button className="square">6</button>
      </div>
      <div className="board-row">
        <button className="square">7</button>
        <button className="square">8</button>
        <button className="square">9</button>
      </div>
    </>
  );
}
*/
//--------------------------------------------------

//Se quiere cambiar el valor de un cuadro de vacío a "X" cuando el usuario haga clic en el cuadrado

/*
function Square() {
  return <button className="square">1</button>;
}  
*/

//--------------------------------------------------


function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


//Luego:
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  /*
  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = 'X';
    setSquares(nextSquares);
  }
  */

  /*
  function handleClick(i) {
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } 
    else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  */

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}


//Ahora cada casilla dice "1". Para solucionar esto, usarás props para pasar el valor que debe tener cada casilla del componente padre () a su hijo ().BoardSquare

//--------------------------------------------------
/*
function Square({ value }) {
  return <button className="square">{value}</button>;
}
*/
//--------------------------------------------------



//Creación de un componente interactivo 
/*
function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
*/


function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

//Por qué la inmutabilidad es importante

/*
Generalmente existen dos enfoques para cambiar datos.
 El primer enfoque es mutar los datos cambiando directamente los valores 
 de los mismos. El segundo enfoque es reemplazar los datos por 
 una nueva copia que tenga los cambios deseados. Así es como se vería
si mutaras el arreglo:


const squares = [null, null, null, null, null, null, null, null, null];
squares[0] = 'X';

// Now `squares` is ["X", null, null, null, null, null, null, null, null];



Y así es como se vería si cambiaras los datos sin mutar el array:squares

const squares = [null, null, null, null, null, null, null, null, null];
const nextSquares = ['X', null, null, null, null, null, null, null, null];

// Now `squares` is unchanged, but `nextSquares` first element is 'X' rather than `null`

*/

/*
Declarar un ganador 
Ahora que los jugadores pueden turnarse, querrás mostrar cuándo se ha ganado
 el juego y no quedan más turnos por hacer. Para ello, añadirás una función
  auxiliar llamada que toma un array de 9 casillas, marca un ganador y
  devuelve , , o según corresponda. No te preocupes demasiado por la función;
  no es específico de React:calculateWinner'X''O'nullcalculateWinner
*/

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//Como ejercicio final, hagamos posible "volver atrás en el tiempo" a los movimientos anteriores del juego.

/*
Almacenarás los arrays pasados en otro array llamado , que guardarás como una nueva variable de estado. El array representa todos los estados del tablero, desde el primero hasta el último movimiento, y tiene una forma así:squareshistoryhistory
*/

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

