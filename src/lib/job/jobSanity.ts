import { Job } from ".";
import { client } from "../sanity";

// GROQ queries with deadline filtering
export const jobsQuery = `
  *[_type == "job" && isActive == true && (!defined(deadline) || deadline >= now())] | order(featured desc, publishedAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    department,
    location,
    employmentType,
    experienceLevel,
    salaryRange,
    shortDescription,
    description,
    requirements,
    responsibilities,
    benefits,
    applicationFormUrl,
    isActive,
    featured,
    deadline,
    publishedAt
  }
`;

export const featuredJobsQuery = `
  *[_type == "job" && isActive == true && featured == true && (!defined(deadline) || deadline >= now())] | order(publishedAt desc) [0...3] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    department,
    location,
    employmentType,
    experienceLevel,
    salaryRange,
    shortDescription,
    description,
    requirements,
    responsibilities,
    benefits,
    applicationFormUrl,
    isActive,
    featured,
    deadline,
    publishedAt
  }
`;

export const jobBySlugQuery = `
  *[_type == "job" && slug.current == $slug && isActive == true && (!defined(deadline) || deadline >= now())][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    department,
    location,
    employmentType,
    experienceLevel,
    salaryRange,
    shortDescription,
    description,
    requirements,
    responsibilities,
    benefits,
    applicationFormUrl,
    isActive,
    featured,
    deadline,
    publishedAt
  }
`;

// API functions
export async function getAllJobs(): Promise<Job[]> {
  try {
    const jobs = await client.fetch(jobsQuery);
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

export async function getFeaturedJobs(): Promise<Job[]> {
  try {
    const jobs = await client.fetch(featuredJobsQuery);
    return jobs;
  } catch (error) {
    console.error('Error fetching featured jobs:', error);
    return [];
  }
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    const job = await client.fetch(jobBySlugQuery, { slug });
    return job;
  } catch (error) {
    console.error('Error fetching job by slug:', error);
    return null;
  }
}

export async function getJobsByDepartment(department: string): Promise<Job[]> {
  try {
    const query = `
      *[_type == "job" && isActive == true && department == $department && (!defined(deadline) || deadline >= now())] | order(publishedAt desc) {
        _id,
        _createdAt,
        _updatedAt,
        title,
        slug,
        department,
        location,
        employmentType,
        experienceLevel,
        salaryRange,
        shortDescription,
        description,
        requirements,
        responsibilities,
        benefits,
        applicationFormUrl,
        isActive,
        featured,
        deadline,
        publishedAt
      }
    `;
    const jobs = await client.fetch(query, { department });
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs by department:', error);
    return [];
  }
}

// Utility function to check if job deadline has passed (for client-side use)
export const isJobExpired = (deadline?: string): boolean => {
  if (!deadline) return false;
  const deadlineDate = new Date(deadline);
  const currentDate = new Date();
  return deadlineDate < currentDate;
};

// Utility function to get days until deadline
export const getDaysUntilDeadline = (deadline?: string): number | null => {
  if (!deadline) return null;
  const deadlineDate = new Date(deadline);
  const currentDate = new Date();
  const timeDiff = deadlineDate.getTime() - currentDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
};

// Utility function to format deadline for display
export const formatDeadline = (deadline?: string): string => {
  if (!deadline) return '';
  const deadlineDate = new Date(deadline);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return deadlineDate.toLocaleDateString('en-US', options);
};

export default client;