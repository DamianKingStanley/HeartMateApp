import React, { useState, useEffect } from "react";
import "./FindMate.css";
import PostCard from "../../component/PostCard/PostCard";
import Navbar from "../../component/Navbar/Navbar";
import NavigationBar from "../../component/NavigationBar/NavigationBar";
import PostCardEach from "../../component/PostCardEach/PostCardEach";
import Loading from "../../component/Loading/Loading";

const FindMate = () => {
  const [selectedState, setSelectedState] = useState("");
  const [formVisible, setFormVisible] = useState(true);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setFormVisible(true);
  };

  const handleViewAll = () => {
    setFormVisible(false);
    setSelectedState("");
  };

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay with useEffect hook
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds (adjust as needed)
    }, 3000); // Adjust delay time as needed (2000 milliseconds = 2 seconds)

    // Clear timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  // Render loading component if loading is in progress
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <NavigationBar />
      <section className="FindMateSectiion">
        {formVisible && (
          <form className="state-form">
            <h2>Choose your state</h2>
            <select
              id="states"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">where are you currently?</option>
              <option value="Abia">Abia</option>
              <option value="Adamawa">Adamawa</option>
              <option value="AkwaIbom">Akwa Ibom</option>
              <option value="Anambra">Anambra</option>
              <option value="Bauchi">Bauchi</option>
              <option value="Bayelsa">Bayelsa</option>
              <option value="Benue">Benue</option>
              <option value="Borno">Borno</option>
              <option value="CrossRiver">Cross River</option>
              <option value="Delta">Delta</option>
              <option value="Ebonyi">Ebonyi</option>
              <option value="Edo">Edo</option>
              <option value="Ekiti">Ekiti</option>
              <option value="Enugu">Enugu</option>
              <option value="Gombe">Gombe</option>
              <option value="Imo">Imo</option>
              <option value="Jigawa">Jigawa</option>
              <option value="Kaduna">Kaduna</option>
              <option value="Kano">Kano</option>
              <option value="Katsina">Katsina</option>
              <option value="Kebbi">Kebbi</option>
              <option value="Kogi">Kogi</option>
              <option value="Kwara">Kwara</option>
              <option value="Lagos">Lagos</option>
              <option value="Nasarawa">Nasarawa</option>
              <option value="Niger">Niger</option>
              <option value="Ogun">Ogun</option>
              <option value="Ondo">Ondo</option>
              <option value="Osun">Osun</option>
              <option value="Oyo">Oyo</option>
              <option value="Plateau">Plateau</option>
              <option value="Rivers">Rivers</option>
              <option value="Sokoto">Sokoto</option>
              <option value="Taraba">Taraba</option>
              <option value="Yobe">Yobe</option>
              <option value="Zamfara">Zamfara</option>
              <option value="Abuja">Abuja</option>
            </select>

            <button onClick={handleViewAll}>View All</button>
          </form>
        )}

        {formVisible && selectedState && (
          <PostCardEach selectedChoice={selectedState} />
        )}

        {!formVisible &&
          selectedState &&
          (() => {
            const postCardEach = (
              <PostCardEach selectedChoice={selectedState} />
            );
            if (!postCardEach.props.children) {
              return <p>No mate from your state currently.</p>;
            }
            return postCardEach;
          })()}

        {!formVisible && !selectedState && <PostCard />}
      </section>
    </div>
  );
};

export default FindMate;
