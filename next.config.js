/** @type {import('next').NextConfig} */
const nextConfig = {}
const withTM = require('next-transpile-modules')(['bcrypt']);

module.exports = withTM({
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // ... other configurations
});
module.exports = nextConfig
