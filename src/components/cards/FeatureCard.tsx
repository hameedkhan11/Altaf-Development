import { motion } from 'framer-motion';
import { BiSolidTone } from "react-icons/bi";

type FeatureCardProps = {
  title: string;
  description: string | undefined;
  index: number;
  primary?: string;
  secondary?: string;
  variant?: string;
}

const FeatureCard = ({ 
  title, 
  description, 
  index, 
  primary, 
  secondary, 
  variant = 'feature' 
}: FeatureCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ 
        y: -15,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="relative overflow-hidden rounded-3xl group text-black "
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* <div className="absolute -top-1/2 -right-1/2 h-[200%] w-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] animate-pulse"></div> */}
      </div>
      
      {/* Card Content */}
      <div className="relative z-10 p-8 h-80 sm:h-88 flex flex-col">
        {/* Header Glow Effect */}
        {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> */}
        
        {/* Title Section */}
        <div className="flex">
          <BiSolidTone className="w-8 h-8 text-[rgb(140,46,71)] duration-300" />
          <h3 
            id={`feature-${index}-title`}
            className="text-2xlleading-tight ml-2"
          >
            {title}
          </h3>
        </div>
        
        {/* Content Area */}
        <div className="flex-grow">
          {variant === 'contact' ? (
            <div className="space-y-4">
              {primary && (
                <p className="text-xl font-semibold text-white tracking-wide">
                  {primary}
                </p>
              )}
              {secondary && (
                <p className="text-lg font-light tracking-wide">
                  {secondary}
                </p>
              )}
              {description && (
                <p className="text-base leading-relaxed font-light mt-4">
                  {description}
                </p>
              )}
            </div>
          ) : (
            <p className="text-base leading-relaxed font-light">
              {description}
            </p>
          )}
        </div>
        
        {/* Bottom Accent */}
        {/* <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="w-12 h-0.5 bg-gradient-to-r from-white/40 to-transparent rounded-full"></div>
            <div className="w-3 h-3 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors duration-300"></div>
          </div>
        </div> */}
      </div>
      
      {/* Hover Effects */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/3 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 delay-100"></div>
    </motion.article>
  );
};

export default FeatureCard;