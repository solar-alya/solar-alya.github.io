import { combineReducers } from "redux";

import {
  SET_SQUARES,
  SET_STORAGE,
  RESET,
  SET_PLAYER,
  BLACK_TO_CAPTIVES,
  WHITE_TO_CAPTIVES
} from "../constants";

const initialState = {
  squares: {},
  player: 1,
  whiteCaptives:[],
  blackCaptives:[]
};

function chess(state = initialState, action) {
  switch (action.type) {
    case RESET:
      return initialState;
    case SET_STORAGE:
      console.log('squares',typeof action.payload.squares)
      return action.payload;
    case SET_SQUARES:

      return { ...state, squares: action.payload };
    case SET_PLAYER:
      return { ...state, player: action.payload };
    case WHITE_TO_CAPTIVES:
      return { ...state, blackCaptives: action.payload };
    case BLACK_TO_CAPTIVES:
      return { ...state, whiteCaptives: action.payload };
    default:
      return state;
  }
}

const reducers = combineReducers({
  chess,
});

export default reducers;
