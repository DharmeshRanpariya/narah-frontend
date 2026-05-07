import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { categoryService } from '../services/api'
import { Category } from '../types'
import { useAuth } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

export default function AdminCategories() {
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login')
    }
  }, [isAdmin, navigate])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories()
      setCategories(response.data)
    } catch (error) {
      toast.error('Failed to fetch categories')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await categoryService.updateCategory(editingId, formData)
        toast.success('Category updated!')
      } else {
        await categoryService.createCategory(formData)
        toast.success('Category created!')
      }
      resetForm()
      fetchCategories()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save category')
    }
  }

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description || '',
    })
    setEditingId(category._id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this category?')) return
    try {
      await categoryService.deleteCategory(id)
      toast.success('Category deleted!')
      fetchCategories()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete category')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', description: '' })
    setEditingId(null)
    setShowForm(false)
  }

  if (!isAdmin) return null

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600 mt-1">Organize your products</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            {showForm ? '✕ Cancel' : '+ Add Category'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-purple-600">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingId ? '✏️ Edit Category' : '➕ Add Category'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Rings, Necklaces"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Optional description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                >
                  {editingId ? '💾 Update' : '➕ Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No categories yet. Create your first one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition border-t-4 border-purple-600"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">{category.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
