/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Permite cargar imágenes desde el CDN de Sanity
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    // Para imágenes locales en /public mantenemos unoptimized: false
    unoptimized: false,
  },
}

module.exports = nextConfig
