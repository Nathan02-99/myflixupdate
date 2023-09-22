import '../App.css';
import { Link } from 'react-router-dom';
import { AiFillSetting } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { PiShootingStarFill } from 'react-icons/pi';
import { TiStarFullOutline } from 'react-icons/ti';
import { ImSearch } from 'react-icons/im';
import { useUser } from '../userContext';
import { useState} from 'react';
import * as React from 'react'
import './css/dropdown.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Dropfunc = () => {
  const { userData, authToken, updateUser } = useUser();
  
  const handleMenuOne = async () => {
    try {
      if (!userData || !userData.userId || !authToken) {
        console.error('User data or auth token not available.');
        return;
      }
  
      const { userId } = userData;
  
      const response = await fetch('https://mflixupdate.onrender.com/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ userId })
      });
  
      if (response.ok) {
        // Successfully logged out, clear user data and token in the frontend
        console.log('Logged out successfully');
        toast.success('Logged out successfully');
        updateUser(null, null);
        // Clear user data or perform any other actions needed upon logout
  
      } else {
        const errorText = await response.text();
        console.error('Not signed In', errorText);
        toast.error('Not signed In');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Error during logout');
    }
  };
  

    const handleMenuTwo = () => {
        console.log('Clicked Sign in')
    }

    const handleMenuThree = () => {
      console.log('Clicked sign up')
  }
  
    return (
      <Dropdown
        trigger={<AiFillSetting className='icon4'/>}
        menu={[
          <button onClick={handleMenuOne} className='testbut'>Log out</button>,
        
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

function Navbar() {
  const [query, setQuery] = useState(''); // State to manage the search query

  const handleSearchInputChange = (event) => {
    setQuery(event.target.value); // Update the query as the user types
  };

  const handleSearch = () => {
    window.location.href = `/search-results/${query}`;
  };

  const handleSearchKeyPress = (event) => {
    // Trigger the search when the Enter key is pressed
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="navbar-logo1">MYFLIX</h1>
        </Link>
        
          <PiShootingStarFill className='icon1' />
        

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
            <Link to="/favorites-page">
              <TiStarFullOutline size={25} color={'gold'} />
            </Link>
          </div>

          <div className="search-input-container">
            <input
              type="text"
              placeholder="search movies/shows"
              className="search-input"
              value={query}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchKeyPress}
            />
            <ImSearch  className="icon2" onClick={handleSearch} />
          </div>

         
          <Dropfunc/>
          

          
            <Link to="/profile-page">
              <BsPersonCircle  className='icon3' color={'#00d0ff'} />
            </Link>

            <ToastContainer />
          
        </div>
      </nav>
    </div>
  );
}


export default Navbar;




// import '../App.css';
// import { Link } from 'react-router-dom';
// import { AiFillSetting } from 'react-icons/ai';
// import { BsPersonCircle } from 'react-icons/bs';
// import { PiShootingStarFill } from 'react-icons/pi';
// import { TiStarFullOutline } from 'react-icons/ti';
// import { ImSearch } from 'react-icons/im';
// import { useState } from 'react';
// import { useUser } from '../userContext';


// import * as React from 'react'
// import './css/dropdown.css'


// const Dropfunc = () => {
//     const handleMenuOne = () => {
//       console.log('Clicked log out');
//     };

//     const handleMenuTwo = () => {
//         console.log('Clicked Sign in')
//     }

//     const handleMenuThree = () => {
//       console.log('Clicked sign up')
//   }
  
//     return (
//       <Dropdown
//         trigger={<AiFillSetting size={25} />}
//         menu={[
//           <button className='testbut' onClick={handleLogout}>Log out</button>,
        
//           <Link to="/sign-in">
//           <button onClick={handleMenuTwo} className='testbut'>Sign In</button>
//           </Link>,
//           <Link to="/sign-up">
//           <button onClick={handleMenuThree} className="testbut">Sign Up</button>
//           </Link>,
//         ]}
//       />
//     );
//   };
  
//   const Dropdown = ({ trigger, menu }) => {
//     const [open, setOpen] = React.useState(false);
  
//     const handleOpen = () => {
//       setOpen(!open);
//     };
  
//     return (
//       <div className="dropdown">
//         {React.cloneElement(trigger, {
//           onClick: handleOpen,
//         })}
//         {open ? (
//           <ul className="menu">
//             {menu.map((menuItem, index) => (
//               <li key={index} className="menu-item">
//                 {React.cloneElement(menuItem, {
//                   onClick: () => {
//                     menuItem.props.onClick();
//                     setOpen(false);
//                   },
//                 })}
//               </li>
//             ))}
//           </ul>
//         ) : null}
//       </div>
//     );
//   };

// function Navbar() {
//   const [query, setQuery] = useState(''); // State to manage the search query
//   const { userData, authToken } = useUser(); // Get user data and authToken from the context
  

//   const handleSearchInputChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleSearch = () => {
//     window.location.href = `/search-results/${query}`;
//   };

//   const handleSearchKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleLogout = async () => {
//     if (!userData || !authToken) {
//       console.error('User data or authToken not available.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3003/api/logout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${authToken}`,
//         },
//         body: JSON.stringify({ userId: userData.userId }), // Use the user ID from userData
//       });

//       if (response.ok) {
//         console.log('Logged out successfully');
//         // Add logic to handle successful logout, e.g., redirect to a login page
//       } else {
//         console.error('Failed to log out');
//       }
//     } catch (error) {
//       console.error('Error logging out:', error.message);
//     }

//   };

//   return (
//     <div className="App">
//       <nav className="navbar">
//         <Link to="/" style={{ textDecoration: 'none' }}>
//           <h1 className="navbar-logo1">MYFLIX</h1>
//         </Link>
//         <div className="logostar">
//           <PiShootingStarFill size={25} />
//         </div>

//         <div className='tomovies'>
//           <Link to="/movies" style={{ textDecoration: 'none' }}>
//             <span className='tomovies'>Movies</span>
//           </Link>
//         </div>

//         <div className='toseries'>
//           <Link to="/series" style={{ textDecoration: 'none' }}>
//             <span className='toseries'>Tv shows</span>
//           </Link>
//         </div>

//         <div className="navbar-controls">
//           <div className="favorites">
//             <Link to="/favorites-page">
//               <TiStarFullOutline size={25} color={'gold'} />
//             </Link>
//           </div>

//           <div className="search-input-container">
//             <input
//               type="text"
//               placeholder="search movies/shows"
//               className="search-input"
//               value={query}
//               onChange={handleSearchInputChange}
//               onKeyPress={handleSearchKeyPress}
//             />
//             <ImSearch size={20} className="search-icon" onClick={handleSearch} />
//           </div>

//           <div className="navbar-settings">
//           <Dropfunc/>
//           </div>

//           <div className="profimage">
//             <Link to="/profile-page">
//               <BsPersonCircle size={30} color={'#00d0ff'} />
//             </Link>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }


// export default Navbar;
