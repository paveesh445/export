import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clickText, setClickText] = useState('');

  useEffect(() => {
    const dot = dotRef.current;
    const glow = glowRef.current;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const updatePosition = () => {
      // Smooth interpolation (lerp)
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;
      glowX += (mouseX - glowX) * 0.05;
      glowY += (mouseY - glowY) * 0.05;

      if (dot) {
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      if (glow) {
        glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(updatePosition);
    };

    const animId = requestAnimationFrame(updatePosition);

    // Hover listener
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], .interactive-card, input, textarea, select');
      if (target) {
        setHovered(true);
        if (target.classList.contains('carousel-card')) {
          setClickText('ROTATE');
        } else if (target.classList.contains('interactive-card')) {
          setClickText('EXPLORE');
        } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          setClickText('TYPE');
        } else {
          setClickText('VIEW');
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [role="button"], .interactive-card, input, textarea, select');
      if (target) {
        setHovered(false);
        setClickText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Outer Glow */}
      <div
        ref={glowRef}
        className={`fixed top-0 left-0 w-64 h-64 rounded-full pointer-events-none z-40 transition-all duration-500 ease-out opacity-40 mix-blend-screen bg-gradient-to-r from-blue-500/20 to-teal-500/20 blur-2xl ${
          hovered ? 'scale-150 opacity-60' : 'scale-100'
        }`}
      />
      {/* Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center font-sans font-bold text-[8px] uppercase tracking-widest text-[#121829] transition-all duration-200 ease-out ${
          hovered 
            ? 'w-14 h-14 bg-[#14B8A6] shadow-[0_0_20px_#14B8A6]' 
            : 'w-2 h-2 bg-[#2563EB] shadow-[0_0_10px_#2563EB]'
        }`}
      >
        {hovered && clickText && <span className="animate-fade-in text-center font-black">{clickText}</span>}
      </div>
    </>
  );
}
