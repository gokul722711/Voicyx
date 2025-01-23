// src/components/ChatContainer.js
import React, { useState } from "react";

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);

  // Function to handle user message input
  const handleUserMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: message },
    ]);
  };

  // Function to handle assistant response (you can extend this for actual model interaction)
  const handleAssistantResponse = (response) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "assistant", text: response },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatContainer;
