import { create } from 'zustand'

export interface Theme {
  id: string
  name: string
  primary: string
  secondary: string
  accent: string
  description: string
}

export const themes: Theme[] = [
  {
    id: 'rose-diamond',
    name: 'Rose Diamond',
    primary: '#E75480',
    secondary: '#F8C4D4',
    accent: '#C85A7F',
    description: 'Romantic rose gold aesthetic',
  },
]

interface ThemeState {
  currentTheme: Theme
  setTheme: (themeId: string) => void
  initialize: () => void
}

const THEME_STORAGE_KEY = 'selectedTheme'
const THEME_EVENT_KEY = 'themeChanged'

const applyTheme = (theme: Theme) => {
  const css = `
    :root {
      --color-primary: ${theme.primary};
      --color-secondary: ${theme.secondary};
      --color-accent: ${theme.accent};
    }
  `

  let styleElement = document.getElementById('theme-style')
  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = 'theme-style'
    document.head.appendChild(styleElement)
  }
  styleElement.textContent = css

  document.documentElement.style.setProperty('--color-primary', theme.primary)
  document.documentElement.style.setProperty('--color-secondary', theme.secondary)
  document.documentElement.style.setProperty('--color-accent', theme.accent)
}

export const useTheme = create<ThemeState>((set) => {
  const savedThemeId = localStorage.getItem(THEME_STORAGE_KEY)
  const initialTheme = themes.find((t) => t.id === savedThemeId) || themes[0]
  applyTheme(initialTheme)

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.key === THEME_STORAGE_KEY && event.newValue) {
        const theme = themes.find((t) => t.id === event.newValue)
        if (theme) {
          applyTheme(theme)
          set({ currentTheme: theme })
        }
      }
    })

    window.addEventListener(THEME_EVENT_KEY, ((event: any) => {
      const theme = themes.find((t) => t.id === event.detail?.themeId)
      if (theme) {
        applyTheme(theme)
        set({ currentTheme: theme })
      }
    }) as EventListener)
  }

  return {
    currentTheme: initialTheme,

    setTheme: (themeId: string) => {
      const theme = themes.find((t) => t.id === themeId)
      if (theme) {
        localStorage.setItem(THEME_STORAGE_KEY, themeId)
        applyTheme(theme)
        set({ currentTheme: theme })

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent(THEME_EVENT_KEY, { detail: { themeId } }))
        }
      }
    },

    initialize: () => {
      const savedThemeId = localStorage.getItem(THEME_STORAGE_KEY)
      const theme = themes.find((t) => t.id === savedThemeId) || themes[0]
      applyTheme(theme)
      set({ currentTheme: theme })
    },
  }
})

export const initializeTheme = () => {
  const savedThemeId = localStorage.getItem(THEME_STORAGE_KEY)
  const theme = themes.find((t) => t.id === savedThemeId) || themes[0]
  applyTheme(theme)
}
