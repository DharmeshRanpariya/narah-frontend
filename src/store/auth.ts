import { create } from 'zustand'

interface AuthState {
  isAdmin: boolean
  isUser: boolean
  token: string | null
  user: any | null
  role: 'admin' | 'user' | null
  login: (token: string, user: any, role: 'admin' | 'user') => void
  logout: () => void
  initialize: () => void
  isTokenExpired: () => boolean
}

export const useAuth = create<AuthState>((set, get) => {
  return {
    isAdmin: false,
    isUser: false,
    token: null,
    user: null,
    role: null,

    isTokenExpired: () => {
      const adminTokenTime = localStorage.getItem('adminTokenTime')
      const userTokenTime = localStorage.getItem('userTokenTime')
      const tokenTime = adminTokenTime || userTokenTime

      if (!tokenTime) return true

      const expirationTime = parseInt(tokenTime, 10)
      const currentTime = Date.now()
      return currentTime > expirationTime
    },

    initialize: () => {
      const adminToken = localStorage.getItem('adminToken')
      const userToken = localStorage.getItem('userToken')
      const adminUser = localStorage.getItem('adminUser')
      const userData = localStorage.getItem('userData')

      const state = get()

      if (adminToken && adminUser && !state.isTokenExpired()) {
        set({
          isAdmin: true,
          isUser: false,
          token: adminToken,
          user: JSON.parse(adminUser),
          role: 'admin',
        })
      } else if (userToken && userData && !state.isTokenExpired()) {
        set({
          isAdmin: false,
          isUser: true,
          token: userToken,
          user: JSON.parse(userData),
          role: 'user',
        })
      } else {
        state.logout()
      }
    },

    login: (token, user, role) => {
      const expirationTime = Date.now() + 24 * 60 * 60 * 1000

      if (role === 'admin') {
        localStorage.setItem('adminToken', token)
        localStorage.setItem('adminUser', JSON.stringify(user))
        localStorage.setItem('adminTokenTime', expirationTime.toString())
        localStorage.removeItem('userToken')
        localStorage.removeItem('userData')
        localStorage.removeItem('userTokenTime')
        set({ isAdmin: true, isUser: false, token, user, role: 'admin' })
      } else {
        localStorage.setItem('userToken', token)
        localStorage.setItem('userData', JSON.stringify(user))
        localStorage.setItem('userTokenTime', expirationTime.toString())
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        localStorage.removeItem('adminTokenTime')
        set({ isAdmin: false, isUser: true, token, user, role: 'user' })
      }
    },

    logout: () => {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      localStorage.removeItem('adminTokenTime')
      localStorage.removeItem('userToken')
      localStorage.removeItem('userData')
      localStorage.removeItem('userTokenTime')
      set({ isAdmin: false, isUser: false, token: null, user: null, role: null })
    },
  }
})
