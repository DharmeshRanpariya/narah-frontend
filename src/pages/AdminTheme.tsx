import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId)
    setTheme(themeId)
  }

  if (!isAdmin) return null

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Theme Settings</h1>
          <p className="text-gray-600 mt-1">Customize the user-side website theme</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Currently Selected Theme</h2>
          <p className="text-gray-600 mb-6">
            <span className="font-semibold text-lg">{currentTheme.name}</span> - {currentTheme.description}
          </p>
          <div className="flex gap-6 items-center">
            <div className="flex gap-3">
              <div
                className="w-20 h-20 rounded-lg shadow-md border-2 border-gray-300"
                style={{ backgroundColor: currentTheme.primary }}
              />
              <div
                className="w-20 h-20 rounded-lg shadow-md border-2 border-gray-300"
                style={{ backgroundColor: currentTheme.secondary }}
              />
              <div
                className="w-20 h-20 rounded-lg shadow-md border-2 border-gray-300"
                style={{ backgroundColor: currentTheme.accent }}
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Primary: {currentTheme.primary}</p>
              <p className="text-sm text-gray-600">Secondary: {currentTheme.secondary}</p>
              <p className="text-sm text-gray-600">Accent: {currentTheme.accent}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Themes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`p-6 rounded-lg shadow-md transition-all duration-200 border-2 ${
                  selectedTheme === theme.id
                    ? 'border-blue-600 shadow-lg scale-105 bg-blue-50'
                    : 'border-gray-200 hover:shadow-lg hover:border-gray-300'
                }`}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{theme.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{theme.description}</p>

                <div className="flex gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg shadow-md border border-gray-300"
                    style={{ backgroundColor: theme.primary }}
                    title={`Primary: ${theme.primary}`}
                  />
                  <div
                    className="w-12 h-12 rounded-lg shadow-md border border-gray-300"
                    style={{ backgroundColor: theme.secondary }}
                    title={`Secondary: ${theme.secondary}`}
                  />
                  <div
                    className="w-12 h-12 rounded-lg shadow-md border border-gray-300"
                    style={{ backgroundColor: theme.accent }}
                    title={`Accent: ${theme.accent}`}
                  />
                </div>

                {selectedTheme === theme.id && (
                  <div className="bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded text-center">
                    ✓ Active
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">ℹ️ Theme Information</h3>
          <p className="text-sm text-blue-800">
            The website uses the Rose Diamond theme featuring romantic rose gold aesthetics. This theme is optimized for NARAH Jewels branding.
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}
