'use client'
import ImgComponent from 'next/image';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface Sticker {
  id: string;
  spriteId: number;
  dataUrl: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  animationDelay: number;
  floatDirection: number;
  scale: number;
  animationType: 'float' | 'slideRight' | 'slideLeft' | 'wavyRight' | 'wavyLeft';
  animationDuration: number;
}

interface ExtractedSprite {
  id: number;
  dataUrl: string;
  col: number;
  row: number;
  width: number;
  height: number;
}

type Position = { x: number; y: number; }

// Move configurations outside component to prevent re-creation
const ASSET_SHEET_CONFIG = {
  imageUrl: '/ingredients/Desktop1k.png',
  columns: 7,
  rows: 21,
  totalStickers: 147
};

const STICKER_CONFIG = {
  count: 25,
  minSize: 100,
  maxSize: 130,
  minOpacity: 0.9,
  maxOpacity: 1,
  minDistance: 100,
  maxAttempts: 50,
  animationTypes: ['float', 'slideRight', 'slideLeft', 'wavyRight', 'wavyLeft'] as const,
  animationWeights: {
    float: 0.3,
    slideRight: 0.2,
    slideLeft: 0.2,
    wavyRight: 0.15,
    wavyLeft: 0.15
  },
  durationRanges: {
    float: { min: 15, max: 25 },
    slideRight: { min: 8, max: 15 },
    slideLeft: { min: 8, max: 15 },
    wavyRight: { min: 10, max: 18 },
    wavyLeft: { min: 10, max: 18 }
  }
};

