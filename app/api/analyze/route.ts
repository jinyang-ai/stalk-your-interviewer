import { NextRequest, NextResponse } from 'next/server';
import { scrapeLinkedInProfile } from '@/lib/apify';
import { analyzeInterviewer, LinkedInProfile } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { linkedinUrl } = await request.json();

    if (!linkedinUrl) {
      return NextResponse.json(
        { error: 'LinkedIn URL is required' },
        { status: 400 }
      );
    }

    // Scrape LinkedIn profile
    console.log('Scraping LinkedIn profile:', linkedinUrl);
    const rawProfile = await scrapeLinkedInProfile(linkedinUrl);
    
    if (!rawProfile) {
      return NextResponse.json(
        { error: 'Could not scrape LinkedIn profile. Please check the URL and try again.' },
        { status: 404 }
      );
    }

    // Transform the raw profile data to match our interface
    const profile: LinkedInProfile = {
      name: rawProfile.fullName || rawProfile.name || 'Unknown',
      headline: rawProfile.headline || '',
      location: rawProfile.location || '',
      summary: rawProfile.summary || rawProfile.about || '',
      skills: rawProfile.skills || [],
      experience: (rawProfile.experience || []).map((exp: any) => ({
        title: exp.title || '',
        company: exp.companyName || exp.company || '',
        duration: exp.duration || exp.period || '',
        description: exp.description || exp.summary || ''
      })),
      education: (rawProfile.education || []).map((edu: any) => ({
        degree: edu.degree || edu.field || '',
        school: edu.school || edu.schoolName || ''
      }))
    };

    // Analyze with Gemini
    console.log('Analyzing profile with Gemini...');
    const cheatSheet = await analyzeInterviewer(profile);

    return NextResponse.json(cheatSheet);

  } catch (error) {
    console.error('Error analyzing profile:', error);
    return NextResponse.json(
      { error: 'Failed to analyze profile. Please try again.' },
      { status: 500 }
    );
  }
}