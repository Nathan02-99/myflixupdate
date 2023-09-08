import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { BsPersonCircle } from 'react-icons/bs';
import { TiStarFullOutline } from 'react-icons/ti';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Components/css/profile.css';
import { useUser } from './userContext'; // Import the UserContext

function Profile() {
  const { userData } = useUser(); // Retrieve user data from the context

  return (
    <>
      <Navbar />
      <div className="Profile">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-image">
              <BsPersonCircle size={150} />
            </div>
            <hr />
            <div className="profile-icons">
              <TiStarFullOutline size={25} className="favorites" />
              <FaEdit size={23} className="edit" />
              <FaTrash size={20} className="delete" />
            </div>
          </div>
          <hr />
          <div className="profile-info">
            <div className='heading'><span><p>My Profile</p></span></div>
            {userData ? (
              // If user data is available, display user information
              <>
                <div className="info-item">
                  <span><h3>First Name:</h3></span>
                  <span><h3>{userData.firstName}</h3></span>
                </div>
                <div className="info-item">
                  <span><h3>Last Name:</h3></span>
                  <span><h3>{userData.secondName}</h3></span>
                </div>
                <div className="info-item">
                  <span><h3>Username:</h3></span>
                  <span><h3>{userData.username}</h3></span>
                </div>
                <div className="info-item">
                  <span><h3>Email:</h3></span>
                  <span><h3>{userData.email}</h3></span>
                </div>
              </>
            ) : (
              // If user data is not available, display a message
              <p>Please log in to view your profile.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
