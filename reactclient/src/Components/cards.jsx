import React from 'react';
import './css/cards.css'; 

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
      <p className="movie-title">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
