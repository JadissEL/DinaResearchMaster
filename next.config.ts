import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.vercel-storage.com" },
      { protocol: "https", hostname: "images.ctfassets.net" },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-dialog",
    ],
  },
  poweredByHeader: false,
};

export default nextConfig;
