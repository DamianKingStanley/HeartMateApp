import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import "./UserPosts.css";
import convertDate from "../../utils/convertDate";
import { FaUserCircle, FaHeart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../component/NavigationBar/NavigationBar";

const UserPosts = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [likes, setLikes] = useState({});
  const [userLikedPosts, setUserLikedPosts] = useState(new Set());
  const [views, setViews] = useState({});

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:5000/user/${userId}`
        );
        setUserData(userResponse.data.user);

        const response = await axios.get(
          `http://localhost:5000/user/${userId}/posts`
        );

        const sortedPosts = response.data.userPosts.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        const likesData = {};
        const viewsData = {};

        sortedPosts.forEach((post) => {
          likesData[post._id] = post.likes;
          viewsData[post._id] = post.views;
        });

        setLikes(likesData);
        setViews(viewsData);

        setUserPosts(sortedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " ............ CLICK TO READ!";
    }
    return text;
  };

  const handlePostClick = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/posts/${postId}/view`
      );
      console.log("View count updated:", response);

      // Update the view count in state
      setViews((prevViews) => ({
        ...prevViews,
        [postId]: response.data.views,
      }));

      // Navigate to single post page
      navigate(`/contents/${postId}`);
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      if (!userData || !userData.token) {
        console.error("User data is missing or invalid.");
        return;
      }

      if (userLikedPosts.has(postId)) {
        console.log("Post already liked by the current user.");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      console.log("Like response:", response);

      setUserLikedPosts(
        (prevLikedPosts) => new Set([...prevLikedPosts, postId])
      );

      if (response.status === 200) {
        setLikes((prevLikes) => ({
          ...prevLikes,
          [postId]: response.data.likes,
        }));
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const OpenChat = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const currentUser = userData.result.username;

    if (userData && userData.result && userData.result.id) {
      navigate(`/${currentUser}/chat/${userId}`);
    } else {
      console.error("UserData, result, or ID is undefined.");
    }
  };

  return (
    <div className="UserPostsBody">
      <Navbar />
      <NavigationBar />
      <div className="userpostsContainer">
        <div className="authorDetails">
          <div>
            {userData?.profilePicture ? (
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="writerPicture"
              />
            ) : (
              <FaUserCircle className="default-avatar-icon" />
            )}
          </div>
          <div>
            <h1> {userData?.fullname}</h1>
            <h3>@{userData?.username}</h3>
          </div>
        </div>
        <button onClick={OpenChat} className="dmBtn">
          Send Message
        </button>

        <section>
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : userPosts.length === 0 ? (
              <p>No posts found.</p>
            ) : (
              <div className="UsersContents">
                {userPosts.map((post) => (
                  <div className="EachContent" key={post._id}>
                    <div className="EachContentTop">
                      <p id="displaydate">{convertDate(post?.createdAt)}</p>
                      <div>
                        {post?.MatePhoto ? (
                          <img
                            src={post?.MatePhoto}
                            alt="Profile"
                            className="mate-photouser"
                          />
                        ) : (
                          <FaUserCircle className="default-avatar-icon" />
                        )}
                      </div>
                    </div>
                    <p>{post?.selectedChoice}</p>
                    <p className="content">
                      {truncateText(post.textAreaValue, 100)}
                    </p>
                    <div className="post_actions">
                      <FaHeart
                        id="heart"
                        className={likes[post._id] ? "liked" : ""}
                        onClick={() => handleLikePost(post._id)}
                      />
                      <span>{likes[post._id] || 0}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserPosts;
