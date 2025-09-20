// app/careers/page.tsx
'use client';

import { Hero } from '@/components/common/Hero';
import CompanyCulture from '@/components/sections/jobs/CompanyCulture';
import CareerPageIntro from '@/components/sections/jobs/JobFilters';
import JobList from '@/components/sections/jobs/JobList';
import { Job } from '@/lib/job';
import { getAllJobs } from '@/lib/job/jobSanity';
import { useState, useEffect } from 'react';


export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobsData = await getAllJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    }

    fetchJobs();
  }, []);

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartment(department);
  };


  return (
    <main className="min-h-screen">
     
      <Hero 
      backgroundSrc='imageye___-_imgi_32_CTefxztr2tMoor3ksNKZfD5sx9k_jcicdg'
      backgroundType='image'
      height='three-quarter'
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Careers', href: '/careers' }]}
      />
      <CareerPageIntro />
      <CompanyCulture />
      
      <JobList
        jobs={jobs}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={handleDepartmentChange}
      />
    </main>
  );
}