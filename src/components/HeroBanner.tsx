import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './ui/Button'
import { heroService } from '../services/api'
import { HeroSlide } from '../types'

const HERO_FALLBACK =
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1920&q=80'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

// Render a title with its last word in the gold gradient, matching the
// original "...Crafted to Perfection" treatment for any admin-entered title.
function renderTitle(title?: string) {
  if (!title) return null
  const words = title.trim().split(/\s+/)
  if (words.length === 1) {
    return <span className="text-gold-gradient">{words[0]}</span>
  }
  const last = words.pop() as string
  return (
    <>
      {words.join(' ')} <span className="text-gold-gradient">{last}</span>
    </>
  )
}

export default function HeroBanner() {
  const navigate = useNavigate()
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    heroService
      .getHeroSlides()
      .then((res) => {
        if (!active) return
        const items: HeroSlide[] = (res.data || []).filter(
          (s: HeroSlide) => s.url && (s.isActive === undefined || s.isActive)
        )
        setSlides(items)
      })
      .catch((err) => console.error('Failed to load hero slides:', err))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  // Keep index in range if the slide set changes.
  useEffect(() => {
    setCurrent((c) => (c >= slides.length ? 0 : c))
  }, [slides.length])

  // Auto-advance every 6s.
  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [slides.length])

  const go = (i: number) => setCurrent(((i % slides.length) + slides.length) % slides.length)

  // Hide the hero entirely while loading or when the admin has not added any
  // hero slides yet.
  if (loading || slides.length === 0) return null

  const slide = slides[current] || slides[0]
  const ctaText = slide.ctaText || 'Explore Collection'
  const ctaLink = slide.ctaLink || '/products'

  return (
    <section className="relative w-full h-[88vh] min-h-[560px] overflow-hidden bg-ink">
      {/* Background image (crossfades between slides) */}
      <AnimatePresence mode="wait">
        <motion.img
          key={slide._id + slide.url}
          src={slide.url}
          alt={slide.title || 'Handcrafted fine jewelry'}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          onError={(e) => {
            if (e.currentTarget.src !== HERO_FALLBACK) {
              e.currentTarget.src = HERO_FALLBACK
            }
          }}
        />
      </AnimatePresence>

      {/* Dark gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

      {/* Gold glow accents for depth */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-gold/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="mx-auto h-full max-w-7xl px-6 sm:px-8 lg:px-12 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide._id + '-content'}
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="max-w-2xl text-center md:text-left mx-auto md:mx-0"
            >
              {slide.eyebrow && (
                <motion.p
                  variants={item}
                  className="text-gold text-sm tracking-[0.3em] mb-5"
                >
                  {slide.eyebrow}
                </motion.p>
              )}

              {slide.title && (
                <motion.h1
                  variants={item}
                  className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight text-white"
                >
                  {renderTitle(slide.title)}
                </motion.h1>
              )}

              {slide.subtitle && (
                <motion.p
                  variants={item}
                  className="mt-6 text-gray-300 text-lg max-w-xl mx-auto md:mx-0"
                >
                  {slide.subtitle}
                </motion.p>
              )}

              <motion.div
                variants={item}
                className="mt-9 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate(ctaLink)}
                >
                  {ctaText}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                >
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel controls (only when more than one slide) */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(current - 1)}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-gold/50 bg-black/40 p-2 text-gold backdrop-blur-sm transition hover:bg-gold hover:text-ink md:left-6"
          >
            <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(current + 1)}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-gold/50 bg-black/40 p-2 text-gold backdrop-blur-sm transition hover:bg-gold hover:text-ink md:right-6"
          >
            <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
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

      {/* Scroll indicator (hidden when dots are present to avoid overlap) */}
      {slides.length <= 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-gold/70"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
