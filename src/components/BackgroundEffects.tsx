import React, { useEffect, useRef, useState } from 'react';
import { Particle, Petal, Bokeh } from '../types';

interface BackgroundEffectsProps {
  scrollIntensity: number;
  triggerEndSparkle: boolean;
}

export default function BackgroundEffects({ scrollIntensity, triggerEndSparkle }: BackgroundEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, active: false });
  const [isMobile, setIsMobile] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);

  // Arrays for particles
  const petalsRef = useRef<Petal[]>([]);
  const dustRef = useRef<Particle[]>([]);
  const glitterRef = useRef<Particle[]>([]);
  const bloomsRef = useRef<Particle[]>([]);
  const bokehRef = useRef<Bokeh[]>([]);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize Canvas, handle resize, track cursor, and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resizing using ResizeObserver
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || window.innerWidth;
      canvas.height = rect?.height || window.innerHeight;
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Initialize Sakura/Rose Petals
    const initPetals = () => {
      const tempPetals: Petal[] = [];
      const petalCount = isMobile ? 18 : 35;
      for (let i = 0; i < petalCount; i++) {
        tempPetals.push(createPetal(canvas.width, canvas.height, true));
      }
      petalsRef.current = tempPetals;
    };

    // Initialize Golden Sparkle Dust
    const initDust = () => {
      const tempDust: Particle[] = [];
      const dustCount = isMobile ? 25 : 60;
      for (let i = 0; i < dustCount; i++) {
        tempDust.push(createDust(canvas.width, canvas.height, true));
      }
      dustRef.current = tempDust;
    };

    // Initialize Bokeh Lights
    const initBokeh = () => {
      const tempBokeh: Bokeh[] = [];
      const bokehCount = isMobile ? 6 : 12;
      const colors = [
        'rgba(255, 183, 197, 0.15)', // Blush Pink
        'rgba(212, 163, 115, 0.12)', // Warm Rose Gold
        'rgba(255, 240, 242, 0.18)', // Soft Off-white
        'rgba(232, 197, 200, 0.14)', // Luxury Rose
      ];
      for (let i = 0; i < bokehCount; i++) {
        tempBokeh.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 120 + 80,
          speedY: -(Math.random() * 0.4 + 0.1),
          alpha: Math.random() * 0.5 + 0.1,
          maxAlpha: Math.random() * 0.4 + 0.2,
          pulseSpeed: Math.random() * 0.008 + 0.003,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      bokehRef.current = tempBokeh;
    };

    initPetals();
    initDust();
    initBokeh();

    // Spawn massive celebration/ending particles if requested
    if (triggerEndSparkle) {
      // Trigger a dramatic blossom of sparkles & petals
      const endPetalCount = isMobile ? 30 : 60;
      for (let i = 0; i < endPetalCount; i++) {
        petalsRef.current.push({
          x: Math.random() * canvas.width,
          y: -50,
          size: Math.random() * 12 + 6,
          speedY: Math.random() * 2 + 1.5,
          speedX: Math.random() * 3 - 1.5,
          angle: Math.random() * Math.PI * 2,
          spin: Math.random() * 0.04 - 0.02,
          alpha: 1,
          color: Math.random() > 0.5 ? '#FFB7C5' : '#E8C5C8',
          swaySpeed: Math.random() * 0.02 + 0.01,
          swayValue: Math.random() * Math.PI * 2,
        });
      }

      for (let i = 0; i < 80; i++) {
        dustRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 20,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: -(Math.random() * 4 + 2),
          color: '#E8C5C8',
          alpha: 1,
          decay: Math.random() * 0.008 + 0.003,
          sparkle: true,
          type: 'sparkle',
        });
      }
    }

    // Animation loop
    let animationId: number;
    const render = () => {
      // Background gradient with scroll shifting
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update and Draw Bokeh Lights (Aurora/Glass Blur Circles)
      bokehRef.current.forEach((b) => {
        b.y += b.speedY;
        if (b.y < -b.size) {
          b.y = canvas.height + b.size;
          b.x = Math.random() * canvas.width;
        }
        // Pulse alpha
        b.alpha += b.pulseSpeed;
        if (b.alpha > b.maxAlpha || b.alpha < 0.05) {
          b.pulseSpeed = -b.pulseSpeed;
        }

        // Draw soft glow
        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.size);
        gradient.addColorStop(0, b.color.replace('0.1', `${b.alpha}`));
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Soft Light Rays
      ctx.save();
      const rayGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      rayGradient.addColorStop(0, 'rgba(255, 240, 242, 0.15)');
      rayGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
      rayGradient.addColorStop(1, 'rgba(212, 163, 115, 0.05)');
      ctx.fillStyle = rayGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // 3. Update & Draw Glitter Trail (from mouse movement)
      glitterRef.current = glitterRef.current.filter((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.03; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) return false;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;

        // Draw delicate diamond/star sparkler
        ctx.beginPath();
        const size = p.size;
        ctx.moveTo(p.x, p.y - size);
        ctx.lineTo(p.x + size * 0.4, p.y - size * 0.4);
        ctx.lineTo(p.x + size, p.y);
        ctx.lineTo(p.x + size * 0.4, p.y + size * 0.4);
        ctx.lineTo(p.x, p.y + size);
        ctx.lineTo(p.x - size * 0.4, p.y + size * 0.4);
        ctx.lineTo(p.x - size, p.y);
        ctx.lineTo(p.x - size * 0.4, p.y - size * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        return true;
      });

      // 4. Update & Draw Tap Flower Bloom Bursts
      bloomsRef.current = bloomsRef.current.filter((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= p.decay;
        if (p.angle !== undefined && p.spin !== undefined) {
          p.angle += p.spin;
        }

        if (p.alpha <= 0) return false;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        if (p.angle !== undefined) {
          ctx.rotate(p.angle);
        }

        if (p.type === 'petal') {
          // Draw miniature heart-shaped petals for bloom click
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-p.size, -p.size * 1.5, -p.size * 2, -p.size * 0.5, 0, p.size);
          ctx.bezierCurveTo(p.size * 2, -p.size * 0.5, p.size, -p.size * 1.5, 0, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          // Golden sparkle core
          ctx.fillStyle = '#D4A373';
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
        return true;
      });

      // 5. Update & Draw Golden Sparkle Dust (Ambient environment)
      dustRef.current.forEach((d) => {
        d.y += d.speedY;
        d.x += d.speedX;

        // Wrap around
        if (d.y < -10) {
          d.y = canvas.height + 10;
          d.x = Math.random() * canvas.width;
        }
        if (d.x < -10 || d.x > canvas.width + 10) {
          d.x = Math.random() * canvas.width;
        }

        // Shimmer / sparkle effect
        if (d.sparkle) {
          d.alpha += Math.random() * 0.1 - 0.05;
          if (d.alpha > 0.9) d.alpha = 0.9;
          if (d.alpha < 0.2) d.alpha = 0.2;
        }

        ctx.save();
        ctx.globalAlpha = d.alpha;
        ctx.fillStyle = d.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 6. Update & Draw Floating Sakura/Rose Petals
      petalsRef.current.forEach((p) => {
        p.y += p.speedY + scrollIntensity * 0.5; // push downwards with scrolling
        p.swayValue += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayValue) * 0.4;
        p.angle += p.spin;

        // Reset if out of bounds
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.speedY = Math.random() * 1.2 + 0.6;
          p.alpha = Math.random() * 0.6 + 0.4;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Gradient for premium rose/sakura look
        const petalGrad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
        petalGrad.addColorStop(0, p.color); // Sakura Pink
        petalGrad.addColorStop(1, '#FFD1DC'); // Soft Light Pink
        ctx.fillStyle = petalGrad;

        // Draw elegant petal outline
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(-p.size * 1.5, -p.size * 1.5, -p.size * 1.5, p.size, 0, p.size * 1.5);
        ctx.bezierCurveTo(p.size * 1.5, p.size, p.size * 1.5, -p.size * 1.5, 0, -p.size);
        ctx.closePath();
        ctx.fill();

        // Delicate mid-vein accent for luxury
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.5);
        ctx.quadraticCurveTo(-p.size * 0.2, 0, 0, p.size * 1.2);
        ctx.stroke();

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [isMobile, scrollIntensity, triggerEndSparkle]);

  // Create helper functions
  const createPetal = (width: number, height: number, initRandomY = false): Petal => {
    const colors = [
      '#FFB7C5', // Delicate sakura pink
      '#FFF0F2', // Soft white blush
      '#E8C5C8', // Luxury rose gold pink
      '#FF9AA2', // Warm pink
    ];
    return {
      x: Math.random() * width,
      y: initRandomY ? Math.random() * height : -20,
      size: Math.random() * 12 + 6,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 0.8 - 0.4,
      angle: Math.random() * Math.PI * 2,
      spin: Math.random() * 0.03 - 0.015,
      alpha: Math.random() * 0.6 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      swaySpeed: Math.random() * 0.03 + 0.01,
      swayValue: Math.random() * Math.PI * 2,
    };
  };

  const createDust = (width: number, height: number, initRandomY = false): Particle => {
    const colors = [
      'rgba(212, 163, 115, 0.4)', // Rose Gold
      'rgba(255, 223, 186, 0.5)', // Shimmer Gold
      'rgba(255, 255, 255, 0.6)',  // Soft White
    ];
    return {
      x: Math.random() * width,
      y: initRandomY ? Math.random() * height : height + 10,
      size: Math.random() * 2 + 0.5,
      speedX: Math.random() * 0.4 - 0.2,
      speedY: -(Math.random() * 0.8 + 0.3),
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.2,
      decay: 0,
      sparkle: true,
    };
  };

  // Add click/tap flowers and mouse movement trail
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Track cursor positions for rendering custom elements
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Spawn glitter dust
      const distance = Math.hypot(x - mouseRef.current.lastX, y - mouseRef.current.lastY);
      if (distance > 8) {
        const glitterCount = isMobile ? 1 : 2;
        for (let i = 0; i < glitterCount; i++) {
          glitterRef.current.push({
            x,
            y,
            size: Math.random() * 5 + 3,
            speedX: (Math.random() * 1.5 - 0.75) + (x - mouseRef.current.lastX) * 0.05,
            speedY: (Math.random() * 1.5 - 0.75) + (y - mouseRef.current.lastY) * 0.05,
            color: Math.random() > 0.4 ? '#D4A373' : '#FFB7C5', // Rose Gold or Sakura Pink
            alpha: 1,
            decay: Math.random() * 0.02 + 0.015,
          });
        }
        mouseRef.current.lastX = x;
        mouseRef.current.lastY = y;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const glitterCount = 2;
      for (let i = 0; i < glitterCount; i++) {
        glitterRef.current.push({
          x,
          y,
          size: Math.random() * 6 + 3,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          color: Math.random() > 0.4 ? '#D4A373' : '#FFB7C5',
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
        });
      }
    };

    const handleInteractionStart = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Spawns flower bloom (expanding ring of petals)
      const colors = ['#FFB7C5', '#FFF0F2', '#E8C5C8', '#D4A373'];
      const petalsCount = isMobile ? 8 : 16;
      for (let i = 0; i < petalsCount; i++) {
        const angle = (i / petalsCount) * Math.PI * 2;
        const velocity = Math.random() * 1.8 + 1.2;
        bloomsRef.current.push({
          x,
          y,
          size: Math.random() * 4 + 3,
          speedX: Math.cos(angle) * velocity,
          speedY: Math.sin(angle) * velocity,
          angle: Math.random() * Math.PI * 2,
          spin: Math.random() * 0.1 - 0.05,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.015 + 0.01,
          type: 'petal',
        });
      }

      // Center sparkle burst
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 3 + 1;
        bloomsRef.current.push({
          x,
          y,
          size: Math.random() * 2 + 1,
          speedX: Math.cos(angle) * velocity,
          speedY: Math.sin(angle) * velocity,
          color: '#D4A373',
          alpha: 1,
          decay: 0.03,
          type: 'sparkle',
        });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      handleInteractionStart(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      handleInteractionStart(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isMobile]);

  // Monitor element hoverings to change cursor styling
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive-element')
      ) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" id="luxury-canvas" />

      {/* Desktop Custom Luxury Cursor */}
      {!isMobile && cursorPos.x >= 0 && (
        <div
          className="fixed pointer-events-none z-50 transition-all duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        >
          {/* Inner point */}
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              cursorHovered ? 'bg-[#D4A373] scale-150 shadow-[0_0_12px_#D4A373]' : 'bg-[#FFB7C5] shadow-[0_0_8px_#FFB7C5]'
            }`}
          />
          {/* Outer floating delicate flower outline or gold ring */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500 ease-out ${
              cursorHovered
                ? 'w-10 h-10 border-[#D4A373] bg-[#D4A373]/10 rotate-90 scale-110 border-dashed'
                : 'w-6 h-6 border-[#FFB7C5]/40 rotate-0 scale-100 border-solid'
            }`}
            style={{
              borderRadius: cursorHovered ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%', // organic liquid feel
            }}
          />
        </div>
      )}
    </div>
  );
}
