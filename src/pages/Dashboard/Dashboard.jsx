import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import NavigationBar from "../../component/NavigationBar/NavigationBar";
import "./Dashboard.css";
import { FaUserCircle } from "react-icons/fa"; // Import the book icon
import IndividualPost from "../../component/IndividualPost/IndividualPost";

const Dashboard = () => {
  const [user, setUser] = useState(null);

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

  return (
    <div className="DashboardBody">
      <Navbar />
      <NavigationBar />
      {user && (
        <div className="UserHeader">
          <section className="">
            <div>
              {user?.profilePicture ? (
                <img
                  src={user?.profilePicture}
                  alt="Profile"
                  className="profilePicture"
                />
              ) : (
                <FaUserCircle className="profileIcon" />
              )}
            </div>
            <div className="user-info">
              <h2>Welcome back, {user.fullname}!</h2>
              <p>Username: @{user.username}</p>
              <div className="updateAndPostBtn">
                <div className="updateOnly">
                  <Link to={`/profile/edit/${user.username}`}>
                    <button id="profileUpdateBtn">Update Profile</button>
                  </Link>
                  <Link to="/advertise">
                    <button id="profileUpdateBtn">Make a Post</button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {user && <IndividualPost />}
    </div>
  );
};

export default Dashboard;
