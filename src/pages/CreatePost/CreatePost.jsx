import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import Navbar from "../../component/Navbar/Navbar";
import NavigationBar from "../../component/NavigationBar/NavigationBar";
import { FaUserCircle } from "react-icons/fa";
import FileBase from "react-filebase64";
import Footer from "../../component/Footer/Footer";

const CreatePost = ({}) => {
  const [MatePhoto, setMatePhoto] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [userPicture, setUserPicture] = useState(null);
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState(null);

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const userId = userData?.result?.id;
        const response = await fetch(`http://localhost:5000/user/${userId}`);
        const data = await response.json();

        setUserPicture(data.user.profilePicture); // Set user's profile picture from backend
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfilePicture();
  }, []);

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const handleChoiceChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  const getUserUsername = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    return userData ? userData.result.username : "";
  };

  const submitForm = async () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData?.result?.id;

    const getUserToken = () => {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      return userData ? userData.token : "";
    };

    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify({
          MatePhoto,
          author: getUserUsername(),
          textAreaValue,
          selectedChoice,
          userId,
          profilePicture: userPicture, // Include user's profile picture in the POST request body
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/");
      } else {
        const errorResponseData = await response.json();
        setErrorResponse(errorResponseData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="CreatePostBody">
      <Navbar />
      <NavigationBar />
      <section className="Createpost">
        {errorResponse && (
          <p className="post_response"> You must login first!</p>
        )}
        <img
          id="postProfilePicture"
          src={userPicture || <FaUserCircle className="default-avatar-icon" />}
          alt="Profile"
        />
        <br />
        <br />
        <input
          type="text"
          name="author"
          id="Creator"
          required
          value={getUserUsername()}
          readOnly
        />
        <div>
          <h3>Drop your hot photo:</h3>
          <FileBase
            type="file"
            className="toPostPhoto"
            multiple={false}
            onDone={({ base64 }) => setMatePhoto(base64)}
          />
        </div>
        {MatePhoto && (
          <div>
            <img id="matePhoto" src={MatePhoto} alt="bedmate_photo" />
          </div>
        )}
        <br /> <br />
        <h3>What's on your mind?</h3>
        <textarea
          id="content"
          value={textAreaValue}
          onChange={handleTextAreaChange}
          placeholder="Description..."
        />
        <br /> <br />
        <h3>Where are you currently?</h3>
        <select
          id="states"
          value={selectedChoice}
          onChange={handleChoiceChange}
        >
          <option value="">Choose a State</option>
          <option value="Abia">Abia</option>
          <option value="Adamawa">Adamawa</option>
          <option value="AkwaIbom">Akwa Ibom</option>
          <option value="Anambra">Anambra</option>
          <option value="Bauchi">Bauchi</option>
          <option value="Bayelsa">Bayelsa</option>
          <option value="Benue">Benue</option>
          <option value="Borno">Borno</option>
          <option value="Cross River">Cross River</option>
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
        <br /> <br />
        <button id="createpostbtn" onClick={submitForm}>
          Drop it hot!
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default CreatePost;
