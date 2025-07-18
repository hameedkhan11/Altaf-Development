
// estate/frontend/lib/sanity.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImage } from './sanity/sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-07-12',
  useCdn: false,
  perspective: 'published',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: SanityImage) => builder.image(source).auto('format').quality(90)