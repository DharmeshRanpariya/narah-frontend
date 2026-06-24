import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { productService } from '../services/api'
import { Product } from '../types'
import { useCart } from '../store/cart'
import { formatINR } from '../utils/format'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const addItem = useCart((state) => state.addItem)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getProductById(id!)
        setProduct(response.data)
        setActiveImage(0)
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
      toast.success(`${product.name} added to cart!`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-ink">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-ink">
        <div className="text-center">
          <svg className="w-24 h-24 mx-auto text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-muted text-lg font-semibold">Product not found</p>
        </div>
      </div>
    )
  }

  const images = product.images || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink to-ink-soft py-8 md:py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center bg-ink-card rounded-2xl p-4 md:p-6 shadow-md border border-ink-border hover:border-gold/40 transition">
              <img
                src={images[activeImage]?.url || images[0]?.url || 'placeholder.jpg'}
                alt={product.name}
                className="w-full h-auto max-h-96 md:max-h-full object-contain rounded-2xl"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400/14141A?text=Product+Image'
                }}
              />
            </div>

            {/* Thumbnail gallery — only shown when there is more than one image */}
            {images.length > 1 && (
              <div className="flex flex-wrap gap-3">
                {images.map((img, index) => (
                  <button
                    key={`${img.url}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View image ${index + 1}`}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition ${
                      index === activeImage
                        ? 'border-gold shadow-md'
                        : 'border-ink-border hover:border-gold/50'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt || `${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://via.placeholder.com/100/14141A?text=Image'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col justify-start">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-body">{product.name}</h1>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl md:text-4xl font-bold text-gold">
                {formatINR(product.price)}
              </p>
              {product.salePrice && (
                <p className="text-lg text-faint line-through">
                  {formatINR(product.salePrice)}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-ink-border">
              <p className="text-muted text-sm md:text-base leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="mb-6 space-y-2 pb-6 border-b border-ink-border">
              {product.material && (
                <p className="text-muted"><strong className="text-body">Material:</strong> {product.material}</p>
              )}
              {product.weight && (
                <p className="text-muted"><strong className="text-body">Weight:</strong> {product.weight}</p>
              )}
              {product.dimensions && (
                <p className="text-muted"><strong className="text-body">Dimensions:</strong> {product.dimensions}</p>
              )}
            </div>

            {/* Quantity Control */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3 text-body">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-ink-border text-body hover:border-gold hover:bg-gold hover:text-ink flex items-center justify-center font-bold transition"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 text-center bg-ink border border-ink-border text-body rounded-lg py-2 font-semibold focus:border-gold outline-none transition"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-ink-border text-body hover:border-gold hover:bg-gold hover:text-ink flex items-center justify-center font-bold transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gold-gradient text-ink font-bold py-3 px-4 rounded-2xl hover:shadow-lg transition mb-4 text-base md:text-lg"
            >
              <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>

            {/* Care Instructions */}
            {product.careInstructions && (
              <div className="bg-ink-soft p-4 md:p-6 rounded-2xl border border-ink-border">
                <h3 className="font-semibold mb-2 text-body">Care Instructions</h3>
                <p className="text-sm text-muted leading-relaxed">{product.careInstructions}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
