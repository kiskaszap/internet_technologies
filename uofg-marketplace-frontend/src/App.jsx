import { Routes, Route } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Listings from "./pages/Listings"
import ListingDetail from "./pages/ListingDetail"
import CreateListing from "./pages/CreateListing"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import VerifyOTP from "./pages/VerifyOTP"
import MyListings from "./pages/MyListings"
import EditListing from "./pages/EditListing"


// Central routing configuration for the application.
// Uses nested routing to share a common layout across all pages.



function App() {
  return (
    <>
    <Routes>
  {/* 
          MainLayout wraps all routes to provide consistent
          navigation and page structure across the app.
        */}
 
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/create" element={<CreateListing />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/edit-listing/:id" element={<EditListing />} />
        {/* Fallback route for undefined paths */}
        <Route path="*" element={<div>404 Not Found</div>} />

      </Route>
     
    </Routes>
     {/* 
        Global toast container used for consistent notification handling
        across all components.
      */}
     <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
