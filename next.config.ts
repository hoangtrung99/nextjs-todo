import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    dynamicIO: true
  },
  outputFileTracingIncludes: {
    '/': ['./drizzle/**/*', './migrate.js']
  },
  serverExternalPackages: ['drizzle-orm'],
  webpack: (config, { isServer, nextRuntime }) => {
    const originalEntry = config.entry

    if (nextRuntime !== 'nodejs') return config
    if (isServer) {
      config.entry = async () => {
        const entries = await originalEntry()

        return {
          ...entries,
          migrate: {
            import: './src/db/migrate.ts'
          }
        }
      }
    }

    return config
  }
}

export default nextConfig
