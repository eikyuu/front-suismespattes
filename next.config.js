/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'au-fil-des-pattes.up.railway.app',
      'localhost',
      'flowbite.com',
      'randomuser.me',
    ],
  },
  // next.config.js
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://au-fil-des-pattes.up.railway.app/:path*',
      },
    ];
  }
};

module.exports = nextConfig;
