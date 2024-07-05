import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> 
    {/* The tag above causes the useEffect to run twice, hence calling the random name api twice */}
    <App title='Your (overengineered) Task App'/>
  </React.StrictMode>,
)
