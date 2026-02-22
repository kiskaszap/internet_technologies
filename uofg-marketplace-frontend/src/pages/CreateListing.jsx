

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../api/axios"

// Core feature: authenticated users can create marketplace listings.
// Uses controlled form inputs and multipart submission for image upload.

function CreateListing() {

  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
   // Centralised form state to keep inputs controlled and predictable

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    phone_number: "",
    image: null
  })


  useEffect(() => {
     // Categories fetched on mount to populate dynamic dropdown
    // Avoids hardcoding values and keeps frontend aligned with backend data
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await api.get("categories/")
      setCategories(res.data)
    } catch (err) {
      toast.error("Failed to load categories")
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
// Special handling required for file inputs
    // Files must be stored as File objects for FormData submission
    if (name === "image") {
      setFormData({ ...formData, image: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
     // Basic client-side validation to reduce unnecessary API calls

    if (!formData.title || !formData.price || !formData.phone_number || !formData.category) {
      toast.error("Please fill in all required fields.")
      return
    }

    try {
        // FormData used to support multipart upload (image + text fields)
      const data = new FormData()

      data.append("title", formData.title)
      data.append("description", formData.description)
      data.append("price", formData.price)
      data.append("category", formData.category)
      data.append("phone_number", formData.phone_number)

      if (formData.image) {
        data.append("image", formData.image)
      }

      const response = await api.post("listings/", data, {
        headers: { "Content-Type": "multipart/form-data" }
      })
       // Redirect to newly created listing page for improved UX
      toast.success("Listing created successfully!")

      navigate(`/listing/${response.data.id}`)

    } catch (error) {
        // Graceful error handling for authentication or backend validation errors
      toast.error(
        error.response?.data?.detail ||
        "You must be logged in to create a listing"
      )
    }
  }

  return (
  <section className="py-8 flex flex-col gap-8">

  <h1 className="text-3xl font-semibold text-uofg-blue">
    Create New Listing
  </h1>

  <form onSubmit={handleSubmit} className="flex flex-col gap-6">


    <div className="flex flex-col gap-2">
         {/* Explicit label association added for accessibility compliance */}
      <label htmlFor="title" className="font-medium">
        Title *
      </label>
      <input
        id="title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded px-4 py-2"
      />
    </div>

  
    <div className="flex flex-col gap-2">
      <label htmlFor="description" className="font-medium">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2"
      />
    </div>

   
    <div className="flex flex-col gap-2">
      <label htmlFor="price" className="font-medium">
        Price (£) *
      </label>
      <input
        id="price"
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
        min="0"
        className="border border-gray-300 rounded px-4 py-2"
      />
    </div>

    
    <div className="flex flex-col gap-2">
      <label htmlFor="category" className="font-medium">
        Category *
      </label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded px-4 py-2"
      >
        {/* Default option to prompt user selection, using map function to avoid hard coding */}
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>

 
    <div className="flex flex-col gap-2">
      <label htmlFor="phone_number" className="font-medium">
        Phone Number *
      </label>
      <input
        id="phone_number"
        type="tel"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded px-4 py-2"
      />
    </div>

   
    <div className="flex flex-col gap-2">
      <label htmlFor="image" className="font-medium">
        Upload Image
      </label>
      <input
        id="image"
        type="file"
        name="image"
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2"
      />
    </div>

    <button
      type="submit"
      className="bg-uofg-blue text-white px-6 py-2 rounded hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-uofg-gold"
    >
      Submit Listing
    </button>

  </form>

</section>
  )
}

export default CreateListing
