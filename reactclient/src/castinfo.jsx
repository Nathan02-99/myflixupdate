import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import './Components/css/castinfo.css';



function Castinfo() {

  const moviesAndSeries = [
    { title: 'Movie 1', poster: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 1', poster: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 1', poster: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 1', poster: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 1', poster: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 1', poster: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 1', poster: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 1', poster: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 1', poster: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 1', poster: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 1', poster: 'https://www.themoviedb.org/t/p/w1280/lZ2sOCMCcGaPppaXj0Wiv0S7A08.jpg' },
    { title: 'Movie 2', poster: 'https://example.com/movie2-poster.jpg' },
    { title: 'TV Show 1', poster: 'https://example.com/tvshow1-poster.jpg' },
    // Add more items as needed
  ];
  return (
    <>
      <Navbar />

      <div className="cast-info-container">
        <div className="image-container">
          <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg" alt="Cast" />
        </div>
        <div className="info-container">
          <div className="title">Cast Information</div>
          <div className="subtitle1">Christopher Nolan</div>
          <div className="biography">
            {/* Biography content */}
            Christopher Edward Nolan, CBE (born 30 July 1970) is a British-American film director, screenwriter, and producer. He was born in Westminster, London, England and holds both British and American citizenship due to his American mother. He is known for writing and directing critically acclaimed films such as Memento (2000), The Prestige (2006), The Dark Knight Trilogy (2005-12), Inception (2010), Interstellar (2014) and Dunkirk (2017). Nolan is the founder of the production company Syncopy Films. He often collaborates with his wife, producer Emma Thomas, and his brother, screenwriter Jonathan Nolan.
          </div>
          <div className="subtitle2">Known for:</div>
          <div className="movies-list">
            {/* List of movies/TV shows */}
            <div className="movie-posters">
              {moviesAndSeries.map(item => (
                <div key={item.title} className="movie-poster">
                  <img src={item.poster} alt={item.title} />
                  <div className="movie-title">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Castinfo;
