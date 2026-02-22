import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../api/axios"
import FormInput from "../components/FormInput"
import { useAuth } from "../context/AuthContext"

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields")
      return
    }

    const normalizedEmail = formData.email.trim()

    try {
      const response = await api.post("token/", {
        username: normalizedEmail,
        password: formData.password
      })

      // AuthContext login
      login(response.data.access, response.data.refresh)

      toast.success("Login successful")

      setTimeout(() => {
        navigate("/")
      }, 1000)

    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Invalid credentials"

      toast.error(message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow">

      <h2 className="text-2xl font-semibold mb-6 text-uofg-blue">
        Login
      </h2>

      <form onSubmit={handleSubmit}>

        <FormInput
          label="University Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-uofg-blue text-white py-2 rounded-lg hover:bg-opacity-90 transition"
        >
          Login
        </button>

      </form>

    </div>
  )
}

export default Login
