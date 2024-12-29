import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assest/heartmateredlogo.png";
import { FaUserCircle } from "react-icons/fa"; // Import the book icony

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = sessionStorage.getItem("userData");
      return token !== null && token !== undefined;
    };

    setIsLoggedIn(checkLoginStatus());

    const userData = sessionStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUser(parsedData);
    }
  }, []);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        if (!userData || !userData.result.id) {
          console.error("User ID is undefined");
          return;
        }

        const userId = userData.result.id;

        const response = await fetch(
          `http://localhost:5000/user/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUser({
            ...data,
            profilePicture: data.profilePicture, // Updated URL here
          });
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    getUserProfile();
  }, []);

  const handleButtonClick = () => {
    const isLoggedIn = sessionStorage.getItem("userData");
  };

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

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-container">
      <section className="navbar1">
        <div className="logo">
          <Link to="/">
            <img id="bedmatelogo" src={logo} alt="" />
          </Link>
        </div>
        <div className="nav1-items">
          <ul>
            <li>
              <Link onClick={handleMateClick}>Finding a mate</Link>
            </li>
            <li>
              <Link to="/">About Us</Link>
            </li>
            <li className="services">
              <Link to="/">Safety</Link>
              <div className="services-dropdown">
                <ul>
                  <li>
                    <Link to="/">Our commitment to safety</Link>
                  </li>
                  <li>
                    <Link to="/">Safety Tips</Link>
                  </li>
                  <li>
                    <a href="#MatingTips"></a>
                    <Link to="/dating-relationship-advice-tips">
                      Dating Tips
                    </Link>
                  </li>
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
          </ul>
        </div>

        <div id="You">
          {isLoggedIn && (
            <div className="dropdown">
              <div className="userImage">
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt="Profile"
                    className="profilePictureNav"
                  />
                ) : (
                  <FaUserCircle className="profileIconNav" />
                )}

                <li onClick={toggleMenu} className="dropdown-toggle">
                  {user?.result?.username}
                </li>
              </div>

              {isOpen && (
                <ul className="dropdownMenu">
                  <li className="">
                    <Link
                      to={`/profile/${user?.result?.username}`}
                      onClick={handleButtonClick}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="" onClick={handleLogout}>
                    Log Out
                  </li>
                </ul>
              )}
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
      </section>
    </div>
  );
};

export default Navbar;
