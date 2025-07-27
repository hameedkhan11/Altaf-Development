import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  index: number;
  Icon?: LucideIcon;
}

const FeatureCard = ({ title, description, index, Icon }: FeatureCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -15,
        scale: 1.03,
        transition: { duration: 0.4, ease: "easeOut" },
      }}
      className="relative group overflow-hidden rounded-3xl border border-black/10 shadow-md after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.04),transparent_40%)] h-72"
    >
      {/* Card Content */}
      <div className="relative z-10 p-8  flex flex-col">
        {/* Icon Header */}
        <div>
          <div className="inline-flex items-center">
            {Icon && (
              <div className="w-20 h-20 bg-[rgb(140,46,71)] rounded-full flex items-center justify-center pt-4">
                <Icon className="w-6 h-6 text-[rgb(140,46,71)]" />
              </div>
            )}
            <div className="w-4 h-4 bg-[rgb(140,46,71)] rounded-full"></div>
          </div>
          <p
            id={`feature-${index}-title`}
            className="text-base sm:text-xl font-semibold text-[rgb(140,46,71)] leading-tight tracking-tight pb-2"
          >
            {title}
          </p>
        </div>
        
        {/* Content Area */}
        <div className="flex-grow">
          <p className=" text-xs sm:text-sm leading-relaxed text-black font-light">
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

export default FeatureCard;