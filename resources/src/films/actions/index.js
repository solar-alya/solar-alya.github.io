import axios from "axios";
import _ from "lodash";

import {
  API_KEY,
  SET_DATA_FILMS,
  SET_FILM_INFO,
  SET_NEXT_PAGE,
  SET_SEARCH,
  SET_STATUS,
  SET_SIMILAR,
  SET_NEXT_PAGE_SIMILAR,
  RESET,
} from "../constants";

/**
 * Function for requests
 * @param url - string
 * @param prevArray - array
 * @param callback - function
 * @param page - number
 * @param type - string
 */
function request(url, prevArray, callback, page, type) {
  axios
    .get(url)
    .then(response => {
      if (type === "filmInfo") {
        callback(response.data);
      } else {
        const data = _.sortBy(response.data.results, [
          function(item) {
            return item.vote_average;
          },
        ]);
        _.reverse(data);
        let dataConcat;
        if (response.data.total_pages > page && response.data.total_results > 0) {
          dataConcat = _.concat(prevArray, data);
        } else {
          dataConcat = [];
        }
        callback(dataConcat);
      }
    })
    .catch();
}

/**
 * Action sets the data for the start page
 * @returns {Function}
 */
export function getAllPopularFilms() {
  return (dispatch, getState) => {
    dispatch({
      type: RESET,
    });

    dispatch({
      type: SET_STATUS,
      payload: "popular",
    });

    const { page } = getState().films;
    const { filmsData } = getState().films;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

    function callback(data) {
      dispatch({
        type: SET_DATA_FILMS,
        payload: data,
      });

      dispatch({
        type: SET_NEXT_PAGE,
        payload: page + 1,
      });
    }

    request(url, filmsData, callback, page, "");
  };
}

/**
 * Action sets the data on scroll
 * @returns {Function}
 */
export function getMoreFilms() {
  return (dispatch, getState) => {
    const { page } = getState().films;
    const { filmsData } = getState().films;
    const { status } = getState().films;
    const { searchRequest } = getState().films;
    let url;
    if (status === "search") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchRequest}&page=${page}&include_adult=false`;
    } else if (status === "playing") {
      url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    }

    function callback(data) {
      dispatch({
        type: SET_DATA_FILMS,
        payload: data,
      });

      dispatch({
        type: SET_NEXT_PAGE,
        payload: page + 1,
      });
    }

    request(url, filmsData, callback, page, "");
  };
}

/**
 * Action set the string for search request
 * @param value - string
 * @returns {Function}
 */
export function setSearchRequest(value) {
  return dispatch => {
    dispatch({
      type: SET_SEARCH,
      payload: value,
    });
  };
}

/**
 * Action sets the data after search request
 * @returns {Function}
 */
export function getSearchResult() {
  return (dispatch, getState) => {
    dispatch({
      type: SET_DATA_FILMS,
      payload: [],
    });

    dispatch({
      type: SET_NEXT_PAGE,
      payload: 1,
    });

    dispatch({
      type: SET_STATUS,
      payload: "search",
    });

    const { filmsData } = getState().films;
    const { page } = getState().films;
    const { searchRequest } = getState().films;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchRequest}&page=${page}&include_adult=false`;

    function callback(data) {
      dispatch({
        type: SET_DATA_FILMS,
        payload: data,
      });

      dispatch({
        type: SET_NEXT_PAGE,
        payload: page + 1,
      });
    }

    request(url, filmsData, callback, page, "");
  };
}

/**
 * Action sets data to view movie details
 * @param id - string
 * @returns {Function}
 */
export function setFilmInfo(id) {
  return dispatch => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

    dispatch({
      type: RESET,
    });

    function callback(data) {
      dispatch({
        type: SET_FILM_INFO,
        payload: data,
      });
      dispatch({
        type: SET_STATUS,
        payload: "details",
      });
    }
    request(url, [], callback, 1, "filmInfo");
  };
}

/**
 * Action sets data for similar films
 * @param id - string
 * @returns {Function}
 */
export function setSimilar(id) {
  return (dispatch, getState) => {
    const { pageSimilar } = getState().films;
    const { similarFilms } = getState().films;
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=${pageSimilar}`;

    function callback(data) {
      dispatch({
        type: SET_SIMILAR,
        payload: data,
      });

      dispatch({
        type: SET_STATUS,
        payload: "similar",
      });

      dispatch({
        type: SET_NEXT_PAGE_SIMILAR,
        payload: pageSimilar + 1,
      });
    }
    request(url, similarFilms, callback, pageSimilar, "");
  };
}

/**
 * Action sets data for films witch playing now
 * @returns {Function}
 */
export function setShowNowPlaying() {
  return (dispatch, getState) => {
    dispatch({
      type: RESET,
    });

    dispatch({
      type: SET_STATUS,
      payload: "playing",
    });
    const { filmsData } = getState().films;
    const { page } = getState().films;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`;

    function callback(data) {
      dispatch({
        type: SET_DATA_FILMS,
        payload: data,
      });

      dispatch({
        type: SET_NEXT_PAGE,
        payload: page + 1,
      });
    }

    request(url, filmsData, callback, page, "");
  };
}
