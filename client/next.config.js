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
      {
        source: '/logowanie',
        destination: '/signin',
      },
      {
        source: '/polityka-prywatnosci',
        destination: '/privacy-policy',
      },
      {
        source: '/regulamin',
        destination: '/terms-of-service',
      },
      {
        source: '/obowiazek-informacyjny-rodo',
        destination: '/obligatory-information-rodo',
      },
    ]
  },
  images: {
    domains: ["api.naszechoinki.pl"],
  },
};


