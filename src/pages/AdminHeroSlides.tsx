import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { heroService, uploadService } from '../services/api'
import { HeroSlide } from '../types'
import { useAuth } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

const emptyForm = {
  eyebrow: '',
  title: '',
  subtitle: '',
  url: '',
  ctaText: '',
  ctaLink: '',
  displayOrder: 0,
}

export default function AdminHeroSlides() {
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string>('')
  const [imageUploading, setImageUploading] = useState(false)
  const [imageInputType, setImageInputType] = useState<'url' | 'upload'>('url')
  const [formData, setFormData] = useState({ ...emptyForm })

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login')
    }
  }, [isAdmin, navigate])

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      const response = await heroService.getHeroSlides()
      setSlides(response.data)
    } catch (error) {
      toast.error('Failed to fetch hero slides')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'displayOrder' ? Number(value) : value,
    }))
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
    if (!formData.url) {
      toast.error('Please provide an image (URL or upload)')
      return
    }
    try {
      if (editingId) {
        await heroService.updateHeroSlide(editingId, formData)
        toast.success('Hero slide updated!')
      } else {
        await heroService.createHeroSlide(formData)
        toast.success('Hero slide created!')
      }
      resetForm()
      fetchSlides()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save hero slide')
    }
  }

  const handleEdit = (slide: HeroSlide) => {
    setFormData({
      eyebrow: slide.eyebrow || '',
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      url: slide.url,
      ctaText: slide.ctaText || '',
      ctaLink: slide.ctaLink || '',
      displayOrder: slide.displayOrder || 0,
    })
    setPreviewImage(slide.url)
    setEditingId(slide._id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this hero slide?')) return
    try {
      await heroService.deleteHeroSlide(id)
      toast.success('Hero slide deleted!')
      fetchSlides()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete hero slide')
    }
  }

  const resetForm = () => {
    setFormData({ ...emptyForm })
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
            <h1 className="text-3xl font-bold text-gray-900">Hero Slides</h1>
            <p className="text-gray-600 mt-1">
              Manage the main hero carousel on the home page
            </p>
          </div>
          <button
            onClick={() => (showForm ? resetForm() : setShowForm(true))}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            {showForm ? '✕ Cancel' : '+ Add Hero Slide'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-pink-600">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingId ? '✏️ Edit Hero Slide' : '➕ Add Hero Slide'}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Eyebrow (small label above title)
                  </label>
                  <input
                    type="text"
                    name="eyebrow"
                    placeholder="e.g., HANDCRAFTED FINE JEWELRY"
                    value={formData.eyebrow}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Timeless Elegance, Crafted to Perfection"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-none transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    The last word is automatically highlighted in gold.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <textarea
                    name="subtitle"
                    placeholder="Short supporting sentence"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Button Text
                    </label>
                    <input
                      type="text"
                      name="ctaText"
                      placeholder="e.g., Explore Collection"
                      value={formData.ctaText}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Button Link
                    </label>
                    <input
                      type="text"
                      name="ctaLink"
                      placeholder="e.g., /products"
                      value={formData.ctaLink}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-pink-600 focus:ring-1 focus:ring-pink-600 outline-none transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lower numbers appear first in the carousel.
                  </p>
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
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-80 object-cover opacity-80"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://via.placeholder.com/600x400?text=Invalid+URL'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-center p-6 text-left">
                      {formData.eyebrow && (
                        <p className="text-yellow-400 text-xs tracking-[0.3em] mb-2">
                          {formData.eyebrow}
                        </p>
                      )}
                      {formData.title && (
                        <h3 className="text-white text-2xl font-serif leading-tight">
                          {formData.title}
                        </h3>
                      )}
                      {formData.subtitle && (
                        <p className="text-gray-200 text-sm mt-2 max-w-xs">
                          {formData.subtitle}
                        </p>
                      )}
                      {formData.ctaText && (
                        <span className="mt-4 inline-block w-fit bg-yellow-500 text-black text-xs font-bold px-4 py-2 rounded-full">
                          {formData.ctaText}
                        </span>
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
                      <p className="font-semibold">No preview</p>
                      <p className="text-sm">Add an image to see preview</p>
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
        ) : slides.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">
              No hero slides yet. Add slides to power the home page carousel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slides.map((slide) => (
              <div
                key={slide._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition border-t-4 border-pink-600"
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={slide.url}
                    alt={slide.title}
                    className="w-full h-full object-cover hover:scale-105 transition"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://via.placeholder.com/300?text=Not+Found'
                    }}
                  />
                  <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Order: {slide.displayOrder}
                  </span>
                </div>
                <div className="p-4">
                  {slide.eyebrow && (
                    <p className="text-pink-600 text-[11px] tracking-widest font-semibold mb-1">
                      {slide.eyebrow}
                    </p>
                  )}
                  <h3 className="text-lg font-bold text-gray-900">
                    {slide.title || '(no title)'}
                  </h3>
                  {slide.subtitle && (
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {slide.subtitle}
                    </p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(slide)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(slide._id)}
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
