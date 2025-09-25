// components/SpriteDisplay.tsx
'use client';

import { SpriteSheet } from '@/lib/spritesheet';
import { SpriteConfig, RandomSprite } from '@/types/sprite';
import React, { useEffect, useRef, useState, useCallback } from 'react';

interface SpriteDisplayProps {
  spriteSheetUrl: string;
  spriteConfig: SpriteConfig;
  spriteCount?: number;
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
  scale?: number;
  className?: string;
}

// Utility function to create sprites for a background
const generateSpritesForBackground = (
  spriteSheet: SpriteSheet,
  spriteCount: number,
  containerWidth: number,
  containerHeight: number,
  scale: number,
): RandomSprite[] => {
  const sprites: RandomSprite[] = [];
  const frame = spriteSheet.getRandomFrame();
  if (!frame) return [];
  
  const spriteWidth = frame.width * scale;
  const spriteHeight = frame.height * scale;

  // Calculate rows and columns to fill the container
  const cols = Math.ceil(containerWidth / spriteWidth);
  const rows = Math.ceil(containerHeight / spriteHeight);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const randomFrame = spriteSheet.getRandomFrame();
      if (randomFrame) {
        sprites.push({
          id: (col + row * rows).toString(),
          frame: randomFrame,
          x: col * spriteWidth,
          y: row * spriteHeight,
        });
      }
    }
  }
  return sprites;
};


const SpriteDisplay: React.FC<SpriteDisplayProps> = ({
  spriteSheetUrl,
  spriteConfig,
  spriteCount = 10,
  autoRefresh = false,
  refreshInterval = 3000,
  scale = 1,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const spriteSheetRef = useRef<SpriteSheet | null>(null);

  const [sprites, setSprites] = useState<RandomSprite[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to generate new sprites
  const generateNewSprites = useCallback(() => {
    if (spriteSheetRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newSprites = generateSpritesForBackground(
        spriteSheetRef.current,
        spriteCount,
        rect.width,
        rect.height,
        scale,
      );
      setSprites(newSprites);
    }
  }, [scale, spriteCount]);

  // Initialize sprite sheet and generate initial sprites
  useEffect(() => {
    const initialize = async () => {
      try {
        setError(null);
        const spriteSheet = new SpriteSheet(spriteSheetUrl, spriteConfig);
        spriteSheetRef.current = spriteSheet;
        
        await spriteSheet.waitForLoad();
        setIsLoaded(true);
        generateNewSprites();
      } catch (err) {
        setError('Failed to load sprite sheet');
        console.error('Sprite sheet loading error:', err);
      }
    };

    initialize();
  }, [spriteSheetUrl, spriteConfig, generateNewSprites]);

  // Auto-refresh sprites based on interval
  useEffect(() => {
    if (autoRefresh && isLoaded) {
      const intervalId = setInterval(generateNewSprites, refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [autoRefresh, refreshInterval, isLoaded, generateNewSprites]);

  // Draw sprites on canvas whenever the sprites state or scale changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container || !spriteSheetRef.current || !isLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container and account for high-DPI screens
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw all sprites
    sprites.forEach(sprite => {
      if (spriteSheetRef.current) {
        spriteSheetRef.current.drawFrame(
          ctx,
          sprite.frame.index,
          sprite.x,
          sprite.y,
          scale
        );
      }
    });
  }, [sprites, isLoaded, scale]);

  // Handle window resize to regenerate background
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        generateNewSprites();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, generateNewSprites]);

  if (error) {
    return (
      <div className={`sprite-display-error ${className}`}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ minHeight: '400px' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <p className="text-gray-600">Loading sprites...</p>
        </div>
      )}

      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={generateNewSprites}
          disabled={!isLoaded}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Randomize
        </button>
        <div className="mt-2 text-sm text-gray-600 bg-white/80 px-2 py-1 rounded">
          Sprites: {sprites.length}
        </div>
      </div>
    </div>
  );
};

export default SpriteDisplay;