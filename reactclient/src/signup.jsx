import React, { useState } from "react";
import { PiShootingStarFill } from 'react-icons/pi';
import './Components/css/signup.css';
import axios from 'axios';


function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    secondname: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://myflixapp-ofag.onrender.com/api/users/register',
        formData
      );

    if (response.status === 200) {
        console.log('Registration successful', response.data);
      } else {
        console.error('Registration failed. Unexpected response status:', response.status);
      }
    } catch (error) {
      //  registration errors
      console.error('Registration failed ', error);
    }

  };


  return (
    <>
      <div className="overlay">
        <nav className="Navbar">
          <h1 className="navbar-logo">
            MYFLIX
            <div className="logostar">
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
              className="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            ></input>
            
            <input
              type="text"
              placeholder="Secondname"
              className="secondname"
              name="secondname"
              value={formData.secondname}
              onChange={handleChange}
            ></input>

            <input
              type="text"
              placeholder="Username"
              className="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            ></input>

            <input
              type="text"
              placeholder="Email"
              className="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            ></input>

            <input
              type="password"
              placeholder="Password"
              className="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            ></input>
            <input
              type="password"
              placeholder="Confirm Password"
              className="confirm"
              name="confirm"
              value={formData.confirm}
              onChange={handleChange}
            ></input>

            <button type="submit" className="signbutton">
              Sign Up
            </button>
            <div className="to-signin">
              <h5>
                Have an account? <span className="sign-in-text">Sign In</span>
              </h5>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
