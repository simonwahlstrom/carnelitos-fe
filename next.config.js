/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: false,
  env: {
    CARNE_API_URL: process.env.NODE_ENV == "production" ? "https://api.carnelitos.com" : "http://local-be.carnelitos.com:3000",
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});
