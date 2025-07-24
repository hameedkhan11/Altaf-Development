// services/propertyVideoService.ts
import { groq } from 'next-sanity'
import { client } from './sanity'

// Types
export interface PropertyVideo {
  cloudinaryPublicId: string
  title: string
  description?: string
  thumbnailPublicId?: string
  isPrimary: boolean
  order?: number
}

export interface PropertyVideoGallery {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  description?: string
  videos: PropertyVideo[]
  propertyReference?: {
    _id: string
    title: string
    slug: { current: string }
  }
  isActive: boolean
}

// GROQ Queries
const GET_ALL_VIDEOS = groq`
  *[_type == "propertyVideoGallery" && isActive == true] {
    _id,
    _createdAt,
    title,
    slug,
    description,
    videos[] | order(order asc) {
      cloudinaryPublicId,
      title,
      description,
      thumbnailPublicId,
      isPrimary,
      order
    },
    propertyReference->{
      _id,
      title,
      slug
    },
    isActive
  } | order(_createdAt desc)
`

// Service
export class PropertyVideoService {
  // Get all video galleries with their videos
  static async getAllVideos(): Promise<PropertyVideoGallery[]> {
    return await client.fetch<PropertyVideoGallery[]>(GET_ALL_VIDEOS)
  }
}