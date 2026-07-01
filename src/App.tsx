import React, { useState, useEffect, useRef } from 'react';
import IntroCinematic from './components/IntroCinematic';
import BackgroundEffects from './components/BackgroundEffects';
import LetterCard from './components/LetterCard';
import EndingCinematic from './components/EndingCinematic';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [triggerEndSparkle, setTriggerEndSparkle] = useState(false);
  const [isEndingActive, setIsEndingActive] = useState(false);
  const [scrollIntensity, setScrollIntensity] = useState(0);
  const hasTriggeredEndScroll = useRef(false);

  // Monitor scroll for canvas physics reactivity & auto-trigger finale at bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight > 0) {
        const scrolledFraction = scrollTop / docHeight;
        setScrollIntensity(scrolledFraction);

        // Auto trigger ending when scrolled near the bottom (e.g. >95%)
        if (scrolledFraction > 0.95 && isIntroComplete && !hasTriggeredEndScroll.current && !isEndingActive) {
          hasTriggeredEndScroll.current = true;
          handleTriggerEnding();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isIntroComplete, isEndingActive]);

  // Handle entry from loader
  const handleEnterExperience = () => {
    setIsIntroComplete(true);

    // Celebration: Launch elegant slow-motion flower petals and gold sparkles when page finishes loading/opens
    setTriggerEndSparkle(true);
    setTimeout(() => {
      setTriggerEndSparkle(false);
    }, 5000); // Celebration runs for 5 seconds
  };

  // Trigger grand finale tribute
  const handleTriggerEnding = () => {
    setIsEndingActive(true);
    setTriggerEndSparkle(true);
  };

  // Complete finale, return background to normal
  const handleEndingComplete = () => {
    setIsEndingActive(false);
    setTriggerEndSparkle(false);
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden selection:bg-[#FFB7C5]/30 select-none"
      style={{
        backgroundColor: '#070505',
        backgroundImage: 'radial-gradient(circle at 15% 20%, rgba(183, 110, 121, 0.12) 0%, transparent 60%), radial-gradient(circle at 85% 80%, rgba(212, 163, 115, 0.08) 0%, transparent 60%)'
      }}
    >
      
      {/* Corner Floral Flourish lines for extreme luxury invitation feel */}
      <div className="absolute bottom-0 left-0 p-8 opacity-40 pointer-events-none">
        <div className="w-24 h-24 md:w-32 md:h-32 border-l-2 border-b-2 border-[#B76E79]/30 rounded-bl-[100px]"></div>
      </div>
      <div className="absolute top-0 right-0 p-8 opacity-40 pointer-events-none">
        <div className="w-24 h-24 md:w-32 md:h-32 border-r-2 border-t-2 border-[#B76E79]/30 rounded-tr-[100px]"></div>
      </div>

      {/* 1. Cinematic Entry Screen */}
      {!isIntroComplete && (
        <IntroCinematic onEnter={handleEnterExperience} />
      )}

      {/* 3. HTML5 Canvas Particles, Flowers, Sparkles, and Custom Cursors Layer */}
      <BackgroundEffects scrollIntensity={scrollIntensity} triggerEndSparkle={triggerEndSparkle} />

      {/* 4. Ambient Luxury Floating Background Shapes (Parallax Glassmorphic spheres) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        {/* Soft Pink Orb */}
        <div
          className="absolute rounded-full bg-[#E5B7B7]/8 blur-3xl w-96 h-96 transition-transform duration-1000 ease-out"
          style={{
            top: '15%',
            left: '-10%',
            transform: `translate3d(0, ${scrollIntensity * 60}px, 0)`,
          }}
        />
        {/* Rose Gold Orb */}
        <div
          className="absolute rounded-full bg-[#B76E79]/6 blur-3xl w-[450px] h-[450px] transition-transform duration-1000 ease-out"
          style={{
            bottom: '20%',
            right: '-10%',
            transform: `translate3d(0, ${-scrollIntensity * 60}px, 0)`,
          }}
        />
        {/* Floating Abstract Glass Panel (Premium dark glass overlay) */}
        <div
          className="absolute w-40 h-40 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-transform duration-[2000ms]"
          style={{
            top: '35%',
            right: '15%',
            transform: `translate3d(0, ${scrollIntensity * -40}px, 0) rotate(${scrollIntensity * 45}deg)`,
          }}
        />
      </div>

      {/* 5. Heart & Star Header Decorative Element */}
      {isIntroComplete && (
        <div className="w-full flex justify-center pt-8 pb-4 animate-fade-in pointer-events-none">
          <div className="flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-[#B76E79]/30 bg-black/40 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <Heart className="w-3.5 h-3.5 text-[#B76E79] fill-[#B76E79]" />
            <span className="text-[10px] font-sans font-semibold text-[#FFD1DC] tracking-[0.25em] uppercase">
              A Tribute of Gratitude
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
          </div>
        </div>
      )}

      {/* 6. Letter Card Content */}
      <main className="w-full flex-grow flex items-center justify-center pointer-events-none">
        <LetterCard isIntroComplete={isIntroComplete} onTriggerEnding={handleTriggerEnding} />
      </main>

      {/* 7. Premium Grand Finale Cinematic Overlay */}
      <EndingCinematic isActive={isEndingActive} onComplete={handleEndingComplete} />

      {/* 8. Fine Print Footer */}
      {isIntroComplete && (
        <footer className="w-full text-center py-6 pb-8 text-[9px] font-sans tracking-[0.3em] text-[#B76E79]/40 pointer-events-none animate-fade-in uppercase">
          Made with Love & Gratitude for Mam Munazza
        </footer>
      )}

    </div>
  );
}
