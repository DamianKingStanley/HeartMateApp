import React, { useState, useEffect } from "react";
import "./Home.css";
import HeroSection from "../../component/HeroSection/HeroSection";
import Navbar from "../../component/Navbar/Navbar";
import NavigationBar from "../../component/NavigationBar/NavigationBar";
import BedmateMessage from "../../component/BedmateMessage/BedmateMessage";
import OurMission from "../../component/OurMission/OurMission";
import Steps from "../../component/Steps/Steps";
import Footer from "../../component/Footer/Footer";
import Loading from "../../component/Loading/Loading";

const Home = () => {
  // const [selectedTab, setSelectedTab] = useState("distance");

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay with useEffect hook
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds (adjust as needed)
    }, 5000); // Adjust delay time as needed (2000 milliseconds = 2 seconds)

    // Clear timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  // Render loading component if loading is in progress
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="HomeSection">
      <Navbar />
      <NavigationBar />
      <HeroSection />
      <BedmateMessage />
      <OurMission />
      <Steps />
      <Footer />

      {/* <SkinDisease /> */}
      {/* <DistanceCalculator />
      {selectedTab === "speed" && <Speed />}
      {selectedTab === "heart" && <HeartRateCalculator />} */}
      {/* <BottomNavbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} /> */}
    </div>
  );
};

export default Home;
