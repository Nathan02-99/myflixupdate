import React from "react";
import { PiShootingStarFill } from 'react-icons/pi';
import './Components/css/signup.css';

function Signup() {
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

            <form className="form-container">
              <div className="form">
                <h1>Sign Up</h1>
                <input type= "text" placeholder= "Firstname" className="firstname" ></input>
                <input type= "text" placeholder= "Secondname" className="secondname" ></input>
                <input type= "text" placeholder= "Username" className="username" ></input>
                <input type= "text" placeholder= "Email" className="email" ></input>
                <input type= "text" placeholder= "Password" className="password" ></input>
                <input type= "text" placeholder= "Confirm Password" className="confirm" ></input>    

                <button onClick={() => console.log('Button clicked')} className="signbutton">Sign Up</button>
                <div className="to-signin"><h5>Have an account? <span className="sign-in-text">Sign In</span></h5></div>

             </div>
           </form>

            </div>
            </> 
    )
}

export default Signup;
