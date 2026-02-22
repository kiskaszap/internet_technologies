import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import { AuthProvider } from "./context/AuthContext"

// Application entry point.
// Wraps the entire app with global providers (Auth + Router)
// to ensure consistent state and navigation handling.

ReactDOM.createRoot(document.getElementById("root")).render(
   // React.StrictMode enabled to detect potential side effects
  // and improve development reliability.
  <React.StrictMode>
     {/* 
      AuthProvider placed at the top level so authentication state
      is accessible across the entire application.
    */}
    <AuthProvider>
       {/* BrowserRouter enables client-side routing (SPA behaviour). */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
