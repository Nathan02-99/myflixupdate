// Favorites.jsx

import React from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import './css/favorites.css';
import { Link } from "react-router-dom";

function Favorites({ favoriteItems, onRemoveFavorite }) {
  const handleRemoveFavorite = (item) => {
    onRemoveFavorite(item);
  };

  return (
    <div className="favorites-container">
      <h2>My favorites</h2>
      <div className="favorites-list">
        {favoriteItems.map((item, index) => (
          <div key={index} className="favorite-item">
            <div className="remove-button" onClick={() => handleRemoveFavorite(item)}>
              <AiOutlineMinusCircle />
            </div>
            <div className="item-details">
              <div className="poster-container">
              <Link to={`/SingleMoviePage/${item.movieId}/details`} style={{ textDecoration: 'none', color:'white' }}>
                <img src={item.posterUrl} alt={item.movietitle} />
                </Link>
              </div>
              <div className="item-title">
                {item.movieTitle} (ID: {item.movieId ? item.id : 'undefined'})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
