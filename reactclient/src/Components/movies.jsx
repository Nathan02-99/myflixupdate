import React from 'react';
import './css/movies.css';

function Movies({ movies }) {
  return (
    <div className="movies-container">
      {movies.map(movie => (
        <div key={movie.id} className="movie-item">
          <img src={movie.posterUrl} alt={movie.title} />
          <div className="movie-details">
            <div className="movie-title">{movie.title}</div>
            <div className="movie-overview">{movie.overview}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Movies;
