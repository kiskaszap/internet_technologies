import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-uofg-blue text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">

        {/* Left Side */}
        <div className="flex space-x-8 items-center">
          <Link
            to="/"
            className="font-semibold hover:text-uofg-gold transition"
          >
            Home
          </Link>

          <Link
            to="/listings"
            className="font-semibold hover:text-uofg-gold transition"
          >
            Listings
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/create"
                className="font-semibold hover:text-uofg-gold transition"
              >
                Create Listing
              </Link>

              <Link
                to="/my-listings"
                className="font-semibold hover:text-uofg-gold transition"
              >
                My Listings
              </Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex space-x-8 items-center">

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hover:text-uofg-gold transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-uofg-gold transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-uofg-gold transition"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  )
}

export default Navbar
