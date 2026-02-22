import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../api/axios"

// Displays listings created by the authenticated user.
// Includes edit and delete functionality with confirmation modal.

function MyListings() {

  const [listings, setListings] = useState([])
  const [deleteId, setDeleteId] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetchMyListings()
  }, [])

  const fetchMyListings = async () => {
     // Query parameter used to filter listings server-side
      // Reduces unnecessary data transfer and improves security
    try {
         // Redirect unauthenticated users to login page
      const response = await api.get("listings/?my=true")
      setListings(response.data)
    } catch (error) {
      toast.error("You must be logged in")
      navigate("/login")
    }
  }

  const confirmDelete = async () => {
    try {
      await api.delete(`listings/${deleteId}/`)
      toast.success("Listing deleted")
      setDeleteId(null)
      fetchMyListings()
    } catch (error) {
      toast.error("Delete failed")
    }
  }

  return (
    <section className="py-10 relative">

      <h1 className="text-3xl font-semibold text-uofg-blue mb-8">
        My Listings
      </h1>

      {listings.length === 0 && (
        <p>No listings yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {listings.map((listing) => (
          <div
            key={listing.id}
            className="border rounded-lg overflow-hidden p-4"
          >
 {/* Lazy loading used to reduce dashboard page weight */}
            {listing.image && (
              <img
                src={listing.image}
                alt={listing.title}
                loading="lazy"
                className="h-40 w-full object-cover mb-4"
              />
            )}

            <h2 className="font-semibold text-uofg-blue">
              {listing.title}
            </h2>

            <p className="text-gray-600">
              £{listing.price}
            </p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() => navigate(`/edit-listing/${listing.id}`)}
                className="bg-uofg-gold text-white px-4 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => setDeleteId(listing.id)}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
 {/* 
        Confirmation modal prevents accidental deletion.
        Rendered conditionally to avoid unnecessary DOM complexity.
      */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-lg p-8 w-96 shadow-lg">

            <h2 className="text-lg font-semibold mb-4">
              Are you sure?
            </h2>

            <p className="text-gray-600 mb-6">
              Do you really want to delete this listing?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-4">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:opacity-90"
              >
                Yes, Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  )
}

export default MyListings
