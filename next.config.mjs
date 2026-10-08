/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Sürüm bilgisini (X-Powered-By: Next.js) dışarı verme.
  poweredByHeader: false,
  // Tıklama tuzağı (clickjacking) ve MIME koklamaya karşı temel başlıklar.
  // Tam bir script CSP'si Next'in satır içi betikleri için nonce ister; şimdilik
  // yalnızca çerçeveleme kısıtlanıyor. Permissions-Policy BİLEREK yok: /saha
  // altındaki saha uygulaması bu alan adından sunuluyor ve konum/kamera
  // kullanabilir.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
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
