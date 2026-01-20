import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://*.youtube.com https://*.ytimg.com https://www.gstatic.com https://accounts.google.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.youtube.com https://*.youtube.com https://*.ytimg.com https://*.ably.io wss://*.ably.io https://*.ably-realtime.com wss://*.ably-realtime.com https://*.ably.net wss://*.ably.net https://accounts.google.com",
              "frame-src 'self' https://www.youtube.com https://*.youtube.com https://accounts.google.com",
              "media-src 'self' https://*.youtube.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
