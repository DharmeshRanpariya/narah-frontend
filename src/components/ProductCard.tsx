import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../types'
import { useCart } from '../store/cart'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate()
  const addItem = useCart((state) => state.addItem)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem(product, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full h-56 bg-gray-100 overflow-hidden group flex items-center justify-center">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 text-sm mt-2">No Image Available</p>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
          {product.stockQuantity === 0 && (
            <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
              OUT OF STOCK
            </span>
          )}
        </div>

        {/* Add to Cart Button on Hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => handleAddToCart()}
            disabled={product.stockQuantity === 0}
            className="bg-primary hover:bg-pink-700 text-white px-6 py-2 rounded font-bold text-sm disabled:bg-gray-500"
          >
            {isAdded ? '✓ ADDED' : 'ADD TO CART'}
          </button>
          <button
            onClick={() => navigate(`/products/${product._id}`)}
            className="bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded font-bold text-sm border border-gray-300"
          >
            VIEW
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Stock Status */}
        <div className="mb-2">
          {product.stockQuantity > 0 ? (
            <span className="text-xs text-green-600 font-bold">✓ IN STOCK</span>
          ) : (
            <span className="text-xs text-red-600 font-bold">OUT OF STOCK</span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2 hover:text-primary cursor-pointer" onClick={() => navigate(`/products/${product._id}`)}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-xs">
                {i < Math.floor(product.ratings.average) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.ratings.count})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            Rs. {product.salePrice || product.price}
          </span>
          {product.salePrice && (
            <span className="text-xs text-gray-500 line-through">Rs. {product.price}</span>
          )}
        </div>

        {/* View Details Button */}
        <button
          onClick={() => navigate(`/products/${product._id}`)}
          className="mt-auto w-full border border-primary text-primary hover:bg-primary hover:text-white font-bold py-2 rounded text-sm transition-all duration-300"
        >
          VIEW DETAILS
        </button>
      </div>
    </div>
  )
}
