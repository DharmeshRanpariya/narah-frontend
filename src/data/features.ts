// "Why Choose Us" feature highlights.
export interface Feature {
  id: number
  title: string
  description: string
  icon: 'certificate' | 'gem' | 'shield' | 'hammer'
}

export const features: Feature[] = [
  {
    id: 1,
    title: 'Certified Jewelry',
    description: 'Every piece arrives with BIS hallmark & IGI/GIA diamond certification.',
    icon: 'certificate',
  },
  {
    id: 2,
    title: 'Premium Quality',
    description: 'Only the finest 18k–24k gold and conflict-free, ethically sourced stones.',
    icon: 'gem',
  },
  {
    id: 3,
    title: 'Secure Purchase',
    description: 'Encrypted checkout, insured shipping and a lifetime authenticity guarantee.',
    icon: 'shield',
  },
  {
    id: 4,
    title: 'Expert Craftsmanship',
    description: 'Hand-finished by master artisans with decades of heritage experience.',
    icon: 'hammer',
  },
]
