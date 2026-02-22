import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../api/axios"
import FormInput from "../components/FormInput"

// Handles user registration and initiates email verification (OTP flow).
// Designed to validate critical inputs client-side before API submission.

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
 // Client-side password confirmation check
    // Reduces unnecessary backend calls and improves UX
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {
      const response = await api.post("register/", {
        email: formData.email,
        password: formData.password
      })

  
      toast.success(response.data.message)
       // Redirect to OTP verification page with email passed via route state
      // Avoids storing temporary verification data globally

      setTimeout(() => {
        navigate("/verify-otp", { state: { email: formData.email } })
      }, 1500)

    } catch (error) {
      // Flexible error handling to support different backend response formats
      const message =
        error.response?.data?.message || "Something went wrong"

      toast.error(message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow">

      <h2 className="text-2xl font-semibold mb-6 text-uofg-blue">
        Register
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

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-uofg-blue text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Register
        </button>

      </form>

    </div>
  )
}

export default Register
