import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { productService } from '../services/api'
import { Product } from '../types'
import HeroBanner from '../components/HeroBanner'
import ProductCard from '../components/ProductCard'
import Button from '../components/ui/Button'

export default function Home() {
  const navigate = useNavigate()
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts({ limit: 8 })
        setFeaturedProducts(response.data.products)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="pt-4 px-4 md:px-8 bg-white">
        <div className="container max-w-7xl mx-auto">
          <HeroBanner />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-pink-500"></div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Featured</h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              New Arrivals
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Discover our latest collection of exquisite jewelry pieces, handpicked for their elegance and craftsmanship.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {featuredProducts.slice(0, 4).map((product) => (
                  <div key={product._id} className="animate-fadeInUp">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button size="lg" onClick={() => navigate('/products')} className="font-bold">
                  VIEW ALL PRODUCTS
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Category Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-pink-500"></div>
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Shop By</h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Browse Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Rings', count: '48', emoji: '💍' },
              { title: 'Necklaces', count: '36', emoji: '✨' },
              { title: 'Bracelets', count: '32', emoji: '💎' },
            ].map((cat, idx) => (
              <div
                key={idx}
                onClick={() => navigate('/products')}
                className="group cursor-pointer relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-pink-500/20 group-hover:from-primary/40 group-hover:to-pink-500/40 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/20 transition-all duration-300"></div>
                <div className="relative h-full flex flex-col items-center justify-center text-white p-6 text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{cat.emoji}</div>
                  <h3 className="text-3xl font-bold mb-2">{cat.title}</h3>
                  <p className="text-sm opacity-90">{cat.count} Products</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Exclusive Deals
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Get up to 30% off on selected jewelry pieces. Limited time offer for our valued customers.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/products')}
                className="font-bold"
              >
                SHOP NOW
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Products', value: '500+' },
                { label: 'Happy Customers', value: '10K+' },
                { label: 'Orders Delivered', value: '5K+' },
                { label: 'Rating', value: '4.8★' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
                  <p className="text-2xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Get exclusive offers, new arrivals, and jewelry tips delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
              <Button variant="primary" size="lg" className="font-bold">
                SUBSCRIBE
              </Button>
            </div>
            <p className="text-gray-500 text-sm mt-6">We'll never spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
