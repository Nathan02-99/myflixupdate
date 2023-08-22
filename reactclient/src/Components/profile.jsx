import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { BsPersonCircle } from 'react-icons/bs';
import { TiStarFullOutline } from 'react-icons/ti';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './css/profile.css';


function Profile() {
  return (
        <><Navbar/>
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
        <div className="info-item">
          <span><h3>First Name:</h3></span>
          <span><h3>John</h3></span>
        </div>
        <div className="info-item">
          <span><h3>Last Name:</h3></span>
          <span><h3>Doe</h3></span>
        </div>
        <div className="info-item">
          <span><h3>Username:</h3></span>
          <span><h3>Doe123</h3></span>
        </div>
        <div className="info-item">
          <span><h3>Email:</h3></span>
          <span><h3>doe@email.com</h3></span>
        </div>
        <div className="info-item">
          <span><h3>Password:</h3></span>
          <span><h3>12345678</h3></span>
        </div>
        
      </div>
    </div>
    </div>
    <Footer/>
    </>
  );
}

export default Profile;
