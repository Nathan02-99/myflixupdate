import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer'
import SearchResults from './Components/searchresults';


function SearchPage() {
  // Example search results data

  const searchResults = [
    {
      id: 1,
      title: 'Grisaia: Phantom Trigger The Animation - Stargazer',
      posterUrl: 'https://www.themoviedb.org/t/p/w188_and_h282_bestv2/zNaweWLkwIAsrdeBq4Hu6j6EO5a.jpg',
      overview: 'While Rena and Maki recover from their injuries, the other SORD members jet off overseas for a school trip. Within moments of their arrival, though, the Mihama gang are pulled into a manhunt for a SORD deserter, assisted by student Sylvia and Velvet of St. Ailes International School. Tohkas the star of the show this time round, but shes wrestling with her own issues - old memories of her parents, and a promise to a friend that she wasnt able to keep...',
    },
    {
      id: 2,
      title: 'Movie 2',
      posterUrl: 'https://www.themoviedb.org/t/p/w188_and_h282_bestv2/zNaweWLkwIAsrdeBq4Hu6j6EO5a.jpg',
      overview: 'While Rena and Maki recover from their injuries, the other SORD members jet off overseas for a school trip. Within moments of their arrival, though, the Mihama gang are pulled into a manhunt for a SORD deserter, assisted by student Sylvia and Velvet of St. Ailes International School. Tohkas the star of the show this time round, but shes wrestling with her own issues - old memories of her parents, and a promise to a friend that she wasnt able to keep...',
    },
    // Add more search results as needed
  ];

  return (
    <>
      <Navbar /> 

      <div className="search-results-container">
        <SearchResults results={searchResults} />
      </div>

      <Footer/>
    </>
  );
}

export default SearchPage;
