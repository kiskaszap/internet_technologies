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






function App() {
  return (
    <>
    <Routes>

      {/* Layout wrapper */}
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





        {/* 404 inside layout */}
        <Route path="*" element={<div>404 Not Found</div>} />

      </Route>
     
    </Routes>
     <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
