import { Link } from "react-router-dom"

function ListingCard({ listing }) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition">

      <img
        src={listing.image}
        alt={listing.title}
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
