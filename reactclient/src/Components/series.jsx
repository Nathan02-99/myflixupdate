import React from 'react';
import './css/series.css';

function Series({ series }) {
  return (
    <div className="series-container">
      {series.map(series => (
        <div key={series.id} className="series-item">
          <img src={series.posterUrl} alt={series.title} />
          <div className="series-details">
            <div className="series-title">{series.title}</div>
            <div className="series-overview">{series.overview}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Series;
