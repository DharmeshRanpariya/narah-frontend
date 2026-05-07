import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, isAdmin } = useAuth()

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Products', icon: '📦' },
    { path: '/admin/categories', label: 'Categories', icon: '🏷️' },
    { path: '/admin/sliders', label: 'Sliders', icon: '🖼️' },
    { path: '/admin/theme', label: 'Theme', icon: '🎨' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white shadow-lg overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">NARAH</h1>
          <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full text-left px-6 py-3 flex items-center gap-3 transition ${
                  isActive
                    ? 'bg-blue-600 border-l-4 border-blue-400'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-gray-600 text-sm">Manage your jewelry store</p>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
