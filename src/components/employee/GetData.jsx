import React from 'react'

function GetData() {
    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/fitbit';
    };
  return (
    <div>
      <button onClick={handleLogin}>Login with Fitbit</button>
    </div>
  )
}

export default GetData
