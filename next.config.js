/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "suismespattes-api.up.railway.app",
        pathname: "/destinations/images/**",
      },
      {
        protocol: "https",
        hostname: "suismespattes-api-preprod.up.railway.app",
        pathname: "/destinations/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost:9000",
        pathname: "/destinations/images/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
      {
        protocol: "https",
        hostname: "images.dog.ceo",
        pathname: "/breeds/**",
      },
      {
        protocol: "https",
        hostname: "farm4.staticflickr.com",
        pathname: "/**",
      },
    ],
    domains: [
      "suismespattes-api.up.railway.app",
      "suismespattes-api-preprod.up.railway.app",
      "localhost",
      "randomuser.me",
      "farm4.staticflickr.com",
    ],
  },
}

module.exports = nextConfig
