import LeadershipImage from "./LeadershipImage";

interface LeadershipSectionProps {
  title: string;
  name: string;
  jobTitle?: string;
  content: string[];
  imageSrc: string;
  imageAlt: string;
  imagePosition: 'left' | 'right';
  backgroundColor?: string;
}

const LeadershipSection = ({
  title,
  name,
  jobTitle,
  content,
  imageSrc,
  imageAlt,
  imagePosition,
  backgroundColor = 'bg-white'
}: LeadershipSectionProps) => {
  const isImageLeft = imagePosition === 'left';
    
  return (
    <section className={`py-6 sm:py-8 md:py-12 lg:py-16 xl:py-24 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 relative ${backgroundColor}`}>
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2  lg:gap-x-12 xl:gap-x-16 items-start">
                            
          {/* Image Section */}
          <div className={`relative ${isImageLeft ? 'order-1' : 'order-1 lg:order-2'}`}>
            <LeadershipImage imageSrc={imageSrc} imageAlt={imageAlt} />
          </div>
                    
          {/* Content Section */}
          <div className={`space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 flex flex-col justify-center h-full ${isImageLeft ? 'order-2' : 'order-2 lg:order-1'}`}>
                                    
            {/* Title */}
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl mb-0 leading-tight">
                {title}
              </h3>
            </div>
                          
            {/* Content Paragraphs */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4 text-left">
              {content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-xs sm:text-sm leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
                          
            {/* Leader Signature */}
            <div className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 space-y-1 text-center lg:text-left">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#8B2131]">
                {name}
              </h3>
              {jobTitle && (
                <p className="text-xs sm:text-sm">
                  {jobTitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;