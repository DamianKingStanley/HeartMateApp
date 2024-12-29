import React, { useState, useEffect } from "react";
import "./BedmateMessage.css";
import bedmessage from "../../assest/bedmessage.jpg";
import { Link } from "react-router-dom";

const BedmateMessage = () => {
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
      <section className="BedmateMessageSection">
        <div>
          <img src={bedmessage} alt="" />
        </div>
        <div className="message1">
          <h1>HEARTMATE MINDSET</h1>
          <p>
            This platform is only for adults from age 18 and above. If you are
            below 18, you have no business being here.
          </p>
          <p>
            HeartMate is a place where beautiful and handsome adults find their
            lovers, friendship and even relationship. You deserve a HeartMate!
            Stop self pleasure when you can find a partner.
          </p>
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
        </div>
      </section>
    </div>
  );
};

export default BedmateMessage;
