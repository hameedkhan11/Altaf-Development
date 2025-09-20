// lib/queries/events.ts
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { groq } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../sanity'


const builder = imageUrlBuilder(client)

// Event type definition
export interface Event {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  image: {
    asset: {
      _ref: string
      url: string
    }
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
  gallery?: Array<{
    asset: {
      _ref: string
      url: string
    }
    alt?: string
    caption?: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }>
  eventDate: string
  location: string
  featured: boolean
  metaTitle?: string
  metaDescription?: string
}

// Get all events (for events listing page)
export const getAllEventsQuery = groq`
  *[_type == "event"] | order(eventDate desc) {
    _id,
    title,
    slug,
    description,
    image {
      asset-> {
        _ref,
        url
      },
      hotspot
    },
    eventDate,
    location,
    featured,
    metaTitle,
    metaDescription
  }
`

// Get featured events
export const getFeaturedEventsQuery = groq`
  *[_type == "event" && featured == true] | order(eventDate desc) {
    _id,
    title,
    slug,
    description,
    image {
      asset-> {
        _ref,
        url
      },
      hotspot
    },
    eventDate,
    location,
    featured
  }
`

// Get upcoming events
export const getUpcomingEventsQuery = groq`
  *[_type == "event" && eventDate > now()] | order(eventDate asc) {
    _id,
    title,
    slug,
    description,
    image {
      asset-> {
        _ref,
        url
      },
      hotspot
    },
    eventDate,
    location,
    featured
  }
`

// Get past events
export const getPastEventsQuery = groq`
  *[_type == "event" && eventDate < now()] | order(eventDate desc) {
    _id,
    title,
    slug,
    description,
    image {
      asset-> {
        _ref,
        url
      },
      hotspot
    },
    eventDate,
    location,
    featured
  }
`

// Get single event by slug
export const getEventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    image {
      asset-> {
        _ref,
        url
      },
      hotspot
    },
    gallery[] {
      asset-> {
        _ref,
        url
      },
      alt,
      caption,
      hotspot
    },
    eventDate,
    location,
    featured,
    metaTitle,
    metaDescription
  }
`

// Get event slugs for static generation
export const getEventSlugsQuery = groq`
  *[_type == "event" && defined(slug.current)][].slug.current
`

// Get related events (same month, excluding current event)
export const getRelatedEventsQuery = groq`
  *[_type == "event" && _id != $eventId && dateTime(eventDate) > dateTime($startDate) && dateTime(eventDate) < dateTime($endDate)] | order(eventDate asc) [0...3] {
    _id,
    title,
    slug,
    description,
    image {
      asset-> {
        _ref,
        url
      },
      hotspot
    },
    eventDate,
    location,
    featured
  }
`

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}