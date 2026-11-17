
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/Adventni_kalendar_2026",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;
