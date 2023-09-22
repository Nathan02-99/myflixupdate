// Favorites.jsx

import React from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import './css/favorites.css';
import { Link } from "react-router-dom";
import { useUser } from '../userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


function Favorites({ favoriteItems, user, onRemoveFavorite }) {
  const { authToken } = useUser();
  const { userId} =useUser();
  const handleRemoveFavorite = (item) => {
   console.log("Remove from Favorites clicked");
   console.log(userId)

   if (user) {
     
      axios
        .delete(`https://mflixupdate.onrender.com/api/${user.userId}/favorites/${item.id}}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((response) => {
          onRemoveFavorite(true);
          toast.success('Successfully removed from favorites');
          console.log('API Response:', response.data);
        })
        .catch((error) => {
          console.error('Error removing favorites:', error);
          if (error.response) {
            console.error('API Response:', error.response.data);
          }
          toast.error('Failed to remove from favorites');
        });
    
  } else {
    toast.warning('Sign in to remove from favorites');
  }
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
      <ToastContainer/>
    </div>
    
  );
}

export default Favorites;
