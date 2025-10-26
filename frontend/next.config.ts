/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use Turbopack configuration instead of webpack
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
    resolveAlias: {
      // Add any aliases you need
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
  // Turbopack equivalent of transpilePackages
  experimental: {
    // Enable if you want file system caching (experimental)
    turbopackFileSystemCacheForDev: true,
  },
}

module.exports = nextConfig
