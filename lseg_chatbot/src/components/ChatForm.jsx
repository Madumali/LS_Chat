import React, { useState } from "react";

const ChatForm = ({ chatHistory, setChatHistory, botResponseGenerate }) => {
  const [message, setMessage] = useState(""); //State to keep user input when user types

  //Handle form submit with user input
  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = message.trim();
    if (!userMessage) return;
    setMessage("");
    // Chat history update with users' message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage, type: "typetext" },
    ]);

    // Before showing response and Thinking.. delay 600ms
    setTimeout(() => {
      // Add Thinking.. text untill bot shows response
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking...", type: "typetext" },
      ]);

      //Calling bot response generate function defined in ChatBot component
      botResponseGenerate([
        ...chatHistory,
        { role: "user", text: userMessage, type: "typetext" },
      ]);
    }, 600);
  };

  return (
    <form action="#" className="chat_form" onSubmit={handleSubmit}>
      <input 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        className="message_inputText"
        placeholder="Please pick an option"
        required
      />
      <button>
        <span class="material-symbols-outlined">send</span>
      </button>
    </form>
  );
};

export default ChatForm;
