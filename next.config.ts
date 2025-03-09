import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Add this line to ignore ESLint during builds
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);