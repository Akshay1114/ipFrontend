import React from 'react'

function ConnectBit() {
    const CLIENT_ID = "23Q4W9";
    const REDIRECT_URI = "https://ip-frontend-pi.vercel.app/callback";
    const AUTH_URL = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=sleep%20heartrate&expires_in=604800`;
  return (
    <div className="ConnectBit">
         <a href={AUTH_URL}>
                <button>Login with Fitbit</button>
            </a>
    </div>
  )
}

export default ConnectBit
