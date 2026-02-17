import { GoogleGenerativeAI } from '@google/generative-ai';
import { gemini as config } from './config';

const genAI = new GoogleGenerativeAI(config.apiKey);

export interface LinkedInProfile {
  name: string;
  headline: string;
  location: string;
  summary: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
  }>;
}

export interface CheatSheetResult {
  interviewer_name: string;
  interviewer_role: string;
  tenure_at_company: string;
  career_archetype: string;
  career_insight: string;
  current_situation: string;
  communication_style: string;
  rapport_hooks: string[];
  likely_questions: string[];
  how_to_impress_them: string;
  watch_out_for: string;
  cheat_sheet_summary: string;
}

export const analyzeInterviewer = async (profile: LinkedInProfile): Promise<CheatSheetResult> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

  const prompt = `You are an executive coach who specializes in interview preparation. You've coached 3,000+ candidates. Your secret weapon: you research the interviewer as deeply as the candidate researches the company. You look at the interviewer's career, their values, their communication style, and you give the candidate a tactical playbook.

You are given the LinkedIn profile of someone's interviewer. Build a cheat sheet that helps the candidate understand who they're talking to and how to connect with them.

## Interviewer's Profile
Name: ${profile.name}
Headline: ${profile.headline}
Location: ${profile.location}
Summary: ${profile.summary}
Skills: ${profile.skills?.join(', ') || 'Not specified'}
Experience:
${profile.experience?.map(exp => `- ${exp.title} at ${exp.company} (${exp.duration})
  ${exp.description}`).join('\n') || 'No experience data'}

Education:
${profile.education?.map(edu => `- ${edu.degree} — ${edu.school}`).join('\n') || 'No education data'}

## Your Analysis

### 1. Career Pattern
What does their trajectory tell you about what they value? Fast job changes = values growth and ambition. Long tenure = values loyalty and depth. Consulting background = values structured thinking. Startup background = values scrappiness.

### 2. Current Situation
How long have they been in their current role? If new (< 1 year), they're trying to prove themselves and build their team — frame yourself as someone who makes them look good. If established (3+ years), they're optimizing and looking for specific gaps.

### 3. Communication Style Prediction
Based on their background, what communication style are they likely to prefer? Consulting → structured, MECE frameworks. Engineering → data, specifics, no fluff. Product → user stories, trade-offs, outcomes. Sales → energy, stories, confidence.

### 4. Connection Points
What can the candidate reference to build rapport? Shared interests, similar career paths, common companies, overlapping skills.

### 5. What They'll Probably Care About
Based on their role and background, what are they likely evaluating in the interview? What questions are they likely to ask?

## Output Format
Return a JSON object:
{
  "interviewer_name": "${profile.name}",
  "interviewer_role": "<their current title at company>",
  "tenure_at_company": "<extracted from duration>",
  "career_archetype": "<one label like 'The Consultant-Turned-Operator' or 'The Lifer' or 'The Serial Startup Builder'>",
  "career_insight": "<2-3 sentences on what their trajectory reveals about their values and decision-making style.>",
  "current_situation": "<2 sentences. What their current tenure and role suggest about their priorities right now.>",
  "communication_style": "<2 sentences. How they likely prefer to communicate and receive information. Be actionable: 'Use frameworks' or 'Lead with data' or 'Tell stories, not specs.'>",
  "rapport_hooks": [
    "<specific thing to mention to build connection — a shared background, a company they worked at, a skill overlap>",
    "<another connection point>"
  ],
  "likely_questions": [
    "<specific question they're likely to ask, based on their background and role>",
    "<another likely question>",
    "<another likely question>"
  ],
  "how_to_impress_them": "<2-3 sentences. The single most effective approach with THIS specific interviewer. Not generic advice — specific to their archetype and values.>",
  "watch_out_for": "<1-2 sentences. What could turn this interviewer off, based on their profile. A behavior or answer style to avoid.>",
  "cheat_sheet_summary": "<3-4 sentences. The executive summary — if the candidate reads nothing else, this tells them how to approach the interview with this person. Address the candidate as 'you'. Be specific and tactical.>"
}

## Rules
- The career_archetype should be catchy and memorable — something the candidate will remember walking into the interview.
- EVERY insight must be grounded in the interviewer's actual profile data. Don't invent connection points that don't exist.
- The likely_questions should be specific to this interviewer's background, not generic interview questions. If they're from consulting, they'll ask case-style questions. If they're engineering, they'll ask system design questions.
- The tone is: your friend who used to work at this company and is telling you exactly how to handle this person. Warm, tactical, specific.

Return only the JSON object, no other text.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  if (!text) {
    throw new Error('No response from Gemini');
  }

  // Clean up the response to extract just the JSON
  const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
  
  return JSON.parse(cleanedText) as CheatSheetResult;
};