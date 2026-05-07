import { create } from 'zustand'
import { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
  total: number
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  calculateTotal: (products: Product[]) => number
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  total: 0,

  addItem: (product, quantity) => {
    set((state) => {
      const existingItem = state.items.find((item) =>
        typeof item.productId === 'string'
          ? item.productId === product._id
          : item.productId._id === product._id
      )

      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map((item) => {
          const itemId = typeof item.productId === 'string' ? item.productId : item.productId._id
          return itemId === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        })
      } else {
        newItems = [...state.items, { productId: product as any, quantity }]
      }

      return { items: newItems }
    })
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => {
        const itemId = typeof item.productId === 'string' ? item.productId : item.productId._id
        return itemId !== productId
      }),
    }))
  },

  updateQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map((item) => {
        const itemId = typeof item.productId === 'string' ? item.productId : item.productId._id
        return itemId === productId ? { ...item, quantity } : item
      }),
    }))
  },

  clearCart: () => {
    set({ items: [], total: 0 })
  },

  calculateTotal: (products) => {
    const state = get()
    return state.items.reduce((total, item) => {
      const product = products.find((p) => p._id === item.productId)
      return total + (product?.price || 0) * item.quantity
    }, 0)
  },
}))
