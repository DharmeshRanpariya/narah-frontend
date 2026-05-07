import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { label: 'Collections', path: '/products' },
        { label: 'New Arrivals', path: '/products?sortBy=newest' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', path: '/contact' },
        { label: 'FAQs', path: '/faqs' },
        { label: 'Privacy Policy', path: '/privacy' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Instagram', path: '#' },
        { label: 'WhatsApp', path: '#' },
      ],
    },
  ]

  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-black text-white mb-4">NARAH</h3>
            <p className="text-gray-400 text-sm mb-6">
              Premium jewelry store offering authentic, handcrafted pieces for every occasion.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-bold text-white mb-6">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-gray-400 hover:text-primary text-sm transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-8 mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
          <p>&copy; 2025 NARAH Premium Store. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => navigate('/privacy')} className="hover:text-primary transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigate('/faqs')} className="hover:text-primary transition-colors">
              FAQs
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
