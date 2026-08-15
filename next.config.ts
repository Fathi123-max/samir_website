import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/samir_website",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
