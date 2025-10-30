import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://aureapi.gabrielsanztech.com.br/api/:path*',
      },
    ];
  },
};

export default nextConfig;
