// hooks/useSprites.ts
import { SpriteSheet } from '@/lib/spritesheet';
import { SpriteConfig, RandomSprite } from '@/types/sprite';
import { createRandomSprites } from '@/utils/sprite-utils';
import { useState, useEffect, useCallback, useRef } from 'react';


interface UseSpritesOptions {
  spriteSheetUrl: string;
  spriteConfig: SpriteConfig;
  containerWidth?: number;
  containerHeight?: number;
  initialCount?: number;
}

interface UseSpritesReturn {
  spriteSheet: SpriteSheet | null;
  sprites: RandomSprite[];
  isLoaded: boolean;
  error: string | null;
  generateRandomSprites: (count?: number) => void;
  addSprite: (x?: number, y?: number) => void;
  removeSprite: (id: string) => void;
  clearSprites: () => void;
  extractFrameAsDataURL: (frameIndex: number) => string | null;
  extractAllFramesAsDataURLs: () => string[];
  totalFrames: number;
}

export const useSprites = ({
  spriteSheetUrl,
  spriteConfig,
  containerWidth = 800,
  containerHeight = 600,
  initialCount = 0
}: UseSpritesOptions): UseSpritesReturn => {
  const [spriteSheet, setSpriteSheet] = useState<SpriteSheet | null>(null);
  const [sprites, setSprites] = useState<RandomSprite[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const spriteSheetRef = useRef<SpriteSheet | null>(null);

  // Initialize sprite sheet
  useEffect(() => {
    const initializeSpriteSheet = async () => {
      try {
        setError(null);
        setIsLoaded(false);
        
        const newSpriteSheet = new SpriteSheet(spriteSheetUrl, spriteConfig);
        spriteSheetRef.current = newSpriteSheet;
        
        await newSpriteSheet.waitForLoad();
        
        setSpriteSheet(newSpriteSheet);
        setIsLoaded(true);

        // Generate initial sprites if count is specified
        if (initialCount > 0) {
          const initialSprites = createRandomSprites(
            newSpriteSheet,
            initialCount,
            containerWidth,
            containerHeight
          );
          setSprites(initialSprites);
        }
      } catch (err) {
        setError(`Failed to load sprite sheet: ${err}`);
        console.error('Sprite sheet loading error:', err);
      }
    };

    initializeSpriteSheet();
  }, [spriteSheetUrl, spriteConfig, containerWidth, containerHeight, initialCount]);

  // Generate random sprites
  const generateRandomSprites = useCallback((count?: number) => {
    if (!spriteSheetRef.current) return;

    const spriteCount = count ?? (sprites.length || 10);
    const newSprites = createRandomSprites(
      spriteSheetRef.current,
      spriteCount,
      containerWidth,
      containerHeight
    );
    setSprites(newSprites);
  }, [containerWidth, containerHeight, sprites.length]);

  // Add a single sprite
  const addSprite = useCallback((x?: number, y?: number) => {
    if (!spriteSheetRef.current) return;

    const frame = spriteSheetRef.current.getRandomFrame();
    if (!frame) return;

    const position = {
      x: x ?? Math.random() * (containerWidth - frame.width),
      y: y ?? Math.random() * (containerHeight - frame.height)
    };

    const newSprite: RandomSprite = {
      frame,
      x: position.x,
      y: position.y,
      id: `sprite-${Date.now()}-${Math.random()}`
    };

    setSprites(prev => [...prev, newSprite]);
  }, [containerWidth, containerHeight]);

  // Remove sprite by ID
  const removeSprite = useCallback((id: string) => {
    setSprites(prev => prev.filter(sprite => sprite.id !== id));
  }, []);

  // Clear all sprites
  const clearSprites = useCallback(() => {
    setSprites([]);
  }, []);

  // Extract frame as data URL
  const extractFrameAsDataURL = useCallback((frameIndex: number): string | null => {
    return spriteSheetRef.current?.extractFrameAsDataURL(frameIndex) || null;
  }, []);

  // Extract all frames as data URLs
  const extractAllFramesAsDataURLs = useCallback((): string[] => {
    return spriteSheetRef.current?.extractAllFramesAsDataURLs() || [];
  }, []);

  const totalFrames = spriteSheet?.totalFrames || 0;

  return {
    spriteSheet,
    sprites,
    isLoaded,
    error,
    generateRandomSprites,
    addSprite,
    removeSprite,
    clearSprites,
    extractFrameAsDataURL,
    extractAllFramesAsDataURLs,
    totalFrames
  };
};

// Example usage component
export const SpriteHookExample: React.FC = () => {
  const {
    sprites,
    isLoaded,
    error,
    generateRandomSprites,
    addSprite,
    clearSprites,
    totalFrames
  } = useSprites({
    spriteSheetUrl: '/sprites/characters.png',
    spriteConfig: {
      width: 32,
      height: 32,
      rows: 4,
      cols: 4
    },
    containerWidth: 800,
    containerHeight: 600,
    initialCount: 5
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isLoaded) {
    return <div>Loading sprites...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 space-x-2">
        <button 
          onClick={() => generateRandomSprites(10)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Generate 10 Random
        </button>
        <button 
          onClick={() => addSprite()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add One
        </button>
        <button 
          onClick={clearSprites}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear All
        </button>
      </div>
      
      <div className="mb-2">
        <span>Sprites: {sprites.length} | Total Frames: {totalFrames}</span>
      </div>

      <div className="relative w-full h-96 bg-gray-200 border">
        {sprites.map(sprite => (
          <div
            key={sprite.id}
            className="absolute w-8 h-8 bg-blue-500 rounded"
            style={{
              left: sprite.x,
              top: sprite.y,
              width: sprite.frame.width,
              height: sprite.frame.height
            }}
            title={`Frame: ${sprite.frame.index}`}
          />
        ))}
      </div>
    </div>
  );
};