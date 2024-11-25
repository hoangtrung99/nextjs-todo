import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    dynamicIO: true
  },
  outputFileTracingIncludes: {
    '/': ['./drizzle/**/*']
  }
}

export default nextConfig
