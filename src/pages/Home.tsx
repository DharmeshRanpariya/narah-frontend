import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { productService } from '../services/api'
import { Product } from '../types'
import HeroBanner from '../components/HeroBanner'
import SliderShowcase from '../components/sections/SliderShowcase'
import CategoryShowcase from '../components/sections/CategoryShowcase'
import WhyChooseUs from '../components/sections/WhyChooseUs'
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
        const apiProducts: Product[] = response.data?.products || []
        setFeaturedProducts(apiProducts)
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setFeaturedProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-ink text-body">
      {/* Hero */}
      <HeroBanner />

      {/* Admin-managed slider (from /admin/sliders) */}
      <section className="px-4 pt-6 mb-8 md:pt-16 md:mb-16">
        <SliderShowcase />
      </section>

      {/* Categories */}
      <section className="py-10 md:py-20 px-0 md:px-4 bg-ink-soft">
        <div className="container max-w-7xl mx-auto !px-0 md:!px-4">
          <CategoryShowcase />
        </div>
      </section>

      {/* Featured Products — only shown when the admin has uploaded products */}
      {(loading || featuredProducts.length > 0) && (
        <section className="py-10 md:py-20 px-0 md:px-4">
          <div className="container max-w-7xl mx-auto !px-0 md:!px-4">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-gold tracking-[0.3em] text-xs md:text-sm font-semibold mb-3">
                CURATED FOR YOU
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-body mb-4">
                Featured <span className="text-gold-gradient">Collection</span>
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Handpicked pieces from our finest craftsmen, each one a testament to timeless luxury.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center min-h-72">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12">
                  {featuredProducts.slice(0, 8).map((product, idx) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
                <div className="text-center">
                  <Button size="lg" onClick={() => navigate('/products')}>
                    View All Products
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 px-0 md:px-4 bg-ink-soft">
        <div className="container max-w-7xl mx-auto !px-0 md:!px-4">
          <WhyChooseUs />
        </div>
      </section>

    </div>
  )
}
