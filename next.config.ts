import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["github.com"],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Abaikan error ESLint saat build
  },
  /* config options here */
};

export default nextConfig;
