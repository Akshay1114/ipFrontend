import React from 'react'
import Fatigue from '../fitBit/Fatigue';
import YourParentComponent from '../fitBit/YourParentComponent';

function GetData() {
    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/fitbit';
    };
  return (
    <div>
      {/* <button onClick={handleLogin}>Login with Fitbit</button> */}
      <YourParentComponent/>
    </div>
  )
}

export default GetData
