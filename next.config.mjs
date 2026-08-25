/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/saha/:path*',
          destination: 'https://motofull-zeta.vercel.app/saha/:path*',
        },
      ],
    };
  },
};

export default nextConfig;
