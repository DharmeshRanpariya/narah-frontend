import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { galleryService, uploadService } from '../services/api'
import { GalleryItem } from '../types'
import { useAuth } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

export default function AdminSliders() {
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const [sliders, setSliders] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string>('')
  const [imageUploading, setImageUploading] = useState(false)
  const [imageInputType, setImageInputType] = useState<'url' | 'upload'>('url')
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    type: 'photo',
  })

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login')
    }
  }, [isAdmin, navigate])

  useEffect(() => {
    fetchSliders()
  }, [])

  const fetchSliders = async () => {
    try {
      const response = await galleryService.getGalleryItems()
      setSliders(response.data)
    } catch (error) {
      toast.error('Failed to fetch sliders')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'url') {
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
      setFormData((prev) => ({ ...prev, url: cloudinaryUrl }))
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
    try {
      if (editingId) {
        await galleryService.updateGalleryItem(editingId, formData)
        toast.success('Slider updated!')
      } else {
        await galleryService.createGalleryItem(formData)
        toast.success('Slider created!')
      }
      resetForm()
      fetchSliders()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save slider')
    }
  }

  const handleEdit = (slider: GalleryItem) => {
    setFormData({
      title: slider.title || '',
      url: slider.url,
      type: slider.type || 'photo',
    })
    setPreviewImage(slider.url)
    setEditingId(slider._id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this slider?')) return
    try {
      await galleryService.deleteGalleryItem(id)
      toast.success('Slider deleted!')
      fetchSliders()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete slider')
    }
  }

  const resetForm = () => {
    setFormData({ title: '', url: '', type: 'photo' })
    setPreviewImage('')
    setImageInputType('url')
    setEditingId(null)
    setShowForm(false)
  }

  if (!isAdmin) return null

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sliders</h1>
            <p className="text-gray-600 mt-1">Manage hero section images</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            {showForm ? '✕ Cancel' : '+ Add Slider'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-pink-600">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingId ? '✏️ Edit Slider' : '➕ Add Slider'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Summer Collection"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image *
                  </label>
                  <div className="flex gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setImageInputType('url')}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                        imageInputType === 'url'
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputType('upload')}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                        imageInputType === 'upload'
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Upload
                    </button>
                  </div>

                  {imageInputType === 'url' ? (
                    <textarea
                      name="url"
                      placeholder="Paste the full image URL"
                      value={formData.url}
                      onChange={handleInputChange}
                      rows={3}
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-none transition font-mono text-sm"
                    />
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={handleImageUpload}
                        disabled={imageUploading}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      {imageUploading && (
                        <div className="flex items-center gap-2 text-pink-600 text-sm font-medium">
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-pink-600"></div>
                          Uploading to Cloudinary...
                        </div>
                      )}
                    </div>
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
                  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-80 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+URL'
                      }}
                    />
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="font-semibold">No preview</p>
                      <p className="text-sm">Paste a URL to see preview</p>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600 mx-auto"></div>
          </div>
        ) : sliders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No sliders yet. Add images for the hero section.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sliders.map((slider) => (
              <div
                key={slider._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition border-t-4 border-pink-600"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={slider.url}
                    alt={slider.title}
                    className="w-full h-full object-cover hover:scale-105 transition"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300?text=Not+Found'
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{slider.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(slider)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(slider._id)}
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
