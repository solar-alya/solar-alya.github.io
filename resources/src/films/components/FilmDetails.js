import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import FilmsContent from "./FilmsContent";

const FilmDetails = ({ film, showSimilar, onClickFilm, similarData, status }) => (
  <div className="content__inner">
    <div className="content__inner__top">
      <div className="content__inner__img">
        <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.original_title} />
      </div>
      <div className="content__inner__info">
        <div className="content__inner__about content__inner__info__title">
          <p>Title:</p>
          <p>{film.original_title}</p>
        </div>
        <div className="content__inner__about content__inner__info__year">
          <p>Release date:</p>
          <p>{film.release_date}</p>
        </div>
        <div className="content__inner__about content__inner__info__countries">
          <p>Production countries:</p>
          <p>{_.trimEnd(_.map(film.production_countries, "name"), ", ")}</p>
        </div>
        <div className="content__inner__about content__inner__info__budget">
          <p>Budget:</p>
          <p>
            {film.budget}
            &#36;
          </p>
        </div>
        <div className="content__inner__about content__inner__info__duration">
          <p>Duration:</p>
          <p>
            {film.runtime}
            min
          </p>
        </div>

        <div className="content__inner__info__description">
          <p>{film.overview}</p>
        </div>
        <button dataid={film.id} type="submit" className="similar button" onClick={showSimilar}>
          Similar movies
        </button>
      </div>
    </div>
    <div className="similar_wrapper">
      {similarData.length > 0 && (
        <FilmsContent status={status} onClick={onClickFilm} data={similarData} getMoreFilms={showSimilar} />
      )}
    </div>
  </div>
);

FilmDetails.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number,
  }),
  showSimilar: PropTypes.func.isRequired,
  onClickFilm: PropTypes.func.isRequired,
  similarData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ),
  status: PropTypes.string,
};

export default FilmDetails;
