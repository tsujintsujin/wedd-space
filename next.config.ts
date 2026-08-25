import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cambial-wedding.vercel.app" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'self' 'unsafe-inline'${
              process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : ""
            }; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://res.cloudinary.com https://*.tile.openstreetmap.org; font-src 'self' data:; connect-src 'self' https://api.cloudinary.com https://res.cloudinary.com${
              process.env.NEXT_PUBLIC_SUPABASE_URL ? ` ${process.env.NEXT_PUBLIC_SUPABASE_URL}` : ""
            }; frame-ancestors 'none';`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
