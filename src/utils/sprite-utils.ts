import { SpriteSheet } from "@/lib/spritesheet";
import { RandomSprite } from "@/types/sprite";

export function generateRandomPosition(
  containerWidth: number,
  containerHeight: number,
  spriteWidth: number,
  spriteHeight: number
): { x: number; y: number } {
  return {
    x: Math.random() * (containerWidth - spriteWidth),
    y: Math.random() * (containerHeight - spriteHeight)
  };
}

export function createRandomSprites(
  spriteSheet: SpriteSheet,
  count: number,
  containerWidth: number,
  containerHeight: number
): RandomSprite[] {
  const sprites: RandomSprite[] = [];
  
  for (let i = 0; i < count; i++) {
    const frame = spriteSheet.getRandomFrame();
    if (frame) {
      const position = generateRandomPosition(
        containerWidth,
        containerHeight,
        frame.width,
        frame.height
      );
      
      sprites.push({
        frame,
        x: position.x,
        y: position.y,
        id: `sprite-${Date.now()}-${i}`
      });
    }
  }
  
  return sprites;
}