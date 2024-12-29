import React, { useEffect, useState } from "react";
import convertDate from "../../utils/convertDate";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaHeart, FaEye } from "react-icons/fa";
import axios from "axios";

const PostCardEach = ({ selectedChoice }) => {
  const navigate = useNavigate();
  const [postDetails, setPostDetails] = useState([]);
  const postLimit = 10000000000000;
  const [likes, setLikes] = useState({});
  const [userLikedPosts, setUserLikedPosts] = useState(new Set());
  const [views, setViews] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");
        const data = await response.json();
        const reversedData = Array.isArray(data.fetchPosts)
          ? data.fetchPosts.reverse()
          : [];

        // Extract likes count and store in state
        const likesData = {};
        reversedData.forEach((post) => {
          likesData[post._id] = post.likes;
        });
        setLikes(likesData);

        // Extract views count and store in state
        const viewsData = {};
        reversedData.forEach((post) => {
          viewsData[post._id] = post.views;
        });
        setViews(viewsData);
        setPostDetails(reversedData);
        // console.log(postDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const truncateText = (text, maxLength) => {
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "......Read more";
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

  const redirectToUserPosts = (userId) => {
    navigate(`/mate/${userId}/posts`);
  };

  const filteredPosts = postDetails.filter(
    (post) => post.selectedChoice === selectedChoice
  );

  return (
    <section className="PostCardBody">
      <div className="postCardSection">
        {filteredPosts.slice(0, postLimit).map((post) => {
          return (
            <div className="post_wrapper" key={post._id}>
              <div>
                <div className="post_Top">
                  <div>
                    {post?.profilePicture ? (
                      <img
                        src={post?.profilePicture}
                        alt="Profile"
                        className="displaypicture"
                      />
                    ) : (
                      <FaUserCircle className="default-avatar-icon" />
                    )}
                  </div>

                  <div
                    className="post_user_details"
                    onClick={() => redirectToUserPosts(post?.userId)}
                  >
                    <h4>{post?.author}</h4>
                    <p id="displaydate">{convertDate(post?.createdAt)}</p>
                  </div>
                </div>
                <div className="MainContent">
                  <div>
                    {post?.MatePhoto ? (
                      <img
                        src={post?.MatePhoto}
                        alt="Profile"
                        className="mate-photo"
                      />
                    ) : (
                      <FaUserCircle className="default-avatar-icon" />
                    )}
                  </div>
                  <p>{post?.selectedChoice}</p>
                  <p>{truncateText(post?.textAreaValue, 100)}</p>
                </div>
                <div className="post_actions">
                  <FaHeart
                    id="heart"
                    className={likes[post._id] ? "liked" : ""}
                    onClick={() => handleLikePost(post._id)}
                  />
                  <span>{likes[post._id] || 0}</span>
                  <FaEye />
                  <span>{views[post._id] || 0}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PostCardEach;
