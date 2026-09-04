import type { NextConfig } from "next";

// When running via `tinacms dev`, Tina's wrapper server needs SSR.
// Only enable static export for production builds (GitHub Pages).
const isTinaDev = process.env.TINA_DEV === "true";

const nextConfig: NextConfig = {
  ...(isTinaDev ? {} : { output: "export" }),
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};

export default nextConfig;
