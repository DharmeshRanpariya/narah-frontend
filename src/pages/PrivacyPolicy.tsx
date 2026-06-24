export default function PrivacyPolicy() {
  const sections = [
    {
      title: 'Introduction',
      content:
        'At NARAH, we are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information.',
    },
    {
      title: 'Information We Collect',
      content:
        'We collect information you provide directly, such as when you create an account, make a purchase, or contact us. This may include your name, email address, phone number, shipping address, and payment information. We also automatically collect certain information about your device and browsing activities.',
    },
    {
      title: 'How We Use Your Information',
      content:
        'We use the information we collect to process transactions, send promotional communications, improve our services, and comply with legal obligations. Your information helps us personalize your shopping experience and provide better customer support.',
    },
    {
      title: 'Information Sharing',
      content:
        'We do not sell or rent your personal information to third parties. We may share information with trusted service providers who assist in operating our website and conducting our business, subject to confidentiality agreements. We may also disclose information when required by law.',
    },
    {
      title: 'Data Security',
      content:
        'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, so we cannot guarantee absolute security.',
    },
    {
      title: 'Cookies and Tracking Technologies',
      content:
        'We use cookies and similar tracking technologies to enhance your browsing experience and analyze website usage. You can control cookie preferences through your browser settings. Some features may not function properly if cookies are disabled.',
    },
    {
      title: 'Your Rights and Choices',
      content:
        'You have the right to access, correct, or delete your personal information. You can opt out of promotional communications at any time. To exercise these rights, please contact us using the information provided below.',
    },
    {
      title: 'Changes to This Policy',
      content:
        'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on our website with a revised effective date.',
    },
    {
      title: 'Contact Us',
      content:
        'If you have questions about this Privacy Policy or our privacy practices, please contact us at privacy@narah.com or through our contact form. We are committed to working with you to resolve any privacy concerns.',
    },
  ]

  return (
    <div className="min-h-screen bg-ink">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container text-center animate-slideUp">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-body mb-4 animate-textReveal">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 bg-ink-soft">
        <div className="container max-w-3xl">
          <div className="space-y-8">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="animate-slideUp animation-delay-300"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="bg-ink-card border border-ink-border rounded-2xl shadow-md-premium p-6 md:p-8 hover:border-gold/40 hover:shadow-lg-premium transition-all duration-300">
                  <h2 className="text-2xl font-serif font-bold text-body mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 flex-shrink-0 rounded-full bg-gold-gradient text-ink flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    {section.title}
                  </h2>
                  <p className="text-muted leading-relaxed text-base">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-ink">
        <div className="container max-w-2xl">
          <div className="bg-ink-card border border-ink-border rounded-2xl p-8 md:p-12 text-center shadow-lg-premium animate-scaleIn">
            <h2 className="text-3xl font-serif font-bold text-body mb-4">
              Have Privacy Questions?
            </h2>
            <p className="text-muted mb-8">
              We believe in transparency and are happy to address any concerns about how we handle your data.
            </p>
            <button
              onClick={() => (window.location.href = '/contact')}
              className="bg-gold-gradient hover-glow text-ink px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover-lift"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
