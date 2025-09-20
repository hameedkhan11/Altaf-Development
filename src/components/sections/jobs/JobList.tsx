// components/JobList.tsx
'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
// import JobFilters from './JobFilters';   
import { departmentLabels, JobListProps } from '@/lib/job';
import JobCard from '@/components/cards/JobCard';

export default function JobList({ jobs, selectedDepartment, onDepartmentChange }: JobListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Check if a job's deadline has passed
  const isJobExpired = (deadline?: string): boolean => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    return deadlineDate < currentDate;
  };

  // Filter jobs based on department, search term, and deadline
  const filteredJobs = useMemo(() => {
    let filtered = jobs;

    // Filter out expired jobs
    filtered = filtered.filter(job => !isJobExpired(job.deadline));

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(job => job.department === selectedDepartment);
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(search) ||
        job.shortDescription.toLowerCase().includes(search) ||
        job.location.toLowerCase().includes(search) ||
        departmentLabels[job.department].toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [jobs, selectedDepartment, searchTerm]);

  const featuredJobs = filteredJobs.filter(job => job.featured);
  const regularJobs = filteredJobs.filter(job => !job.featured);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto">
          {/* Main Content */}
          <div className="w-full">
            {/* Featured Jobs */}
            <AnimatePresence>
              {featuredJobs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 1, delay: 2.2 }}
                  className="mb-12 sm:mb-16 md:mb-20"
                >
                  <div className="flex items-center justify-center mb-8 sm:mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-center px-4 pt-20">
                      Featured Jobs
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                    {featuredJobs.map((job, index) => (
                      <motion.div
                        key={job._id}
                        initial={{ opacity: 0, y: 100, rotateX: 45 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.2,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        whileHover={{
                          y: -10,
                          transition: { duration: 0.3 }
                        }}
                        className="group"
                      >
                        <div className="backdrop-blur-xl p-4 sm:p-6 md:p-8 transition-all duration-500 relative overflow-hidden">
                          <div className="relative z-10">
                            <JobCard job={job} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Regular Jobs */}
            <AnimatePresence>
              {regularJobs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 1, delay: 2.4 }}
                >
                  {featuredJobs.length > 0 && (
                    <div className="flex items-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-0">
                      <div className="w-1 sm:w-2 h-12 sm:h-16 mr-4 sm:mr-6 rounded-full" />
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide">All Positions</h2>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                    {regularJobs.map((job, index) => (
                      <motion.div
                        key={job._id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: (featuredJobs.length * 0.2) + (index * 0.1),
                          ease: "easeOut",
                        }}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                        className="group"
                      >
                        <div className="p-4 sm:p-6 md:p-8 transition-all duration-500 border border-gray-200/10 hover:border-gray-200/20 bg-white/5 backdrop-blur-sm">
                          <JobCard job={job} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* No Results - Premium Empty State */}
            {filteredJobs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="text-center py-16 sm:py-20 md:py-24 lg:py-32 px-4"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto backdrop-blur-xl rounded-full flex items-center justify-center bg-gradient-to-br from-gray-800/20 to-gray-900/20 border border-white/10 mb-6 sm:mb-8"
                >
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6 tracking-wide">
                  No positions found
                </h3>
                <p className="text-base sm:text-lg md:text-xl font-light max-w-sm sm:max-w-md md:max-w-lg mx-auto leading-relaxed">
                  {searchTerm || selectedDepartment !== 'all' 
                    ? "Adjust your search criteria or explore other departments."
                    : "We currently have no open positions. Check back soon for new opportunities."}
                </p>

                {(searchTerm || selectedDepartment !== 'all') && (
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onDepartmentChange('all');
                      setSearchTerm('');
                    }}
                    className="mt-6 sm:mt-8 px-8 sm:px-10 md:px-12 py-3 sm:py-4 backdrop-blur-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-black rounded-full text-white font-light hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 text-sm sm:text-base"
                  >
                    Explore All Positions
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}