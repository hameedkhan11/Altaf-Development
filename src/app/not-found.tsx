"use client";

import { motion, Variants } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number with Animation */}
        <motion.div
          className="relative mb-8"
          variants={itemVariants as Variants}
        >
          <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[rgb(140,46,71)] via-[rgb(140,46,71)]/80 to-[rgb(140,46,71)]/60 leading-none">
            404
          </h1>
          
          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 bg-[rgb(140,46,71)]/20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-6 -left-6 w-6 h-6 bg-[rgb(140,46,71)]/30 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </motion.div>

        {/* Main Content */}
        <motion.div className="space-y-6" variants={itemVariants as Variants}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl">
            Oops! Page Not Found
          </h2>
          
          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
            The page you're looking for seems to have moved or doesn't exist. 
            Don't worry, even the best properties sometimes change their address!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants as Variants}
        >
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 bg-[rgb(140,46,71)] hover:bg-[rgb(140,46,71)]/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Home className="w-5 h-5" />
              Back to Home
            </motion.button>
          </Link>

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-gray-300 w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          <Link href="/property-detail">
            <motion.button
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[rgb(140,46,71)] px-6 py-3 rounded-lg font-medium transition-all duration-300 border-2 border-[rgb(140,46,71)] w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Search className="w-5 h-5" />
              Browse Properties
            </motion.button>
          </Link>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          className="text-sm text-gray-500 mt-8"
          variants={itemVariants as Variants}
        >
          Need help? Contact us at{" "}
          <Link
            href="info@altafdevelopment.com"
            className="text-[rgb(140,46,71)] hover:underline font-medium"
          >
            info@altafdevelopment.com
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;