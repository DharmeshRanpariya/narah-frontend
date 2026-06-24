// Category cards shown on the homepage.
// Add a new category by appending an object to this array.
export interface ShowcaseCategory {
  id: number
  name: string
  tagline: string
  image: string
  link: string
}

export const showcaseCategories: ShowcaseCategory[] = [
  {
    id: 1,
    name: 'Rings',
    tagline: 'Solitaires & bands',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
    link: '/products',
  },
  {
    id: 2,
    name: 'Necklaces',
    tagline: 'Statement & delicate',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
    link: '/products',
  },
  {
    id: 3,
    name: 'Earrings',
    tagline: 'Studs to chandeliers',
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
    link: '/products',
  },
  {
    id: 4,
    name: 'Bracelets',
    tagline: 'Tennis & bangles',
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80',
    link: '/products',
  },
  {
    id: 5,
    name: 'Pendants',
    tagline: 'Diamonds & pearls',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
    link: '/products',
  },
  {
    id: 6,
    name: 'Wedding Collection',
    tagline: 'Bridal sets',
    image:
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80',
    link: '/products',
  },
]
