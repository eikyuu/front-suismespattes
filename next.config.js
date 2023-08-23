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
            protocol: 'https',
            hostname: 'aufildespattes-api-preprod.up.railway.app',
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
          },
          {
            protocol: 'https',
            hostname: 'images.dog.ceo',
            pathname: '/breeds/**',
          }
      ],
      domains: ['aufildespattes-api.up.railway.app', 'aufildespattes-api-preprod.up.railway.app' , 'localhost', 'randomuser.me'],
  },
};

module.exports = nextConfig;
