import { createContext, useContext, useState, useEffect } from "react"

// Centralised authentication context.
// Used to avoid prop-drilling and provide global auth state
// across the entire application.

const AuthContext = createContext()

// Custom hook created for cleaner consumption of AuthContext
// Improves readability in components (useAuth instead of useContext(AuthContext))

export const useAuth = () => useContext(AuthContext)
  // Boolean state representing whether a valid access token exists
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // On initial load, check for stored JWT access token
    // This allows authentication persistence after page refresh
    const token = localStorage.getItem("access")
    setIsAuthenticated(!!token)
  }, [])

  const login = (access, refresh) => {
     // Tokens stored in localStorage for session persistence
    // (Decision: chosen for simplicity in SPA context)
    localStorage.setItem("access", access)
    localStorage.setItem("refresh", refresh)
    setIsAuthenticated(true)
  }

  const logout = () => {
    // Clear stored tokens to prevent unauthorised reuse
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
