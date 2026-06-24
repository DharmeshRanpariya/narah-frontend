import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from './ui/Button'
import { contactInfo } from '../data/contact'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/products' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
]

const categories = [
  'Rings',
  'Necklaces',
  'Earrings',
  'Bracelets',
  'Pendants',
  'Wedding Collection',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export default function Footer() {
  const navigate = useNavigate()

  const socials = [
    {
      label: 'Instagram',
      href: contactInfo.instagram,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.62c-3.15 0-3.52.01-4.76.07-.97.04-1.5.21-1.85.34-.46.18-.8.4-1.15.74-.34.35-.56.69-.74 1.15-.13.35-.3.88-.34 1.85-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.97.21 1.5.34 1.85.18.46.4.8.74 1.15.35.34.69.56 1.15.74.35.13.88.3 1.85.34 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.97-.04 1.5-.21 1.85-.34.46-.18.8-.4 1.15-.74.34-.35.56-.69.74-1.15.13-.35.3-.88.34-1.85.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.97-.21-1.5-.34-1.85a3.1 3.1 0 0 0-.74-1.15 3.1 3.1 0 0 0-1.15-.74c-.35-.13-.88-.3-1.85-.34-1.24-.06-1.61-.07-4.76-.07Zm0 2.76a5.42 5.42 0 1 1 0 10.84 5.42 5.42 0 0 1 0-10.84Zm0 1.62a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm5.6-2.88a1.27 1.27 0 1 1 0 2.54 1.27 1.27 0 0 1 0-2.54Z" />
        </svg>
      ),
    },
    {
      label: 'Facebook',
      href: contactInfo.facebook,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/${contactInfo.whatsapp}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.41 1.02 2.76 1.17 2.95.14.19 2.01 3.07 4.87 4.31.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34ZM12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.33A10 10 0 1 0 12 2Zm0 18.17a8.16 8.16 0 0 1-4.16-1.14l-.3-.18-3 .79.8-2.93-.19-.3A8.17 8.17 0 1 1 12 20.17Z" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-ink-soft border-t border-gold/15 text-body">
      <div className="container max-w-7xl mx-auto px-4 py-10 md:py-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12"
        >
          {/* Brand */}
          <div>
            <h3 className="text-gold-gradient font-serif text-3xl mb-4">NARAH</h3>
            <p className="text-muted text-sm leading-relaxed mb-6 max-w-xs">
              Heirloom-worthy silver and fine jewellery, handcrafted to be treasured for generations.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-muted transition-all duration-300 hover:text-gold hover:border-gold/60 hover:shadow-gold-soft"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-body mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-muted text-sm transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-lg text-body mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => navigate('/products')}
                    className="text-muted text-sm transition-colors duration-300 hover:text-gold"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-body mb-6">Contact</h4>
            <ul className="space-y-4 mb-6">
              <li>
                <a
                  href={`tel:${contactInfo.phoneRaw}`}
                  className="flex items-start gap-3 text-muted text-sm transition-colors duration-300 hover:text-gold"
                >
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2Z" />
                  </svg>
                  <span>{contactInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-3 text-muted text-sm transition-colors duration-300 hover:text-gold break-all"
                >
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
                  </svg>
                  <span>{contactInfo.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted text-sm">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                </svg>
                <span>{contactInfo.address}</span>
              </li>
            </ul>
            <Button variant="outline" size="sm" onClick={() => navigate('/contact')}>
              Contact Us
            </Button>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-10 md:mt-14 border-t border-gold/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>&copy; 2026 NARAH. Crafted with care.</p>
          <div className="flex gap-6">
            <button
              onClick={() => navigate('/privacy')}
              className="transition-colors duration-300 hover:text-gold"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('/faqs')}
              className="transition-colors duration-300 hover:text-gold"
            >
              FAQs
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