const RandomStickersPage = ({ children }: { children: React.ReactNode }) => {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [extractedSprites, setExtractedSprites] = useState<ExtractedSprite[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Extract individual sprites from the asset sheet
  const extractSprites = useCallback((image: HTMLImageElement): ExtractedSprite[] => {
    const canvas = canvasRef.current;
    if (!canvas) return [];

    const ctx = canvas.getContext('2d');
    if (!ctx) return [];
    
    const sprites: ExtractedSprite[] = [];
    const spriteWidth = image.width / ASSET_SHEET_CONFIG.columns;
    const spriteHeight = image.height / ASSET_SHEET_CONFIG.rows;

    canvas.width = spriteWidth;
    canvas.height = spriteHeight;

    const totalSprites = Math.min(
      ASSET_SHEET_CONFIG.totalStickers, 
      ASSET_SHEET_CONFIG.columns * ASSET_SHEET_CONFIG.rows
    );

    for (let i = 0; i < totalSprites; i++) {
      const col = i % ASSET_SHEET_CONFIG.columns;
      const row = Math.floor(i / ASSET_SHEET_CONFIG.columns);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        image,
        col * spriteWidth,
        row * spriteHeight,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth,
        spriteHeight
      );

      try {
        const spriteDataUrl = canvas.toDataURL('image/png');
        sprites.push({
          id: i,
          dataUrl: spriteDataUrl,
          col,
          row,
          width: spriteWidth,
          height: spriteHeight
        });
      } catch (error) {
        console.error('Failed to extract sprite:', error);
      }
    }

    return sprites;
  }, []);

  // Load asset sheet and extract sprites
  useEffect(() => {
    const loadAssetSheet = async () => {
      try {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        
        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () => reject(new Error('Failed to load asset sheet'));
          image.src = ASSET_SHEET_CONFIG.imageUrl;
        });

        const sprites = extractSprites(image);
        setExtractedSprites(sprites);
      } catch (error) {
        console.error('Error loading asset sheet:', error);
        // Create placeholder sprites for fallback
        const placeholderSprites: ExtractedSprite[] = [];
        const totalSprites = Math.min(
          ASSET_SHEET_CONFIG.totalStickers,
          ASSET_SHEET_CONFIG.columns * ASSET_SHEET_CONFIG.rows
        );
        const defaultSpriteWidth = 100;
        const defaultSpriteHeight = 100;
        
        for (let i = 0; i < totalSprites; i++) {
          placeholderSprites.push({
            id: i,
            dataUrl: `data:image/svg+xml,${encodeURIComponent(`
              <svg width="${defaultSpriteWidth}" height="${defaultSpriteHeight}" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="hsl(${(i * 40) % 360}, 70%, 60%)" rx="10"/>
                <text x="50%" y="50%" text-anchor="middle" dy="0.35em" fill="white" font-size="20" font-weight="bold">${i + 1}</text>
              </svg>
            `)}`,
            col: i % ASSET_SHEET_CONFIG.columns,
            row: Math.floor(i / ASSET_SHEET_CONFIG.columns),
            width: defaultSpriteWidth,
            height: defaultSpriteHeight
          });
        }
        
        setExtractedSprites(placeholderSprites);
      } finally {
        setIsLoaded(true);
      }
    };

    loadAssetSheet();
  }, [extractSprites]);

  // Check if two positions are too close
  const isPositionTooClose = useCallback((newPos: Position, existingPositions: Position[], minDistance: number) => {
    return existingPositions.some((pos) => {
      const dx = newPos.x - pos.x;
      const dy = newPos.y - pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < minDistance;
    });
  }, []);

  // Convert percentage position to pixel position for distance calculation
  const getPixelPosition = useCallback((percentX: number, percentY: number) => {
    return {
      x: (percentX / 100) * window.innerWidth,
      y: (percentY / 100) * window.innerHeight
    };
  }, []);

  // Select animation type based on weights
  const selectAnimationType = useCallback((): Sticker['animationType'] => {
    const rand = Math.random();
    const weights = STICKER_CONFIG.animationWeights;
    let cumulative = 0;
    
    for (const [type, weight] of Object.entries(weights)) {
      cumulative += weight;
      if (rand <= cumulative) {
        return type as Sticker['animationType'];
      }
    }
    
    return 'float'; // fallback
  }, []);

  // Get animation duration based on type
  const getAnimationDuration = useCallback((animationType: Sticker['animationType']): number => {
    const range = STICKER_CONFIG.durationRanges[animationType];
    return Math.random() * (range.max - range.min) + range.min;
  }, []);

  // Get position based on animation type
  const getPositionForAnimationType = useCallback((animationType: Sticker['animationType']): Position => {
    switch (animationType) {
      case 'slideRight':
      case 'wavyRight':
        return { x: -10, y: Math.random() * 85 + 5 };
      case 'slideLeft':
      case 'wavyLeft':
        return { x: 110, y: Math.random() * 85 + 5 };
      case 'float':
      default:
        return { x: Math.random() * 85 + 5, y: Math.random() * 85 + 5 };
    }
  }, []);

  const generateStickers = useCallback(() => {
    if (extractedSprites.length === 0) return;

    const newStickers: Sticker[] = [];
    const positions: Position[] = [];
    
    for (let i = 0; i < STICKER_CONFIG.count; i++) {
      const randomSpriteIndex = Math.floor(Math.random() * extractedSprites.length);
      const selectedSprite = extractedSprites[randomSpriteIndex];
      
      const size = Math.random() * (STICKER_CONFIG.maxSize - STICKER_CONFIG.minSize) + STICKER_CONFIG.minSize;
      const animationType = selectAnimationType();
      
      let validPosition: Position | null = null;
      let attempts = 0;
      
      const needsDistanceCheck = animationType === 'float';
      
      while (!validPosition && attempts < STICKER_CONFIG.maxAttempts) {
        const candidatePos = getPositionForAnimationType(animationType);
        
        if (!needsDistanceCheck) {
          validPosition = candidatePos;
          break;
        }
        
        const pixelPos = getPixelPosition(candidatePos.x, candidatePos.y);
        
        if (!isPositionTooClose(pixelPos, positions, STICKER_CONFIG.minDistance)) {
          validPosition = candidatePos;
          positions.push(pixelPos);
          break;
        }
        
        attempts++;
      }
      
      if (!validPosition) {
        validPosition = getPositionForAnimationType(animationType);
        if (needsDistanceCheck) {
          const pixelPos = getPixelPosition(validPosition.x, validPosition.y);
          positions.push(pixelPos);
        }
      }
      
      const sticker: Sticker = {
        id: `sticker-${i}-${Date.now()}`,
        spriteId: selectedSprite.id,
        dataUrl: selectedSprite.dataUrl,
        x: validPosition.x,
        y: validPosition.y,
        size,
        opacity: Math.random() * (STICKER_CONFIG.maxOpacity - STICKER_CONFIG.minOpacity) + STICKER_CONFIG.minOpacity,
        rotation: Math.random() * 360,
        animationDelay: Math.random() * 5,
        floatDirection: Math.random() > 0.5 ? 1 : -1,
        scale: 0.8 + Math.random() * 0.4,
        animationType,
        animationDuration: getAnimationDuration(animationType)
      };
      
      newStickers.push(sticker);
    }
    
    setStickers(newStickers);
  }, [
    extractedSprites, 
    selectAnimationType, 
    getAnimationDuration, 
    getPositionForAnimationType, 
    isPositionTooClose, 
    getPixelPosition
  ]);

  // Generate random stickers when sprites are loaded
  useEffect(() => {
    if (isLoaded && extractedSprites.length > 0) {
      generateStickers();
    }
  }, [isLoaded, extractedSprites, generateStickers]);

  // Get animation class name based on type
  const getAnimationClassName = (animationType: Sticker['animationType']): string => {
    const animationClasses = {
      slideRight: 'animate-slide-right',
      slideLeft: 'animate-slide-left',
      wavyRight: 'animate-wavy-right',
      wavyLeft: 'animate-wavy-left',
      float: 'animate-float'
    };
    return animationClasses[animationType] || animationClasses.float;
  };

  // Memoize sticker elements to prevent unnecessary re-renders
  const stickerElements = useMemo(() => (
    stickers.map((sticker) => (
      <div
        key={sticker.id}
        className={`absolute z-0 pointer-events-none ${getAnimationClassName(sticker.animationType)}`}
        style={{
          left: `${sticker.x}%`,
          top: `${sticker.y}%`,
          width: `${sticker.size}px`,
          height: `${sticker.size}px`,
          opacity: sticker.opacity,
          animationDelay: `${sticker.animationDelay}s`,
          animationDuration: `${sticker.animationDuration}s`,
          animationDirection: sticker.floatDirection === 1 ? 'normal' : 'reverse',
          transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale})`
        }}
      >
        <ImgComponent 
          src={sticker.dataUrl}
          alt={`Sticker ${sticker.spriteId}`}
          fill
          className="object-contain drop-shadow-sm select-none"
          draggable={false}
          unoptimized // Since we're using data URLs
        />
      </div>
    ))
  ), [stickers]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/50 backdrop-blur-sm">
          <div className="bg-white/90 rounded-lg p-6 shadow-lg border">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-center">Loading stickers...</p>
          </div>
        </div>
      )}

      {stickerElements}
      {children}

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          33% {
            transform: translateY(-15px);
          }
          66% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes slideRight {
          0% {
            transform: translateX(calc(-1 * var(--sticker-size, 100px)));
          }
          100% {
            transform: translateX(calc(100vw + var(--sticker-size, 100px)));
          }
        }
        
        @keyframes slideLeft {
          0% {
            transform: translateX(var(--sticker-size, 100px));
          }
          100% {
            transform: translateX(calc(-100vw - var(--sticker-size, 100px)));
          }
        }
        
        @keyframes wavyRight {
          0% {
            transform: translateX(calc(-1 * var(--sticker-size, 100px))) translateY(0px);
          }
          25% {
            transform: translateX(25vw) translateY(-30px);
          }
          50% {
            transform: translateX(50vw) translateY(0px);
          }
          75% {
            transform: translateX(75vw) translateY(30px);
          }
          100% {
            transform: translateX(calc(100vw + var(--sticker-size, 100px))) translateY(0px);
          }
        }
        
        @keyframes wavyLeft {
          0% {
            transform: translateX(var(--sticker-size, 100px)) translateY(0px);
          }
          25% {
            transform: translateX(-25vw) translateY(30px);
          }
          50% {
            transform: translateX(-50vw) translateY(0px);
          }
          75% {
            transform: translateX(-75vw) translateY(-30px);
          }
          100% {
            transform: translateX(calc(-100vw - var(--sticker-size, 100px))) translateY(0px);
          }
        }
        
        .animate-float {
          animation: float var(--animation-duration, 20s) ease-in-out infinite;
        }
        
        .animate-slide-right {
          animation: slideRight var(--animation-duration, 20s) linear infinite;
        }
        
        .animate-slide-left {
          animation: slideLeft var(--animation-duration, 20s) linear infinite;
        }
        
        .animate-wavy-right {
          animation: wavyRight var(--animation-duration, 20s) ease-in-out infinite;
        }
        
        .animate-wavy-left {
          animation: wavyLeft var(--animation-duration, 20s) ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default RandomStickersPage;