function Footer() {
  return (
    <footer className="bg-uofg-blue text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* About */}
          <div>
            <h3 className="font-semibold mb-3 text-uofg-gold">
              UofG Student Marketplace
            </h3>
            <p className="text-sm text-gray-200">
              A secure trading platform exclusively for the University of Glasgow community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 text-uofg-gold">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-uofg-gold">
                  Home
                </a>
              </li>
              <li>
                <a href="/listings" className="hover:text-uofg-gold">
                  Listings
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-uofg-gold">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="hover:text-uofg-gold">
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 text-uofg-gold">
              Contact
            </h3>
            <p className="text-sm text-gray-200">
              support@uofgmarketplace.ac.uk
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-500 mt-8 pt-4 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} University of Glasgow Marketplace
        </div>

      </div>
    </footer>
  )
}

export default Footer
