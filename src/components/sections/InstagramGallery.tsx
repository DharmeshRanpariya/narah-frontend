import { motion } from 'framer-motion'
import { instagramShots } from '../../data/instagram'
import { contactInfo } from '../../data/contact'

const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22600%22%3E%3Crect%20width%3D%22600%22%20height%3D%22600%22%20fill%3D%22%231A1A22%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22300%22%20fill%3D%22%23B8902A%22%20font-family%3D%22serif%22%20font-size%3D%2228%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3ENARAH%3C%2Ftext%3E%3C%2Fsvg%3E'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export default function InstagramGallery() {
  return (
    <section className="bg-ink py-20 md:py-28">
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
            @{contactInfo.brand}
          </span>
          <h2 className="font-serif text-3xl font-semibold text-body sm:text-4xl md:text-5xl">
            Follow Our Journey
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
            Behind the bench, new arrivals and styling stories. Tag us to be featured.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6"
        >
          {instagramShots.map((shot) => (
            <motion.a
              key={shot.id}
              href={shot.link || contactInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group relative aspect-square overflow-hidden rounded-xl gold-border"
              aria-label={`View ${contactInfo.brand} on Instagram`}
            >
              <img
                src={shot.image}
                alt={`${contactInfo.brand} on Instagram`}
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget
                  if (target.src !== FALLBACK_IMAGE) target.src = FALLBACK_IMAGE
                }}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-ink/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-gold">
                  <InstagramIcon />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
