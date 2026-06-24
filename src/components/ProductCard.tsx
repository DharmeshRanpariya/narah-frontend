import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Product } from '../types'
import { useCart } from '../store/cart'
import { formatINR } from '../utils/format'

interface Props {
  product: Product
}

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="#14141A"/><g fill="none" stroke="#26262F" stroke-width="2"><circle cx="200" cy="180" r="46"/><path d="M150 270h100l-20-44h-60z"/></g><text x="50%" y="340" fill="#3a3a45" font-family="serif" font-size="20" text-anchor="middle">Jewelry</text></svg>`
  )

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate()
  const addItem = useCart((state) => state.addItem)
  const [isAdded, setIsAdded] = useState(false)

  const outOfStock = product.stockQuantity === 0

  const handleAddToCart = () => {
    if (outOfStock) return
    addItem(product, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const goToDetail = () => navigate(`/products/${product._id}`)

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  const displayPrice = product.salePrice || product.price
  const rating = product.ratings?.average || 0
  const ratingCount = product.ratings?.count || 0
  const imageUrl =
    product.images?.find((img) => img.isPrimary)?.url ||
    product.images?.[0]?.url ||
    PLACEHOLDER

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-border bg-ink-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-glow"
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-ink-soft">
        <img
          src={imageUrl}
          alt={product.images?.[0]?.alt || product.name}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget
            if (target.src !== PLACEHOLDER) target.src = PLACEHOLDER
          }}
          className="h-full w-full cursor-pointer object-contain transition-transform duration-500 group-hover:scale-105"
          onClick={goToDetail}
        />

        {/* Badges */}
        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between">
          {discount > 0 ? (
            <span className="rounded-full bg-gold-gradient px-2.5 py-1 text-xs font-bold text-ink shadow-gold-soft">
              -{discount}%
            </span>
          ) : (
            <span />
          )}
          {outOfStock && (
            <span className="rounded-full border border-ink-border bg-ink/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-muted backdrop-blur-sm">
              Out of Stock
            </span>
          )}
        </div>

        {/* Hover overlay actions */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/70 px-6 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className="w-full rounded-full bg-gold-gradient px-6 py-2.5 text-sm font-semibold tracking-wide text-ink shadow-gold-soft transition-all duration-300 hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAdded ? '✓ Added' : 'Add to Cart'}
          </button>
          <button
            onClick={goToDetail}
            className="w-full rounded-full border border-gold/60 px-6 py-2.5 text-sm font-semibold tracking-wide text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-grow flex-col p-3 sm:p-5">
        <h3
          onClick={goToDetail}
          className="mb-1.5 line-clamp-2 cursor-pointer font-serif text-base leading-snug text-body transition-colors duration-200 hover:text-gold sm:mb-2 sm:text-lg"
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mb-2 flex items-center gap-1.5 sm:mb-3">
          <div className="flex gap-0.5 text-xs sm:text-sm">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < Math.round(rating) ? 'text-gold' : 'text-ink-border'}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted">
            {rating.toFixed(1)} ({ratingCount})
          </span>
        </div>

        {/* Price */}
        <div className="mb-3 flex flex-wrap items-baseline gap-x-2 sm:mb-4">
          <span className="text-lg font-semibold text-gold sm:text-xl">
            {formatINR(displayPrice)}
          </span>
          {product.salePrice && (
            <span className="text-xs text-faint line-through sm:text-sm">
              {formatINR(product.price)}
            </span>
          )}
        </div>

        {/* View Details */}
        <button
          onClick={goToDetail}
          className="mt-auto w-full rounded-full border border-gold/60 py-2 text-xs font-semibold tracking-wide text-gold transition-all duration-300 hover:bg-gold hover:text-ink sm:py-2.5 sm:text-sm"
        >
          View Details
        </button>
      </div>
    </motion.div>
  )
}
