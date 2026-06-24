import { create } from 'zustand'

export interface Theme {
  id: string
  name: string
  description: string
  mode: 'dark' | 'light'
  // accent (drives the gold/metallic scale + buttons/links/prices)
  primary: string
  // full-site palette
  bg: string
  surface: string
  surface2: string
  line: string
  text: string
  textMuted: string
  textFaint: string
  onAccent: string
  // kept for the admin swatch preview / legacy CSS vars
  secondary: string
  accent: string
}

// 20 COMPLETE themes — picking one changes the ENTIRE user-side look
// (background, surfaces, text and accent), mixing dark & light palettes.
export const themes: Theme[] = [
  // ---------- DARK ----------
  { id: 'royal-gold', name: 'Royal Gold', mode: 'dark', description: 'Signature dark luxury with 24k gold',
    primary: '#D4AF37', bg: '#0B0B0F', surface: '#1A1A22', surface2: '#14141A', line: '#26262F',
    text: '#EDEAE0', textMuted: '#A8A29A', textFaint: '#6E6A63', onAccent: '#0B0B0F',
    secondary: '#F5E7C1', accent: '#0B0B0F' },
  { id: 'onyx-noir', name: 'Onyx Noir', mode: 'dark', description: 'Pure black with platinum silver',
    primary: '#C8CDD6', bg: '#060608', surface: '#16161A', surface2: '#0F0F12', line: '#2A2A30',
    text: '#F0F1F3', textMuted: '#9AA0A8', textFaint: '#62666D', onAccent: '#0B0B0F',
    secondary: '#E6E9EE', accent: '#060608' },
  { id: 'midnight-sapphire', name: 'Midnight Sapphire', mode: 'dark', description: 'Deep navy with platinum',
    primary: '#9DB4DC', bg: '#0A0E1A', surface: '#141A2C', surface2: '#0F1422', line: '#26304A',
    text: '#E8ECF5', textMuted: '#9AA6BE', textFaint: '#646E86', onAccent: '#0A0E1A',
    secondary: '#C5D4EE', accent: '#0A0E1A' },
  { id: 'emerald-suite', name: 'Emerald Suite', mode: 'dark', description: 'Forest green with warm gold',
    primary: '#D9B45A', bg: '#08120E', surface: '#11201A', surface2: '#0C1813', line: '#21362C',
    text: '#E7EFE9', textMuted: '#9DB2A6', textFaint: '#62786C', onAccent: '#08120E',
    secondary: '#F0DDA8', accent: '#08120E' },
  { id: 'plum-rose', name: 'Plum Rose', mode: 'dark', description: 'Aubergine with rose gold',
    primary: '#E0A899', bg: '#120A12', surface: '#1F141F', surface2: '#180F18', line: '#352336',
    text: '#F1E8EF', textMuted: '#B59FB2', textFaint: '#746171', onAccent: '#120A12',
    secondary: '#F7D9CF', accent: '#120A12' },
  { id: 'espresso-copper', name: 'Espresso Copper', mode: 'dark', description: 'Warm espresso with copper',
    primary: '#CD8A5E', bg: '#120D0A', surface: '#201813', surface2: '#19120D', line: '#382A20',
    text: '#F0E7DF', textMuted: '#B7A595', textFaint: '#766554', onAccent: '#120D0A',
    secondary: '#E8C0A2', accent: '#120D0A' },
  { id: 'charcoal-champagne', name: 'Charcoal Champagne', mode: 'dark', description: 'Soft charcoal with champagne',
    primary: '#E6CFA3', bg: '#101012', surface: '#1C1C20', surface2: '#161618', line: '#2C2C32',
    text: '#ECEAE6', textMuted: '#A6A39C', textFaint: '#6B6862', onAccent: '#101012',
    secondary: '#F4E7CC', accent: '#101012' },
  { id: 'amethyst-night', name: 'Amethyst Night', mode: 'dark', description: 'Dark violet with lilac shimmer',
    primary: '#C3A6E0', bg: '#0E0A16', surface: '#1A1426', surface2: '#140F1E', line: '#2E2542',
    text: '#ECE6F4', textMuted: '#A99FBE', textFaint: '#6C6386', onAccent: '#0E0A16',
    secondary: '#D8C6EC', accent: '#0E0A16' },
  { id: 'teal-lagoon', name: 'Teal Lagoon', mode: 'dark', description: 'Deep teal with aqua glow',
    primary: '#5FD0C5', bg: '#06120F', surface: '#0E201C', surface2: '#0A1815', line: '#1E3833',
    text: '#E4F1EE', textMuted: '#95B5B0', textFaint: '#5C7873', onAccent: '#06120F',
    secondary: '#A6E6E2', accent: '#06120F' },
  { id: 'ruby-velvet', name: 'Ruby Velvet', mode: 'dark', description: 'Dark wine with ruby red',
    primary: '#E08597', bg: '#140809', surface: '#231115', surface2: '#1B0D10', line: '#3A2126',
    text: '#F2E6E8', textMuted: '#BE9DA3', textFaint: '#7A5F64', onAccent: '#140809',
    secondary: '#E79AA6', accent: '#140809' },

  // ---------- LIGHT ----------
  { id: 'ivory-pearl', name: 'Ivory Pearl', mode: 'light', description: 'Warm ivory with classic gold',
    primary: '#B8902A', bg: '#FBF8F1', surface: '#FFFFFF', surface2: '#F4EFE3', line: '#E6DEC9',
    text: '#2A2620', textMuted: '#6F685B', textFaint: '#9A9281', onAccent: '#FFFFFF',
    secondary: '#8A6E1E', accent: '#2A2620' },
  { id: 'rose-quartz', name: 'Rose Quartz', mode: 'light', description: 'Soft blush with rose gold',
    primary: '#C77E96', bg: '#FCF4F6', surface: '#FFFFFF', surface2: '#F7E7EC', line: '#EFD3DC',
    text: '#3A2A30', textMuted: '#8A6E78', textFaint: '#B197A1', onAccent: '#FFFFFF',
    secondary: '#A85F7A', accent: '#3A2A30' },
  { id: 'champagne-cream', name: 'Champagne Cream', mode: 'light', description: 'Creamy beige with champagne',
    primary: '#C2A24E', bg: '#FAF6EC', surface: '#FFFDF7', surface2: '#F2EAD6', line: '#E5D8B8',
    text: '#33301F', textMuted: '#6E6A57', textFaint: '#9C9680', onAccent: '#33301F',
    secondary: '#917A2E', accent: '#33301F' },
  { id: 'sand-bronze', name: 'Sand Bronze', mode: 'light', description: 'Desert sand with bronze',
    primary: '#B07A45', bg: '#FAF5EE', surface: '#FFFFFF', surface2: '#F3E9DC', line: '#E6D6C2',
    text: '#332A20', textMuted: '#6F6356', textFaint: '#9C8E7D', onAccent: '#FFFFFF',
    secondary: '#8F5E32', accent: '#332A20' },
  { id: 'mint-emerald', name: 'Mint Emerald', mode: 'light', description: 'Fresh mint with emerald',
    primary: '#2E8B6F', bg: '#F1F8F4', surface: '#FFFFFF', surface2: '#E2F0E9', line: '#CBE3D7',
    text: '#1E2C26', textMuted: '#5E7468', textFaint: '#8AA398', onAccent: '#FFFFFF',
    secondary: '#226B55', accent: '#1E2C26' },
  { id: 'sky-sapphire', name: 'Sky Sapphire', mode: 'light', description: 'Airy sky with sapphire',
    primary: '#3F6FB0', bg: '#F2F5FB', surface: '#FFFFFF', surface2: '#E4EBF6', line: '#CEDAEC',
    text: '#1E2738', textMuted: '#5E6B82', textFaint: '#8A97AE', onAccent: '#FFFFFF',
    secondary: '#2F5790', accent: '#1E2738' },
  { id: 'lavender-haze', name: 'Lavender Haze', mode: 'light', description: 'Pale lavender with amethyst',
    primary: '#8E6BB0', bg: '#F6F3FB', surface: '#FFFFFF', surface2: '#ECE4F5', line: '#DACEEA',
    text: '#2A2333', textMuted: '#6C6079', textFaint: '#9A8FAB', onAccent: '#FFFFFF',
    secondary: '#6E4F92', accent: '#2A2333' },
  { id: 'blush-petal', name: 'Blush Petal', mode: 'light', description: 'Petal pink with warm rose',
    primary: '#D17A86', bg: '#FDF5F4', surface: '#FFFFFF', surface2: '#F9E6E5', line: '#F1D2D1',
    text: '#3A2B2C', textMuted: '#8A7071', textFaint: '#B59A9A', onAccent: '#FFFFFF',
    secondary: '#B45A68', accent: '#3A2B2C' },
  { id: 'frost-platinum', name: 'Frost Platinum', mode: 'light', description: 'Cool white with platinum grey',
    primary: '#7E8794', bg: '#F5F6F8', surface: '#FFFFFF', surface2: '#E9EBEF', line: '#D6DAE0',
    text: '#23262B', textMuted: '#5F646C', textFaint: '#8C9199', onAccent: '#FFFFFF',
    secondary: '#5C636C', accent: '#23262B' },
  { id: 'honey-topaz', name: 'Honey Topaz', mode: 'light', description: 'Warm honey with golden topaz',
    primary: '#D49A2E', bg: '#FCF6E9', surface: '#FFFDF6', surface2: '#F5E9CF', line: '#EBD9B0',
    text: '#332A18', textMuted: '#6F6346', textFaint: '#9D8F6C', onAccent: '#332A18',
    secondary: '#A6781F', accent: '#332A18' },
]

