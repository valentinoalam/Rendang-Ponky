// types/sprite.ts
export interface SpriteConfig {
  width: number;
  height: number;
  rows: number;
  cols: number;
  spacing?: number; // Optional spacing between sprites
}

export interface SpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
}

export interface RandomSprite {
  frame: SpriteFrame;
  x: number;
  y: number;
  id: string;
}
