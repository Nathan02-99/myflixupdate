import React from "react";
import { PiShootingStarFill } from 'react-icons/pi';
import './Components/css/signin.css';

function Signin() {
    return (
           <>
           <div className="back">
           <div className="overlay">

           <nav className="navbar">
               <h1 className="navbar-logo">
                    MYFLIX
                    <div className="logostar">
                        <PiShootingStarFill size={25} />
                    </div>
                </h1>             
            </nav>

            <form className="form-container">
              <div className="signinform">
                <h1>Sign In</h1>
                <input type= "text" placeholder= "Username" className="username" ></input>
                <input type= "text" placeholder= "Password" className="password" ></input>  

                <button onClick={() => console.log('Button clicked')} className="signbutton">Sign In</button>
                <div className="to-signin"><h5>Don't have an account?  <span className="sign-in-text">Sign Up</span></h5></div>

             </div>
           </form>

            </div>
            </div>
            </> 
    )
}

export default Signin;
