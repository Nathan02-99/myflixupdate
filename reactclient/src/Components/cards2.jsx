import React from 'react';
import './css/cards.css'; 
import { Link } from 'react-router-dom';

const SerieCard = ({ serie }) => {
  return (
    <div className="movie-card2">
      <Link to={`/SingleSeriePage/${serie.id}/details`} style={{ textDecoration: 'none', color:'white' }}>
      <img src={serie.posterUrl} alt={serie.title} className="movie-poster2" />
      <p className="movie-titles">{serie.title}</p>
      </Link>
    </div>
  );
};



export default SerieCard;
