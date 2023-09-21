import React from 'react';
import './css/cards.css'; 
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card2">
      <Link to={`/SingleMoviePage/${movie.id}/details`} style={{ textDecoration: 'none', color:'white' }}>
      <img src={movie.posterUrl} alt={movie.title} className="movie-poster2" />
      <p className="movie-titles">{movie.title}</p>
      </Link>
    </div>
  );
};



export default MovieCard;


