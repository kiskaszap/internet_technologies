import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto w-full px-6">
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}

export default MainLayout
