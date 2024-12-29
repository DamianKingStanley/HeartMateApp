import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";
import bedvideo from "../../assest/bedmatevid.mp4";

const HeroSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
  return (
    <div>
      <section className="heroSectionContainer">
        <video autoPlay loop muted>
          <source src={bedvideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <section className="content">
          <h1>HEARTMATE</h1>
          <p>Connect with someone you wanna share your bed with!</p>

          <div>
            {isLoggedIn && (
              <div>
                <Link to="/finding-a-mate">
                  <button id="createAcctBtn">Find a mate</button>
                </Link>
              </div>
            )}
            {!isLoggedIn && (
              <div>
                <Link to="/register">
                  <button id="createAcctBtn">Create Account</button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </section>
    </div>
  );
};

export default HeroSection;
