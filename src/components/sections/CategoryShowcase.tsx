import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categoryService } from '../../services/api'
import { Category } from '../../types'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function CategoryShowcase() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    categoryService
      .getCategories()
      .then((res) => {
        if (!active) return
        // Only show categories that have an admin-uploaded image.
        const withImages: Category[] = (res.data || []).filter(
          (c: Category) => c.image
        )
        setCategories(withImages)
      })
      .catch((err) => console.error('Failed to load categories:', err))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  // Hide the whole section while loading or when no categories have images yet.
  if (loading || categories.length === 0) return null

  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-0 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Shop by Category
          </span>
          <h2 className="font-serif text-4xl text-body md:text-5xl">
            Browse Our Collections
          </h2>
        </motion.div>

        {/*
          Mobile: horizontal swipe carousel (flex + overflow-x scroll + snap).
          md and up: responsive grid.
        */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex gap-4 overflow-x-auto pb-4 mx-0 px-0 snap-x snap-mandatory scrollbar-hide md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
        >
          {categories.map((category) => (
            <motion.button
              key={category._id}
              type="button"
              variants={cardVariants}
              onClick={() => navigate(`/products?category=${category._id}`)}
              aria-label={`Explore ${category.name}`}
              className="group relative block h-64 w-[72%] shrink-0 snap-start overflow-hidden rounded-2xl border border-ink-border text-left transition-colors duration-500 hover:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:w-[45%] md:w-auto md:shrink"
            >
              {/* Admin-uploaded category image */}
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent transition-colors duration-500 group-hover:from-ink group-hover:via-ink/60" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <h3 className="font-serif text-2xl text-white">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                    {category.description}
                  </p>
                )}

                {/* Explore on hover */}
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold opacity-0 translate-y-2 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Explore
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
