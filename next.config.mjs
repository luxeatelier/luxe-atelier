/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST || ".next",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: { formats: ["image/avif", "image/webp"], deviceSizes: [420, 640, 828, 1080, 1440, 1920, 2200] },
  async redirects() {
    const r = (source, destination) => ({ source, destination, permanent: true });
    return [
      r("/aboutus", "/about"),
      r("/team", "/about#team"),
      r("/team-single", "/about#team"),
      r("/service-single", "/services"),
      r("/faq", "/contact#faq"),
      r("/pricing", "/contact"),
      r("/project-details", "/projects"),
      r("/blog", "/journal"),
      r("/blog-details", "/journal"),
      r("/terms", "/legal/terms"),
      r("/privacy-policy", "/legal/privacy"),
      r("/cookies-policy", "/legal/cookies"),
      r("/legal", "/legal/terms"),
      r("/restricted-page", "/"),
      r("/error", "/"),
      r("/journal/post1", "/journal/modernizing-traditional-kerala-interiors"),
      r("/journal/post2", "/journal/maximizing-space-in-small-apartments"),
      r("/journal/post3", "/journal/interior-design-elements-for-kerala-homes"),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
