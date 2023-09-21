import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import ImageSlider from './Components/imageslider';
import { SliderData } from './Components/sliderdata';
import MovieCard from './Components/cards'; 
import SerieCard from './Components/cards2';
import Footer from './Components/Footer';
import './index.css';
import './Components/css/cards.css';



function App() {
  const [movies, setMovies] = useState([]); // Store movie data from the API
  const [series, setSeries] = useState([]); // Store TV series data from the API

  useEffect(() => {
    // Define a reusable function for fetching data from an API
    const fetchData = (apiUrl, setData) => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setData(data); // Set the data from the API
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    // Fetch popular movie data and set it in state
    fetchData('http://localhost:3003/api/popular-movies', setMovies);

    // Fetch popular TV series data and set it in state
    fetchData('http://localhost:3003/api/popular-series', setSeries);

    // Fetch top-rated movie data and set it in state
    fetchData('http://localhost:3003/api/top-rated-movies', setTopRatedMovies);

    // Fetch top-rated TV series data and set it in state
    fetchData('http://localhost:3003/api/top-rated-series', setTopRatedSeries);
  }, []);

  const [topRatedMovies, setTopRatedMovies] = useState([]); // Store top-rated movie data from the API
  const [topRatedSeries, setTopRatedSeries] = useState([]); // Store top-rated TV series data from API

  return (
    <div className="HomeApp">
      <Navbar />
      <div className="content">
        <ImageSlider slides={SliderData} />

         <div className='poptitles'><h3>Popular Movies</h3></div>

        {/* Wrap the movie-card-container in a scrolling parent */}
        <div className="movie-card-scroll">
          <div className="movie-card-containers">
            {movies.map((movie, index) => (
              <MovieCard
                key={index}
                movie={{
                  id: movie.id,
                  title: movie.title, 
                  posterUrl: movie.poster_path, 
                }}
              />
            ))}
          </div>
        </div>

        <div className='poptitles'><h3>Popular Tv Shows</h3></div>

        {/* Wrap the series-card-container in a scrolling parent */}
        <div className="movie-card-scroll">
          <div className="movie-card-containers">
            {series.map((serie, index) => (
              <SerieCard
                key={index}
                serie={{
                  id: serie.id,
                  title: serie.name, 
                  posterUrl: serie.poster_path, 
                }}
              />
            ))}
          </div>
        </div>

        <div className='poptitles'><h3>Top Rated Movies</h3></div>

        {/* Wrap the top-rated-movie-card-container in a scrolling parent */}
        <div className="movie-card-scroll">
          <div className="movie-card-containers">
            {topRatedMovies.map((movie, index) => (
              <MovieCard
                key={index}
                movie={{
                  id: movie.id,
                  title: movie.title, 
                  posterUrl: movie.poster_path,
                }}
              />
            ))}
          </div>
        </div>

        <div className='poptitles'><h3>Top Rated Tv Shows</h3></div>

        {/* Wrap the top-rated-series-card-container in a scrolling parent */}
        <div className="movie-card-scroll">
          <div className="movie-card-containers">
            {topRatedSeries.map((serie, index) => (
              <SerieCard
                key={index}
                serie={{
                  id: serie.id,
                  title: serie.name, 
                  posterUrl: serie.poster_path, 
                }}
              />
            ))}
          </div>
        </div> 
      </div>
      <Footer />
    </div>
  );
}

export default App;