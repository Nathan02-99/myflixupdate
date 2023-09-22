import React, { useState } from 'react';
import './css/movies.css';
import { BsBookmarkStarFill } from 'react-icons/bs';
import axios from 'axios';
import { useUser } from '../userContext';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Movies = ({ movies, user}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { authToken } = useUser();

  const handleAddToFavorites = () => {
    console.log("Add to Favorites clicked");
  
    if (user) {
      if (!isFavorite) {
        axios
          .post(`https://mflixupdate.onrender.com/api/favorites/${user.userId}/${movies.id}/${encodeURIComponent(movies.title)}/${encodeURIComponent(movies.posterUrl)}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          .then((response) => {
            setIsFavorite(true);
            toast.success('Successfully added to favorites');
            console.log('API Response:', response.data);
          })
          .catch((error) => {
            console.error('Error adding to favorites:', error);
            if (error.response) {
              console.error('API Response:', error.response.data);
            }
            toast.error('Failed to add to favorites');
          });
      }
    } else {
      toast.warning('Sign in to add to favorites');
    }
  };
  

  return (
    <div className="movies-container">
      <div key={movies.id} className="movie-item">
        <div className="add-to-favorites" onClick={handleAddToFavorites}>
          <BsBookmarkStarFill color={isFavorite ? 'gold' : '#00d00f'} />
        </div>
        <Link to={`/SingleMoviePage/${movies.id}/details`} style={{ textDecoration: 'none', color:'white' }}>
        <img src={movies.posterUrl} alt={movies.title} />
        <div className="movie-details">
          <div className="movie-title">{movies.title}</div>
        </div>
        </Link>
        
      </div>
      <ToastContainer />
    </div>
  );
};

export default Movies;
