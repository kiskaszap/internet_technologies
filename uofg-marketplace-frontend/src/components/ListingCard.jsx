//listing card component created to display individual listings in a card format
// used in the listings page and home page to show latest listings
import React from "react"

import { Link } from "react-router-dom"

function ListingCard({ listing }) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition">
{/* 
        Image optimisation decisions:
        - loading="lazy" reduces initial page weight
        - decoding="async" improves rendering performance
        - width/height prevent layout shift (CLS optimisation)
      */}
      <img
  src={listing.image}
  alt={listing.title}
  loading="lazy"
  decoding="async"
  width="400"
  height="160"
  className="w-full h-40 object-cover"
/>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">
          {listing.title}
        </h3>

        <p className="text-gray-600 mb-2">
          £{listing.price}
        </p>

        <span className="text-xs text-green-600 font-medium">
          Available
        </span>

        <div className="mt-3">
          <Link
            to={`/listing/${listing.id}`}
            className="text-uofg-blue hover:text-uofg-gold font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ListingCard
