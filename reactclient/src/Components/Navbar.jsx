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
      console.log('Account page');
    };

    const handleMenuTwo = () => {
        console.log('Clicked Sign in')
    }

    const handleMenuThree = () => {
      console.log('Clicked sign up')
  }
  
    return (
      <Dropdown
        trigger={<AiFillSetting size={25} />}
        menu={[
          <Link to="/profile-page">
          <button onClick={handleMenuOne} className='testbut'>Nathan02</button>
          </Link>,
          <Link to="/sign-in">
          <button onClick={handleMenuTwo} className='testbut'>Sign In</button>
          </Link>,
          <Link to="/sign-up">
          <button onClick={handleMenuThree} className="testbut">Sign Up</button>
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
        <Link to="/" style={{ textDecoration: 'none' }}>
      <h1 className="navbar-logo1">MYFLIX</h1>
      </Link>
        <div className="logostar">
          <PiShootingStarFill size={25} />
        </div>
        
        <div className='tomovies'>
          <Link to="/movies" style={{ textDecoration: 'none' }}>
          <span className='tomovies'>Movies</span>
          </Link>  
        </div>

        <div className='toseries'>
          <Link to="/series" style={{ textDecoration: 'none' }}>
          <span className='toseries'>Tv shows</span>
          </Link>  
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