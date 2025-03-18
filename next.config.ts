import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Add this line to ignore ESLint during builds
  },
  // Configuration for optimizing images using the `next/image` component.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tzmgifvkinckfqxexyxk.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
