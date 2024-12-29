import React from "react";
import {
  IoSpeedometerOutline,
  IoMapOutline,
  IoTimeOutline,
} from "react-icons/io5";
import "./BottomNavbar.css";

const BottomNavbar = ({ selectedTab, setSelectedTab }) => {
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <nav className="bottom-navbar">
      <ul>
        <li
          className={selectedTab === "speed" ? "active" : ""}
          onClick={() => handleTabChange("speed")}
        >
          <IoSpeedometerOutline />
          <span>Speed</span>
        </li>
        <li
          className={selectedTab === "distance" ? "active" : ""}
          onClick={() => handleTabChange("distance")}
        >
          <IoMapOutline />
          <span>Distance</span>
        </li>
        <li
          className={selectedTab === "heart" ? "active" : ""}
          onClick={() => handleTabChange("heart")}
        >
          <IoTimeOutline />
          <span>Heart</span>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavbar;
