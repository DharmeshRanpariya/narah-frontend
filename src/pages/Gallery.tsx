import { useState, useEffect } from 'react'
import { galleryService } from '../services/api'
import { GalleryItem } from '../types'

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await galleryService.getGalleryItems()
        setItems(response.data)
      } catch (error) {
        console.error('Failed to fetch gallery:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-light py-8 md:py-12">
      <div className="container px-4">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-accent">Our Gallery</h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Explore our stunning collection of jewelry photographs and videos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {items.map((item) => (
            <div key={item._id} className="relative overflow-hidden rounded-xl group shadow-md hover:shadow-xl transition-shadow">
              {item.type === 'photo' ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300?text=Gallery+Image'
                  }}
                />
              ) : (
                <div className="w-full h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-3 md:p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="text-xs md:text-sm font-semibold">{item.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-600 text-lg font-semibold">No gallery items yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
