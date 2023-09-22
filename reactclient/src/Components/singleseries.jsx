import React, { useState, useEffect } from 'react';
import './css/singleseriepage.css';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams

import { Link } from "react-router-dom";

const SingleSeriePage = () => {
  const { id } = useParams(); // Use useParams to access route parameters
  const [serieData, setSerieData] = useState(null);

  useEffect(() => {
    // Fetch movie data based on the movie ID from the URL
    const fetchSerieData = async () => {
      try {
        const response = await axios.get(`https://mflixupdate.onrender.com/api/series/${id}/details`);
        const serie = response.data;
        setSerieData(serie);
      } catch (error) {
        console.error('Error fetching serie data:', error);
      }
    };

    fetchSerieData();
  }, [id]);

  if (!serieData) {
    // You can display a loading indicator here while waiting for the data to load
    return <div>Loading...</div>;
  }

  // Extract movie data
  const { name, overview, genres, poster_path, backdropURL, cast, directors } = serieData;

  return (
    <>
      <Navbar />
      <div className="singleserie-page" style={{ backgroundImage: `url(${backdropURL})` }}>
        <div className="singleserie-poster">
          <img src={poster_path} alt="Serie Poster" />
        </div>
        <div className="singleserie-details">
          <h1 className="singleserie-title">{name}</h1>
          <div className="singleserie-genres">
            {genres.map((genre, index) => (
              <span key={index} className="genre">
                {genre}
              </span>
            ))}
          </div>
          <div className='overview-container'>
            <h2 className='overviewtitle'>Overview</h2>
            <p className="singleserie-overview">{overview}</p>
          </div>
          
          <div className="serie-cast-container">
            <h4>Cast:</h4>
            <div className="serie-cast">
              {cast.map((actor, index) => (
                <div key={index} className="actor">
                  <img src={actor.profile_path} alt={`${actor.name} ${actor.character}  Poster` }  className="actor-image" />
                  <div className="actor-details">
                    <span className="actor-name">{actor.name}</span>
                    <span className="actor-role">{actor.character}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <h4>Directors:</h4>
          <div className="serie-directors">
            {directors.map((director, index) => (
              <div key={index} className="director">
                <Link to={`/fullcastinfo/director/${director.id}`} style={{ textDecoration: 'none', color:'white' }}>
                <img src={director.profile_path} alt={`${director.name} Poster`} className="director-image" />
                <div className="director-name">{director.name}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleSeriePage;
