import React, { useState } from 'react'
import { io } from "socket.io-client";

const socket = io("http://localhost:5001/",  { transports: ["websocket", "polling"] });
// const socket = io("https://rsinnovates.com/",  { transports: ["websocket", "polling"] });


function SendNotification() {
    const [message, setMessage] = useState("");
    const [recipient, setRecipient] = useState("all"); 

    const sendNotification = () => {
        console.log("Sending notification...");
        socket.emit("send_notification_to_user", { message, recipient, senderName:"admin", senderID:"admin", scheduleID:"Schedule ID"  });
        setMessage("");
      };

  return (
    <div>
      <h1>Create Annocement</h1>
      <div className='notificationSection'>
      <input
      className='notificationInput'
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
       className='notificationInput'
        type="text"
        placeholder="User ID (or 'all')"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <button className="submitNotification" onClick={sendNotification}>
          Send Notification
        </button>
      {/* <button style={{'background':"#1677ff", 'color':'white'}} className='submit' onClick={sendNotification}>Send Notification</button> */}
      </div>
   
    </div>
  )
}

export default SendNotification
