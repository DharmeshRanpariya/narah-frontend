import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../store/auth'
import { useTheme, themes } from '../store/theme'
import AdminLayout from '../components/AdminLayout'

export default function AdminTheme() {
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const { currentTheme, setTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState(currentTheme.id)

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login')
    }
  }, [isAdmin, navigate])

  useEffect(() => {
    setSelectedTheme(currentTheme.id)
  }, [currentTheme.id])

  const handleThemeChange = (themeId: string, name: string) => {
    setSelectedTheme(themeId)
    setTheme(themeId)
    toast.success(`"${name}" applied to the storefront`)
  }

  if (!isAdmin) return null

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Theme Settings</h1>
          <p className="text-gray-600 mt-1">
            Choose from {themes.length} accent themes — your selection instantly recolors the
            customer-facing website.
          </p>
        </div>

        {/* Current theme preview */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Currently Active</h2>
          <p className="text-gray-600 mb-6">
            <span className="font-semibold text-lg">{currentTheme.name}</span> —{' '}
            {currentTheme.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
            {/* Mini dark-theme preview using the active accent */}
            <div
              className="w-full sm:w-72 rounded-xl p-5"
              style={{ backgroundColor: '#0B0B0F', border: '1px solid #26262F' }}
            >
              <p className="text-xs tracking-widest mb-2" style={{ color: currentTheme.primary }}>
                NARAH
              </p>
              <p className="text-white font-serif text-xl mb-3">Timeless Elegance</p>
              <span
                className="inline-block text-xs font-bold px-4 py-2 rounded-full"
                style={{ backgroundColor: currentTheme.primary, color: '#0B0B0F' }}
              >
                Explore Collection
              </span>
            </div>
            <div className="flex gap-3">
              <Swatch color={currentTheme.primary} label="Accent" />
              <Swatch color={currentTheme.secondary} label="Soft" />
              <Swatch color={currentTheme.accent} label="Base" />
            </div>
          </div>
        </div>

        {/* Theme grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">All Themes ({themes.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {themes.map((theme) => {
              const active = selectedTheme === theme.id
              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id, theme.name)}
                  className={`group text-left rounded-xl overflow-hidden transition-all duration-200 border-2 ${
                    active
                      ? 'border-gray-900 shadow-lg ring-2 ring-offset-2 ring-gray-900/20'
                      : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  {/* Dark swatch preview */}
                  <div
                    className="h-24 flex items-center justify-center relative"
                    style={{ backgroundColor: '#0B0B0F' }}
                  >
                    <div
                      className="w-12 h-12 rounded-full shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})`,
                      }}
                    />
                    {active && (
                      <span
                        className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: theme.primary, color: '#0B0B0F' }}
                      >
                        ✓ ACTIVE
                      </span>
                    )}
                  </div>
                  {/* Label */}
                  <div className="p-3 bg-white">
                    <h3 className="text-sm font-bold text-gray-900 truncate">{theme.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{theme.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-bold text-amber-900 mb-1">ℹ️ How it works</h3>
          <p className="text-sm text-amber-800">
            Every theme keeps NARAH's premium dark luxury base and swaps the metallic accent color.
            The change is saved instantly and applies to all visitors on the storefront — buttons,
            prices, links, borders and highlights recolor automatically.
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="text-center">
      <div
        className="w-16 h-16 rounded-lg shadow-md border border-gray-300"
        style={{ backgroundColor: color }}
      />
      <p className="text-[11px] text-gray-500 mt-1">{label}</p>
      <p className="text-[10px] text-gray-400 font-mono">{color}</p>
    </div>
  )
}
