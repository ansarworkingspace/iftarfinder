'use client'

import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Animation */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-[#2d5a27]/10 rounded-full flex items-center justify-center animate-scale-up">
            <svg className="w-12 h-12 text-[#2d5a27] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-white mb-4">Jazākallāhu Khayran</h1>
        
        {/* Quote */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <p className="text-[#2d5a27] text-lg mb-4 leading-relaxed">
            "Whoever feeds a fasting person will have a reward like that of the fasting person, without any reduction in his reward."
          </p>
          <p className="text-[#2d5a27]/70 text-sm">
            - Prophet Muhammad ﷺ
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="bg-white/95 text-[#2d5a27] hover:bg-white text-sm px-6 py-3 rounded-full font-medium transition-colors inline-flex items-center gap-2 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  );
}