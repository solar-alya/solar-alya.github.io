import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import InfiniteScroll from "react-infinite-scroll-component";
import PropagateLoader from "react-spinners/PropagateLoader";
import FilmItem from "./FilmItem";

const loader = (
  <div className="wrapper-loader">
    <PropagateLoader className="loader" sizeUnit="px" size={20} color="#532769" loading endMessage="END" />
  </div>
);
const FilmsContent = ({ data, getMoreFilms, onClick, status }) => (
  <div>
    {data.length > 0 && (
      <InfiniteScroll
        key={Math.random()}
        dataLength={data.length}
        next={getMoreFilms}
        hasMore
        loader={loader}
        scrollableTarget="scrollableDiv"
      >
        {data.map(film => (
          <CSSTransition key={Math.random()} timeout={500} classNames="fade">
            <FilmItem film={film} key={film.id} onClick={onClick} />
          </CSSTransition>
        ))}
      </InfiniteScroll>
    )}
    {data.length === 0 && status === "search" && <p className="error">Movie not found</p>}
  </div>
);

FilmsContent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ),
  getMoreFilms: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  status: PropTypes.string,
};

export default FilmsContent;
