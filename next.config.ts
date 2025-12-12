import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.sanity.io", "res.cloudinary.com", "images.unsplash.com", "ik.imagekit.io"],
  },
};

export default nextConfig;
