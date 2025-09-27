'use client'
import React, { useEffect, useState } from 'react'

interface Bubble {
  size: string
  distance: string
  position: string
  time: string
  delay: string
}

export default function BubbleDivider({ backgroundColor = '#342b42', className = '' }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  // useEffect hook to run once after the component mounts on the client.
  useEffect(() => {
    const newBubbles = Array.from({ length: 100 }).map(() => ({
        // The logic to generate random values is now inside this effect.
        // This ensures it only runs on the client after the initial render.
        size: (Math.random() * (4 - 2.0) + 2.5).toFixed(3),
        distance: (Math.random() * (7.0 - 6.0) + 3.0).toFixed(3),
        position: (Math.random() * (105.0 - -5.0) + -5.0).toFixed(3),
        time: (Math.random() * (8.0 - 2.0) + 2.0).toFixed(3),
        delay: (Math.random() * (2.0 - -4.0) + 4.0).toFixed(3),
    }));
    setBubbles(newBubbles);
  }, []);
  return (
    <div className={`relative rounded-t-4xl w-[80%] mx-auto overflow-visible z-10 ${className}`}>
      {/* Bubbles container */}
      <div 
        className="bubbles absolute top-0 left-0 right-0 h-4"
        style={{
          // background: backgroundColor,
          filter: 'url(#blob)',
        }}
      >
        {bubbles.map((bubble, i) =>  (
            <div
              key={i}
              className="bubble absolute rounded-full"
              style={{
                '--size': `${bubble.size}rem`,
                '--distance': `${bubble.distance}rem`,
                '--position': `${bubble.position}%`,
                '--time': `${bubble.time}s`,
                '--delay': `${bubble.delay}s`,
                '--bg-color': backgroundColor,
                width: `calc(var(--size) * 1.5)`,
                height: `calc(var(--size) * 1.5)`,
                left: 'var(--position)',
                bottom: `calc(var(--distance) * -1)`,
                background: backgroundColor,
                transform: 'translate(-50%, 100%)',
                animation: `bubble-size var(--time) ease-in infinite var(--delay), bubble-move var(--time) ease-in infinite var(--delay)`,
              } as React.CSSProperties & { [key: string]: string }}
            ></div>
          )
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
    </div>
  );
}