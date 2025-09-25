import { SpriteConfig, SpriteFrame } from "@/types/sprite";

export class SpriteSheet {
  private image: HTMLImageElement;
  private config: SpriteConfig;
  private frames: SpriteFrame[] = [];
  private isLoaded = false;
  private loadPromise: Promise<void>;

  constructor(imageSrc: string, config: SpriteConfig) {
    this.config = config;
    this.image = new Image();
    this.image.crossOrigin = 'anonymous';

    this.loadPromise = new Promise((resolve, reject) => {
      this.image.onload = () => {
        this.isLoaded = true;
        this.generateFrames();
        resolve();
      };
      this.image.onerror = () => {
        console.error(`Failed to load image at ${imageSrc}`);
        this.isLoaded = false;
        reject(new Error(`Failed to load image at ${imageSrc}`));
      };
    });

    this.image.src = imageSrc;
  }

  private generateFrames(): void {
    const { width, height, rows, cols, spacing = 0 } = this.config;
    this.frames = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const frame: SpriteFrame = {
          x: col * (width + spacing),
          y: row * (height + spacing),
          width,
          height,
          index: row * cols + col
        };
        this.frames.push(frame);
      }
    }
  }

  public async waitForLoad(): Promise<void> {
    return this.loadPromise;
  }

  public getFrames(): SpriteFrame[] {
    return [...this.frames];
  }

  public getFrame(index: number): SpriteFrame | null {
    return this.frames[index] || null;
  }

  public getRandomFrame(): SpriteFrame | null {
    if (this.frames.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.frames.length);
    return this.frames[randomIndex];
  }

  public extractFrameAsCanvas(frameIndex: number): HTMLCanvasElement | null {
    if (!this.isLoaded || frameIndex >= this.frames.length) return null;

    const frame = this.frames[frameIndex];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;

    canvas.width = frame.width;
    canvas.height = frame.height;

    ctx.drawImage(
      this.image,
      frame.x, frame.y, frame.width, frame.height,
      0, 0, frame.width, frame.height
    );

    return canvas;
  }

  public extractFrameAsDataURL(frameIndex: number): string | null {
    const canvas = this.extractFrameAsCanvas(frameIndex);
    return canvas ? canvas.toDataURL() : null;
  }

  public extractAllFramesAsDataURLs(): string[] {
    return this.frames.map((_, index) => 
      this.extractFrameAsDataURL(index) || ''
    ).filter(url => url !== '');
  }

  public drawFrame(
    ctx: CanvasRenderingContext2D,
    frameIndex: number,
    x: number,
    y: number,
    scale = 1
  ): void {
    if (!this.isLoaded || frameIndex >= this.frames.length) return;

    const frame = this.frames[frameIndex];
    ctx.drawImage(
      this.image,
      frame.x, frame.y, frame.width, frame.height,
      x, y, frame.width * scale, frame.height * scale
    );
  }

  public get totalFrames(): number {
    return this.frames.length;
  }

  public get loaded(): boolean {
    return this.isLoaded;
  }
}