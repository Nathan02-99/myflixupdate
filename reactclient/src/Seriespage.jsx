import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Series from './Components/series';
import './Components/css/series.css';
import axios from 'axios';
import { useUser } from './userContext'; // Import the useUser hook

function SeriesPage() {
  const [seriesData, setSeriesData] = useState([]);
  const [page, setPage] = useState(1);
  
  // Use the useUser hook to access the user data from UserContext
  const { userData, authToken } = useUser(); // Destructure userData and authToken

  useEffect(() => {
    fetchSeriesData();
  }, [page]);

  const fetchSeriesData = () => {
    axios
      .get(`http://localhost:3003/api/all-series?page=${page}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include authToken in the headers
        },
      })
      .then((response) => {
        const newSeriesData = response.data;

        // Update the series data with the new data
        setSeriesData(newSeriesData);
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
      <div className="series-page">
        <h2>Tv Shows</h2>
        <div className="series-page-container">
          {seriesData.map((series, index) => (
            <Series
              key={index}
              series={{
                id: series.id,
                title: series.name,
                posterUrl: series.poster_path,
              }}
              user={userData} 
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

export default SeriesPage;



