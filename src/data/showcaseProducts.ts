// Showcase products rendered on the homepage via .map().
// Add unlimited products by appending objects to this array.
// `price` is a number in INR; format with formatINR() from utils/format.
export interface ShowcaseProduct {
  id: number
  name: string
  image: string
  price: number
  category: string
  description: string
}

export const showcaseProducts: ShowcaseProduct[] = [
  {
    id: 1,
    name: 'Diamond Solitaire Ring',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
    price: 45000,
    category: 'Rings',
    description: 'A flawless brilliant-cut solitaire set in 18k white gold.',
  },
  {
    id: 2,
    name: 'Gold Wedding Necklace',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
    price: 85000,
    category: 'Necklaces',
    description: 'Hand-finished 22k gold bridal necklace with intricate detailing.',
  },
  {
    id: 3,
    name: 'Luxury Diamond Earrings',
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
    price: 35000,
    category: 'Earrings',
    description: 'Pavé diamond drops that catch light from every angle.',
  },
  {
    id: 4,
    name: 'Gold Bracelet',
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80',
    price: 25000,
    category: 'Bracelets',
    description: 'Sculptural 18k gold cuff with a mirror-polished finish.',
  },
  {
    id: 5,
    name: 'Pearl Pendant',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
    price: 18000,
    category: 'Pendants',
    description: 'A lustrous South Sea pearl framed in delicate gold.',
  },
  {
    id: 6,
    name: 'Premium Bridal Set',
    image:
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80',
    price: 125000,
    category: 'Wedding Collection',
    description: 'Complete necklace, earring and ring ensemble for the modern bride.',
  },
]
