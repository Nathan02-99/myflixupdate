import '../App.css';
import { Link } from 'react-router-dom';
import { AiFillSetting } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { PiShootingStarFill } from 'react-icons/pi';
import { TiStarFullOutline } from 'react-icons/ti';
import { ImSearch } from 'react-icons/im';


import * as React from 'react'
import './css/dropdown.css'


const Dropfunc = () => {
    const handleMenuOne = () => {
      console.log('Username');
    };
  
    const handleMenuTwo = () => {
      console.log('Changed theme');
    };

    const handleMenuThree = () => {
        console.log('Clicked log out')
    }

    const handleMenuFour = () => {
      console.log('Clicked sign up')
  }
  
    return (
      <Dropdown
        trigger={<AiFillSetting size={25} />}
        menu={[
          <button onClick={handleMenuOne}>Nathan02</button>,
          <button onClick={handleMenuTwo}>Light mode</button>,
          <Link to="/sign-in">
          <button onClick={handleMenuThree} color={'white'} font-weight={'bold'}>Sign In</button>
          </Link>,
          <Link to="/sign-up">
          <button onClick={handleMenuFour} color={'white'} font-weight={'bold'}>Sign Up</button>
          </Link>,
        ]}
      />
    );
  };
  
  const Dropdown = ({ trigger, menu }) => {
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(!open);
    };
  
    return (
      <div className="dropdown">
        {React.cloneElement(trigger, {
          onClick: handleOpen,
        })}
        {open ? (
          <ul className="menu">
            {menu.map((menuItem, index) => (
              <li key={index} className="menu-item">
                {React.cloneElement(menuItem, {
                  onClick: () => {
                    menuItem.props.onClick();
                    setOpen(false);
                  },
                })}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  };



function SearchInput () {
  return (
    <div className= "search-input-container">
      <input type= "text" placeholder= "search movies/shows" className="search-input" ></input>
      <Link to="/search-results">
         <ImSearch size= {20} className ="search-icon"/>
      </Link>   
    </div>
  );

}

function Navbar() {
  return (
    <div className="App">
      <nav className="navbar">
      <h1 className="navbar-logo">MYFLIX</h1>
        <div className="logostar">
          <PiShootingStarFill size={25} />
        </div>
        
        <div className="navbar-controls">
          <div className="favorites">
            {/* Use Link to navigate to the favorites page */}
            <Link to="/favorites-page">
              <TiStarFullOutline size={25} color={'gold'} />
            </Link>
          </div>
          
          <SearchInput />

          <div className="navbar-settings">
            <Dropfunc/>
          </div>
          <div className="profimage">
          <Link to="/profile-page">
            <BsPersonCircle size={30} color={'#00d0ff'} />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}


export default Navbar;