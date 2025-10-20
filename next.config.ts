import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image configuration for external hosts
  images: {
    domains: ['res.cloudinary.com'],
  },

  // Headers for better security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
