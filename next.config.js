/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-GB', 'en-US', 'en-ZA', 'es'],
    defaultLocale: 'en-GB',
  },
  images: {
    domains: ['aetherzenith.tech'],
  },
};

module.exports = nextConfig; 