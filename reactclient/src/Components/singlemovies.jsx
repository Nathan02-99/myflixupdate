import React from 'react';
import './css/singlemoviepage.css'
import Navbar from './Navbar';

const SingleMoviePage = () => {
  const title = "Suzume";
  const overview = "Suzume, 17, lost her mother as a little girl. On her way to school, she meets a mysterious young man. But her curiosity unleashes a calamity that endangers the entire population of Japan, and so Suzume embarks on a journey to set things right.";
  const genres = ["Animation", "Fantasy", "Drama", "Adventure"];
  const posterURL = "https://www.themoviedb.org/t/p/w1280/vIeu8WysZrTSFb2uhPViKjX9EcC.jpg";
  const backdropURL = "https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/4tdV5AeojEdbvn6VpeQrbuDlmzs.jpg";
  const cast= [
    { name: 'Nanoka Hara', role: 'Suzume Iwato (voice)', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg' },
    { name: 'Nanoka Hara', role: 'Suzume Iwato (voice)', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg' },
    { name: 'Nanoka Hara', role: 'Suzume Iwato (voice)', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg' },
    { name: 'Nanoka Hara', role: 'Suzume Iwato (voice)', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg' },
    { name: 'Nanoka Hara', role: 'Suzume Iwato (voice)', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg' },
    { name: 'Nanoka Hara', role: 'Suzume Iwato (voice)', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg' },
    { name: 'Nanoka Hara', role: 'Suzume Iwato (voice)', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg' },
    { name: 'Nanoka Hara', role: 'Suzume Iwato (voice)', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg' },
    { name: 'Nanoka Hara', role: 'Suzume Iwato (voice)', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg' },
    { name: 'Nanoka Hara', role: 'Suzume Iwato (voice)', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg' },
    { name: 'Nanoka Hara', role: 'Suzume Iwato (voice)', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg' },
    { name: 'Nanoka Hara', role: 'Suzume Iwato (voice)', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg' },
    { name: 'Nanoka Hara', role: 'Suzume Iwato (voice)', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg' },
    { name: 'Nanoka Hara', role: 'Suzume Iwato (voice)', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg' },

  ];
  const directors= [
    {name: 'Nanoka Hara', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg'},
     {name: 'Nanoka Hara', image: 'https://www.themoviedb.org/t/p/w276_and_h350_face/gbK8GbkeOvd1ZdYoxkEajYvXFjI.jpg'}       
   ];

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
        
        <div className="movie-cast-container">
        <h4>Cast:</h4>
  <div className="movie-cast">
    
    {cast.map((actor, index) => (
      <div key={index} className="actor">
        <img src={actor.image} alt={`${actor.name} Poster`} className="actor-image" />
        <div className="actor-details">
          <span className="actor-name">{actor.name}</span>
          <span className="actor-role">{actor.role}</span>
        </div>
      </div>
    ))}
  </div>
</div>
<h4>Directors:</h4>
<div className="movie-directors">
  
  {directors.map((director, index) => (
    <div key={index} className="director">
      <img src={director.image} alt={`${director.name} Poster`} className="director-image" />
      <div className="director-name">{director.name}</div>
    </div>
  ))}
</div>


      </div>
    </div>
    </>
  );
};

export default SingleMoviePage;

