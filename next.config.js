/** @type {import('next').NextConfig} */
const nextConfig = {
  // Panorama textures are loaded directly by Three.js (not by next/image).
  // Cache them between visits; keep a one-day lifetime so updates propagate.
  async headers() {
    return [{
      source: '/virtual-tour/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
    }];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
