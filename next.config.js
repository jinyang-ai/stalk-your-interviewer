/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APIFY_API_KEY: process.env.APIFY_API_KEY,
    APIFY_LINKEDIN_ACTOR_ID: process.env.APIFY_LINKEDIN_ACTOR_ID,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  }
}

module.exports = nextConfig