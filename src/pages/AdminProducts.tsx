import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { productService, categoryService, uploadService } from '../services/api'
import { Product, Category } from '../types'
import { useAuth } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

export default function AdminProducts() {
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  // Up to MAX_IMAGES images per product. The first one is treated as primary.
  const [images, setImages] = useState<string[]>([])
  const [urlInput, setUrlInput] = useState('')
  const [imageUploading, setImageUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    stockQuantity: '',
  })
  const [imageInputType, setImageInputType] = useState<'url' | 'upload'>('url')

  const MAX_IMAGES = 4

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login')
    }
  }, [isAdmin, navigate])

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await productService.getProducts({ limit: 100 })
      setProducts(response.data.products)
    } catch (error) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories()
      setCategories(response.data)
    } catch (error) {
      toast.error('Failed to fetch categories')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddUrl = () => {
    const url = urlInput.trim()
    if (!url) return
    if (images.length >= MAX_IMAGES) {
      toast.error(`You can add up to ${MAX_IMAGES} images`)
      return
    }
    if (images.includes(url)) {
      toast.error('This image has already been added')
      return
    }
    setImages((prev) => [...prev, url])
    setUrlInput('')
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const remaining = MAX_IMAGES - images.length
    if (remaining <= 0) {
      toast.error(`You can add up to ${MAX_IMAGES} images`)
      e.target.value = ''
      return
    }
    const toUpload = files.slice(0, remaining)
    if (files.length > remaining) {
      toast.warn(`Only ${remaining} more image(s) can be added (max ${MAX_IMAGES})`)
    }

    setImageUploading(true)
    try {
      for (const file of toUpload) {
        const response = await uploadService.uploadImage(file)
        const cloudinaryUrl = response.data.url
        setImages((prev) => (prev.includes(cloudinaryUrl) ? prev : [...prev, cloudinaryUrl]))
      }
      toast.success('Image(s) uploaded successfully')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload image')
    } finally {
      setImageUploading(false)
      e.target.value = ''
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!formData.name || !formData.description || !formData.price || !formData.stockQuantity) {
        toast.error('Please fill in all required fields')
        return
      }

      if (images.length === 0) {
        toast.error('Please add at least one product image')
        return
      }

      const submitData: any = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        categoryId: formData.categoryId || undefined,
        images: images.map((url, index) => ({
          url,
          alt: formData.name,
          isPrimary: index === 0,
        })),
      }

      if (editingId) {
        await productService.updateProduct(editingId, submitData)
        toast.success('Product updated!')
      } else {
        await productService.createProduct(submitData)
        toast.success('Product created!')
      }
      resetForm()
      fetchProducts()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save product')
    }
  }

  const handleEdit = (product: Product) => {
    // Load existing images, primary first, capped at MAX_IMAGES.
    const sorted = [...(product.images || [])].sort(
      (a, b) => Number(b.isPrimary) - Number(a.isPrimary),
    )
    setImages(sorted.map((img) => img.url).slice(0, MAX_IMAGES))
    setFormData({
      name: product.name,
      description: product.description,
      price: String(product.price),
      categoryId: product.categoryId || '',
      stockQuantity: String(product.stockQuantity),
    })
    setUrlInput('')
    setEditingId(product._id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return
    try {
      await productService.deleteProduct(id)
      toast.success('Product deleted!')
      fetchProducts()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete product')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      categoryId: '',
      stockQuantity: '',
    })
    setImages([])
    setUrlInput('')
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
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">Manage your product catalog</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            {showForm ? '✕ Cancel' : '+ Add Product'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingId ? '✏️ Edit Product' : '➕ Add Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., Gold Ring"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stockQuantity"
                    placeholder="0"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  placeholder="Detailed product description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Product Images * (up to {MAX_IMAGES})
                  </label>
                  <span
                    className={`text-xs font-semibold ${
                      images.length >= MAX_IMAGES ? 'text-red-600' : 'text-gray-500'
                    }`}
                  >
                    {images.length} / {MAX_IMAGES}
                  </span>
                </div>

                {/* Thumbnails of added images */}
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-4">
                    {images.map((url, index) => (
                      <div
                        key={`${url}-${index}`}
                        className="relative w-24 h-24 rounded-lg border border-gray-300 overflow-hidden group"
                      >
                        <img
                          src={url}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://via.placeholder.com/300x300?text=Invalid+URL'
                          }}
                        />
                        {index === 0 && (
                          <span className="absolute top-1 left-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Primary
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          aria-label={`Remove image ${index + 1}`}
                          className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold leading-none"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {images.length >= MAX_IMAGES ? (
                  <p className="text-sm text-gray-500 italic">
                    Maximum of {MAX_IMAGES} images reached. Remove one to add another.
                  </p>
                ) : (
                  <>
                    <div className="flex gap-2 mb-4">
                      <button
                        type="button"
                        onClick={() => setImageInputType('url')}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                          imageInputType === 'url'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Use URL
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageInputType('upload')}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                          imageInputType === 'upload'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Upload Image
                      </button>
                    </div>

                    {imageInputType === 'url' ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              handleAddUrl()
                            }
                          }}
                          placeholder="Paste image URL and click Add"
                          className="flex-1 border border-gray-300 rounded-lg p-2 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition font-mono text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddUrl}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          multiple
                          onChange={handleImageUpload}
                          disabled={imageUploading}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        {imageUploading && (
                          <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-600"></div>
                            Uploading to Cloudinary...
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex gap-3 pt-4">
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
            </form>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No products yet. Create your first product.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Image</th>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Category</th>
                    <th className="px-6 py-4 text-left font-semibold">Price</th>
                    <th className="px-6 py-4 text-left font-semibold">Stock</th>
                    <th className="px-6 py-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={product._id}
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition border-b`}
                    >
                      <td className="px-6 py-4">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded border border-gray-200"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/50'
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                            No img
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{product.categoryId || '—'}</td>
                      <td className="px-6 py-4 font-semibold">₹{product.price.toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            product.stockQuantity > 10
                              ? 'bg-green-100 text-green-800'
                              : product.stockQuantity > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.stockQuantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition text-sm font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
