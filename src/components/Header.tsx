import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../store/cart'

export default function Header() {
  const navigate = useNavigate()
  const { items } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cartCount = items.length

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-gradient-to-r from-gray-900 to-gray-800 shadow-md border-b border-gray-700'
        : 'bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700'
    }`}>
      {/* Top Bar */}
      <div className="hidden md:block bg-gray-900 text-white py-2 px-4 text-xs font-semibold">
        <div className="container max-w-7xl mx-auto flex justify-between">
          <div>🚚 FREE SHIPPING on orders above Rs. 5000</div>
          <div>📞 CALL: +92 XXX-XXXXXXX | WhatsApp Available</div>
        </div>
      </div>

      {/* Main Header */}
      <nav className="container max-w-7xl mx-auto py-4 px-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="cursor-pointer flex items-center gap-3 min-w-fit"
        >
          <img src="/logo.png" alt="NARAH Jewels" className="h-16 w-auto" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => navigate('/')}
            className="text-white font-semibold hover:text-primary transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/products')}
            className="text-white font-semibold hover:text-primary transition-colors"
          >
            Shop
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="text-white font-semibold hover:text-primary transition-colors"
          >
            Contact
          </button>
          <button
            onClick={() => navigate('/faqs')}
            className="text-white font-semibold hover:text-primary transition-colors"
          >
            FAQs
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button
            onClick={() => navigate('/cart')}
            className="relative flex items-center gap-2 px-4 py-2 border border-gray-600 text-white rounded-lg hover:border-primary hover:text-primary transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm font-semibold hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-700 rounded-lg text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700">
          <div className="container max-w-7xl mx-auto py-4 px-4 flex flex-col gap-3">
            <button onClick={() => { navigate('/'); setIsOpen(false); }} className="text-left py-2 font-semibold text-white hover:text-primary">
              Home
            </button>
            <button onClick={() => { navigate('/products'); setIsOpen(false); }} className="text-left py-2 font-semibold text-white hover:text-primary">
              Shop
            </button>
            <button onClick={() => { navigate('/contact'); setIsOpen(false); }} className="text-left py-2 font-semibold text-white hover:text-primary">
              Contact
            </button>
            <button onClick={() => { navigate('/faqs'); setIsOpen(false); }} className="text-left py-2 font-semibold text-white hover:text-primary">
              FAQs
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
