import React from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import './css/favorites.css';

function Favorites({ favoriteItems, onRemoveFavorite }) {
    return (
      <div className="favorites-container">
        <h2>My favorites</h2>
        <div className="favorites-list">
          {favoriteItems.map(item => (
            <div key={item.id} className="favorite-item">
              <div className="remove-button">
                <AiOutlineMinusCircle />
              </div>
              <img src={item.posterUrl} alt={item.title} />
              <div className="item-details">
                <div className="item-title">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

export default Favorites;
