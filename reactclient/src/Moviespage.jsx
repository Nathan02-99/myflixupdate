import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Movies from './Components/movies';
import './Components/css/movies.css';
import axios from 'axios';
import { useUser } from './userContext'; // Import the useUser hook

function MoviesPage() {
  const [moviesData, setMoviesData] = useState([]);
  const [page, setPage] = useState(1);
  
  // Use the useUser hook to access the user data from UserContext
  const { userData, authToken } = useUser(); // Destructure userData and authToken

  useEffect(() => {
    fetchMoviesData();
  }, [page]);

  const fetchMoviesData = () => {
    axios
      .get(`https://mflixupdate.onrender.com/api/all-movies?page=${page}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include authToken in the headers
        },
      })
      .then((response) => {
        const newMoviesData = response.data;

        // Update the series data with the new data
        setMoviesData(newMoviesData);
      })
      .catch((error) => {
        console.error('Error fetching series data:', error);
      });
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevClick = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="movies-page">
        <h2>Movies</h2>
        <div className="movies-page-container">
          {moviesData.map((movies, index) => (
            <Movies
              key={index}
              movies={{
                id:movies.id,
                title: movies.title,
                posterUrl: movies.poster_path,
              }}
              user={userData} // Pass the user data to the Movies component
              authToken={authToken} // Pass the authToken to the Movies component
            />
          ))}
        </div>
        <div className="pagination">
          <button className="prev" onClick={handlePrevClick} disabled={page === 1}>
            Previous
          </button>
          <button className="next" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MoviesPage;
