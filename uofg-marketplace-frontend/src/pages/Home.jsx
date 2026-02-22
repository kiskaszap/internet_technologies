import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ListingCard from "../components/ListingCard"
import bannerImage from "../assets/banner_image.webp"
import api from "../api/axios"

// Homepage displays featured (latest) listings.
// Performance optimised to improve Lighthouse scores (LCP + CLS).

function Home() {

  const [listings, setListings] = useState([])

  useEffect(() => {
    fetchLatest()
  }, [])

  const fetchLatest = async () => {
    try {
      const response = await api.get("listings/")
       // Limit to 8 items to reduce initial payload
      // Improves performance and sustainability by lowering render cost
      setListings(response.data.slice(0, 8))
    } catch (error) {
      console.error("Failed to load latest listings")
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6">

  
      <div className="mt-6">
        <div className="relative h-64 rounded-lg overflow-hidden">

          <img
            src={bannerImage}
            alt="UofG Marketplace Banner"
            width="1200"
            height="400"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-uofg-blue/60 flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl font-bold mb-2">
              UofG Student Marketplace
            </h1>
            <p className="text-uofg-gold">
              Buy & Sell within the University Community
            </p>
          </div>

        </div>
      </div>

    
      <h2 className="text-2xl font-semibold mt-10 mb-6 text-uofg-blue">
        Latest Listings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{/* // Skeleton placeholders used to prevent layout shift (CLS optimisation)
            // Ensures grid space is reserved while data loads. */}
        {listings.length === 0
  ? Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="bg-white border rounded-lg h-64 animate-pulse"
      />
    ))
    // Reusable card component ensures consistency and maintainability
  : listings.map((listing) => (
      <ListingCard key={listing.id} listing={listing} />
    ))}

      </div>

  
      <div className="flex justify-center mt-8">
        <Link
          to="/listings"
          className="bg-uofg-gold text-white px-6 py-2 rounded hover:opacity-90"
        >
          View All Products
        </Link>
      </div>

    </div>
  )
}

export default Home
