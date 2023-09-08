import React, { useState } from "react";
import { PiShootingStarFill } from 'react-icons/pi';
import './Components/css/signup.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    secondname: "",
    username: "",
    email: "",
    password: "",
  });

  const [registrationMessage, setRegistrationMessage] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const response = await axios.post(
        "http://localhost:3003/api/users/register",
        formData
      );

      if (response.status === 200) {
        // Registration successful
        toast.success(response.data.message, { position: "top-right" });
        setError(null);
        // You can also redirect the user to a login page or another route here
        navigate('/sign-in');
      } else {
        // Unexpected response status
        toast.error("Registration failed. Unexpected response status: " + response.status, { position: "top-right" });
        setError(null);
      }
    } catch (error) {
      // Handle registration errors
      if (error.response && error.response.data && error.response.data.message) {
        toast.error("Registration failed: " + error.response.data.message, { position: "top-right" });
      } else {
        toast.error("Registration failed. An error occurred.", { position: "top-right" });
      }
      setError(null);
    }
  };


  return (
    <>
      <div className="overlay">
        <nav className="Navbar">
          <h1 className="navbar-logooo">
            MYFLIX
            <div className="logostarsignup">
              <PiShootingStarFill size={25} />
            </div>
          </h1>
        </nav>

        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form">
            <h1>Sign Up</h1>
            <input
              type="text"
              placeholder="Firstname"
              className="firstname1"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            ></input>
            
            <input
              type="text"
              placeholder="Secondname"
              className="secondname1"
              name="secondname"
              value={formData.secondname}
              onChange={handleChange}
            ></input>

            <input
              type="text"
              placeholder="Username"
              className="username1"
              name="username"
              value={formData.username}
              onChange={handleChange}
            ></input>

            <input
              type="text"
              placeholder="Email"
              className="email1"
              name="email"
              value={formData.email}
              onChange={handleChange}
            ></input>

            <input
              type="password"
              placeholder="Password"
              className="password1"
              name="password"
              value={formData.password}
              onChange={handleChange}
            ></input>
            

            <button type="submit" className="signbutton">
              Sign Up
            </button>
            <div className="to-signin">
              <h5>
                Have an account?{" "} 
                <Link to="/sign-in"className="sign-in-text">Sign In</Link>
              </h5>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Signup;
