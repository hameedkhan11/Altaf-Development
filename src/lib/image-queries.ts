import { client } from "./sanity";

// types/propertyImageGallery.ts
export interface PropertyImage {
  _key: string;
  cloudinaryPublicId: string;
  alt: string;
  caption?: string;
  isPrimary: boolean;
  category: 'exterior' | 'living-room' | 'kitchen' | 'bedroom' | 'bathroom' | 'garden' | 'other';
  order?: number;
}

export interface PropertyImageGallery {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  images: PropertyImage[];
  propertyReference?: {
    _ref: string;
    _type: 'reference';
  };
  isActive: boolean;
}

/**
 * Get all active property image galleries
 */
export async function getAllPropertyGalleries(): Promise<PropertyImageGallery[]> {
  const query = `
    *[_type == "propertyImageGallery" && isActive == true] | order(_createdAt desc) {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      description,
      images[] {
        _key,
        cloudinaryPublicId,
        alt,
        caption,
        isPrimary,
        category,
        order
      },
      propertyReference->{
        _id,
        title,
        slug
      },
      isActive
    }
  `;

  return await client.fetch(query);
}

/**
 * Get a specific property gallery by slug
 */
export async function getPropertyGalleryBySlug(
  slug: string
): Promise<PropertyImageGallery | null> {
  const query = `
    *[_type == "propertyImageGallery" && slug.current == $slug && isActive == true][0] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      description,
      images[] {
        _key,
        cloudinaryPublicId,
        alt,
        caption,
        isPrimary,
        category,
        order
      },
      propertyReference->{
        _id,
        title,
        slug
      },
      isActive
    }
  `;

  return await client.fetch(query, { slug });
}

/**
 * Get property galleries by property reference
 */
export async function getGalleriesByPropertyId(
  propertyId: string
): Promise<PropertyImageGallery[]> {
  const query = `
    *[_type == "propertyImageGallery" && propertyReference._ref == $propertyId && isActive == true] | order(_createdAt desc) {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      description,
      images[] {
        _key,
        cloudinaryPublicId,
        alt,
        caption,
        isPrimary,
        category,
        order
      },
      propertyReference->{
        _id,
        title,
        slug
      },
      isActive
    }
  `;

  return await client.fetch(query, { propertyId });
}

/**
 * Get primary images from all active galleries
 */
export async function getPrimaryImages(): Promise<
  (PropertyImageGallery & { primaryImage: PropertyImage })[]
> {
  const query = `
    *[_type == "propertyImageGallery" && isActive == true && defined(images[isPrimary == true][0])] {
      _id,
      title,
      slug,
      description,
      primaryImage: images[isPrimary == true][0] {
        _key,
        cloudinaryPublicId,
        alt,
        caption,
        isPrimary,
        category,
        order
      },
      propertyReference->{
        _id,
        title,
        slug
      }
    }
  `;

  return await client.fetch(query);
}

/**
 * Get images by category from all active galleries
 */
export async function getImagesByCategory(
  category: PropertyImage['category']
): Promise<
  Array<{
    gallery: Pick<PropertyImageGallery, '_id' | 'title' | 'slug'>;
    images: PropertyImage[];
  }>
> {
  const query = `
    *[_type == "propertyImageGallery" && isActive == true && images[category == $category]] {
      gallery: {
        _id,
        title,
        slug
      },
      images: images[category == $category] | order(order asc, _createdAt asc) {
        _key,
        cloudinaryPublicId,
        alt,
        caption,
        isPrimary,
        category,
        order
      }
    }
  `;

  return await client.fetch(query, { category });
}

/**
 * Search property galleries by title or description
 */
export async function searchPropertyGalleries(
  searchTerm: string
): Promise<PropertyImageGallery[]> {
  const query = `
    *[_type == "propertyImageGallery" && isActive == true && (
      title match $searchTerm || 
      description match $searchTerm
    )] | order(_createdAt desc) {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      description,
      images[] {
        _key,
        cloudinaryPublicId,
        alt,
        caption,
        isPrimary,
        category,
        order
      },
      propertyReference->{
        _id,
        title,
        slug
      },
      isActive
    }
  `;

  return await client.fetch(query, { searchTerm: `*${searchTerm}*` });
}

/**
 * Get gallery statistics
 */
export async function getGalleryStats(): Promise<{
  totalGalleries: number;
  totalImages: number;
  categories: Array<{ category: string; count: number }>;
}> {
  const query = `{
    "totalGalleries": count(*[_type == "propertyImageGallery" && isActive == true]),
    "totalImages": sum(*[_type == "propertyImageGallery" && isActive == true].images[]),
    "categories": *[_type == "propertyImageGallery" && isActive == true].images[].category => {category, count: count()}
  }`;

  return await client.fetch(query);
}

/**
 * Get recently updated galleries
 */
export async function getRecentlyUpdatedGalleries(
  limit: number = 5
): Promise<PropertyImageGallery[]> {
  const query = `
    *[_type == "propertyImageGallery" && isActive == true] | order(_updatedAt desc)[0...$limit] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      description,
      images[] {
        _key,
        cloudinaryPublicId,
        alt,
        caption,
        isPrimary,
        category,
        order
      },
      propertyReference->{
        _id,
        title,
        slug
      },
      isActive
    }
  `;

  return await client.fetch(query, { limit });
}
