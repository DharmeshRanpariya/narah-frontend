import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { banners } from '../../data/banners'
import Button from '../ui/Button'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80'

const AUTO_ADVANCE_MS = 5000

export default function PromoBanners() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  // Bump this to reset the auto-advance timer after any manual navigation.
  const [timerKey, setTimerKey] = useState(0)

  const total = banners.length

  useEffect(() => {
    if (total <= 1) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(interval)
  }, [total, timerKey])

  const goTo = (index: number) => {
    setCurrent(((index % total) + total) % total)
    setTimerKey((k) => k + 1)
  }

  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  if (total === 0) return null

  const banner = banners[current]

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="relative mx-auto max-w-7xl rounded-3xl overflow-hidden h-[420px] md:h-[480px] shadow-card-dark gold-border">
        <AnimatePresence mode="wait">
          <motion.div
            key={banner.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Background image */}
            <img
              src={banner.image}
              alt={banner.title}
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                const target = e.currentTarget
                if (target.src !== FALLBACK_IMAGE) target.src = FALLBACK_IMAGE
              }}
            />

            {/* Dark left gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />

            {/* Slide content (left) */}
            <div className="relative z-10 flex h-full items-center">
              <div className="max-w-2xl px-5 sm:px-10 md:px-14">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3"
                >
                  {banner.eyebrow}
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-4"
                >
                  {banner.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="text-gray-300 max-w-md mb-6 md:mb-8 leading-relaxed"
                >
                  {banner.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate(banner.ctaLink)}
                  >
                    {banner.ctaLabel}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous banner"
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full glass-dark border border-gold/40 text-gold transition-all duration-300 hover:bg-gold hover:text-ink hover:shadow-glow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next banner"
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full glass-dark border border-gold/40 text-gold transition-all duration-300 hover:bg-gold hover:text-ink hover:shadow-glow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-6 left-5 sm:left-10 md:left-14 z-20 flex items-center gap-2">
              {banners.map((b, index) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to banner ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? 'w-8 bg-gold shadow-gold-soft'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
