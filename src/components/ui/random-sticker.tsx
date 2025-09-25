'use client'
import ImageComponent from 'next/image';
import React, { useState, useEffect, useRef, useCallback } from 'react';

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
}

interface ExtractedSprite {
  id: number;
  dataUrl: string;
  col: number;
  row: number;
}

type Position = { x: number; y: number;}

const RandomStickersPage = ({children}: {children: React.ReactNode}) => {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [extractedSprites, setExtractedSprites] = useState<ExtractedSprite[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Configuration for your asset sheet
  const ASSET_SHEET_CONFIG = {
    // Replace with your actual asset sheet URL
    imageUrl: '/ingredients/Desktop1k.png', // Replace with your asset sheet path
    columns: 7,       // Number of columns in your sprite sheet
    rows: 21,          // Number of rows in your sprite sheet
    totalStickers: 147 // Total number of stickers (or calculate: columns * rows)
  };

  const STICKER_CONFIG = {
    count: 25,           // Number of stickers to display
    minSize: 100,         // Minimum sticker size
    maxSize: 130,         // Maximum sticker size
    minOpacity: 0.9,     // Minimum opacity
    maxOpacity: 1,     // Maximum opacity
    animationDuration: 20, // Animation duration in seconds
    minDistance: 100,    // Minimum distance between stickers (in pixels)
    maxAttempts: 50      // Maximum attempts to find a valid position
  };

  // Extract individual sprites from the asset sheet
  const extractSprites = useCallback((image: HTMLImageElement): ExtractedSprite[] => {
    const canvas = canvasRef.current;
    if (!canvas) return [];

    const ctx = canvas.getContext('2d');
    if (!ctx) return [];
    
    const sprites = [];

    // Calculate sprite dimensions from actual image size
    const spriteWidth = image.width / ASSET_SHEET_CONFIG.columns;
    const spriteHeight = image.height / ASSET_SHEET_CONFIG.rows;

    // Set canvas size to calculated sprite size
    canvas.width = spriteWidth;
    canvas.height = spriteHeight;

    const totalSprites = ASSET_SHEET_CONFIG.totalStickers || ASSET_SHEET_CONFIG.columns * ASSET_SHEET_CONFIG.rows;

    for (let i = 0; i < totalSprites; i++) {
      const col = i % ASSET_SHEET_CONFIG.columns;
      const row = Math.floor(i / ASSET_SHEET_CONFIG.columns);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the specific sprite onto canvas
      ctx.drawImage(
        image,
        col * spriteWidth,   // source x (calculated from actual image)
        row * spriteHeight,  // source y (calculated from actual image)
        spriteWidth,         // source width (calculated from actual image)
        spriteHeight,        // source height (calculated from actual image)
        0,                   // dest x
        0,                   // dest y
        spriteWidth,         // dest width
        spriteHeight         // dest height
      );

      // Convert canvas to data URL
      const spriteDataUrl = canvas.toDataURL();
      sprites.push({
        id: i,
        dataUrl: spriteDataUrl,
        col,
        row,
        width: spriteWidth,
        height: spriteHeight
      });
    }

    return sprites;
  },[ASSET_SHEET_CONFIG.columns, ASSET_SHEET_CONFIG.rows, ASSET_SHEET_CONFIG.totalStickers]);

  // Load asset sheet and extract sprites
  useEffect(() => {
    const loadAssetSheet = () => {
      const image = new Image();
      image.crossOrigin = 'anonymous'; // Handle CORS if needed
      
      image.onload = () => {
        const sprites = extractSprites(image);
        setExtractedSprites(sprites);
        setIsLoaded(true);
      };

      image.onerror = () => {
        console.error('Failed to load asset sheet');
        // Create placeholder sprites for demo
        const placeholderSprites = [];
        const totalSprites = ASSET_SHEET_CONFIG.columns * ASSET_SHEET_CONFIG.rows;
        // Use default dimensions for placeholder
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
        setIsLoaded(true);
      };

      image.src = ASSET_SHEET_CONFIG.imageUrl;
    };

    loadAssetSheet();
    
  }, [ASSET_SHEET_CONFIG.columns, ASSET_SHEET_CONFIG.imageUrl, ASSET_SHEET_CONFIG.rows, extractSprites]);

  // Check if two positions are too close
  const isPositionTooClose = useCallback((newPos: Position, existingPositions: Position[], minDistance: number) => {
    return existingPositions.some((pos: Position) => {
      const dx = Math.abs(newPos.x - pos.x);
      const dy = Math.abs(newPos.y - pos.y);
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < minDistance;
    });
  },[]);

  // Convert percentage position to pixel position for distance calculation
  const getPixelPosition = (percentX: number, percentY: number, containerWidth = window.innerWidth, containerHeight = window.innerHeight) => {
    return {
      x: (percentX / 100) * containerWidth,
      y: (percentY / 100) * containerHeight
    };
  };
  const generateStickers = useCallback(() => {
    const newStickers = [];
    const positions = [];
    for (let i = 0; i < STICKER_CONFIG.count; i++) {
      // Random sprite selection
      const randomSpriteIndex = Math.floor(Math.random() * extractedSprites.length);
      const selectedSprite = extractedSprites[randomSpriteIndex];
      
      // Generate size first as it affects collision detection
      const size = Math.random() * (STICKER_CONFIG.maxSize - STICKER_CONFIG.minSize) + STICKER_CONFIG.minSize;
      
      // Try to find a position that's not too close to existing stickers
      let validPosition = null;
      let attempts = 0;
      
      while (!validPosition && attempts < STICKER_CONFIG.maxAttempts) {
        const candidateX = Math.random() * 85 + 5; // 5% to 90% of screen width
        const candidateY = Math.random() * 85 + 5; // 5% to 90% of screen height
        
        const pixelPos = getPixelPosition(candidateX, candidateY);
        
        // Check distance from existing positions
        if (positions.length === 0 || !isPositionTooClose(pixelPos, positions, STICKER_CONFIG.minDistance)) {
          validPosition = { x: candidateX, y: candidateY };
          positions.push(pixelPos);
        }
        
        attempts++;
      }
      
      // If no valid position found after max attempts, use a random position anyway
      if (!validPosition) {
        validPosition = {
          x: Math.random() * 85 + 5,
          y: Math.random() * 85 + 5
        };
        const pixelPos = getPixelPosition(validPosition.x, validPosition.y);
        positions.push(pixelPos);
      }
      
      // Create sticker with valid position
      const sticker = {
        id: `sticker-${i}`,
        spriteId: selectedSprite.id,
        dataUrl: selectedSprite.dataUrl,
        x: validPosition.x,
        y: validPosition.y,
        size: size,
        opacity: Math.random() * (STICKER_CONFIG.maxOpacity - STICKER_CONFIG.minOpacity) + STICKER_CONFIG.minOpacity,
        rotation: 0, //Math.random() * 360,
        animationDelay: Math.random() * STICKER_CONFIG.animationDuration,
        floatDirection: Math.random() > 0.5 ? 1 : -1,
        scale: 0.8 + Math.random() * 0.4, // 0.8 to 1.2 scale
      };
      
      newStickers.push(sticker);
    }
    
    setStickers(newStickers);
  },[STICKER_CONFIG.animationDuration, STICKER_CONFIG.count, STICKER_CONFIG.maxAttempts, STICKER_CONFIG.maxOpacity, STICKER_CONFIG.maxSize, STICKER_CONFIG.minDistance, STICKER_CONFIG.minOpacity, STICKER_CONFIG.minSize, extractedSprites, isPositionTooClose]);

  // Generate random stickers when sprites are loaded
  useEffect(() => {
    if (isLoaded && extractedSprites.length > 0) {
      generateStickers();
    }
  }, [isLoaded, extractedSprites, generateStickers]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Hidden canvas for sprite extraction */}
      <canvas
        ref={canvasRef}
        className="hidden"
      />

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-white/90 rounded-lg p-6 shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading stickers...</p>
          </div>
        </div>
      )}

      {/* Floating Stickers */}
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          className="absolute z-0 pointer-events-none animate-float"
          style={{
            left: `${sticker.x}%`,
            top: `${sticker.y}%`,
            width: `${sticker.size}px`,
            height: `${sticker.size}px`,
            opacity: sticker.opacity,
            transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
            animationDelay: `${sticker.animationDelay}s`,
            animationDirection: sticker.floatDirection === 1 ? 'normal' : 'reverse'
          }}
        >
          <ImageComponent fill
            src={sticker.dataUrl}
            alt={`Sticker ${sticker.spriteId}`}
            className="w-full h-full object-contain drop-shadow-sm"
            draggable={false}
          />
        </div>
      ))}

      {/* Main Content */}
      {children}
      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(var(--initial-rotation)) scale(var(--initial-scale));
          }
          33% {
            transform: translateY(-15px) rotate(calc(var(--initial-rotation) + 3deg)) scale(calc(var(--initial-scale) * 1.05));
          }
          66% {
            transform: translateY(-8px) rotate(calc(var(--initial-rotation) - 2deg)) scale(calc(var(--initial-scale) * 0.98));
          }
        }
        
        .animate-float {
          animation: float ${STICKER_CONFIG.animationDuration}s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default RandomStickersPage;