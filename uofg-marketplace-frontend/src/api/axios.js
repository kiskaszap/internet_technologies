import axios from "axios"

// Centralised Axios instance.
// Created to avoid repeating baseURL and authentication logic
// across individual API calls in components.

const api = axios.create({
    // Base URL separated for easier environment configuration
  baseURL: "http://127.0.0.1:8000/api/",
})
// Request interceptor automatically attaches JWT access token
// to every outgoing request if available.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access")
// Conditional injection prevents sending empty or invalid headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
