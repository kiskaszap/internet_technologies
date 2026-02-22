import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../api/axios"

// Allows users to edit only their own listings.
// Uses pre-filled controlled form and PATCH request for partial updates.

function EditListing() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    phone_number: "",
    image: null
  })

  useEffect(() => {
    // Fetch listing details and categories on mount
    // Keeps edit form consistent with backend state
    fetchListing()
    fetchCategories()
  }, [])

  const fetchListing = async () => {
    try {
      const res = await api.get(`listings/${id}/`)
// Pre-fill form with existing data to improve UX
      setFormData({
        title: res.data.title,
        description: res.data.description,
        price: res.data.price,
        category: res.data.category,
        phone_number: res.data.phone_number,
        image: null
      })

    } catch (error) {
         // Redirect if user does not own the listing or lacks permission
      toast.error("You are not allowed to edit this listing")
      navigate("/my-listings")
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await api.get("categories/")
      setCategories(res.data)
    } catch (error) {
      toast.error("Failed to load categories")
    }
  }


  const handleChange = (e) => {
     // File inputs handled separately for multipart upload
    const { name, value, files } = e.target

    if (name === "image") {
      setFormData({ ...formData, image: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    // FormData reused to support optional image update
    e.preventDefault()

    try {
      const data = new FormData()

      data.append("title", formData.title)
      data.append("description", formData.description)
      data.append("price", formData.price)
      data.append("category", formData.category)
      data.append("phone_number", formData.phone_number)

      if (formData.image) {
        data.append("image", formData.image)
      }
// PATCH chosen instead of PUT to allow partial updates
      await api.patch(`listings/${id}/`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      toast.success("Listing updated successfully")
// Redirect back to user dashboard after successful update
      navigate("/my-listings")

    } catch (error) {
      toast.error("Update failed")
    }
  }

  return (
    <section className="py-10">

      <h1 className="text-3xl font-semibold text-uofg-blue mb-8">
        Edit Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

       
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border rounded px-4 py-2"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Description"
          className="border rounded px-4 py-2"
        />

      
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border rounded px-4 py-2"
        />

     
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border rounded px-4 py-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

      
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border rounded px-4 py-2"
        />

   <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border rounded px-4 py-2"
        />

        <button
          type="submit"
          className="bg-uofg-blue text-white px-6 py-2 rounded hover:opacity-90"
        >
          Save Changes
        </button>

      </form>

    </section>
  )
}

export default EditListing
