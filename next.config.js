/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    CARNE_API_URL: process.env.NODE_ENV == "production" ? "https://my-app-qht4e.ondigitalocean.app/" : "http://localhost:3000",
  }
}

module.exports = nextConfig
