import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { categoryService, uploadService } from '../services/api'
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
  const [previewImage, setPreviewImage] = useState<string>('')
  const [imageUploading, setImageUploading] = useState(false)
  const [imageInputType, setImageInputType] = useState<'url' | 'upload'>('upload')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'image') {
      setPreviewImage(value)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageUploading(true)
    try {
      const response = await uploadService.uploadImage(file)
      const cloudinaryUrl = response.data.url
      setFormData((prev) => ({ ...prev, image: cloudinaryUrl }))
      setPreviewImage(cloudinaryUrl)
      toast.success('Image uploaded successfully')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload image')
    } finally {
      setImageUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.image) {
      toast.error('Please upload a category image')
      return
    }
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
      image: category.image || '',
    })
    setPreviewImage(category.image || '')
    setImageInputType('upload')
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
    setFormData({ name: '', description: '', image: '' })
    setPreviewImage('')
    setImageInputType('upload')
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
            onClick={() => (showForm ? resetForm() : setShowForm(true))}
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
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="space-y-6">
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
                    placeholder="Optional description (shown as the card tagline)"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category Image *
                  </label>
                  <div className="flex gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setImageInputType('upload')}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                        imageInputType === 'upload'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputType('url')}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                        imageInputType === 'url'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      URL
                    </button>
                  </div>

                  {imageInputType === 'upload' ? (
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={handleImageUpload}
                        disabled={imageUploading}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      {imageUploading && (
                        <div className="flex items-center gap-2 text-purple-600 text-sm font-medium">
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-purple-600"></div>
                          Uploading to Cloudinary...
                        </div>
                      )}
                    </div>
                  ) : (
                    <textarea
                      name="image"
                      placeholder="Paste the full image URL"
                      value={formData.image}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none transition font-mono text-sm"
                    />
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={imageUploading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
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
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Preview
                </label>
                {previewImage ? (
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-80 object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://via.placeholder.com/600x400?text=Invalid+URL'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <h3 className="text-white text-2xl font-serif">
                        {formData.name || 'Category Name'}
                      </h3>
                      {formData.description && (
                        <p className="text-gray-200 text-sm mt-1">
                          {formData.description}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="font-semibold">No image</p>
                      <p className="text-sm">Upload an image for this category</p>
                    </div>
                  </div>
                )}
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
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition border-t-4 border-purple-600"
              >
                <div className="h-44 bg-gray-200 overflow-hidden">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover hover:scale-105 transition"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://via.placeholder.com/300?text=No+Image'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {category.description}
                  </p>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
