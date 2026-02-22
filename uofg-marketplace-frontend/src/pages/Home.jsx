import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ListingCard from "../components/ListingCard"
import bannerImage from "../assets/banner_image.jpg"
import api from "../api/axios"

function Home() {

  const [listings, setListings] = useState([])

  useEffect(() => {
    fetchLatest()
  }, [])

  const fetchLatest = async () => {
    try {
      const response = await api.get("listings/")
      // csak a legújabb 8
      setListings(response.data.slice(0, 8))
    } catch (error) {
      console.error("Failed to load latest listings")
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6">

      {/* Banner */}
      <div className="mt-6">
        <div className="relative h-64 rounded-lg overflow-hidden">

          <img
            src={bannerImage}
            alt="UofG Marketplace Banner"
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

      {/* Featured Products */}
      <h2 className="text-2xl font-semibold mt-10 mb-6 text-uofg-blue">
        Latest Listings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {listings.map((listing) => (
          <Link key={listing.id} to={`/listing/${listing.id}`}>
            <ListingCard listing={listing} />
          </Link>
        ))}

      </div>

      {/* View All */}
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
