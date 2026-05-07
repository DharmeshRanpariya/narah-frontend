import { useState, useEffect } from 'react'
import { productService, categoryService } from '../services/api'
import { Product, Category } from '../types'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filters, setFilters] = useState({
    categoryId: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'featured',
    search: '',
  })
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0 })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories()
        setCategories(response.data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await productService.getProducts({
          ...filters,
          page: pagination.page,
          limit: pagination.limit,
        })
        setProducts(response.data.products)
        setPagination((prev) => ({
          ...prev,
          total: response.data.pagination.total,
        }))
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters, pagination.page])

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Shop All Products
          </h1>
          <p className="text-gray-600">Browse our complete collection of authentic jewelry</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-20">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={filters.categoryId}
                  onChange={(e) => handleFilterChange('categoryId', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:border-primary outline-none transition"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-1/2 border border-gray-300 rounded-lg p-2 focus:border-primary outline-none transition"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-1/2 border border-gray-300 rounded-lg p-2 focus:border-primary outline-none transition"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:border-primary outline-none transition"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <button
                onClick={() =>
                  setFilters({
                    categoryId: '',
                    minPrice: '',
                    maxPrice: '',
                    sortBy: 'featured',
                    search: '',
                  })
                }
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Mobile Filters Button */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="bg-white p-6 rounded-xl shadow-md mt-4">
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={filters.categoryId}
                    onChange={(e) => handleFilterChange('categoryId', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:border-primary outline-none transition"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-1/2 border border-gray-300 rounded-lg p-2 focus:border-primary outline-none transition"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-1/2 border border-gray-300 rounded-lg p-2 focus:border-primary outline-none transition"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:border-primary outline-none transition"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setFilters({
                      categoryId: '',
                      minPrice: '',
                      maxPrice: '',
                      sortBy: 'featured',
                      search: '',
                    })
                    setShowFilters(false)
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Products */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-8 bg-white p-4 md:p-6 rounded-lg">
                  <button
                    onClick={() =>
                      setPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))
                    }
                    disabled={pagination.page === 1}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg hover:border-primary hover:bg-light disabled:opacity-50 disabled:cursor-not-allowed transition text-sm md:text-base"
                  >
                    ← Previous
                  </button>
                  <span className="text-gray-700 font-semibold text-sm md:text-base">
                    Page <span className="text-primary">{pagination.page}</span> of <span className="text-primary">{Math.ceil(pagination.total / pagination.limit)}</span>
                  </span>
                  <button
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        page: Math.min(
                          Math.ceil(pagination.total / pagination.limit),
                          prev.page + 1
                        ),
                      }))
                    }
                    disabled={pagination.page === Math.ceil(pagination.total / pagination.limit)}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg hover:border-primary hover:bg-light disabled:opacity-50 disabled:cursor-not-allowed transition text-sm md:text-base"
                  >
                    Next →
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0113.65 6.15z" />
                </svg>
                <p className="text-gray-600 text-lg font-semibold">No products found</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
