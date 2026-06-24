import { motion } from 'framer-motion'
import { features } from '../../data/features'

type IconKey = 'certificate' | 'gem' | 'shield' | 'hammer'

function FeatureIcon({ name }: { name: IconKey }) {
  const common = {
    fill: 'none',
    viewBox: '0 0 24 24',
    strokeWidth: 1.5,
    stroke: 'currentColor',
    className: 'h-7 w-7',
    'aria-hidden': true,
  } as const

  switch (name) {
    case 'certificate':
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 18.75h-9a9.06 9.06 0 0 1-.776-.034 1.5 1.5 0 0 1-1.39-1.482V6.108c0-.83.673-1.503 1.502-1.503h12.328c.83 0 1.502.673 1.502 1.503v6.642"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 9h6M9 12h4.5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 14.25a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Zm-1.5 4.125-.75 3 2.25-1.125 2.25 1.125-.75-3"
          />
        </svg>
      )
    case 'gem':
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 4.5h9l3.75 4.5L12 20.25 3.75 9 7.5 4.5Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5M9 4.5 7.5 9 12 20.25 16.5 9 15 4.5"
          />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M12 3 4.5 5.25v5.379c0 4.943 3.27 8.74 7.5 9.621 4.23-.881 7.5-4.678 7.5-9.621V5.25L12 3Z"
          />
        </svg>
      )
    case 'hammer':
      return (
        <svg {...common}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.42 15.17 5.88 20.71a1.5 1.5 0 0 1-2.12-2.12l5.54-5.54"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.5 4.5 9.75 9.25l2.5 2.5L17 7l1.06 1.06a1.5 1.5 0 0 0 2.12-2.12l-4-4a1.5 1.5 0 0 0-2.12 2.12L14.5 4.5Z"
          />
        </svg>
      )
    default:
      return null
  }
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function WhyChooseUs() {
  return (
    <section className="bg-ink py-10 sm:py-24">
      <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-8 max-w-2xl text-center sm:mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            The Narah Promise
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-body sm:text-4xl">
            Why Choose Us
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={item}
              className="group rounded-2xl border border-ink-border bg-ink-card p-4 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-gold-soft sm:p-8"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold transition-colors duration-300 group-hover:border-gold/60 group-hover:bg-gold/20 sm:mb-6 sm:h-16 sm:w-16">
                <FeatureIcon name={feature.icon} />
              </div>
              <h3 className="mb-2 font-serif text-base text-body sm:mb-3 sm:text-xl">
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted sm:text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
