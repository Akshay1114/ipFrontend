import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {
  RouterProvider,
} from "react-router-dom";
import {store} from './store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
        <RouterProvider router={router} />
    <App />
    </Provider>
  </StrictMode>,
)

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { Provider } from 'react-redux'
// import {
//   RouterProvider,
// } from "react-router-dom";
// import {store} from './store'
// import router from './routes'
// // import AuthProvider from './authProvider/AuthProvider.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//    <Provider store={store}>
//    <RouterProvider router={router} />
//     </Provider>
//   </StrictMode>,
// )

