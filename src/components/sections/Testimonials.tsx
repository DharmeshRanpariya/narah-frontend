import { motion } from 'framer-motion'
import { testimonials } from '../../data/testimonials'

const FALLBACK_AVATAR =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%231A1A22%22%2F%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%2280%22%20r%3D%2236%22%20fill%3D%22%23B8902A%22%2F%3E%3Cpath%20d%3D%22M40%20180c0-33%2027-56%2060-56s60%2023%2060%2056%22%20fill%3D%22%23B8902A%22%2F%3E%3C%2Fsvg%3E'

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

function StarRow({ rating }: { rating: number }) {
  const stars = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${stars} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-4 w-4 ${i < stars ? 'text-gold' : 'text-ink-border'}`}
          fill="currentColor"
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-ink-soft py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Loved by Thousands
          </span>
          <h2 className="font-serif text-4xl text-body md:text-5xl">
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.id}
              variants={cardVariants}
              className="glass-dark relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-border p-6 transition-colors duration-500 hover:border-gold/60 md:p-8"
            >
              {/* Decorative quote mark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-6 top-2 select-none font-serif text-7xl leading-none text-gold/20"
              >
                &rdquo;
              </span>

              {/* Rating */}
              <StarRow rating={t.rating} />

              {/* Quote */}
              <blockquote className="relative mt-5 flex-1 text-faint italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Footer */}
              <figcaption className="mt-6 flex items-center gap-4 border-t border-ink-border pt-6">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget
                    if (target.src !== FALLBACK_AVATAR) target.src = FALLBACK_AVATAR
                  }}
                  className="h-12 w-12 flex-shrink-0 rounded-full border border-gold/40 object-cover"
                />
                <div className="min-w-0">
                  <div className="truncate font-semibold text-body">{t.name}</div>
                  <div className="truncate text-sm text-muted">{t.location}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
