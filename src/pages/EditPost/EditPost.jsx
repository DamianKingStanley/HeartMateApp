import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditPost.css";
import Navbar from "../../component/Navbar/Navbar";
import NavigationBar from "../../component/NavigationBar/NavigationBar";
import Footer from "../../component/Footer/Footer";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState(null);
  const [postDetails, setPostDetails] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/post/${id}`);
        const { title, textAreaValue, selectedChoice } =
          response.data.SinglePost;
        setTitle(title);
        setTextAreaValue(textAreaValue);
        setSelectedChoice(selectedChoice);
      } catch (error) {
        setError("Error fetching post data");
      }
    };
    id && fetchPost();
  }, [id]);

  const getUserUsername = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    return userData ? userData.result.username : "";
  };

  const handleChoiceChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const submitForm = async () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData?.result?.id;

    const getUserToken = () => {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      return userData ? userData.token : "";
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/posts/edit/${id}`,
        {
          title,
          textAreaValue,
          selectedChoice,
          //   userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Post updated:", response.data);
        navigate("/profile/:username");
      } else {
        const errorResponseData = await response.json();
        setErrorResponse(errorResponseData.error);
      }
    } catch (error) {
      setError("Error updating post");
    }
  };

  return (
    <div className="EditPostBody">
      <Navbar />
      <NavigationBar />
      <section className="EditPost">
        <h2>Edit Post</h2>
        {error && <p>{error}</p>}
        <br />
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
        <input
          type="text"
          name="author"
          id="Creator"
          required
          value={getUserUsername()}
          readOnly
        />{" "}
        <label>What is on your mind?</label> <br />
        <textarea
          id="content"
          value={textAreaValue}
          onChange={handleTextAreaChange}
        />
        <br /> <br />
        <button id="editpostbtn" onClick={submitForm}>
          Update Post
        </button>
      </section>
      <Footer />
    </div>
  );
};

export default EditPost;
