import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Carousel({ movies }) {
  function scroll(scrollOffset) {
    carouselRef.current.scrollLeft += scrollOffset;
  }
  const navigate = useNavigate();

  const carouselRef = useRef();

  useEffect(() => {
    carouselRef.current.scrollLeft = 0;
  }, []);
  return (
    <article className="carousel-wrapper">
      <button onClick={() => scroll(-200)} className="carousel-btn">
        <img src="/chevron-left.svg" />
      </button>
      <div className="carousel" ref={carouselRef}>
        {movies.map((movie, index) => (
          <div className="carousel-card" key={index}>
            <img
              onClick={() => navigate(`/movies/${movie.id}`)}
              className="carousel-img"
              src={`/images/${movie.id}_w200.webp`}
              srcSet={`/images/${movie.id}_w200.webp 200w, /images/${movie.id}_w400.webp 400w`}
              sizes="(max-width: 400px) 200px, 400px"
              alt="movie-poster"
            />
          </div>
        ))}{" "}
      </div>
      <button onClick={() => scroll(200)} className="carousel-btn">
        <img src="/chevron-right.svg" />
      </button>
    </article>
  );
}