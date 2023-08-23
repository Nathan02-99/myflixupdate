import '../App.css';

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
  
    return (
      <Dropdown
        trigger={<AiFillSetting size={25} />}
        menu={[
          <button onClick={handleMenuOne}>Nathan02</button>,
          <button onClick={handleMenuTwo}>Light mode</button>,
          <button onClick={handleMenuThree}>Log out</button>,
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
      <ImSearch size= {20} className ="search-icon"/>
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
            <TiStarFullOutline size={25} />
          </div>
          
          <SearchInput />

          <div className="navbar-settings">
            <Dropfunc/>
          </div>
          <div className="image">
            <BsPersonCircle size={30} />
          </div>
        </div>
      </nav>
    </div>
  );
}


export default Navbar;