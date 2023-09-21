// FavoritesPage.jsx

import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Favorites from './Components/Favorites';
import { useUser } from './userContext';

function FavoritesPage() {
  const { userData } = useUser();

  return (
    <>
      <Navbar />
      <div className="favorites-page-container">
        {userData ? (
          <>
            <div className="favorites-page-container">
              <span>
                <h3>Favorites:</h3>
                <Favorites favoriteItems={userData.favorites} />
              </span>
            </div>
          </>
        ) : (
          <p>Please log in to view your favorites.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default FavoritesPage;
