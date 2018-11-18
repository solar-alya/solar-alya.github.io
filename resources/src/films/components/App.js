import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getAllPopularFilms,
  getMoreFilms,
  getSearchResult,
  setSearchRequest,
  setFilmInfo,
  setSimilar,
  setShowNowPlaying,
} from "../actions";
import "../assets/App.scss";

import FilmsContent from "./FilmsContent";
import SerchIcon from "./svg/SerchIcon";
import FilmDetails from "./FilmDetails";

class App extends React.Component {
  static propTypes = {
    getAllPopularFilms: PropTypes.func.isRequired,
    getMoreFilms: PropTypes.func.isRequired,
    getSearchResult: PropTypes.func.isRequired,
    setSearchRequest: PropTypes.func.isRequired,
    setFilmInfo: PropTypes.func.isRequired,
    setSimilar: PropTypes.func.isRequired,
    setShowNowPlaying: PropTypes.func.isRequired,

    filmsData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }),
    ),
    filmInfo: PropTypes.shape({
      id: PropTypes.number,
    }),
    similarFilms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }),
    ),
    status: PropTypes.string,
    searchRequest: PropTypes.string,
  };

  componentWillMount() {}

  componentDidMount() {
    this.props.getAllPopularFilms();
  }

  getAllPopularFilms = () => {
    this.props.getAllPopularFilms();
  };

  getSearchResult = () => {
    this.props.getSearchResult();
  };

  getSearchResultByKey = event => {
    if (event.key === "Enter") {
      this.props.getSearchResult();
    }
  };

  getMoreFilms = () => {
    this.props.getMoreFilms();
  };

  onChangeSearch = e => {
    this.props.setSearchRequest(e.target.value);
  };

  onClickFilm = e => {
    this.props.setFilmInfo(e.target.attributes.getNamedItem("dataid").value);
    window.scrollTo(0, 0);
  };

  showSimilar = () => {
    this.props.setSimilar(this.props.filmInfo.id);
  };

  showNowPlaying = () => {
    this.props.setShowNowPlaying();
  };

  render() {
    return (
      <div className="wrapper">
        <div className="header">
          <div className="header__inner">
            <a href="/" className="header__inner__logo" onClick={this.getAllPopularFilms}>
              Solar Movies
            </a>
            <nav className="menu">
              <button className="button" type="submit" onClick={this.showNowPlaying}>
                Now in the cinema
              </button>
              <div className="search">
                <input
                  type="text"
                  className="search__input"
                  onChange={this.onChangeSearch}
                  onKeyPress={this.getSearchResultByKey}
                  value={this.props.searchRequest}
                />
                <button className="search__btn" type="submit" onClick={this.getSearchResult}>
                  <SerchIcon />
                </button>
              </div>
            </nav>
          </div>
        </div>
        <div className="content">
          {this.props.status === "details" || this.props.status === "similar" ? (
            <FilmDetails
              status={this.props.status}
              showSimilar={this.showSimilar}
              film={this.props.filmInfo}
              onClickFilm={this.onClickFilm}
              similarData={this.props.similarFilms}
            />
          ) : (
            <FilmsContent
              status={this.props.status}
              onClick={this.onClickFilm}
              data={this.props.filmsData}
              getMoreFilms={this.getMoreFilms}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filmsData: state.films.filmsData,
    searchRequest: state.films.searchRequest,
    filmInfo: state.films.filmInfo,
    status: state.films.status,
    similarFilms: state.films.similarFilms,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPopularFilms() {
      dispatch(getAllPopularFilms());
    },
    getMoreFilms() {
      dispatch(getMoreFilms());
    },
    getSearchResult() {
      dispatch(getSearchResult());
    },
    setSearchRequest(value) {
      dispatch(setSearchRequest(value));
    },
    setFilmInfo(id) {
      dispatch(setFilmInfo(id));
    },
    setSimilar(id) {
      dispatch(setSimilar(id));
    },
    setShowNowPlaying() {
      dispatch(setShowNowPlaying());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
