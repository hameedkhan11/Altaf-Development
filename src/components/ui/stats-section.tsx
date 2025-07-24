// components/ui/StatsSection.tsx

"use client";

import { motion } from "framer-motion";
import {
  viewportDefault,
  createLazyAnimation,
  staggerContainer,
} from "@/lib/constants";
import CounterStat from "./counter-stat";

const StatsSection = () => {
  const lazyStatsContainer = createLazyAnimation(staggerContainer);

  const statsData = [
    { label: "Properties Sold", value: "500+" },
    { label: "Happy Clients", value: "1000+" },
    { label: "Years Experience", value: "15+" },
  ];

  return (
    <motion.div
      className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full"
      {...lazyStatsContainer}
      viewport={viewportDefault}
    >
      {statsData.map((stat, index) => (
        <CounterStat
          key={stat.label}
          value={stat.value}
          label={stat.label}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default StatsSection;