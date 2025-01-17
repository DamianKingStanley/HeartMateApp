import React, { useState } from "react";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";

const LogIn = ({ onCancel }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const storeUserData = (userData) => {
    sessionStorage.setItem("userData", JSON.stringify(userData));
    return true;
  };

  const [token, setToken] = useState(" ");
  const storeUserToken = (userData) => {
    sessionStorage.setItem("token", JSON.stringify(userData?.token));
    setToken(userData?.token);
  };

  const submitForm = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        storeUserData(data);
        // storeUserToken(data);
        navigate("/");
        // console.log(data);
      } else {
        const errorResponseData = await response.json();
        console.log(errorResponseData);
        setLoginMessage(
          "Either email or password is incorrect. Check and try again."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="LogInbody">
      <section className="Login">
        <br />
        <br />
        {loginMessage && (
          <div
            id="loginmessage"
            className={
              loginMessage === "Welcome Back" ? "login-success" : "login-error"
            }
          >
            {loginMessage}
          </div>
        )}
        <h1>Login </h1>
        <br />
        <p>Enter your email and password to log in.</p>
        <div>
          <div>
            <label htmlFor="email">Email</label> <br />
            <input
              type="email"
              name="email"
              id="Loginform"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="email">Password</label> <br />
            <input
              type="password"
              name="password"
              id="Loginform"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br /> <br />
            <button onClick={submitForm} id="enter">
              Login
            </button>
            <button id="cancel" onClick={onCancel}>
              Cancel
            </button>
            <br /> <br />
            <p>
              Forgot Password?
              <Link to="/forgot-password"> Click here</Link>
            </p>
            <br />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LogIn;
