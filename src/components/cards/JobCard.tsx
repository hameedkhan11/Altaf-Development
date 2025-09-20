// components/JobCard.tsx
'use client';

import { departmentLabels, employmentTypeLabels, experienceLevelLabels, JobCardProps } from '@/lib/job';
import { motion } from 'framer-motion';

export default function JobCard({ job }: JobCardProps) {
  const handleApplyClick = () => {
    window.open(job.applicationFormUrl, '_blank', 'noopener,noreferrer');
  };

  const isDeadlineApproaching = () => {
    if (!job.deadline) return false;
    const deadline = new Date(job.deadline);
    const now = new Date();
    const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return daysUntilDeadline <= 7;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white  p-8 transition-all duration-300 border border-slate-200 hover:border-blue-200"
    >

      {/* Deadline Warning */}
      {isDeadlineApproaching() && (
        <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          DEADLINE SOON
        </div>
      )}

      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 transition-colors">
              {job.title}
            </h3>
            <div className="flex flex-wrap gap-2 text-sm text-[rgb(140,46,71)]">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium">
                {departmentLabels[job.department]}
              </span>
              <span className="inline-flex items-center font-medium px-2.5 py-0.5 rounded-full">
                {job.location}
              </span>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {employmentTypeLabels[job.employmentType]}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {experienceLevelLabels[job.experienceLevel]}
          </div>
        </div>
        {/* Description */}
        <p className="mb-6 line-clamp-3 flex-grow">
          {job.shortDescription}
        </p>

        {/* Key Requirements Preview */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium mb-2">Key Requirements:</h4>
            <ul className="text-sm space-y-1">
              {job.requirements.slice(0, 3).map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[rgb(140,46,71)] mr-2">•</span>
                  {req}
                </li>
              ))}
              {job.requirements.length > 3 && (
                <li className="italic">
                  +{job.requirements.length - 3} more requirements...
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col space-y-2 sm:flex-row items-center justify-between mt-auto pt-4">
          <div className="text-sm ">
            Posted {new Date(job.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
            {job.deadline && (
              <span className="ml-2">
                • Deadline {new Date(job.deadline).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>
          <button
            onClick={handleApplyClick}
            className="inline-flex items-center px-6 py-3 bg-[rgb(140,46,71)] hover:bg-transparent hover:border-2 hover:border-[rgb(140,46,71)] hover:text-[rgb(140,46,71)] text-white font-medium rounded-full transition-all duration-200 transform  hover:shadow-lg focus:outline-none cursor-pointer"
          >
            Apply Now
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}