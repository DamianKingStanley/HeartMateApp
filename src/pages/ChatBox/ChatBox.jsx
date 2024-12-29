// ChatBox.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatBox.css";

const ChatBox = ({ userId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:5000/message")
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const sendMessage = () => {
    axios
      .post("https://localhost:5000/message", {
        sender: currentUser,
        receiver: userId,
        content: newMessage,
      })
      .then((response) => {
        setMessages([...messages, response.data]);
        setNewMessage("");
      })
      .catch((error) => console.error("Error sending message:", error));
  };

  return (
    <div>
      <div>
        {/* <h2>Chat with {otherUser.username}</h2> */}
        <ul>
          {messages.map((message) => (
            <li key={message._id}>
              <strong>{message.sender.username}:</strong> {message.content}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
