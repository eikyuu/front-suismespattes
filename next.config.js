/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
            protocol: 'https',
            hostname: 'aufildespattes-api.up.railway.app',
            pathname: '/walks/images/**',
          },
          {
            protocol: 'http',
            hostname: 'localhost:9000',
            pathname: '/walks/images/**',
          },
          {
            protocol: 'https',
            hostname: 'randomuser.me',
            pathname: '/api/portraits/**',
          }
      ],
      domains: ['aufildespattes-api.up.railway.app', 'localhost', 'randomuser.me'],
  },
};

module.exports = nextConfig;
