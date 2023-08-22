import React from 'react';
import './css/searchresults.css';

function SearchResults({ results }) {
  return (
    <div className="search-results-container">
      {results.map(result => (
        <div key={result.id} className="search-result">
          <img src={result.posterUrl} alt={result.title} />
          <div className="result-details">
            <div className="result-title">{result.title}</div>
            <div className="result-overview">{result.overview}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
