import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import './Components/css/fullcastinfo.css';
import { Link } from 'react-router-dom'

function Fullcastinfo() {
  const { id } = useParams();
  const [directorInfo, setDirectorInfo] = useState(null);

  useEffect(() => {
    // Fetch director information by ID when the component mounts
    const fetchDirectorInfo = async () => {
      try {
        
        const response = await fetch(`http://localhost:3003/api/director/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDirectorInfo(data);
        } else {
          console.error('Error fetching director information');
        }
      } catch (error) {
        console.error('Error fetching director information:', error);
      }
    };

    fetchDirectorInfo();
  }, [id]);

  return (
    <>
      <Navbar />

      <div className="cast-info-container">
        {directorInfo ? (
          <>
            <div className="image-container">
              <img src={directorInfo.profile_path} alt={directorInfo.name} />
            </div>
            <div className="info-container">
              <div className="title">Cast Information</div>
              <div className="subtitle1">{directorInfo.name}</div>
              <div className="biography">{directorInfo.biography}</div>
              <div className="subtitle2">Known for:</div>
              <div className="movies-list">
                <div className="movie-posters">
                  {directorInfo.directed.map((item) => (
                    <div key={item.id} className="movie-poster">
                      <Link to={`/SingleMoviePage/${item.id}/details`} style={{ textDecoration: 'none', color:'white' }}>
                      <img src={item.poster_path} alt={item.title} />
                      <div className="movie-title">{item.title}</div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>Loading director information...</div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Fullcastinfo;
