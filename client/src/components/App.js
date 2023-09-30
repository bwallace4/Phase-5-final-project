import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/messages")
      .then((r) => r.json())
      .then((messages) => setMessages(messages));
  }, []);

  return (
    <div className="App">
      <h1>me ans me </h1>
      {messages.map(message => {
        return (
          <div key = {message.id}>
            <h2>{message.body}</h2>
            <p>{message.username}</p>
            <p>{message.created_at}</p>

            </div>
        )
      })}
    </div>
  )
}

export default App;
