import React from "react";
import PropTypes from "prop-types";
import StarIcon from "./svg/StarIcon";

const FilmItem = ({ film, onClick }) => (
  <div className="film_card" key={Math.random()}>
    <div className="film_card__img">
      <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} />
    </div>
    <p className="film-title">{film.title}</p>
    <div className="film-info">
      <p className="release-date">{film.release_date}</p>
      <div className="vote-average">
        <div className="vote-avarage__icon">
          <StarIcon />
        </div>
        <p className="vote-average__rating">{film.vote_average}</p>
      </div>
    </div>
    <div className="film_card__description">
      <p className="film-title">{film.title}</p>
      <p className="film_card__description__inner">{film.overview}</p>
      <button className="button" type="submit" dataid={film.id} onClick={onClick}>
        Read more
      </button>
    </div>
  </div>
);

FilmItem.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number,
  }),
  onClick: PropTypes.func.isRequired,
};

export default FilmItem;
