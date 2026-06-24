// Rotating promotional banners for the homepage.
// Add a new banner by appending an object to this array.
export interface PromoBanner {
  id: number
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaLink: string
  image: string
}

export const banners: PromoBanner[] = [
  {
    id: 1,
    eyebrow: 'New Season',
    title: 'Bridal Collection',
    description:
      'Heirloom-worthy sets crafted for the most important day of your life. Diamonds, gold, and timeless silhouettes.',
    ctaLabel: 'Explore Bridal',
    ctaLink: '/products',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 2,
    eyebrow: 'Signature',
    title: 'Diamond Collection',
    description:
      'Ethically sourced, brilliantly cut. Discover solitaires and statement pieces that catch every light.',
    ctaLabel: 'Shop Diamonds',
    ctaLink: '/products',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 3,
    eyebrow: 'Heritage',
    title: 'Gold Jewelry Collection',
    description:
      'Pure 22k & 24k craftsmanship. Necklaces, bangles and rings finished by master artisans.',
    ctaLabel: 'View Gold',
    ctaLink: '/products',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 4,
    eyebrow: 'By Invitation',
    title: 'Exclusive Luxury Collection',
    description:
      'A limited atelier line reserved for those who appreciate the extraordinary. Each piece, one of one.',
    ctaLabel: 'Discover Luxury',
    ctaLink: '/products',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1600&q=80',
  },
]
