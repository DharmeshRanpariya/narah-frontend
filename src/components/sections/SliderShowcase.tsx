import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryService } from '../../services/api'
import { GalleryItem } from '../../types'

const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221600%22%20height%3D%22700%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%2314141A%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23B8902A%22%20font-family%3D%22serif%22%20font-size%3D%2240%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3ENARAH%3C%2Ftext%3E%3C%2Fsvg%3E'

// Slider images managed from the admin panel (/admin/sliders), shown
// directly under the hero on the storefront. Sourced from the gallery API.
export default function SliderShowcase() {
  const [slides, setSlides] = useState<GalleryItem[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    galleryService
      .getGalleryItems()
      .then((res) => {
        if (!active) return
        const items: GalleryItem[] = (res.data || []).filter(
          (g: GalleryItem) => g.url && (g.isActive === undefined || g.isActive)
        )
        setSlides(items)
      })
      .catch((err) => console.error('Failed to load sliders:', err))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  // Auto-advance every 5s
  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [slides.length])

  if (loading || slides.length === 0) return null

  const go = (i: number) => setCurrent(((i % slides.length) + slides.length) % slides.length)

  return (
    <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl md:rounded-3xl gold-border">
      <div className="relative h-[220px] sm:h-[400px] md:h-[520px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current]._id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].url}
              alt={slides[current].title || 'Slider'}
              className="h-full w-full object-cover"
              onError={(e) => {
                const t = e.currentTarget
                if (t.src !== FALLBACK_IMAGE) t.src = FALLBACK_IMAGE
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {slides[current].title && (
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white drop-shadow">
                  {slides[current].title}
                </h3>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <>
            {/* Arrows */}
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(current - 1)}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/50 bg-black/40 p-2 text-gold backdrop-blur-sm transition hover:bg-gold hover:text-ink md:left-5"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(current + 1)}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/50 bg-black/40 p-2 text-gold backdrop-blur-sm transition hover:bg-gold hover:text-ink md:right-5"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {slides.map((s, i) => (
                <button
                  key={s._id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-gold' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
