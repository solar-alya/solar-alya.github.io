import _ from "lodash";

import {
  RESET,
  SET_SQUARES,
  SET_STORAGE,
  SET_PLAYER,
  BLACK_TO_CAPTIVES,
  WHITE_TO_CAPTIVES
} from "../constants";
import Pawn from "../components/figures/Pawn";
import Knight from "../components/figures/Knight";

let board = [];
let squares = [];

/**
 * Definition of even cells
 * @param cell
 * @returns {boolean}
 */
function isEven(cell){
  return cell % 2 === 0
}

/**
 * Sets current player
 * @param dispatch
 * @param player
 */
function setPlayer(dispatch, player) {
  dispatch({
    type: SET_PLAYER,
    payload: player
  });
}

/**
 * Sets board from local storage
 * @param dispatch
 * @param data
 */
function setFromLocalStorage(dispatch, data) {
  _.map(data.squares, (item,i) => {
    squares[i] = [];
    item.map(function(it, ind){
      if(it[0].figure !== undefined) {
        squares[i][ind] = [];
        if(it[0].figure === 'pawn'){
          squares[i][ind].push(Pawn.createFromStaticObject(it[0]))
        } else if(it[0].figure === 'knight'){
          squares[i][ind].push(Knight.createFromStaticObject(it[0]))
        }
        squares[i][ind].push(it[1])
      } else {
        squares[i][ind] = it;
      }
    })
  });

  dispatch({
    type: SET_STORAGE,
    payload: {
      player: data.player,
      squares,
      whiteCaptives: data.whiteCaptives,
      blackCaptives: data.blackCaptives
    }
  });
}

/**
 * Sets board to initial state
 * @param dispatch
 * @param getState
 */
function setInitialState(dispatch, getState) {
  for(let i = 0; i < 8; i++){
    const rows = [];
    for(let j = 0; j < 8; j++){
      rows.push(
        {
          cellColor: (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j)) ? "cell cell--light" : "cell cell--dark",
          item: (i*8) + j
        }
      )
    }
    board.push(rows);
  }

  for(let i = 8; i < 16; i++){
    squares[i] = new Pawn(2, '#000');
    squares[i+40] = new Pawn(1, '#fff');
  }
  squares[1] = new Knight(2, '#000');
  squares[6] = new Knight(2, '#000');
  squares[57] = new Knight(1, '#fff');
  squares[62] = new Knight(1, '#fff');

  _.map(board, (item,index) => {
    _.map(item, (it,ind) => {
      if(squares[it.item]) {
        board[index][ind] = (_.concat(squares[it.item], it))
      } else {
        board[index][ind] = (_.concat({}, it));
      }
    })
  });

  dispatch({
    type: SET_SQUARES,
    payload: board
  });
  const {chess} = getState();
  localStorage.setItem('solarChess', JSON.stringify(chess))
}

/**
 * Sets new board state after move
 * @param squares
 * @returns {Function}
 */
export function setNewSquares(squares) {
  return (dispatch, getState) => {
    const newSquares = Object.assign({}, squares);
    dispatch({
      type: SET_SQUARES,
      payload: newSquares
    });
    const playerNew = parseInt(getState().chess.player) === 1 ? 2 : 1
    setPlayer(dispatch, playerNew)
  };
}

/**
 * Determines which board to load
 * @returns {Function}
 */
export function setSquares() {
  return (dispatch, getState) => {
    const data = JSON.parse(localStorage.getItem('solarChess'));
    if(data === null) {
      setInitialState(dispatch, getState);
    } else {
      setFromLocalStorage(dispatch, data);
    }
  };
}

/**
 * Saves board to local storage
 * @returns {Function}
 */
export function saveGame() {
  return (dispatch, getState) => {
   const {chess} = getState();
    localStorage.setItem('solarChess', JSON.stringify(chess))
  }
}

/**
 * Resets the state of the board to the original
 * @returns {Function}
 */
export function resetGame() {
  return (dispatch, getState) => {
    board = [];
    squares = [];
    localStorage.removeItem('solarChess');
    dispatch({
      type: RESET,
    });
    setInitialState(dispatch, getState)
  }
}

/**
 * Loads a saved game
 * @returns {Function}
 */
export function loadGame() {
  return (dispatch) => {
    const data = JSON.parse(localStorage.getItem('solarChess'));
    setFromLocalStorage(dispatch, data);
  }
}

/**
 * Pushes captured figures in captivity
 * @param figure
 * @returns {Function}
 */
export function pushToCaptivity(figure) {
  return (dispatch, getState) => {
    const {player} = getState().chess;
    const {blackCaptives} = getState().chess;
    const {whiteCaptives} = getState().chess;
    if(player === 2) {
      blackCaptives.push(figure);
      dispatch({
        type: WHITE_TO_CAPTIVES,
        payload: blackCaptives
      });
    }else {
      whiteCaptives.push(figure);
      dispatch({
        type: BLACK_TO_CAPTIVES,
        payload: whiteCaptives
      });
    }
  }
}
