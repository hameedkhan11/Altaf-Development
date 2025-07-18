// components/TeamMemberCard.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TeamMember } from '@/lib/about-us/types';
// import Image from 'next/image';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

interface TeamMemberCardProps {
  member: TeamMember;
  reversed?: boolean;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, reversed = false }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardContent className="p-0">
        <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-[500px]`}>
          {/* Image Section */}
          <div className="lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(140,46,71,0.1)] to-[rgba(140,46,71,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <CldImage
              fill
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-sm text-[rgb(140,46,71)] font-medium mb-1">
                  {member.experience}
                </div>
                <div className="flex gap-3">
                  {member.socialLinks?.linkedin && (
                    <Link href={member.socialLinks.linkedin} className="hover:text-[rgb(140,46,71)] transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  )}
                  {member.socialLinks?.email && (
                    <a href={`mailto:${member.socialLinks.email}`} className="hover:text-[rgb(140,46,71)] transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-3xl lg:text-4xl mb-2 group-hover:text-[rgb(140,46,71)] transition-colors duration-300">
                {member.name}
              </h3>
              <div className="text-lg font-medium text-[rgb(140,46,71)] mb-4">
                {member.position}
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-[rgb(140,46,71)] to-[rgb(180,86,111)] rounded-full group-hover:w-24 transition-all duration-500" />
            </div>

            <p className="text-lg leading-relaxed mb-8">
              {member.description}
            </p>

            <div className="space-y-4">
              <h4 className="text-xl mb-4">Key Achievements</h4>
              {member.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 group/achievement">
                  <div className="w-3 h-3 rounded-full bg-[rgb(140,46,71)] mt-1.5 flex-shrink-0 group-hover/achievement:scale-125 transition-transform duration-200" />
                  <span className="transition-colors duration-200 font-optima">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};