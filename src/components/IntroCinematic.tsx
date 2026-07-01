import React, { useEffect, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface IntroCinematicProps {
  onEnter: () => void;
}

export default function IntroCinematic({ onEnter }: IntroCinematicProps) {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Curating gratitude data...');
  const [phase, setPhase] = useState<'loading' | 'ready' | 'fadeout'>('loading');

  // Poetic loading stages mapped to percentage milestones
  useEffect(() => {
    if (progress < 25) {
      setLoadingStage('Weaving rose-gold velvet tapestries...');
    } else if (progress < 50) {
      setLoadingStage('Illuminating dark ambient star fields...');
    } else if (progress < 75) {
      setLoadingStage('Fusing interactive blossom particles...');
    } else if (progress < 100) {
      setLoadingStage('Engraving custom wax seals...');
    } else {
      setLoadingStage('Tribute is fully prepared.');
      setPhase('ready');
    }
  }, [progress]);

  // Handle randomized premium progress counter
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Create natural slowing down at 80%+ to build emotional anticipation
      const increment = currentProgress > 80 
        ? Math.random() * 2 + 0.5 
        : Math.random() * 8 + 3;
      
      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(Math.floor(currentProgress));

      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const handleEnterClick = () => {
    setPhase('fadeout');
    // Allow fadeout transition to run for 2000ms before removing the overlay entirely
    setTimeout(() => {
      onEnter();
    }, 2000);
  };

  if (phase === 'fadeout') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent pointer-events-none transition-all duration-[2000ms] overflow-hidden">
        {/* The solid black background fades to transparent */}
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-[2000ms]" />

        {/* The blooming flower scale up and soft fade */}
        <div className="relative w-48 h-48 scale-[10.0] opacity-0 transition-all duration-[2000ms] ease-out flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full bg-[#FFB7C5]/30 blur-3xl" />
          <div className="absolute w-12 h-12 rounded-full bg-[#D4A373]/20 blur-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070505] overflow-hidden select-none">
      
      {/* 1. Deluxe Loading Circular Ring or Rotating Orbit */}
      <div 
        className={`flex flex-col items-center justify-center transition-all duration-[1000ms] ease-in-out ${
          phase === 'ready' 
            ? 'opacity-0 scale-75 pointer-events-none absolute' 
            : 'opacity-100 scale-100 relative mb-10'
        }`}
      >
        <div className="relative w-64 h-64 flex flex-col items-center justify-center">
          {/* Rotating background flower shapes */}
          <div className="absolute inset-0 flex items-center justify-center animate-[spin_40s_linear_infinite]">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-28 h-28 border border-white/5 bg-gradient-to-tr from-[#FFB7C5]/5 to-transparent transition-all duration-[2000ms]"
                style={{
                  transform: `rotate(${i * 60}deg) translate(24px, 24px)`,
                  borderRadius: '35% 65% 65% 35% / 35% 35% 65% 65%',
                }}
              />
            ))}
          </div>

          {/* Dynamic circular SVG progress loader (Ultra refined thin design) */}
          <svg className="absolute w-52 h-52 -rotate-90">
            {/* Track */}
            <circle
              cx="104"
              cy="104"
              r="96"
              className="stroke-white/5 fill-none"
              strokeWidth="1.5"
            />
            {/* Progress fill */}
            <circle
              cx="104"
              cy="104"
              r="96"
              className="stroke-[#B76E79] fill-none transition-all duration-150 ease-out"
              strokeWidth="1.8"
              strokeDasharray={2 * Math.PI * 96}
              strokeDashoffset={2 * Math.PI * 96 * (1 - progress / 100)}
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(183, 110, 121, 0.4))'
              }}
            />
          </svg>

          {/* Central Counter Display */}
          <div className="relative flex flex-col items-center justify-center">
            <span className="text-4xl font-light font-mono text-white/90 tracking-widest">
              {progress.toString().padStart(3, '0')}%
            </span>
            <span className="text-[9px] font-sans font-semibold tracking-[0.3em] text-[#D4A373] uppercase mt-2 animate-pulse">
              Loading
            </span>
          </div>
        </div>
      </div>

      {/* 2. State & Dynamic Log Message with fade transitions */}
      <div 
        className={`h-6 max-w-sm px-4 text-center transition-all duration-[1000ms] ease-in-out ${
          phase === 'ready' 
            ? 'opacity-0 scale-75 pointer-events-none absolute' 
            : 'opacity-100 scale-100 relative mb-12'
        }`}
      >
        <p className="text-xs font-serif italic text-white/40 tracking-widest">
          {loadingStage}
        </p>
      </div>

      {/* 3. Premium Interactive Prompt Button Box (Revealed only when ready) */}
      <div
        className={`max-w-sm w-full px-6 text-center flex flex-col items-center transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${
          phase === 'ready' 
            ? 'opacity-100 translate-y-0 scale-100 relative z-10' 
            : 'opacity-0 translate-y-12 scale-95 pointer-events-none absolute -z-10'
        }`}
      >
        <div className="flex items-center space-x-1 mb-4 text-[#D4A373] text-[10px] font-sans tracking-[0.35em] uppercase font-bold">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>A Cinematic Tribute</span>
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        </div>

        <h1 className="text-3xl font-serif font-medium tracking-wide text-[#FFF0F2] mb-1">
          A Gift of Gratitude
        </h1>
        <p className="text-xs font-serif italic text-white/40 mb-10 tracking-widest">
          For an Exceptional Educator
        </p>

        {/* Luxury gold and rose-rimmed button */}
        <div className="w-full flex flex-col space-y-4">
          <button
            onClick={handleEnterClick}
            className="group relative w-full py-4 rounded-full overflow-hidden border border-[#B76E79]/50 bg-gradient-to-r from-[#B76E79]/15 via-[#E8C5C8]/10 to-[#B76E79]/15 hover:border-[#B76E79] hover:shadow-[0_0_24px_rgba(183,110,121,0.3)] active:scale-[0.98] transition-all duration-300 interactive-element"
            id="enter-experience-btn"
          >
            {/* Shimmer light bar across button */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/5 -skew-x-[25deg] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative text-xs font-sans font-semibold tracking-[0.25em] text-[#FFF0F2] flex items-center justify-center space-x-2">
              <span>UNVEIL THE TRIBUTE</span>
              <Heart className="w-4 h-4 text-[#FFB7C5] fill-[#FFB7C5] animate-pulse" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
