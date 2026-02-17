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
    const basicInfo = rawProfile?.basic_info || {};
    const profile: LinkedInProfile = {
      name: String(basicInfo?.fullname || basicInfo?.first_name || rawProfile?.fullName || rawProfile?.name || 'Unknown'),
      headline: String(basicInfo?.headline || rawProfile?.headline || ''),
      location: String(basicInfo?.location?.full || basicInfo?.location || rawProfile?.location || ''),
      summary: String(basicInfo?.about || rawProfile?.summary || rawProfile?.about || ''),
      skills: Array.isArray(basicInfo?.top_skills) ? basicInfo.top_skills.map(String) : Array.isArray(rawProfile?.skills) ? rawProfile.skills.map(String) : [],
      experience: Array.isArray(rawProfile?.experience) ? rawProfile.experience.map((exp: any) => ({
        title: String(exp?.title || ''),
        company: String(exp?.company || exp?.companyName || ''),
        duration: String(exp?.duration || exp?.period || ''),
        description: String(exp?.description || exp?.summary || '')
      })) : [],
      education: Array.isArray(rawProfile?.education) ? rawProfile.education.map((edu: any) => ({
        degree: String(edu?.degree_name && edu?.field_of_study ? `${edu.degree_name}, ${edu.field_of_study}` : edu?.degree || edu?.field || ''),
        school: String(edu?.school || edu?.schoolName || '')
      })) : []
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