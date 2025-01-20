import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Add other config options here if needed */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Correct domain for Cloudinary
        port: "",
        pathname: "/**", // Allow all paths under this hostname
      },
      {
        protocol: "https",
        hostname: "img.freepik.com", // Existing domain
        port: "",
        pathname: "/**", // Allow all paths under this hostname
      },
    ],
  },
};

export default nextConfig;
