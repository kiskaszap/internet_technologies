import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../api/axios"
import { toast } from "react-toastify"

// Displays all marketplace listings with client-side filtering.
// Designed for responsiveness, accessibility, and performance optimisation.


function Listings() {

  const [listings, setListings] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
     // Promise.all used to fetch listings and categories in parallel
      // Reduces total loading time compared to sequential requests
    try {
      const [listingRes, categoryRes] = await Promise.all([
        api.get("listings/"),
        api.get("categories/")
      ])

      setListings(listingRes.data)
      setCategories(categoryRes.data)

    } catch (error) {
      toast.error("Failed to load data")
    } finally {
      setLoading(false)
    }
  }
 // Client-side filtering chosen for fast UX interaction
  // Avoids repeated API calls when user changes search/category
  const filteredListings = listings.filter((item) => {

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === parseInt(selectedCategory)

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return <p className="text-center mt-10">Loading listings...</p>
  }

  return (
   <section className="flex flex-col gap-10 py-8">

  <h1 className="text-3xl font-semibold text-uofg-blue">
    All Listings
  </h1>
  {/* 
        Search and filter controls.
        Explicit labels added to improve accessibility and Lighthouse score.
      */}

  <div className="flex flex-col md:flex-row gap-4">


    <div className="flex-1 flex flex-col gap-2">
      <label htmlFor="search" className="font-medium">
        Search Products
      </label>

      <input
        id="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="border border-gray-300 rounded-lg px-4 py-2"
      />
    </div>


    <div className="w-full md:w-1/4 flex flex-col gap-2">
      <label htmlFor="categoryFilter" className="font-medium">
        Filter by Category
      </label>

      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2"
      >
        <option value="All">All Categories</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>

  </div>


  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

    {filteredListings.length > 0 ? (
      filteredListings.map((listing) => (
        <Link
          key={listing.id}
          to={`/listing/${listing.id}`}
          className="border rounded-lg overflow-hidden hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-uofg-gold"
        >
 {/* 
                Lazy loading + explicit dimensions prevent layout shift
                and reduce initial page weight (sustainability optimisation).
              */}
          {listing.image && (
            <img
              src={listing.image}
              alt={listing.title}
              loading="lazy"
              decoding="async"
              width="400"
              height="300"
              className="h-48 w-full object-cover"
            />
          )}

          <div className="p-4">
            <h2 className="font-semibold text-lg text-uofg-blue">
              {listing.title}
            </h2>

            <p className="text-gray-600 mt-2">
              £{listing.price}
            </p>
          </div>

        </Link>
      ))
    ) : (
      <p role="status">No products found.</p>
    )}

  </div>

</section>
  )
}

export default Listings