interface ThemeState {
  currentTheme: Theme
  setTheme: (themeId: string) => void
  initialize: () => void
}

const THEME_STORAGE_KEY = 'selectedTheme'
const THEME_EVENT_KEY = 'themeChanged'

// --- colour helpers ---
const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)))
const hexToRgb = (hex: string): [number, number, number] => {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const num = parseInt(h, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}
const rgbToHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map((v) => clamp(v).toString(16).padStart(2, '0')).join('')
const shade = (hex: string, amt: number) => {
  const [r, g, b] = hexToRgb(hex)
  const t = amt < 0 ? 0 : 255
  const p = Math.abs(amt)
  return rgbToHex(r + (t - r) * p, g + (t - g) * p, b + (t - b) * p)
}
const rgba = (hex: string, alpha: number) => {
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  const accent = theme.primary

  const vars: Record<string, string> = {
    // accent / gold scale
    '--color-primary': accent,
    '--primary': accent,
    '--gold': accent,
    '--color-gold': accent,
    '--color-gold-soft': shade(accent, 0.18),
    '--color-gold-deep': shade(accent, -0.22),
    '--color-gold-pale': shade(accent, theme.mode === 'light' ? -0.1 : 0.34),
    '--color-gold-border': rgba(accent, theme.mode === 'light' ? 0.3 : 0.22),
    '--color-gold-border-strong': rgba(accent, theme.mode === 'light' ? 0.5 : 0.4),
    // surfaces + text (full theme)
    '--bg': theme.bg,
    '--surface': theme.surface,
    '--surface-2': theme.surface2,
    '--line': theme.line,
    '--text': theme.text,
    '--text-muted': theme.textMuted,
    '--text-faint': theme.textFaint,
    '--on-accent': theme.onAccent,
    // legacy aliases still referenced in a few places
    '--color-secondary': theme.secondary,
    '--secondary': theme.secondary,
    '--color-accent': theme.accent,
    '--accent': theme.accent,
    '--light': theme.surface2,
    '--ink': theme.bg,
    '--ink-soft': theme.surface2,
    '--ink-card': theme.surface,
  }

  const css = `:root {\n${Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')}\n}`

  let styleElement = document.getElementById('theme-style')
  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = 'theme-style'
    document.head.appendChild(styleElement)
  }
  styleElement.textContent = css

  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v))
  root.setAttribute('data-theme-mode', theme.mode)
}

const resolveTheme = (id: string | null): Theme =>
  themes.find((t) => t.id === id) || themes[0]

export const useTheme = create<ThemeState>((set) => {
  const initialTheme = resolveTheme(localStorage.getItem(THEME_STORAGE_KEY))
  applyTheme(initialTheme)

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.key === THEME_STORAGE_KEY && event.newValue) {
        const theme = resolveTheme(event.newValue)
        applyTheme(theme)
        set({ currentTheme: theme })
      }
    })
    window.addEventListener(THEME_EVENT_KEY, ((event: any) => {
      const theme = resolveTheme(event.detail?.themeId)
      applyTheme(theme)
      set({ currentTheme: theme })
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
      const theme = resolveTheme(localStorage.getItem(THEME_STORAGE_KEY))
      applyTheme(theme)
      set({ currentTheme: theme })
    },
  }
})

export const initializeTheme = () => {
  applyTheme(resolveTheme(localStorage.getItem(THEME_STORAGE_KEY)))
}
