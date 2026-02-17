'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkedinUrl.trim()) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ linkedinUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the result in session storage and redirect
        sessionStorage.setItem('cheatSheet', JSON.stringify(data));
        router.push('/result');
      } else {
        throw new Error('Failed to analyze profile');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              know your interviewer before{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                they know you
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              paste their LinkedIn — get a cheat sheet for your interview
            </p>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/interviewer-profile"
                  className="w-full px-6 py-4 text-lg border-2 border-teal-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors duration-200"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !linkedinUrl.trim()}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl text-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Building Your Cheat Sheet...</span>
                  </>
                ) : (
                  <span>Build My Cheat Sheet — Free</span>
                )}
              </button>
            </form>
          </div>

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-teal-100">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Pattern Analysis</h3>
              <p className="text-gray-600">Understand what their career path reveals about their values and decision-making style.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-teal-100">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Communication Style</h3>
              <p className="text-gray-600">Learn how they prefer to communicate and the best way to present your answers.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-teal-100">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Likely Questions</h3>
              <p className="text-gray-600">Get predictions about the specific questions they'll ask based on their background.</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
              This tool analyzes public LinkedIn profiles to help you prepare for interviews.
              <br />
              No personal data is stored or shared.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}