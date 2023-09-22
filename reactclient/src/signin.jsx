import React, { useState } from "react";
import { PiShootingStarFill } from 'react-icons/pi';
import './Components/css/signin.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useUser } from './userContext';

function Signin() {
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://mflixupdate.onrender.com/api/users/login",
        formData
      );

      if (response.status === 200) {
        // Login successful
        const { user, token } = response.data; // Extract the token from the response
  
        toast.success(response.data.message, { position: "top-right" });
  
        // Store the user data and authToken in context
        updateUser(user, token);
  

        // You can also redirect the user to another page/dashboard here
        navigate('/');
      } else {
        // Unexpected response status
        toast.error("Login failed. Unexpected response status: " + response.status, { position: "top-right" });
      }
    } catch (error) {
      // Handle login errors
      if (error.response && error.response.data && error.response.data.message) {
        toast.error("Login failed: " + error.response.data.message, { position: "top-right" });
      } else {
        toast.error("Login failed. An error occurred.", { position: "top-right" });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="back">
        <div className="overlay">
        <nav className="navbarsignin">
          <h1 className="navbar-logoo">
            MYFLIX
            <div className="logostarsignin">
             <PiShootingStarFill size={25} />
            </div>
          </h1>
        </nav>
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="signinform">
              <h1 className="title">Sign In</h1>
              {/* Email input */}
              <input
                type="text"
                placeholder="Email"
                className="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              ></input>
              {/* Password input */}
              <input
                type="password"
                placeholder="Password"
                className="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              ></input>
              {/* Submit button */}
              <button type="submit" className="signbutton2">
                Sign In
              </button>
              {/* Sign up link */}
              <div className="to-signin">
                <h5>
                  Don't have an account?{" "}
                  <Link to="/sign-up"className="sign-in-text">Sign Up</Link>
                </h5>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* ToastContainer for displaying messages */}
      <ToastContainer />
    </>
  );
}

export default Signin;
