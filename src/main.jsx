import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './main.css'
import './index.css'
import './App.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {
  RouterProvider,
} from "react-router-dom";
import {store} from './store'
import router from './routes/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
        <RouterProvider router={router} />
    {/* <App /> */}
    </Provider>
  </StrictMode>,
)

