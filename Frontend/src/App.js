import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("real-time-chat-application-ochre.vercel.app"); // Ensure correct WebSocket URL

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Listen for new messages
    const handleMessage = (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on("message", handleMessage);

    // Cleanup function to remove the event listener
    return () => {
      socket.off("message", handleMessage);
    };
  }, []); // Empty dependency array ensures it runs only once

  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("message", input);
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat App</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message sent`}>
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;
