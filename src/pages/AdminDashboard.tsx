import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import AdminLayout from '../components/AdminLayout'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { isAdmin } = useAuth()

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login')
    }
  }, [isAdmin, navigate])

  if (!isAdmin) {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Admin Panel</h1>
          <p className="text-gray-600">Manage products, categories, and slider images</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/admin/products')}
            className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-8 rounded-lg shadow-md transition transform hover:scale-105"
          >
            <div className="text-5xl mb-3">📦</div>
            <h3 className="text-2xl font-bold mb-2">Products</h3>
            <p className="text-blue-100">Add, update, delete products</p>
          </button>

          <button
            onClick={() => navigate('/admin/categories')}
            className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-8 rounded-lg shadow-md transition transform hover:scale-105"
          >
            <div className="text-5xl mb-3">🏷️</div>
            <h3 className="text-2xl font-bold mb-2">Categories</h3>
            <p className="text-purple-100">Organize product categories</p>
          </button>

          <button
            onClick={() => navigate('/admin/sliders')}
            className="bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white p-8 rounded-lg shadow-md transition transform hover:scale-105"
          >
            <div className="text-5xl mb-3">🖼️</div>
            <h3 className="text-2xl font-bold mb-2">Sliders</h3>
            <p className="text-pink-100">Manage hero section images</p>
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
