// Customer testimonials for the homepage.
export interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  quote: string
  avatar: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Aarohi Mehta',
    location: 'Mumbai',
    rating: 5,
    quote:
      'The bridal set exceeded every expectation. The craftsmanship is breathtaking and the team made me feel like royalty.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    name: 'Rohan Kapoor',
    location: 'Delhi',
    rating: 5,
    quote:
      'I bought a diamond solitaire for my proposal. The certification, the packaging, the brilliance — absolutely worth it.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    name: 'Isha Sharma',
    location: 'Bengaluru',
    rating: 5,
    quote:
      'Timeless pieces that feel personal. The gold necklace I ordered is now my most-complimented accessory.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
  },
]
