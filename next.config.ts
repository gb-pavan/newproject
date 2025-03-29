import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true, // 301 redirect (SEO friendly)
      },
    ];
  },
};

export default nextConfig;
