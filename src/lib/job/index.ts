// types/index.ts

export interface SalaryRange {
  min?: number;
  max?: number;
  currency: 'PKR';
}

export interface Job {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    current: string;
  };
  department: 'construction' | 'engineering' | 'architecture' | 'project-management' | 'sales-marketing' | 'administration' | 'finance' | 'human-resources';
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  salaryRange?: SalaryRange;
  shortDescription: string;
  description: string[]; // Sanity block content
  requirements: string[];
  responsibilities: string[];
  benefits?: string[];
  applicationFormUrl: string;
  isActive: boolean;
  featured: boolean;
  deadline?: string;
  publishedAt: string;
}

export interface JobListProps {
  jobs: Job[];
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
}

export interface JobCardProps {
  job: Job;
}

export interface JobFiltersProps {
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  departments: string[];
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

// Department mapping for display
export const departmentLabels: Record<string, string> = {
  'construction': 'Construction',
  'engineering': 'Engineering', 
  'architecture': 'Architecture',
  'project-management': 'Project Management',
  'sales-marketing': 'Sales & Marketing',
  'administration': 'Administration',
  'finance': 'Finance',
  'human-resources': 'Human Resources',
};

// Employment type mapping
export const employmentTypeLabels: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'contract': 'Contract',
  'internship': 'Internship',
};

// Experience level mapping
export const experienceLevelLabels: Record<string, string> = {
  'entry': 'Entry Level',
  'mid': 'Mid Level',
  'senior': 'Senior Level',
  'executive': 'Executive',
};