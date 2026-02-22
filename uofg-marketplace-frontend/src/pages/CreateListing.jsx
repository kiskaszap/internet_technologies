// import { useState } from "react"

// function CreateListing() {

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     category: "",
//     phone: "",
//     image: null
//   })

//   const [message, setMessage] = useState("")
//   const [error, setError] = useState("")

//   const handleChange = (e) => {
//     const { name, value, files } = e.target

//     if (name === "image") {
//       setFormData({ ...formData, image: files[0] })
//     } else {
//       setFormData({ ...formData, [name]: value })
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     if (!formData.title || !formData.price) {
//       setError("Please fill in all required fields.")
//       setMessage("")
//       return
//     }

//     setError("")
//     setMessage("Listing created successfully!")

//     console.log(formData)
//   }

//   return (
//     <section className="py-8 flex flex-col gap-8">

//       <h1 className="text-3xl font-semibold text-uofg-blue">
//         Create New Listing
//       </h1>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-6">

//         {/* Title */}
//         <div className="flex flex-col gap-2">
//           <label className="font-medium">Title *</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-uofg-blue"
//           />
//         </div>

//         {/* Description */}
//         <div className="flex flex-col gap-2">
//           <label className="font-medium">Description</label>
//           <textarea
//             name="description"
//             rows="4"
//             value={formData.description}
//             onChange={handleChange}
//             className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-uofg-blue"
//           />
//         </div>

//         {/* Price */}
//         <div className="flex flex-col gap-2">
//           <label className="font-medium">Price (£) *</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-uofg-blue"
//           />
//         </div>

//         {/* Category */}
//         <div className="flex flex-col gap-2">
//           <label className="font-medium">Category</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-uofg-blue"
//           >
//             <option value="">Select Category</option>
//             <option value="Electronics">Electronics</option>
//             <option value="Books">Books</option>
//             <option value="Furniture">Furniture</option>
//           </select>
//         </div>

//         {/* Phone */}
//         <div className="flex flex-col gap-2">
//           <label className="font-medium">Phone Number</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-uofg-blue"
//           />
//         </div>

//         {/* Image Upload */}
//         <div className="flex flex-col gap-2">
//           <label className="font-medium">Upload Image</label>
//           <input
//             type="file"
//             name="image"
//             onChange={handleChange}
//             className="border border-gray-300 rounded px-4 py-2"
//           />
//         </div>

//         {/* Messages */}
//         {message && (
//           <p className="text-green-600 font-medium">
//             {message}
//           </p>
//         )}

//         {error && (
//           <p className="text-red-600 font-medium">
//             {error}
//           </p>
//         )}

//         {/* Buttons */}
//         <div className="flex gap-4">
//           <button
//             type="submit"
//             className="bg-uofg-blue text-white px-6 py-2 rounded hover:opacity-90"
//           >
//             Submit Listing
//           </button>

//           <button
//             type="button"
//             onClick={() => setFormData({
//               title: "",
//               description: "",
//               price: "",
//               category: "",
//               phone: "",
//               image: null
//             })}
//             className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//         </div>

//       </form>

//     </section>
//   )
// }

// export default CreateListing

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../api/axios"

function CreateListing() {

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

  // ----------------------------
  // FETCH CATEGORIES
  // ----------------------------
  useEffect(() => {
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

  // ----------------------------
  // HANDLE CHANGE
  // ----------------------------
  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === "image") {
      setFormData({ ...formData, image: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  // ----------------------------
  // HANDLE SUBMIT
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.price || !formData.phone_number || !formData.category) {
      toast.error("Please fill in all required fields.")
      return
    }

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

      const response = await api.post("listings/", data, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      toast.success("Listing created successfully!")

      navigate(`/listing/${response.data.id}`)

    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
        "You must be logged in to create a listing"
      )
    }
  }

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <section className="py-8 flex flex-col gap-8">

      <h1 className="text-3xl font-semibold text-uofg-blue">
        Create New Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Price (£) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Phone Number *</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Image */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-uofg-blue text-white px-6 py-2 rounded hover:opacity-90"
        >
          Submit Listing
        </button>

      </form>

    </section>
  )
}

export default CreateListing
