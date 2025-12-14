// lib/images.ts
export interface GalleryImage {
  id: string;
  cloudinaryId: string;
  alt: string;
  category: 'exterior' | 'interior';
}

export const propertyImages: GalleryImage[] = [
  // Exterior Images
  {
    id: 'ext-1',
    cloudinaryId: 'Property images/altaf_fvt2.webp',
    alt: 'Property Exterior View 1',
    category: 'exterior'
  },
  {
    id: 'ext-2',
    cloudinaryId: 'Property images/altaf fvt 9 (1) (1).webp',
    alt: 'Property Exterior View 2',
    category: 'exterior'
  },
  {
    id: 'ext-3',
    cloudinaryId: 'Property images/altaf fvt (1).webp',
    alt: 'Property Exterior View 3',
    category: 'exterior'
  },
  {
    id: 'ext-4',
    cloudinaryId: 'Property images/altaf fvt3.webp',
    alt: 'Property Exterior View 4',
    category: 'exterior'
  },
  {
    id: 'ext-5',
    cloudinaryId: 'Property images/altaf1.webp',
    alt: 'Property Exterior View 5',
    category: 'exterior'
  },
  {
    id: 'ext-6',
    cloudinaryId: 'Property images/altaf fvt 6 (1).webp',
    alt: 'Property Exterior View 6',
    category: 'exterior'
  },
  // Interior Images
  {
    id: 'int-1',
    cloudinaryId: 'interior/interior (6).jpeg',
    alt: 'Property Interior View 1',
    category: 'interior'
  },
  {
    id: 'int-2',
    cloudinaryId: 'interior/interior (5).jpeg',
    alt: 'Property Interior View 2',
    category: 'interior'
  },
  {
    id: 'int-3',
    cloudinaryId: 'interior/interior (1).jpeg',
    alt: 'Property Interior View 3',
    category: 'interior'
  },
  {
    id: 'int-4',
    cloudinaryId: 'interior/interior (8).jpeg',
    alt: 'Property Interior View 4',
    category: 'interior'
  },
  {
    id: 'int-5',
    cloudinaryId: 'interior/interior (11).jpeg',
    alt: 'Property Interior View 5',
    category: 'interior'
  },
  {
    id: 'int-6',
    cloudinaryId: 'interior/interior (4).jpeg',
    alt: 'Property Interior View 6',
    category: 'interior'
  },
];