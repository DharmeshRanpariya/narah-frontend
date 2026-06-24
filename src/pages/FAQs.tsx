import { useState } from 'react'

export default function FAQs() {
  const [expanded, setExpanded] = useState<number | null>(0)

  const faqs = [
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy for all products. Items must be in original condition with all packaging intact. Contact our customer service team to initiate a return.',
    },
    {
      question: 'How long does shipping take?',
      answer:
        'Standard shipping typically takes 5-7 business days. Express shipping options are available for faster delivery. You will receive tracking information once your order is shipped.',
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we ship to select countries worldwide. International shipping costs and delivery times vary by location. Please check at checkout for your country availability.',
    },
    {
      question: 'How do I care for my jewelry?',
      answer:
        'Store jewelry in a cool, dry place away from moisture and direct sunlight. Clean regularly with a soft cloth. Avoid contact with chemicals, perfumes, and lotions to maintain the shine and quality.',
    },
    {
      question: 'Are your products authentic?',
      answer:
        'All our jewelry pieces are 100% authentic and crafted with premium materials. Each item undergoes quality inspection before shipment to ensure the highest standards.',
    },
    {
      question: 'Can I customize my jewelry?',
      answer:
        'Yes! We offer customization services for selected items. Please contact our team with your design ideas, and we\'ll provide you with a quote and timeline.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, debit cards, and digital payment methods. Your payment information is secured with industry-standard encryption.',
    },
    {
      question: 'How can I track my order?',
      answer:
        'Once your order is shipped, you\'ll receive an email with a tracking number. You can use this number to monitor your delivery status on our website or the carrier\'s platform.',
    },
  ]

  return (
    <div className="min-h-screen bg-ink">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container text-center animate-slideUp">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-body mb-4 animate-textReveal">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
            Find answers to common questions about our products, shipping, and services
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 px-4">
        <div className="container max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="animate-slideUp animation-delay-300"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <button
                  onClick={() => setExpanded(expanded === idx ? null : idx)}
                  className="w-full group"
                >
                  <div
                    className={`w-full p-6 rounded-2xl transition-all duration-300 border ${
                      expanded === idx
                        ? 'bg-gold-gradient text-ink border-transparent shadow-lg-premium'
                        : 'bg-ink-card hover:border-gold/40 text-body border-ink-border shadow-md-premium'
                    } hover-lift`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-left">
                        {faq.question}
                      </h3>
                      <svg
                        className={`w-6 h-6 transition-transform duration-300 ${
                          expanded === idx ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                {expanded === idx && (
                  <div className="animate-slideDown bg-ink-soft p-6 rounded-b-2xl border-t-2 border-gold">
                    <p className="text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container max-w-2xl">
          <div className="bg-ink-card border border-ink-border rounded-2xl p-6 md:p-12 text-center shadow-lg-premium animate-scaleIn">
            <h2 className="text-3xl font-serif font-bold text-body mb-4">
              Still have questions?
            </h2>
            <p className="text-muted mb-8">
              Our customer support team is here to help you 24/7. Don't hesitate to reach out with any inquiries.
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="bg-gold-gradient hover-glow text-ink px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover-lift"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
