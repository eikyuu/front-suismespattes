/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['au-fil-des-pattes.up.railway.app', 'localhost', 'flowbite.com', 'randomuser.me'],
      },
      async headers() {
        return [
          {
            source: '/api/:path*',
            headers: [
              { key: 'Access-Control-Allow-Credentials', value: 'true' },
              { key: 'Access-Control-Allow-Origin', value: process.env.ALLOW_ORIGIN },
              {
                key: 'Access-Control-Allow-Methods',
                value: 'GET, OPTIONS, PATCH, DELETE, POST, PUT',
              },
              {
                key: 'Access-Control-Allow-Headers',
                value:
                  'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization',
              },
            ],
          },
        ];
      },
}

module.exports = nextConfig
