import React, { useState, useRef, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import "./NavigationBar.css";
import logo from "../../assest/heartmateredlogo.png";

import { Link } from "react-router-dom";

import { FaBars, FaUser, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = sessionStorage.getItem("userData");
      return token !== null && token !== undefined;
    };

    setIsLoggedIn(checkLoginStatus());
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    window.location.href = "/";
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");

    if (userData) {
      const parsedData = JSON.parse(userData);
      setUser(parsedData);
    }
  }, []);

  const handleMateClick = () => {
    const isLoggedIn = sessionStorage.getItem("userData");

    if (isLoggedIn) {
      window.location.href = "/finding-a-mate";
    } else {
      window.location.href = "/login";
    }
  };

  const handleEroticClick = () => {
    const isLoggedIn = sessionStorage.getItem("userData");

    if (isLoggedIn) {
      window.location.href = "/erotic-story";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="navigation-bar">
      <div className="logo">
        <Link to="/">
          <img id="bedmatelogo" src={logo} alt="" />
        </Link>
      </div>
      <button className="toggle-button" onClick={toggleNavbar}>
        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>
      <nav className={`nav-items ${isOpen ? "open" : ""}`} ref={navRef}>
        <ul>
          <li>
            <Link onClick={handleMateClick}>Finding a mate</Link>
          </li>
          <li>
            <Link to="/">About Us</Link>
          </li>
          <li className="safety">
            <Link to="/">Safety</Link>

            <div className="safety-dropdown">
              <ul>
                <li>Our commitment to safety</li>
                <li>
                  <a href="#MatingTips"></a>
                  <Link to="/dating-relationship-advice-tips">Dating Tips</Link>
                </li>
                <li>Safety Tips</li>
              </ul>
            </div>
          </li>
          <li>
            <Link to="https://forms.visme.co/formsPlayer/z4ryx1jy-heartmate">
              Contact Us
            </Link>
          </li>
          <li>
            <Link onClick={handleEroticClick}>Erotic Story</Link>
          </li>
          <div>
            {isLoggedIn && (
              <div className="user-info">
                <span className="username">
                  <FaUserCircle /> {user?.result?.username}
                </span>
                <ul className="user-options">
                  <li>
                    <Link to={`/profile/${user?.result?.username}`}>
                      <FaUser /> Dashboard
                    </Link>
                  </li>
                  <li onClick={handleLogout}>
                    <FaSignOutAlt /> Log Out
                  </li>
                </ul>
              </div>
            )}
            {!isLoggedIn && (
              <div>
                <button id="LoginBtn">
                  <Link to="/login">Login</Link>
                </button>
              </div>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
