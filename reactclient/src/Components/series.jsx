import React, { useState } from 'react';
import './css/series.css';
import { BsBookmarkStarFill } from 'react-icons/bs';
import axios from 'axios';
import { useUser } from '../userContext';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Series = ({ series, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { authToken } = useUser();

  const handleAddToFavorites = () => {
    console.log("Add to Favorites clicked"); // Check if this log appears
    if (user) {
      // Check if the movie is already a favorite to prevent duplicate entries
      if (!isFavorite) {
        // Call the API to add the movie to favorites
        axios
          .post(`http://localhost:3003/api/favorites/${user.userId}/${series.id}/${encodeURIComponent(series.title)}/${encodeURIComponent(series.posterUrl)}`,
          {},
  {
    headers: {
      Authorization: `Bearer ${authToken}`, // authToken is the JWT token
    },
  })
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
    <div className="series-container">
      <div key={series.id} className="series-item">
        <div className="add-to-favorites" onClick={handleAddToFavorites}>
          <BsBookmarkStarFill color={isFavorite ? 'gold' : '#00d00f'} />
        </div>
        <Link to={`/SingleSeriePage/${series.id}/details`} style={{ textDecoration: 'none' }}>
        <img src={series.posterUrl} alt={series.title} />
        <div className="series-details">
          <div className="series-title">{series.title}</div>
        </div>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Series;

