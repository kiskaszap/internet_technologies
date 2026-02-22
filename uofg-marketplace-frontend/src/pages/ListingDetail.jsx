// import { useParams, useNavigate } from "react-router-dom"
// import { useState, useEffect } from "react"
// import { useAuth } from "../context/AuthContext"
// import { toast } from "react-toastify"
// import api from "../api/axios"

// function ListingDetail() {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const { isAuthenticated } = useAuth()

//   const [listing, setListing] = useState(null)
//   const [comments, setComments] = useState([])
//   const [comment, setComment] = useState("")
//   const [loading, setLoading] = useState(true)

//   // ---------------------------
//   // FETCH LISTING + COMMENTS
//   // ---------------------------

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const listingRes = await api.get(`listings/${id}/`)
//         const commentRes = await api.get(`comments/?listing=${id}`)

//         setListing(listingRes.data)
//         setComments(commentRes.data)
//         setLoading(false)
//       } catch (error) {
//         toast.error("Failed to load listing")
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [id])

//   // ---------------------------
//   // POST COMMENT
//   // ---------------------------

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!comment.trim()) return

//     try {
//       const response = await api.post("comments/", {
//   listing: id,
//   text: comment
// })


//       setComments([response.data, ...comments])
//       setComment("")
//       toast.success("Comment posted")
//     } catch (error) {
//       if (error.response?.status === 401) {
//         toast.error("Please login to comment")
//         navigate("/login")
//       } else {
//         toast.error("Failed to post comment")
//       }
//     }
//   }

//   if (loading) return <p className="py-8">Loading...</p>
//   if (!listing) return <p className="py-8">Listing not found</p>

//   return (
//     <section className="py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

//         {/* Image */}
//         <div>
//           <img
//             src={listing.image}
//             alt={listing.title}
//             className="w-full h-72 object-cover rounded-lg"
//           />
//         </div>

//         {/* Meta */}
//         <div className="flex flex-col gap-4">
//           <h1 className="text-2xl font-bold text-uofg-blue">
//             {listing.title}
//           </h1>

//           <p className="text-xl font-semibold">
//             Price: £{listing.price}
//           </p>

//           {isAuthenticated ? (
//             <p>Seller Contact: {listing.user?.phone_number}</p>
//           ) : (
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-uofg-blue text-white px-4 py-2 rounded w-fit"
//             >
//               Login to reveal phone number
//             </button>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <h3 className="font-semibold mb-3">Item Description:</h3>
//           <div className="bg-gray-100 p-4 rounded">
//             {listing.description}
//           </div>
//         </div>

//         {/* Comments */}
//         <div className="flex flex-col gap-6">
//           <div>
//             <h2 className="font-semibold mb-4">Comments</h2>

//             {comments.length === 0 && (
//               <p className="text-gray-500">No comments yet</p>
//             )}

//             <div className="flex flex-col gap-4">
//              {comments.map((c) => (
//   <div key={c.id}>
//     <p className="font-medium text-sm">
//       {c.user?.username}
//     </p>
//     <p className="text-gray-700">{c.text}</p>
//   </div>
// ))}

//             </div>
//           </div>

//           {/* Add Comment */}
//           {isAuthenticated ? (
//             <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//               <input
//                 type="text"
//                 placeholder="Add a new comment..."
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-uofg-blue"
//               />

//               <button
//                 type="submit"
//                 className="bg-uofg-gold text-white px-4 py-2 rounded hover:opacity-90"
//               >
//                 Post Comment
//               </button>
//             </form>
//           ) : (
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-uofg-gold text-white px-4 py-2 rounded w-fit"
//             >
//               Login to comment
//             </button>
//           )}

//         </div>

//       </div>
//     </section>
//   )
// }

// export default ListingDetail


import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api/axios"
import { toast } from "react-toastify"

function ListingDetail() {
  const { id } = useParams()

  const [listing, setListing] = useState(null)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const [showPhone, setShowPhone] = useState(false)

  useEffect(() => {
    fetchListing()
    fetchComments()
  }, [id])

  const fetchListing = async () => {
    try {
      const res = await api.get(`listings/${id}/`)
      setListing(res.data)
    } catch (err) {
      toast.error("Listing not found")
    }
  }

  const fetchComments = async () => {
    try {
      const res = await api.get(`comments/?listing=${id}`)
      setComments(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    try {
      await api.post("comments/", {
        text: comment,
        listing: id
      })

      setComment("")
      fetchComments()
    } catch (err) {
      toast.error("You must be logged in to comment")
    }
  }

  if (!listing) return null

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Image */}
        <div>
          {listing.image && (
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-72 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-uofg-blue">
            {listing.title}
          </h1>

          <p className="text-xl font-semibold">
            Price: £{listing.price}
          </p>

          {/* 🔥 PHONE NUMBER LOGIC */}
          {showPhone ? (
            <p className="text-gray-700">
              Seller Contact: {listing.phone_number}
            </p>
          ) : (
            <button
              onClick={() => setShowPhone(true)}
              className="bg-uofg-gold text-white px-4 py-2 rounded"
            >
              Reveal Phone Number
            </button>
          )}
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold mb-3">Item Description:</h3>
          <div className="bg-gray-100 p-4 rounded">
            {listing.description}
          </div>
        </div>

        {/* Comments */}
        <div className="flex flex-col gap-6">

          <div>
            <h2 className="font-semibold mb-4">Comments</h2>

            <div className="flex flex-col gap-4">
              {comments.map((c) => (
                <div key={c.id}>
                  <p className="font-medium text-sm">
                    {c.user.username}:
                  </p>
                  <p className="text-gray-700">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Add a new comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />

            <button
              type="submit"
              className="bg-uofg-blue text-white px-4 py-2 rounded"
            >
              Post Comment
            </button>
          </form>

        </div>

      </div>
    </section>
  )
}

export default ListingDetail
