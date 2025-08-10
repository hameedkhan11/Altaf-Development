// types.ts
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  description: string;
  experience: string;
  achievements: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface MissionVision {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface CompanyValue {
  title: string;
  description: string;
}

export interface CompanyStat {
  title: string;
  value: string;
}