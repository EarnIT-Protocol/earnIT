import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: new URL('.', import.meta.url).pathname,
    rules: {
      "*.mdx": {
        loaders: ["@mdx-js/loader"],
        as: "*.tsx",
      },
      // Prevent fumadocs meta.js loader from catching all JSON
      "*.json": {
        loaders: [],
        as: "*.json",
      },
    },
  },
  serverExternalPackages: ['@coinbase/cdp-sdk', 'axios', 'form-data', 'mime-db'],
};

export default withMDX(nextConfig);