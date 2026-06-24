import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../store/cart'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/products' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
  { label: 'FAQs', path: '/faqs' },
]

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { items } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const cartCount = items.length

  const go = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-dark shadow-card-dark border-b border-ink-border/80'
          : 'bg-ink border-b border-transparent'
      }`}
    >
      {/* Announcement bar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden md:block border-b border-gold/15 bg-ink/60"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1 w-1 rounded-full bg-gold" />
            Complimentary insured shipping on all orders
          </span>
          <span className="text-muted">
            +91 90811 41423 <span className="mx-1 text-gold/60">·</span> WhatsApp available
          </span>
        </div>
      </motion.div>

      {/* Main bar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <button
          onClick={() => go('/')}
          aria-label="NARAH home"
          className="flex items-center transition-opacity hover:opacity-90"
        >
          <img
            src="/logo.png"
            alt="NARAH"
            className="h-12 w-auto md:h-14"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).src =
                'data:image/svg+xml;utf8,' +
                encodeURIComponent(
                  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="48"><rect width="120" height="48" fill="%231A1A22"/><text x="50%" y="55%" fill="%23D4AF37" font-family="serif" font-size="20" text-anchor="middle" dominant-baseline="middle" letter-spacing="3">NARAH</text></svg>'
                )
            }}
          />
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              onClick={() => go(link.path)}
              className={`relative text-sm uppercase tracking-widest transition-colors duration-300 ${
                isActive(link.path) ? 'text-gold' : 'text-body hover:text-gold'
              }`}
            >
              {link.label}
              <span
                className={`pointer-events-none absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                  isActive(link.path) ? 'w-full' : 'w-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <button
            onClick={() => navigate('/cart')}
            aria-label="View cart"
            className="relative inline-flex items-center gap-2 rounded-full border border-gold/60 px-4 py-2 text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="hidden text-xs uppercase tracking-widest sm:inline">Cart</span>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ink shadow-gold-soft"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="rounded-full border border-ink-border p-2 text-body transition-colors hover:border-gold/60 hover:text-gold lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-ink-border bg-ink-soft/95 backdrop-blur-md lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.path}
                  onClick={() => go(link.path)}
                  className={`border-b border-ink-border/60 py-3 text-left text-sm uppercase tracking-widest transition-colors ${
                    isActive(link.path) ? 'text-gold' : 'text-body hover:text-gold'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => go('/cart')}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 px-4 py-3 text-xs uppercase tracking-widest text-gold transition-all hover:bg-gold hover:text-ink"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Cart{cartCount > 0 ? ` (${cartCount})` : ''}
              </button>

              <div className="mt-4 flex flex-col gap-1 border-t border-ink-border/60 pt-3 text-[11px] uppercase tracking-[0.16em] text-faint">
                <span>Complimentary insured shipping on all orders</span>
                <span>+91 90811 41423 · WhatsApp available</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
