import React from 'react';
import { PiShootingStarFill } from 'react-icons/pi';
import './css/Footer.css'; // Import your Footer-specific CSS

function Footer() {
  return (
    <nav className="Footer">
      <div className="footer-section">
        <h1 className="navbar-logo">
          MYFLIX
          <div className="logostar">
            <PiShootingStarFill className='icon1' />
          </div>
        </h1>
      </div>
      {/* <div className="footer-section">
         <p>Email: gichinijonathan@gmail.com</p>
      </div> */}
      <div className="footer-section">
      <p>© Jonathan, 2023. All rights reserved.</p>
      </div>
    </nav>
  );
}

export default Footer;


