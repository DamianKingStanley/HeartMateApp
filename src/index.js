import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const handleScroll = () => {
  const navbar = document.querySelector(".navbar-container");
  const scrollPosition = window.scrollY;
  if (scrollPosition > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};

window.addEventListener("scroll", handleScroll);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
