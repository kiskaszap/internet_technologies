import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

//responsive navbar component that adapts to different screen sizes
// it includes links to home, listings, create listing, my listings, login and register pages
// it also includes a logout button if the user is authenticated
// the navbar collapses into a hamburger menu on smaller screens


function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  // State to manage mobile menu open/close
  // isOpen is true when the menu is open, false when it is closed
  // setIsOpen is a function to update the state
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    //redirect to home page after logout
    navigate("/")
    //close the mobile menu if it is open
    setIsOpen(false)
  }

  return (
    <nav className="bg-uofg-blue text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">

       
        <Link
          to="/"
          className="font-bold text-lg hover:text-uofg-gold"
        >
          UofG Marketplace
        </Link>

      
        <div className="hidden md:flex space-x-8 items-center">

          <Link to="/" className="hover:text-uofg-gold">
            Home
          </Link>

          <Link to="/listings" className="hover:text-uofg-gold">
            Listings
          </Link>
{          /* Ternary operator: show Create and My Listings links only if user is authenticated */}
          {isAuthenticated && (
            <>
              <Link to="/create" className="hover:text-uofg-gold">
                Create Listing
              </Link>

              <Link to="/my-listings" className="hover:text-uofg-gold">
                My Listings
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hover:text-uofg-gold"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-uofg-gold">
                Login
              </Link>

              <Link to="/register" className="hover:text-uofg-gold">
                Register
              </Link>
            </>
          )}

        </div>

        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>

      </div>

    {/* 
        Mobile navigation menu.
        Rendered conditionally to reduce unnecessary DOM complexity.
      */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-6 pb-6 items-start text-left">

          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>

          <Link to="/listings" onClick={() => setIsOpen(false)}>
            Listings
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/create" onClick={() => setIsOpen(false)}>
                Create Listing
              </Link>

              <Link to="/my-listings" onClick={() => setIsOpen(false)}>
                My Listings
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-left"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>

              <Link to="/register" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </>
          )}

        </div>
      )}

    </nav>
  )
}

export default Navbar