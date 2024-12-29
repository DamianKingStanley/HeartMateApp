import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [location, setLocation] = useState("");
  const [interestedIn, setInterestedIn] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const storeUserData = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const submitForm = async () => {
    try {
      if (password === confirmPassword) {
        const response = await fetch("http://localhost:5000/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            userName,
            email,
            gender,
            dateOfBirth,
            location,
            interestedIn,
            phoneNumber,
            password,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setRegisterMessage("Registered successfully");
          storeUserData(data);
          navigate("/login");
        } else {
          const errorResponseData = await response.json();
          console.log(errorResponseData);
          setRegisterMessage(
            "Registration failed. Email or username already exists."
          );
        }
      } else {
        setPasswordMatch(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleCancelLogin = () => {
    setShowLogin(false);
  };

  return (
    <div className="SignUpBody">
      <section className="register">
        {registerMessage && (
          <div
            className={
              registerMessage === "Registered successfully"
                ? "success-message"
                : "error-message"
            }
          >
            {registerMessage}
          </div>
        )}
        <h1>Create Profile</h1>
        <div id="registerForm">
          <input
            type="text"
            name="fullName"
            id="regForm"
            placeholder="Full Name"
            required
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            name="userName"
            id="regForm"
            placeholder="Username"
            required
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="email"
            name="email"
            id="regForm"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <select
            id="regForm"
            name="gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            type="date"
            id="regForm"
            name="dateOfBirth"
            placeholder="Date of Birth"
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <input
            type="text"
            id="regForm"
            name="location"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            id="regForm"
            name="interestedIn"
            onChange={(e) => setInterestedIn(e.target.value)}
          >
            <option value="">Interested In</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="both">Both</option>
          </select>

          <input
            type="tel"
            id="regForm"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            id="regForm"
            onChange={handlePasswordChange}
          />
          <i
            className={`fas ${
              showPassword ? "fa-eye-slash" : "fa-eye"
            } password-toggle`}
            onClick={togglePasswordVisibility}
          ></i>

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            id="regForm"
            onChange={handleConfirmPasswordChange}
          />
          <i
            className={`fas ${
              showPassword ? "fa-eye-slash" : "fa-eye"
            } password-toggle`}
            onClick={toggleConfirmPasswordVisibility}
          ></i>
          <div id="passwordMatchAlert">
            {!passwordMatch && <p>Passwords do not match. Please try again.</p>}
          </div>

          <button onClick={submitForm} id="submitBtn">
            Register
          </button>

          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Register;
