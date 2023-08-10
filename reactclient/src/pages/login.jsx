import './login.css';

import { PiShootingStarFill } from 'react-icons/bs';

function login () {
   return (
    <div className='App'>

        <div className='navbar'>
            <h1 className='navbar-logo'>MYFLIX</h1>
            <div className='logostar'>
            <PiShootingStarFill size={25} />
            </div>
        </div>

        <div className='form'>
            <h1 className='title'>Log In</h1>
            
        </div>

    </div>
   )
}

export default login;