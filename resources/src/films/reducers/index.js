import { combineReducers } from "redux";

import {
  SET_DATA_FILMS,
  SET_NEXT_PAGE,
  SET_SEARCH,
  SET_STATUS,
  SET_FILM_INFO,
  SET_SIMILAR,
  SET_NEXT_PAGE_SIMILAR,
  RESET,
} from "../constants";

const initialState = {
  filmsData: [],
  similarFilms: [],
  page: 1,
  pageSimilar: 1,
  searchRequest: "",
  filmInfo: {},
  status: "popular",
};

function films(state = initialState, action) {
  switch (action.type) {
    case RESET:
      return initialState;
    case SET_DATA_FILMS:
      return { ...state, filmsData: action.payload };
    case SET_NEXT_PAGE:
      return { ...state, page: action.payload };
    case SET_NEXT_PAGE_SIMILAR:
      return { ...state, pageSimilar: action.payload };
    case SET_SEARCH:
      return { ...state, searchRequest: action.payload };
    case SET_STATUS:
      return { ...state, status: action.payload };
    case SET_FILM_INFO:
      return { ...state, filmInfo: action.payload };
    case SET_SIMILAR:
      return { ...state, similarFilms: action.payload };
    default:
      return state;
  }
}

const reducers = combineReducers({
  films,
});

export default reducers;

// import { combineReducers } from "redux";
//
// import {
//     SET_DATA_FILMS,
//     SET_NEXT_PAGE,
//     SET_SEARCH,
//     SET_SEARCH_RESULT,
//     SET_FILM_INFO
// } from "../constants";
//
// const initialState = {
//     allPopularFilms:[],
//     searchResult: [],
//     similarFilms: [],
//     page: 1,
//     searchRequest: '',
//     filmInfo:[]
// };
//
// function films(state = initialState, action) {
//     switch (action.type) {
//         case SET_DATA_FILMS:
//             return { ...state, allPopularFilms: action.payload};
//         case SET_NEXT_PAGE:
//             return { ...state, page: action.payload };
//         case SET_SEARCH:
//             return { ...state, searchRequest: action.payload,  };
//         case SET_SEARCH_RESULT:
//             return { ...state, searchResult: action.payload};
//         case SET_FILM_INFO:
//             return { ...state, filmInfo: action.payload };
//         default:
//             return state;
//     }
// }
//
// const reducers = combineReducers({
//     films,
// });
//
// export default reducers;
