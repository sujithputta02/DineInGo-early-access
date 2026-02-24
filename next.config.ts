import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Vercel serverless optimization
  output: 'standalone',
  
  // Image optimization for Vercel
  images: {
    domains: [],
    unoptimized: false,
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  
  // Disable x-powered-by header
  poweredByHeader: false,
  
  // Compression
  compress: true,
};

export default nextConfig;
