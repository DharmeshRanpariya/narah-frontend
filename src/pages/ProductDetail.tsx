import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { productService } from '../services/api'
import { Product } from '../types'
import { useCart } from '../store/cart'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const addItem = useCart((state) => state.addItem)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getProductById(id!)
        setProduct(response.data)
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
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600 text-lg font-semibold">Product not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-light py-8 md:py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="flex items-center justify-center bg-white rounded-xl p-4 md:p-6 shadow-md">
            <img
              src={product.images[0]?.url || 'placeholder.jpg'}
              alt={product.name}
              className="w-full h-auto max-h-96 md:max-h-full object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400?text=Product+Image'
              }}
            />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col justify-start">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-accent">{product.name}</h1>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl md:text-4xl font-bold text-primary">
                Rs. {product.price?.toFixed(2)}
              </p>
              {product.salePrice && (
                <p className="text-lg text-gray-500 line-through">
                  Rs. {product.salePrice?.toFixed(2)}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="mb-6 space-y-2 pb-6 border-b border-gray-200">
              {product.material && (
                <p className="text-gray-700"><strong className="text-gray-900">Material:</strong> {product.material}</p>
              )}
              {product.weight && (
                <p className="text-gray-700"><strong className="text-gray-900">Weight:</strong> {product.weight}</p>
              )}
              {product.dimensions && (
                <p className="text-gray-700"><strong className="text-gray-900">Dimensions:</strong> {product.dimensions}</p>
              )}
            </div>

            {/* Quantity Control */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3 text-gray-900">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center font-bold transition"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 text-center border-2 border-gray-300 rounded-lg py-2 font-semibold focus:border-primary outline-none transition"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center font-bold transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg transition mb-4 text-base md:text-lg"
            >
              <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>

            {/* Care Instructions */}
            {product.careInstructions && (
              <div className="bg-light p-4 md:p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-2 text-gray-900">Care Instructions</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{product.careInstructions}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
