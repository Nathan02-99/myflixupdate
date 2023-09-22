import React, { useState, useEffect } from 'react';
import './css/singlemoviepage.css';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import { Link } from "react-router-dom";

const SingleMoviePage = () => {
  const { id } = useParams(); // Use useParams to access route parameters
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    // Fetch movie data based on the movie ID from the URL
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`https://mflixupdate.onrender.com/api/movies/${id}/details`);
        const movie = response.data;
        setMovieData(movie);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, [id]);

  if (!movieData) {
    // You can display a loading indicator here while waiting for the data to load
    return <div>Loading...</div>;
  }

  // Extract movie data
  const { title, overview, genres, poster_path, backdropURL, cast, directors } = movieData;

  return (
    <>
      <Navbar />
      <div className="singlemovie-page" >
        <div className="singlemovie-poster">
          <img src={poster_path} alt="Movie Poster" />
        </div>
        <div className="singlemovie-details">
          <h1 className="singlemovie-title">{title}</h1>
          <div className="singlemovie-genres">
            {genres.map((genre, index) => (
              <span key={index} className="genre">
                {genre}
              </span>
            ))}
          </div>
          <div className='overview-container'>
            <h2 className='overviewtitle'>Overview</h2>
            <p className="singlemovie-overview">{overview}</p>
          </div>
          
          <div className="movie-cast-container">
            <h4>Cast:</h4>
            <div className="movie-cast">
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
          <div className="movie-directors">
            {directors.map((director, index) => (
               <Link to={`/fullcastinfo/director/${director.id}`} style={{ textDecoration: 'none', color:'white' }}>
              <div key={index} className="director">
                <img src={director.profile_path} alt={`${director.name} Poster`} className="director-image" />
                <div className="director-name">{director.name}</div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleMoviePage;
