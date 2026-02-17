'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheatSheetResult } from '@/lib/gemini';

export default function ResultPage() {
  const [cheatSheet, setCheatSheet] = useState<CheatSheetResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = sessionStorage.getItem('cheatSheet');
    if (data) {
      setCheatSheet(JSON.parse(data));
    } else {
      router.push('/');
    }
  }, [router]);

  if (!cheatSheet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cheat sheet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={() => router.push('/')}
              className="text-teal-600 hover:text-teal-800 mb-4 inline-flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Home</span>
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Your Interview Cheat Sheet
            </h1>
            <p className="text-gray-600">Here's everything you need to know about your interviewer</p>
          </div>

          {/* Above the fold */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{cheatSheet.interviewer_name}</h2>
              <p className="text-xl text-gray-600 mb-4">{cheatSheet.interviewer_role}</p>
              <div className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-full font-semibold">
                {cheatSheet.career_archetype}
              </div>
            </div>
          </div>

          {/* Career Insight */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Pattern</h3>
            <p className="text-gray-700 text-lg leading-relaxed">{cheatSheet.career_insight}</p>
          </div>

          {/* Communication Style - Highlighted */}
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">How to Talk to Them</h3>
            <p className="text-lg leading-relaxed">{cheatSheet.communication_style}</p>
          </div>

          {/* Current Situation */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Their Current Situation</h3>
            <p className="text-gray-700 text-lg leading-relaxed">{cheatSheet.current_situation}</p>
          </div>

          {/* Rapport Hooks */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Conversation Starters</h3>
            <div className="space-y-3">
              {cheatSheet.rapport_hooks.map((hook, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700 text-lg">{hook}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Likely Questions */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions They'll Probably Ask</h3>
            <div className="space-y-4">
              {cheatSheet.likely_questions.map((question, index) => (
                <div key={index} className="border-l-4 border-teal-500 pl-4">
                  <p className="text-gray-700 text-lg font-medium">{question}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to Impress */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-green-800 mb-4">How to Impress Them</h3>
            <p className="text-green-700 text-lg leading-relaxed">{cheatSheet.how_to_impress_them}</p>
          </div>

          {/* Watch Out For */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-red-800 mb-4">Watch Out For</h3>
            <p className="text-red-700 text-lg leading-relaxed">{cheatSheet.watch_out_for}</p>
          </div>

          {/* Executive Summary */}
          <div className="bg-gray-900 text-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">Executive Summary</h3>
            <p className="text-lg leading-relaxed">{cheatSheet.cheat_sheet_summary}</p>
          </div>

          {/* TAL CTA */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Want More Interview Prep?</h3>
            <p className="text-gray-600 mb-6 text-lg">
              This is one interviewer. TAL preps you for every round — company research, role-specific questions, and negotiation coaching.
            </p>
            <a
              href="https://tal.af"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl text-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-200"
            >
              Get Full Interview Prep on TAL
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}