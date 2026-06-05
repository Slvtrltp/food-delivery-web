import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nt06bcq7dcaegur9.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
