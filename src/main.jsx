import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter><Provider store={store}>
      <GoogleOAuthProvider clientId='878500817919-iv92kkdou94cbp70m402p1sh9boh4o90.apps.googleusercontent.com'>
         <App />
      </GoogleOAuthProvider>
     
  </Provider></BrowserRouter>
    
  </StrictMode>,
)
