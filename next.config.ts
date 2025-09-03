import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hostaway-platform.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/listing/**",
      },
      {
        protocol: "https",
        hostname: "theflex.global",
        port: "",
        pathname: "/_next/image/**",
      },
    ],
  },
};

export default nextConfig;
