import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import SearchResults from './Components/searchresults';

function SearchPage() {
  const [searchData, setSearchData] = useState([]);
  const { query } = useParams();

  useEffect(() => {
    if (query) {
      // Fetch data from the API based on the query
      search(query);
    }
  else {
    // No query provided, set searchData to an empty array and display a message
    setSearchData([]);
  }
  }, [query]);

  const search = async (query) => {
    try {
      const response = await axios.get(`https://mflixupdate.onrender.com/api/movies/${query}`);
      setSearchData(response.data); // Set the response data directly
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchData([]); // Clear results in case of an error
    }
  };

  return (
    <>
      <Navbar />
      <div className="search-results-container">
      {query ? (
          <div className='search-results'>
            <SearchResults results={searchData} />
          </div>
        ) : (
          <div className='no-search-input-message'>
            No search input. Please enter a search query.
          </div>
        )}
        
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;