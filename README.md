# Stalk Your Interviewer

**Know your interviewer before they know you**

A Next.js application that analyzes LinkedIn profiles to generate interview cheat sheets, helping candidates understand their interviewer's communication style, career patterns, and likely questions.

## Features

- 🔍 **LinkedIn Profile Analysis**: Scrapes public LinkedIn profiles using Apify
- 🧠 **AI-Powered Insights**: Uses Google Gemini to analyze career patterns and communication styles
- 📊 **Comprehensive Cheat Sheets**: Generates tactical interview preparation guides
- 🎨 **Modern UI**: Beautiful teal/cyan themed interface built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini Pro
- **Scraping**: Apify LinkedIn Actor
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/jinyang-ai/stalk-your-interviewer.git
   cd stalk-your-interviewer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your API keys:
   - `APIFY_API_KEY`: Your Apify API key
   - `APIFY_LINKEDIN_ACTOR_ID`: LinkedIn profile scraper actor ID
   - `GEMINI_API_KEY`: Google Gemini API key

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. **Input**: User pastes a LinkedIn profile URL
2. **Scraping**: Apify scrapes the public profile data
3. **Analysis**: Gemini analyzes the profile to understand:
   - Career patterns and values
   - Communication style preferences
   - Current situation and priorities
   - Likely interview questions
4. **Output**: Generated cheat sheet with actionable insights

## Deployment

This app is optimized for Vercel deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jinyang-ai/stalk-your-interviewer)

## Environment Variables

Required environment variables for production:

- `APIFY_API_KEY`
- `APIFY_LINKEDIN_ACTOR_ID` 
- `GEMINI_API_KEY`

## License

MIT License - see LICENSE file for details.