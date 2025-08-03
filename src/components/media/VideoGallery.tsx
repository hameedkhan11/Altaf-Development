// app/videos/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { PropertyVideo, PropertyVideoGallery, PropertyVideoService } from '@/lib/video-queries'

// Video Card Component
const VideoCard = ({ video }: { video: PropertyVideo }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Generate Cloudinary video URL
  const getVideoUrl = (publicId: string) => {
    const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`
    return `${baseUrl}/${publicId}.mp4`
  }

  // Generate thumbnail URL
  const getThumbnailUrl = (publicId: string, thumbnailId?: string) => {
    const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
    if (thumbnailId) {
      return `${baseUrl}/w_400,h_225,c_fill/${thumbnailId}`
    }
    return `${baseUrl}/w_400,h_225,c_fill,so_auto/${publicId}.jpg`
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow w-full max-w-sm">
      <div className="relative aspect-video w-full h-96">
        {!isPlaying ? (
          <>
            <Image
              src={getThumbnailUrl(video.cloudinaryPublicId, video.thumbnailPublicId)}
              alt={video.title || 'Video thumbnail'}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all"
                aria-label="Play video"
              >
                <Play className="w-6 h-6 text-gray-800 ml-1" />
              </button>
            </div>
            {video.isPrimary && (
              <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded text-xs font-medium">
                FEATURED
              </div>
            )}
          </>
        ) : (
          <video
            src={getVideoUrl(video.cloudinaryPublicId)}
            controls
            autoPlay
            className="w-full h-full object-cover"
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>
    </div>
  )
}

// Main Page Component
export default function VideosPage() {
  const [galleries, setGalleries] = useState<PropertyVideoGallery[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const data = await PropertyVideoService.getAllVideos()
        setGalleries(data)
      } catch (err) {
        setError('Failed to load videos')
        console.error('Error fetching videos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading videos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
            aria-label="Retry button"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-16 py-24">
        {galleries.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No videos available at this time.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {galleries.map(gallery => (
              <div key={gallery._id} className="bg-white rounded-lg overflow-hidden shadow">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl md:text-3xl lg:text-5xl text-center">
                    Property Video Collection
                  </h2>
                  {gallery.description && (
                    <p className="text-gray-600 mt-2 text-center">{gallery.description}</p>
                  )}
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(gallery.videos || []).map((video, index) => (
                      <VideoCard
                        key={`${gallery._id}-${index}`}
                        video={video}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}