/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@web-solutions/module-localization'] = path.resolve(__dirname, 'src/lib/localization.ts');
    config.resolve.alias['@web-solutions/module-analytics'] = path.resolve(__dirname, 'src/lib/analytics.ts');
    return config;
  },
};

module.exports = nextConfig;
