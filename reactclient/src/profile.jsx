import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { BsPersonCircle } from 'react-icons/bs';
import { TiStarFullOutline } from 'react-icons/ti';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Components/css/profile.css';
import { useUser } from './userContext';

function Profile() {
  const { userData, authToken, updateUser } = useUser(); // Updated to include setUserData
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

  useEffect(() => {
    setEditedUserData(userData);
  }, [userData]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://mflixupdate.onrender.com/api/users/update/${userData.userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(editedUserData),
        
      });

      if (response.ok) {
        setIsEditing(false);
        toast.success('User information updated successfully');
        updateUser(editedUserData, authToken);
      } else {
        console.error('Failed to update user information');
        toast.error('User information update failed');
      }
    } catch (error) {
      console.error('Error updating user information:', error.message);
      toast.error('Not signed in');
    }
  };

  const handleDeleteClick = () => {
    console.log('Delete icon clicked');
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`https://mflixupdate.onrender.com/api/users/delete/${userData.userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        console.log('Account deleted successfully');
        toast.success('Account deleted successfully')
      } else {
        console.error('Failed to delete account');
        toast.error('Error deleting account')
      }
    } catch (error) {
      console.error('Error deleting account:', error.message);
      toast.warning('Not signed in')
    }
  };

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
              <TiStarFullOutline size={25} className="favorites"/>
              <FaEdit size={23} className="edit" 
                  onClick={handleEditClick}
              />
              <FaTrash size={20} className="delete" 
                  onClick={handleDeleteClick}
              />
            </div>
          </div>
          <hr />
          <div className="profile-info">
            <div className='heading'><span><p>My Profile</p></span></div>
            {userData && !isEditing && (
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
            )}
            {isEditing && (
              <form onSubmit={handleSubmit}>
                <div className="info-item">
                  <span><h3>First Name:</h3></span>
                  <input
                    type="text"
                    name="firstName"
                    value={editedUserData.firstName || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="info-item">
                  <span><h3>Last Name:</h3></span>
                  <input
                    type="text"
                    name="secondName"
                    value={editedUserData.secondName || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="info-item">
                  <span><h3>Username:</h3></span>
                  <input
                    type="text"
                    name="username"
                    value={editedUserData.username || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="info-item">
                  <span><h3>Email:</h3></span>
                  <input
                    type="text"
                    name="email"
                    value={editedUserData.email || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit">Save Changes</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />


      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <p>Are you sure you want to delete your account?</p>
            <button onClick={handleDeleteCancel}>Cancel</button>
            <button onClick={handleDeleteConfirm}>Yes, delete</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
}

export default Profile;
