import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/**",
      },
      {
        protocol: "https",
        hostname: "www.zbanco.com.py",
        port: "",
        pathname: "/static/media/**",
      },
    ],
  },
};

export default nextConfig;
