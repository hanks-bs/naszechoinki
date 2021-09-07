module.exports = {
  reactStrictMode: true,
  pageExtensions: ["mdx", "jsx", "js", "ts", "tsx"],
  i18n: {
    locales: ["pl", "en"],
    defaultLocale: "pl",
  },
  async rewrites() {
    return [
      {
        source: '/sadzonki',
        destination: '/seedlings',
      },
      {
        source: '/cennik',
        destination: '/pricelist',
      },
      {
        source: '/szkolka',
        destination: '/plant-nursery',
      },
      {
        source: '/kontakt',
        destination: '/contact',
      },
      {
        source: '/galeria',
        destination: '/gallery',
      },
    ]
  },
};
