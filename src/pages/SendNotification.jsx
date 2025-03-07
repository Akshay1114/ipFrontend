import React, { useState } from 'react'
import { io } from "socket.io-client";

const socket = io("http://localhost:5001/");

function SendNotification() {
    const [message, setMessage] = useState("");
    const [recipient, setRecipient] = useState("all"); 

    const sendNotification = () => {
        console.log("Sending notification...");
        socket.emit("send_notification", { message, recipient });
        setMessage("");
      };

  return (
    <div>
      <h1>Admin Dashboard - Send Notifications</h1>
      <input
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="text"
        placeholder="User ID (or 'all')"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  )
}

export default SendNotification
