import axios from 'axios'

const API_URL = (import.meta as any).env.VITE_API_URL || 'https://narahsilver.com'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if exists
api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('adminToken')
  const userToken = localStorage.getItem('userToken')
  const token = adminToken || userToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const productService = {
  getProducts: (filters?: any) => api.get('/products', { params: filters }),
  getProductById: (id: string) => api.get(`/products/${id}`),
  createProduct: (data: any) => api.post('/products', data),
  updateProduct: (id: string, data: any) => api.put(`/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
}

export const categoryService = {
  getCategories: () => api.get('/categories'),
  createCategory: (data: any) => api.post('/categories', data),
  updateCategory: (id: string, data: any) => api.put(`/categories/${id}`, data),
  deleteCategory: (id: string) => api.delete(`/categories/${id}`),
}

export const cartService = {
  addToCart: (sessionId: string, productId: string, quantity: number) =>
    api.post('/cart', { sessionId, productId, quantity }),
  getCart: (sessionId: string) => api.get('/cart', { params: { sessionId } }),
  updateCartItem: (sessionId: string, productId: string, quantity: number) =>
    api.put(`/cart/${productId}`, { quantity }, { params: { sessionId } }),
  removeFromCart: (sessionId: string, productId: string) =>
    api.delete(`/cart/${productId}`, { params: { sessionId } }),
  clearCart: (sessionId: string) => api.delete('/cart', { params: { sessionId } }),
}

export const orderService = {
  createOrder: (data: any) => api.post('/orders', data),
  getOrder: (id: string) => api.get(`/orders/${id}`),
  getOrders: (filters?: any) => api.get('/orders', { params: filters }),
  updateOrderStatus: (id: string, data: any) => api.put(`/orders/${id}/status`, data),
}

export const galleryService = {
  getGalleryItems: (filters?: any) => api.get('/gallery', { params: filters }),
  getGalleryItem: (id: string) => api.get(`/gallery/${id}`),
  createGalleryItem: (data: any) => api.post('/gallery', data),
  updateGalleryItem: (id: string, data: any) => api.put(`/gallery/${id}`, data),
  deleteGalleryItem: (id: string) => api.delete(`/gallery/${id}`),
}

export const authService = {
  adminLogin: (email: string, password: string) =>
    api.post('/auth/admin/login', { email, password }),
  sendOtp: (phone: string) => api.post('/auth/user/send-otp', { phone }),
  verifyOtp: (phone: string, otp: string) =>
    api.post('/auth/user/verify-otp', { phone, otp }),
}

export const contactService = {
  submitContact: (data: any) => api.post('/contact', data),
}

export const uploadService = {
  uploadImage: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

export default api
