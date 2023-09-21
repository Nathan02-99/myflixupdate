import "./css/imageslider.css"; // Import your custom CSS for the carousel

import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [movies, setMovies] = useState([]); // Store movie data, including titles and backdrops
  const length = movies.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    // Fetch movie data including titles and backdrops from the API and set them in state
    fetch('http://localhost:3003/api/popular-movies')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data); // Set the entire movie data including titles and backdrops
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [current]);

  if (movies.length === 0) {
    return null; // Return null or loading indicator while data is being fetched
  }

  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      {movies.map((movie, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <div>
                <img src={movie.backdrop_path} alt='movie backdrop' className='image' />
                <h2 className='slidertitle'>{movie.title}</h2> {/* Display movie title */}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
