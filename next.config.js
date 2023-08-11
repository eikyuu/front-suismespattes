/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'au-fil-des-pattes.up.railway.app',
      'au-fil-des-pattes-release.up.railway.app',
      'au-fil-des-pattes-preprod.up.railway.app',
      'localhost',
      'flowbite.com',
      'randomuser.me',
      'aufildespattes-api.up.railway.app',
      'aufildespattes-api-preprod.up.railway.app',
    ],
  },
  // next.config.js
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://aufildespattes-api.up.railway.app/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'https://aufildespattes-api-preprod.up.railway.app/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      }
    ];
  }
};

module.exports = nextConfig;
