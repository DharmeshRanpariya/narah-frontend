import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { contactInfo } from '../../data/contact'
import Button from '../ui/Button'

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function ContactCTA() {
  const navigate = useNavigate()

  const items = [
    { icon: <PhoneIcon />, label: contactInfo.phone },
    { icon: <MailIcon />, label: contactInfo.email },
    { icon: <MapPinIcon />, label: contactInfo.address },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-3xl gradient-dark gold-border p-6 sm:p-10 md:p-16"
    >
      {/* Soft gold glow blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-16 h-64 w-64 rounded-full bg-gold-soft/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="font-serif text-3xl text-white sm:text-4xl md:text-5xl">
          Begin Your Bespoke Journey
        </h2>
        <p className="mt-4 max-w-xl text-base text-gray-300 md:text-lg">
          From a fleeting idea to an heirloom you will treasure for generations —
          our artisans are here to craft something uniquely yours.
        </p>

        <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:flex-row">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 text-sm text-white md:text-base"
            >
              <span className="text-gold">{item.icon}</span>
              <span className="break-words">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
            Contact Us
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              window.open('https://wa.me/' + contactInfo.whatsapp, '_blank')
            }
          >
            WhatsApp Us
          </Button>
        </div>
      </div>
    </motion.section>
  )
}
