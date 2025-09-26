'use client'
import React, { useEffect, useState } from 'react'

interface Steam {
  size: string
  distance: string
  position: string
  time: string
  delay: string
}

export default function Steam({ className = '' }) {
  const [steamParticles, setSteamParticles] = useState<Steam[]>([]);
  // useEffect hook to run once after the component mounts on the client.
  useEffect(() => {
    const newParticles = Array.from({ length: 100 }).map(() => ({
        // The logic to generate random values is now inside this effect.
        // This ensures it only runs on the client after the initial render.
        size: (Math.random() * (4.0 - 1.0) + 1.0).toFixed(3), // Ukuran partikel uap
        distance: (Math.random() * (10.0 - 6.0) + 6.0).toFixed(3),
        position: (Math.random() * (105.0 - -5.0) + -5.0).toFixed(3),
        time: (Math.random() * (10.0 - 5.0) + 5.0).toFixed(3), // Waktu animasi yang lebih lambat
        delay: (Math.random() * (-5.0 - -10.0) + -10.0).toFixed(3), // Penundaan animasi
    }));
    setSteamParticles(newParticles);
  }, []);
  const COLOR_CLASSES = ['bg-white/80', 'bg-rendang-50', 'bg-stone-30/60'];

  /**
   * Helper function to randomly select one of the defined color classes.
   * @returns {string} The randomly selected Tailwind color class string.
   */
  const getRandomColorClass = () => {
      const randomIndex = Math.floor(Math.random() * COLOR_CLASSES.length);
      return COLOR_CLASSES[randomIndex];
  };
  return (
    <>
      {/* Bubbles container */}
      <div 
        className={`steamParticles ${className}`}
        style={{
          // background: backgroundColor,
          filter: 'url(#blob) blur(10px)',
        }}
      >
        {steamParticles.map((bubble, i) =>  {
          // 1. Get a random color class for the current particle
          const colorClass = getRandomColorClass();
          
          // 2. Combine the base classes with the random color class
          const particleClasses = `bubble absolute rounded-full opacity-35 ${colorClass}`;

          return (
            <div
              key={i}
              className={particleClasses}
              style={{
                '--size': `${bubble.size}rem`,
                '--distance': `${bubble.distance}rem`,
                '--position': `${bubble.position}%`,
                '--time': `${bubble.time}s`,
                '--delay': `${bubble.delay}s`,
                width: `calc(var(--size) * 1.5)`,
                height: `calc(var(--size) * 1.5)`,
                left: 'var(--position)',
                bottom: `calc(var(--distance) * -1)`,
                transform: 'translate(-50%, 100%)',
                animation: `bubble-size var(--time) ease-in infinite var(--delay), bubble-move var(--time) ease-in infinite var(--delay)`,
              } as React.CSSProperties & { [key: string]: string }}
            ></div>
          )}
        )}
      </div>
      
      {/* SVG Filter Definition */}
      <svg style={{ position: 'absolute', top: '100vh' }}>
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="blob"
            />
            <feComposite in="SourceGraphic" in2="blob" operator="atop" />
          </filter>
        </defs>
      </svg>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes bubble-size {
          0%, 75% {
            width: var(--size, 4rem);
            height: var(--size, 4rem);
          }
          100% {
            width: 0rem;
            height: 0rem;
          }
        }
        
        @keyframes bubble-move {
          0% {
            transform: translateY(0) scale(0.1);
            bottom: -16rem;
            opacity: 0;
          }
          50% {
            transform: translateY(-50%) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translateY(--distance) scale(0.5);
            bottom: var(--distance, 10rem);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}