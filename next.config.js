/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: false,
  env: {
    CARNE_API_URL: process.env.NODE_ENV == "production" ? "https://my-app-qht4e.ondigitalocean.app/" : "http://localhost:3000",
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
