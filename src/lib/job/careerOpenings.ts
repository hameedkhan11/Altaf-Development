import type { Job } from './index';

// Website-managed openings stay visible even when Sanity has no published jobs.
// The dedicated application links are created by JobCard for these two IDs.
const common = {
  _createdAt: '2026-10-15T00:00:00.000Z',
  _updatedAt: '2026-10-15T00:00:00.000Z',
  department: 'sales-marketing' as const,
  location: 'Faisal Hills, Islamabad',
  employmentType: 'full-time' as const,
  experienceLevel: 'mid' as const,
  description: [],
  responsibilities: [],
  benefits: [],
  isActive: true,
  featured: true,
  publishedAt: '2026-10-15T00:00:00.000Z',
};

export const careerOpenings: Job[] = [
  {
    ...common,
    _id: 'website-sales-executive',
    title: 'Sales Executive — Real Estate',
    slug: { current: 'sales-executive' },
    shortDescription: 'Turn conversations into opportunities. Join Altaf Developments and help clients discover exceptional homes at The Residences, while building a rewarding career in property sales.',
    requirements: [
      'Confident communication and relationship-building skills',
      'Passion for real estate, client service and meeting targets',
      'Sales experience is an advantage; motivated applicants are welcome',
    ],
    applicationFormUrl: 'https://wa.me/923330777775',
  },
  {
    ...common,
    _id: 'website-influencer',
    title: 'Influencer / Content Creator',
    slug: { current: 'influencer-content-creator' },
    experienceLevel: 'entry',
    shortDescription: 'Have a talent for storytelling and an eye for great content? Collaborate with Altaf Developments to showcase inspiring spaces, bring fresh ideas to life and connect with a growing audience.',
    requirements: [
      'Comfortable creating short-form videos, reels and social content',
      'Strong on-camera presence or creative storytelling skills',
      'Share your social profile or portfolio along with your CV',
    ],
    applicationFormUrl: 'https://wa.me/923330777775',
  },
];
