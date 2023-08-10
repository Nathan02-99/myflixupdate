import './App.css';
import { AiFillSetting } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { PiShootingStarFill } from 'react-icons/pi';
import { TiStarFullOutline } from 'react-icons/ti';
import { ImSearch } from 'react-icons/im';

function SearchInput () {
  return (
    <div className= "search-input-container">
      <input type= "text" placeholder= "search movies/shows" className="search-input" ></input>
      <ImSearch size= {20} className ="search-icon"/>
    </div>
  );

}

function App() {
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
            <AiFillSetting size={25} />
          </div>
          <div className="image">
            <BsPersonCircle size={30} />
          </div>
        </div>
      </nav>

      <div className="content">
        <h1>MYFLIX</h1>
      </div>
    </div>
  );
}


export default App;