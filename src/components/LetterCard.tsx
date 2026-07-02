import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Star, Award, ChevronDown, Check, Heart } from 'lucide-react';

interface LetterCardProps {
  isIntroComplete: boolean;
  onTriggerEnding: () => void;
}

export default function LetterCard({ isIntroComplete, onTriggerEnding }: LetterCardProps) {
  const [revealedItems, setRevealedItems] = useState<number[]>([]);
  const [pteCount, setPteCount] = useState(0);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);
  const [isWaxSealBroken, setIsWaxSealBroken] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Sentences to reveal sequentially
  const sentences = [
    { text: "Thank you for your dedication and hard work.", isEmphasized: false },
    { text: "Your support helped me achieve my goal.", isEmphasized: false },
    { text: "Because of your efforts, I successfully passed my PTE exam.", isEmphasized: false },
    { text: "I got 65 scores in PTE.", isPTE: true },
    { text: "I am truly grateful for everything you have done for me.", isEmphasized: true },
  ];

  // Sequence reveal controller when envelope is opened
  useEffect(() => {
    if (!isEnvelopeOpened) return;

    // Sequential fade-ins
    sentences.forEach((_, index) => {
      setTimeout(() => {
        setRevealedItems((prev) => [...prev, index]);
      }, (index * 1600) + 600); // 1.6s gap for cinematic emotional reading pacing
    });
  }, [isEnvelopeOpened]);

  // PTE counter count-up animation
  useEffect(() => {
    // Check if the PTE sentence is revealed (index 3)
    if (!revealedItems.includes(3)) return;

    let start = 0;
    const end = 65;
    const duration = 2000; // 2 seconds
    const incrementTime = Math.floor(duration / end);

    const timer = setInterval(() => {
      start += 1;
      setPteCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [revealedItems]);

  // Premium 3D Apple-style card tilt effect on mouse movement (Desktops only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within the card
    const y = e.clientY - rect.top;  // y coordinate within the card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max rotation of 4 degrees for an elegant subtle shift
    const rotateX = ((centerY - y) / centerY) * 3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
    });
  };

  // Golden Filigree SVG Corner Ornaments for royal aesthetic pairing
  const GoldenFiligreeCorner = ({ className }: { className?: string }) => (
    <div className={`absolute w-12 h-12 pointer-events-none select-none ${className}`}>
      <svg className="w-full h-full text-amber-500/30 fill-none stroke-current" viewBox="0 0 48 48" strokeWidth="1.2">
        <path d="M 0 0 L 48 0 C 36 0 24 12 24 24 C 12 24 0 36 0 48 L 0 0 Z" fill="currentColor" className="opacity-5" />
        <path d="M 6 6 L 36 6 C 24 6 15 15 15 24 M 6 6 L 6 36 C 6 24 15 15 15 24" />
        <circle cx="15" cy="15" r="3" className="fill-amber-500/20" />
        <path d="M 3 3 L 42 3 M 3 3 L 3 42" strokeWidth="1" />
        <path d="M 12 12 C 12 16 16 12 18 18" strokeWidth="0.8" />
      </svg>
    </div>
  );

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto px-4 md:px-6 py-12 md:py-16 transition-all duration-[2500ms] ${
        isIntroComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      }`}
    >
      {/* 1. Luxurious Glassmorphic Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
        className="relative bg-gradient-to-b from-[#130E0F]/90 to-[#0A0707]/98 backdrop-blur-2xl rounded-[36px] border border-[#B76E79]/25 shadow-[0_35px_80px_rgba(0,0,0,0.85)] p-8 md:p-14 overflow-hidden flex flex-col items-center text-center transition-all duration-500"
        id="luxury-letter-card"
      >
        {/* Glowing glass reflections / Shimmering rays background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FFB7C5]/5 via-transparent to-[#D4A373]/12 pointer-events-none" />

        {/* Premium Corners / Golden Filigree Ornaments */}
        <GoldenFiligreeCorner className="top-5 left-5" />
        <GoldenFiligreeCorner className="top-5 right-5 rotate-90" />
        <GoldenFiligreeCorner className="bottom-5 left-5 -rotate-90" />
        <GoldenFiligreeCorner className="bottom-5 right-5 rotate-180" />

        {/* 2. Top Consultant Heading with soft pulse glow */}
        <div className="flex flex-col items-center mb-10 animate-fade-in relative z-10">
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#FFB7C5]/90 font-semibold mb-2">
            Thanks to Speak Smart International Consultants
          </p>
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#B76E79]/60 to-transparent mx-auto mt-2.5"></div>
        </div>

        {/* 3. Main Title */}
        <h1
          className="text-4.5xl md:text-6xl mb-12 text-transparent bg-clip-text bg-gradient-to-b from-[#FFF0F2] via-[#FFF0F2] to-[#E8C5C8] tracking-tight text-center relative z-10"
          style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: "-0.02em" }}
          id="main-title-heading"
        >
          🌸 <span className="text-[#FFB7C5] italic font-light">Thank You,</span> Mam Munazza 🌸
        </h1>

        {/* 4. Letter Body / Envelope Ceremony Container */}
        {!isEnvelopeOpened ? (
          <div className="w-full flex flex-col items-center py-6 animate-fade-in pointer-events-auto relative z-10">
            {/* The Envelope wrapper */}
            <div 
              className={`relative w-full max-w-lg aspect-[1.65/1] bg-[#140D0D] border border-white/10 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center transition-all duration-[1200ms] ${
                isEnvelopeOpening ? 'scale-105 rotate-y-6 translate-y-4 opacity-0 filter blur-md' : 'hover:scale-[1.015] hover:shadow-[0_35px_80px_rgba(183,110,121,0.1)]'
              }`}
              style={{ perspective: '1200px' }}
            >
              {/* Back flap overlay (envelope background inside) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1E1314] via-[#0F090A] to-[#281819] pointer-events-none" />

              {/* Authentic Golden Postage Stamp in top-right corner */}
              <div className="absolute top-4 right-4 w-12 h-15 border border-dashed border-[#D4A373]/50 rounded bg-black/40 flex flex-col items-center justify-center p-1.5 opacity-75 pointer-events-none select-none z-0">
                <span className="text-[6px] font-sans tracking-[0.2em] text-[#D4A373] uppercase font-bold text-center scale-90">SPEAK SMART</span>
                <span className="text-[11px] font-mono font-bold text-[#FFB7C5] mt-1 tracking-tighter">65/90</span>
                <div className="w-full h-[1px] bg-[#D4A373]/30 my-0.5" />
                <span className="text-[5px] font-sans text-[#D4A373]/70 uppercase scale-90 font-semibold">PASSED</span>
              </div>

              {/* Diagonal Fold Lines using CSS clip-paths to simulate premium velvet physical folds */}
              <div 
                className="absolute inset-0 bg-[#191011] pointer-events-none border-t border-white/5 shadow-inner"
                style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }} // Left flap
              />
              <div 
                className="absolute inset-0 bg-[#191011] pointer-events-none border-t border-white/5 shadow-inner"
                style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }} // Right flap
              />
              <div 
                className="absolute inset-0 bg-[#1E1213] pointer-events-none border-t border-white/5 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
                style={{ clipPath: 'polygon(0 100%, 50% 45%, 100% 100%)' }} // Bottom flap
              />

              {/* Top Folding Flap */}
              <div 
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#2E1C1D] to-[#201314] border-b border-[#B76E79]/20"
                style={{ 
                  clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                  transformOrigin: 'top',
                  transform: isEnvelopeOpening ? 'rotateX(180deg) translateY(-1px)' : 'rotateX(0deg)',
                  transition: 'transform 1200ms ease-in-out, opacity 1000ms',
                  zIndex: isEnvelopeOpening ? 0 : 10,
                  pointerEvents: 'none'
                }}
              />

              {/* Decorative Envelope Header text inside back of flap */}
              <div className="absolute top-8 text-[9px] font-sans tracking-[0.45em] text-[#FFB7C5]/30 uppercase pointer-events-none select-none z-0">
                A Tribute of Respect
              </div>

              {/* Gorgeous 3D Wax Seal breaking/opening animation */}
              {!isWaxSealBroken ? (
                <button
                  onClick={() => {
                    if (isEnvelopeOpening) return;
                    setIsEnvelopeOpening(true);
                    setTimeout(() => {
                      setIsWaxSealBroken(true);
                    }, 650);
                    setTimeout(() => {
                      setIsEnvelopeOpened(true);
                    }, 1200);
                  }}
                  className={`absolute z-20 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-[1000ms] ease-out ${
                    isEnvelopeOpening 
                      ? 'scale-[2.5] opacity-0 rotate-12 pointer-events-none' 
                      : 'hover:scale-110 hover:shadow-[0_0_35px_rgba(183,110,121,0.55)] active:scale-95'
                  }`}
                  style={{
                    background: 'radial-gradient(circle, #D4A373 0%, #B76E79 70%, #8A4B55 100%)',
                    boxShadow: '0 10px 28px rgba(183, 110, 121, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -4px 8px rgba(0, 0, 0, 0.3)',
                  }}
                  id="wax-seal-ceremony-btn"
                >
                  {/* Outer wax drip ridges to simulate real poured wax */}
                  <div className="absolute inset-1 rounded-full border border-white/20 pointer-events-none" />
                  <div className="absolute -inset-1.5 rounded-full border border-[#D4A373]/30 opacity-45 animate-ping pointer-events-none" />
                  
                  {/* Heart in the center */}
                  <Heart className="w-8 h-8 text-[#FFF0F2] fill-[#FFF0F2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-[pulse_2s_infinite]" />
                </button>
              ) : (
                /* Split-seal visual effect during opening */
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  {/* Left Half */}
                  <div 
                    className="w-10 h-20 rounded-l-full transition-all duration-[1000ms] opacity-0 -translate-x-12 -rotate-12"
                    style={{
                      background: 'radial-gradient(circle at right, #D4A373 0%, #B76E79 70%, #8A4B55 100%)',
                    }}
                  />
                  {/* Right Half */}
                  <div 
                    className="w-10 h-20 rounded-r-full transition-all duration-[1000ms] opacity-0 translate-x-12 rotate-12"
                    style={{
                      background: 'radial-gradient(circle at left, #D4A373 0%, #B76E79 70%, #8A4B55 100%)',
                    }}
                  />
                </div>
              )}
            </div>

            {/* Tap Prompter */}
            <p className="text-xs font-serif italic text-[#FFB7C5]/60 mt-8 tracking-widest max-w-sm text-center leading-relaxed">
              This letter is sealed with deep respect. <br />
              <span className="text-[#D4A373] not-italic font-sans font-semibold uppercase text-[10px] tracking-[0.25em] block mt-2.5">
                ✦ Tap the heart wax seal to open ✦
              </span>
            </p>
          </div>
        ) : (
          /* When opened, we show the actual beautiful letter contents with elegant line reveals */
          <div className="w-full text-left font-serif space-y-8 md:space-y-10 leading-relaxed mb-14 animate-fade-in pointer-events-auto relative z-10">
            
            {/* Greeting */}
            <p className="text-[#FFB7C5] font-medium tracking-widest uppercase text-xs mb-4 pl-1">
              Dear Teacher,
            </p>

            {/* Sequential line-by-line reveal */}
            <div className="space-y-6 md:space-y-8 pl-1">
              {sentences.map((sentence, index) => {
                const isRevealed = revealedItems.includes(index);

                // Render standard or PTE specialized premium certificate plaque
                if (sentence.isPTE) {
                  return (
                    <div
                      key={index}
                      className={`transition-all duration-1000 transform flex items-center justify-center py-4 ${
                        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      {isRevealed && (
                        <div className="relative group flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#1C1415]/90 to-[#0C0808]/95 backdrop-blur-2xl border border-amber-500/30 rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-w-md w-full mx-auto overflow-hidden animate-fade-in ring-1 ring-white/10">
                          
                          {/* Shimmer light bar across badge */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                          
                          {/* Inner gold frame border */}
                          <div className="absolute inset-2.5 border border-amber-500/10 rounded-[22px] pointer-events-none" />
                          
                          {/* Glowing corner dots */}
                          <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-amber-400/40 rounded-full" />
                          <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-amber-400/40 rounded-full" />
                          <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-amber-400/40 rounded-full" />
                          <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-amber-400/40 rounded-full" />

                          {/* Laurel wreaths or premium header */}
                          <div className="flex items-center space-x-2 mb-4">
                            <span className="text-amber-400/60 text-lg">⚜️</span>
                            <span className="text-[10px] font-sans tracking-[0.3em] text-amber-400 uppercase font-bold">
                              Official Academic Certificate
                            </span>
                            <span className="text-amber-400/60 text-lg">⚜️</span>
                          </div>

                          {/* Candidate info block */}
                          <div className="text-center mb-6">
                            <p className="text-[9px] font-sans text-white/40 tracking-widest uppercase">Candidate Name</p>
                            <p className="text-lg font-serif font-medium text-[#FFF0F2] tracking-wide mt-1">Abdullah Sial</p>
                          </div>

                          {/* Interactive circular score gauge */}
                          <div className="relative w-36 h-36 flex items-center justify-center mb-5">
                            {/* Inner circular shadows */}
                            <div className="absolute w-28 h-28 rounded-full bg-black/40 border border-white/5 shadow-inner" />
                            
                            {/* SVG circular track and glowing progress fill */}
                            <svg className="absolute w-36 h-36 -rotate-90">
                              <circle
                                cx="72"
                                cy="72"
                                r="58"
                                className="stroke-white/5 fill-none"
                                strokeWidth="4"
                              />
                              <circle
                                cx="72"
                                cy="72"
                                r="58"
                                className="stroke-amber-500/80 fill-none transition-all duration-[2000ms] ease-out"
                                strokeWidth="5.5"
                                strokeDasharray={2 * Math.PI * 58}
                                strokeDashoffset={2 * Math.PI * 58 * (1 - pteCount / 90)}
                                strokeLinecap="round"
                                style={{
                                  filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))'
                                }}
                              />
                            </svg>

                            {/* Centered large Score */}
                            <div className="relative flex flex-col items-center justify-center">
                              <span className="text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF0F2] to-[#E8C5C8] tracking-tighter">
                                {pteCount}
                              </span>
                              <span className="text-[10px] font-sans tracking-widest text-amber-400/70 uppercase font-bold mt-1">
                                / 90 Score
                              </span>
                            </div>
                          </div>

                          {/* Achievements list */}
                          <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex flex-col space-y-1 text-center mb-6">
                            <p className="text-[10px] font-sans text-white/50 tracking-wider">
                              Assigned by Speak Smart Consultants
                            </p>
                            <p className="text-xs font-serif italic text-amber-200">
                              "PTE Goal Achieved Successfully"
                            </p>
                          </div>

                          <div className="flex items-center space-x-1.5 bg-green-950/50 border border-green-500/30 rounded-full px-4 py-1.5">
                            <Check className="w-3.5 h-3.5 text-green-400 stroke-[3.5]" />
                            <span className="text-[9px] font-sans font-bold text-green-300 tracking-widest uppercase">
                              Credential Secured
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div
                    key={index}
                    className={`transition-all duration-[1200ms] transform flex items-start space-x-3 md:space-x-4 ${
                      isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
                    }`}
                  >
                    {/* Rotating flower animation beside each sentence */}
                    {isRevealed && (
                      <div className="flex-shrink-0 mt-1.5 w-5 h-5 flex items-center justify-center text-lg animate-[spin_10s_linear_infinite_reverse]">
                        🌸
                      </div>
                    )}
                    
                    <p
                      className={`leading-relaxed tracking-wide text-left ${
                        sentence.isEmphasized
                          ? 'text-lg md:text-xl text-[#FFF0F2] font-light italic font-serif'
                          : 'text-base text-[#E8C5C8] font-light'
                      }`}
                    >
                      {sentence.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Closing signature */}
            {revealedItems.includes(4) && (
              <div className="pt-10 flex flex-col items-end pr-4 text-right animate-fade-in space-y-2">
                <p
                  className="text-[#B76E79] italic text-2xl mb-1"
                  style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                >
                  With sincere gratitude,
                </p>
                <p className="text-3xl font-bold tracking-tight text-[#FFF0F2] font-sans">
                  Abdullah Sial
                </p>
                <div className="w-16 h-[1px] bg-[#B76E79]/40 mr-2" />
              </div>
            )}
          </div>
        )}

        {/* 5. Gold Ribbon Trigger Button to trigger Ending Cinematic */}
        {isEnvelopeOpened && revealedItems.includes(4) && (
          <button
            onClick={onTriggerEnding}
            className="group relative flex items-center space-x-2.5 py-4 px-8 rounded-full overflow-hidden border border-[#B76E79]/50 bg-[#B76E79]/20 hover:bg-[#B76E79]/35 shadow-[0_8px_32px_rgba(183,110,121,0.2)] hover:border-[#B76E79] hover:shadow-[0_8px_32px_rgba(183,110,121,0.4)] active:scale-95 transition-all duration-300 pointer-events-auto interactive-element relative z-10"
            id="reveal-grand-finale-btn"
          >
            {/* Shimmering glare bar */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-[25deg] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="text-[#FFF0F2] text-xs font-sans tracking-[0.25em] font-medium uppercase">
              Reveal Grand Tribute
            </span>
            <span className="text-sm group-hover:rotate-12 transition-transform duration-300">🌸</span>
          </button>
        )}
      </div>

      {/* Decorative luxury down indicator */}
      {isEnvelopeOpened && !revealedItems.includes(4) && (
        <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex flex-col items-center text-[#A86B6D]/40 text-[10px] tracking-widest font-sans uppercase animate-bounce pointer-events-none">
          <span>Scroll or Read Letter</span>
          <ChevronDown className="w-4 h-4 mt-1" />
        </div>
      )}
    </div>
  );
}
