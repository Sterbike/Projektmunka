import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userRole = userData ? userData.role : null;

  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsInputVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [inputRef]);

  async function Signout() {
    navigate("/signoutconfirm");
  }

  async function goToProfile() {
    navigate("/userprofile");
  }

  function toggleInputVisibility() {
    setIsInputVisible(!isInputVisible);
  }

  return (
    <div className='navbar-container'>
      <div className="navbar">
        <Link to={"/"} id='main'><a>Főoldal</a></Link>
        <div className='login-container' ref={inputRef}>
          <button onClick={toggleInputVisibility} id='account'>
            <img src="./user.png" alt='anyad' />
          </button>
          <Link to={"/login"} id='login'><a>Bejelentkezés</a></Link>
        </div>
        {isInputVisible && (
          <div className="dropdown">
            <button className="value" onClick={goToProfile}>
              Fiók
            </button>
            <button className="value" onClick={Signout}>
              Kijelentkezés
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
