import React from 'react';
import './css/singlemoviepage.css'
import Navbar from './Navbar';

const SingleMoviePage = () => {
  const title = "Suzume";
  const overview = "Suzume, 17, lost her mother as a little girl. On her way to school, she meets a mysterious young man. But her curiosity unleashes a calamity that endangers the entire population of Japan, and so Suzume embarks on a journey to set things right.";
  const genres = ["Animation", "Fantasy", "Drama", "Adventure"];
  const posterURL = "https://www.themoviedb.org/t/p/w1280/vIeu8WysZrTSFb2uhPViKjX9EcC.jpg";
  const backdropURL = "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/4tdV5AeojEdbvn6VpeQrbuDlmzs.jpg";

  return (
    <><Navbar/>
    <div className="singlemovie-page" style={{ backgroundImage: `url(${backdropURL})` }}>
      
      <div className="singlemovie-poster">
        <img src={posterURL} alt="Movie Poster" />
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
        
      </div>
    </div>
    </>
  );
};

export default SingleMoviePage;

