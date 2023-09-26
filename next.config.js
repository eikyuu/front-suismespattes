/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
            protocol: 'https',
            hostname: 'suismespattes-api.up.railway.app',
            pathname: '/destination/images/**',
          },
          {
            protocol: 'https',
            hostname: 'suismespattes-api-preprod.up.railway.app',
            pathname: '/destination/images/**',
          },
          {
            protocol: 'http',
            hostname: 'localhost:9000',
            pathname: '/destination/images/**',
          },
          {
            protocol: 'https',
            hostname: 'randomuser.me',
            pathname: '/api/portraits/**',
          },
          {
            protocol: 'https',
            hostname: 'images.dog.ceo',
            pathname: '/breeds/**',
          }
      ],
      domains: ['suismespattes-api.up.railway.app', 'suismespattes-api-preprod.up.railway.app' , 'localhost', 'randomuser.me'],
  },
};

module.exports = nextConfig;
