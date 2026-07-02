import React, { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface EndingCinematicProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function EndingCinematic({ isActive, onComplete }: EndingCinematicProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(-1);
  const [showGoldBurst, setShowGoldBurst] = useState(false);

  const steps = [
    "Thank You",
    "Dreams Come True",
    "Made with Gratitude ❤️"
  ];

  useEffect(() => {
    if (!isActive) {
      setCurrentTextIndex(-1);
      setShowGoldBurst(false);
      return;
    }

    // Progression of texts
    // Text 0 ("Thank You") fades in
    const t0 = setTimeout(() => {
      setCurrentTextIndex(0);
      setShowGoldBurst(true);
    }, 500);

    // Text 1 ("Dreams Come True") fades in
    const t1 = setTimeout(() => {
      setCurrentTextIndex(1);
    }, 3200);

    // Text 2 ("Made with Gratitude ❤️") fades in
    const t2 = setTimeout(() => {
      setCurrentTextIndex(2);
    }, 6000);

    // Conclude animation & restore to normal
    const t3 = setTimeout(() => {
      setCurrentTextIndex(3); // Fade out last message
    }, 9000);

    const t4 = setTimeout(() => {
      onComplete(); // callback to remove overlay
    }, 10500);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl transition-all duration-[1500ms] overflow-hidden select-none">
      
      {/* 1. Large Ambient Glowing Aura in the Center */}
      <div
        className={`absolute rounded-full bg-gradient-to-tr from-[#FFB7C5]/20 via-[#E8C5C8]/20 to-[#D4A373]/20 blur-3xl transition-all duration-[3000ms] ease-out ${
          showGoldBurst ? 'w-[450px] h-[450px] opacity-100 scale-100' : 'w-10 h-10 opacity-0 scale-50'
        }`}
      />

      {/* 2. Floating Golden Sparks inside the ending screen */}
      {showGoldBurst && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#D4A373] shadow-[0_0_8px_#D4A373] animate-ping"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${15 + Math.random() * 70}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* 3. Glowing core circular frame */}
      <div
        className={`relative w-80 h-80 rounded-full border border-[#D4A373]/20 flex flex-col items-center justify-center transition-all duration-[3000ms] ease-out bg-white/5 backdrop-blur-sm shadow-[0_0_60px_rgba(212,163,115,0.1)] ${
          showGoldBurst ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        {/* Spinning decorative orbit rings */}
        <div className="absolute inset-1 rounded-full border border-dashed border-[#FFB7C5]/30 animate-[spin_40s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-solid border-[#D4A373]/10 animate-[spin_25s_linear_infinite_reverse]" />

        {/* Text Container with elegant cross-fades */}
        <div className="relative w-full h-32 flex items-center justify-center text-center px-4">
          
          {/* Step 1: Thank You */}
          <div
            className={`absolute transition-all duration-[1200ms] flex flex-col items-center ${
              currentTextIndex === 0
                ? 'opacity-100 scale-100 translate-y-0 blur-none'
                : 'opacity-0 scale-90 translate-y-4 blur-sm pointer-events-none'
            }`}
          >
            <span className="text-[#D4A373] text-[10px] tracking-[0.3em] font-mono uppercase mb-3 block animate-pulse">
              Endless Tribute
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#FFF0F2] tracking-wide font-sans leading-none">
              Thank You
            </h2>
            <div className="w-10 h-[1px] bg-[#D4A373]/40 mt-5" />
          </div>

          {/* Step 2: Dreams Come True */}
          <div
            className={`absolute transition-all duration-[1200ms] flex flex-col items-center ${
              currentTextIndex === 1
                ? 'opacity-100 scale-100 translate-y-0 blur-none'
                : 'opacity-0 scale-90 translate-y-4 blur-sm pointer-events-none'
            }`}
          >
            <Sparkles className="w-5 h-5 text-[#FFB7C5] mb-3 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-serif italic text-[#E8C5C8] tracking-widest font-sans leading-tight">
              Dreams Come True
            </h2>
            <p className="text-[10px] text-[#D4A373] font-mono tracking-widest uppercase mt-3">
              PTE Achievement Verified
            </p>
          </div>

          {/* Step 3: Made with Gratitude ❤️ */}
          <div
            className={`absolute transition-all duration-[1200ms] flex flex-col items-center ${
              currentTextIndex === 2
                ? 'opacity-100 scale-100 translate-y-0 blur-none'
                : 'opacity-0 scale-90 translate-y-4 blur-sm pointer-events-none'
            }`}
          >
            <Heart className="w-6 h-6 text-red-400 fill-red-400 mb-3 animate-[ping_1.5s_infinite_alternate]" />
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#FFF0F2] tracking-wider font-sans leading-tight">
              Made with Gratitude
            </h2>
            <p className="text-xs text-[#D4A373] font-mono tracking-[0.2em] mt-3">
              BY ABDULLAH SIAL
            </p>
          </div>
          
        </div>
      </div>

    </div>
  );
}
