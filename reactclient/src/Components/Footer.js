import React from 'react';
import { PiShootingStarFill } from 'react-icons/pi';
import './Footer.css'; // Import your Footer-specific CSS

function Footer() {
  return (
    <nav className="Footer">
      <div className="footer-section">
        <h1 className="navbar-logo">
          MYFLIX
          <div className="logostar">
            <PiShootingStarFill size={25} />
          </div>
        </h1>
        <p>Thank you for using MyFlix! We hope you enjoy exploring movies and TV shows with us. If you have any questions, suggestions, or just want to say hi, feel free to reach out.</p>
      </div>
      <div className="footer-section">
         <h2>Contact Information</h2>
         <p>Email: gichinijonathan@gmail.com</p>
         <p>© Jonathan, 2023. All rights reserved.</p>
      </div>
      <div className="footer-section">
        <h2>Sites to watch:</h2>
        <ul>
          <li>Netflix</li>
          <li>Hulu</li>
          <li>Fbox</li>
        </ul>
      </div>
    </nav>
  );
}

export default Footer;


