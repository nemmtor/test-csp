/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // Apply the header to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "connect-src 'self' blob: http://localhost:3000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
