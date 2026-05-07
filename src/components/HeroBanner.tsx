import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { galleryService } from '../services/api'
import { GalleryItem } from '../types'
import Button from './ui/Button'

export default function HeroBanner() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [bannerData, setBannerData] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await galleryService.getGalleryItems()
        setBannerData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch sliders:', error)
        setLoading(false)
      }
    }

    fetchSliders()
  }, [])

  useEffect(() => {
    if (!isAutoplay || bannerData.length <= 1) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoplay, bannerData.length])

  if (loading) {
    return null
  }

  if (bannerData.length === 0) {
    return null
  }

  if (bannerData.length === 1) {
    return (
      <div className="relative h-96 md:h-[600px] overflow-hidden rounded-2xl mb-12">
        <img
          src={bannerData[0].url}
          alt={bannerData[0].title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/1200x600?text=Image+Not+Found'
          }}
        />
      </div>
    )
  }

  return (
    <div className="relative h-96 md:h-[600px] overflow-hidden rounded-2xl mb-12 group">
      {/* Slides */}
      {bannerData.map((banner, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Image with overlay */}
          <div className="relative w-full h-full">
            <img
              src={banner.url}
              alt={banner.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/1200x600?text=Image+Not+Found'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          </div>

          {/* Content */}
          {banner.title && (
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16">
              <div className="max-w-2xl animate-slideUp">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {banner.title}
                </h2>

                <Button size="lg" onClick={() => navigate('/products')}>
                  Explore Collection
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          setCurrent((prev) => (prev - 1 + bannerData.length) % bannerData.length)
          setIsAutoplay(false)
        }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => {
          setCurrent((prev) => (prev + 1) % bannerData.length)
          setIsAutoplay(false)
        }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      {bannerData.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {bannerData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrent(idx)
                setIsAutoplay(false)
              }}
              className={`transition-all duration-300 rounded-full backdrop-blur-sm ${
                idx === current
                  ? 'bg-primary w-8 h-3'
                  : 'bg-white/40 hover:bg-white/60 w-3 h-3'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
