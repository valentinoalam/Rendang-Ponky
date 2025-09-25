'use client'
import React, { useState, useEffect, useRef, CSSProperties } from 'react';

/**
 * Interface for the component's props.
 * Defines the parameters needed to configure the animation.
 */
interface FlameAnimationProps {
  /** The total number of frames in the spritesheet (columns * rows). */
  totalFrames: number;
  /** The number of columns in the spritesheet grid. */
  columns: number;
  /** The number of rows in the spritesheet grid. */
  rows: number; // Added 'rows' for dynamic height calculation
  /** The duration (in milliseconds) each frame is displayed. */
  frameDuration?: number;
  /** The URL or path to the spritesheet image. */
  spritesheetUrl: string;
}

/**
 * A React component to display a spritesheet animation.
 */
const FlameAnimation: React.FC<FlameAnimationProps> = ({
  totalFrames,
  columns,
  rows,
  frameDuration = 100, // Default to 100ms per frame
  spritesheetUrl,
}) => {
  // State to track the current frame index
  const [currentFrame, setCurrentFrame] = useState(0);
  
  // State to store the dynamically calculated frame dimensions
  const [frameDimensions, setFrameDimensions] = useState<{ width: number; height: number } | null>(null);

  const intervalRef = useRef<number | null>(null);

  // EFFECT 1: Load the image and calculate frame dimensions
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      // Calculate dimensions dynamically:
      const calculatedWidth = img.width / columns;
      const calculatedHeight = img.height / rows;
      
      setFrameDimensions({ width: calculatedWidth, height: calculatedHeight });
    };
    img.src = spritesheetUrl;

    // Handle potential errors if the image fails to load (optional but good practice)
    img.onerror = () => {
        console.error("Failed to load spritesheet image:", spritesheetUrl);
    };

    // Note: The image object itself doesn't need a cleanup.
  }, [spritesheetUrl, columns, rows]); // Recalculate if URL, columns, or rows change

  // EFFECT 2: Run the animation loop
  useEffect(() => {
    // Only start the animation if the frame dimensions have been calculated
    if (!frameDimensions) return;

    intervalRef.current = window.setInterval(() => {
      // Advance to the next frame, wrapping around
      setCurrentFrame(prevFrame => (prevFrame + 1) % totalFrames);
    }, frameDuration);

    // Cleanup: Clear the interval when the component unmounts
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [totalFrames, frameDuration, frameDimensions]); // Rerun if frameDimensions become available

  // Show a loading state until dimensions are calculated
  if (!frameDimensions) {
    return <div style={{ width: 50, height: 50, border: '1px dashed #ccc' }}>Loading...</div>;
  }

  const { width: frameWidth, height: frameHeight } = frameDimensions;
  
  // 1. Calculate the row and column of the current frame
  const colIndex = currentFrame % columns;
  const rowIndex = Math.floor(currentFrame / columns);

  // 2. Calculate the background position needed to show the current frame
  const backgroundPositionX = colIndex * frameWidth;
  const backgroundPositionY = rowIndex * frameHeight;

  // 3. Define the inline CSS styles
  const animationStyles: CSSProperties = {
    width: frameWidth,
    height: frameHeight,
    backgroundImage: `url(${spritesheetUrl})`,
    backgroundPosition: `-${backgroundPositionX}px -${backgroundPositionY}px`,
    backgroundRepeat: 'no-repeat',
    display: 'block',
    scale: '0.5', // Adjust the scale factor as needed
  };

  return <div style={animationStyles} aria-label="Animated Flame" role="img" />;
};

export default FlameAnimation;