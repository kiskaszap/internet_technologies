import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../api/axios"

function VerifyOTP() {
  const [otp, setOtp] = useState("")
  const location = useLocation()
  const navigate = useNavigate()

  const email = location.state?.email

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post("verify-otp/", {
        email: email,
        otp: otp
      })

      toast.success(response.data.message)

      setTimeout(() => {
        navigate("/login")
      }, 1500)

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid or expired OTP"
      )
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow">

      <h2 className="text-2xl font-semibold mb-6 text-uofg-blue">
        Verify Your Email
      </h2>

      <p className="mb-4 text-sm text-gray-600">
        Enter the 6-digit code sent to your university email.
      </p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength="6"
          className="w-full border p-2 rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-uofg-blue text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Verify
        </button>

      </form>

    </div>
  )
}

export default VerifyOTP
