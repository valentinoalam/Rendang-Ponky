"use client";

import React, { ReactNode, useEffect, useRef } from "react";

export interface BaseParticle {
  element: HTMLElement | SVGSVGElement;
  left: number;
  size: number;
  top: number;
}

export interface BaseParticleOptions {
  particle?: string;
  size?: number;
}

export interface SpritesheetOptions {
  url: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  framesPerRow?: number;
  animationSpeed?: number; // milliseconds per frame
  animationType?: 'full' | 'static' | 'range'; // default: 'full'
  framesPerParticle?: number; // for 'range' mode, how many frames each particle uses
}

export interface CoolParticle extends BaseParticle {
  direction: number;
  speedHorz: number;
  speedUp: number;
  spinSpeed: number;
  spinVal: number;
  currentFrame?: number;
  lastFrameTime?: number;
  frameRangeStart?: number; // for 'range' mode
  frameRangeEnd?: number;   // for 'range' mode
}

export interface CoolParticleOptions extends BaseParticleOptions {
  particleCount?: number;
  speedHorz?: number;
  speedUp?: number;
  spinSpeed?: number;
  spritesheet?: SpritesheetOptions;
}

const getContainer = () => {
  const id = "_coolMode_effect";
  const existingContainer = document.getElementById(id);

  if (existingContainer) {
    return existingContainer;
  }

  const container = document.createElement("div");
  container.setAttribute("id", id);
  container.setAttribute(
    "style",
    "overflow:hidden; position:fixed; height:100%; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:2147483647",
  );

  document.body.appendChild(container);

  return container;
};

let instanceCounter = 0;

const applyParticleEffect = (
  element: HTMLElement,
  options?: CoolParticleOptions,
): (() => void) => {
  instanceCounter++;

  const defaultParticle = "circle";
  const particleType = options?.particle || defaultParticle;
  const sizes = [15, 20, 25, 35, 45];
  const limit = 45;

  let particles: CoolParticle[] = [];
  let autoAddParticle = false;
  let mouseX = 0;
  let mouseY = 0;

  const container = getContainer();

  function generateParticle() {
    const size =
      options?.size || sizes[Math.floor(Math.random() * sizes.length)];
    const speedHorz =  Math.random() * (options?.speedHorz || 10);
    const speedUp = Math.random() * (options?.speedUp || 25);
    const spinVal = Math.random() * 360;
    const spinSpeed = Math.random() * (options?.spinSpeed || 35) * (Math.random() <= 0.5 ? -1 : 1);
    const top = mouseY - size / 2;
    const left = mouseX - size / 2;
    const direction = Math.random() <= 0.5 ? -1 : 1;

    const particle = document.createElement("div");

    if (options?.spritesheet) {
      // Handle spritesheet particles
      const spritesheet = options.spritesheet;
      const framesPerRow = spritesheet.framesPerRow || Math.ceil(Math.sqrt(spritesheet.frameCount));
      const animationType = spritesheet.animationType || 'full';
      
      let currentFrame: number;
      let frameRangeStart: number = 0;
      let frameRangeEnd: number = spritesheet.frameCount - 1;

      if (animationType === 'static') {
        // Option 1: Static frame per particle
        currentFrame = Math.floor(Math.random() * spritesheet.frameCount);
        frameRangeStart = currentFrame;
        frameRangeEnd = currentFrame;
      } else if (animationType === 'range' && spritesheet.framesPerParticle) {
        // Option 2: Range-based animation
        const framesPerParticle = spritesheet.framesPerParticle;
        const totalGroups = Math.ceil(spritesheet.frameCount / framesPerParticle);
        const groupIndex = Math.floor(Math.random() * totalGroups);
        
        frameRangeStart = groupIndex * framesPerParticle;
        frameRangeEnd = Math.min(frameRangeStart + framesPerParticle - 1, spritesheet.frameCount - 1);
        currentFrame = frameRangeStart;
      } else {
        // Default: Full animation (option 3)
        currentFrame = Math.floor(Math.random() * spritesheet.frameCount);
        frameRangeStart = 0;
        frameRangeEnd = spritesheet.frameCount - 1;
      }
      
      const frameX = (currentFrame % framesPerRow) * spritesheet.frameWidth;
      const frameY = Math.floor(currentFrame / framesPerRow) * spritesheet.frameHeight;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundImage = `url(${spritesheet.url})`;
      particle.style.backgroundSize = `${framesPerRow * size}px ${Math.ceil(spritesheet.frameCount / framesPerRow) * size}px`;
      particle.style.backgroundPosition = `-${(frameX * size) / spritesheet.frameWidth}px -${(frameY * size) / spritesheet.frameHeight}px`;
      particle.style.backgroundRepeat = 'no-repeat';

      const lastFrameTime = performance.now();

      particles.push({
        direction,
        element: particle,
        left,
        size,
        speedHorz,
        speedUp,
        spinSpeed,
        spinVal,
        top,
        currentFrame,
        lastFrameTime,
        frameRangeStart,
        frameRangeEnd,
      });
    } else if (particleType === "circle") {
      const svgNS = "http://www.w3.org/2000/svg";
      const circleSVG = document.createElementNS(svgNS, "svg");
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttributeNS(null, "cx", (size / 2).toString());
      circle.setAttributeNS(null, "cy", (size / 2).toString());
      circle.setAttributeNS(null, "r", (size / 2).toString());
      circle.setAttributeNS(
        null,
        "fill",
        `hsl(${Math.random() * 360}, 70%, 50%)`,
      );

      circleSVG.appendChild(circle);
      circleSVG.setAttribute("width", size.toString());
      circleSVG.setAttribute("height", size.toString());

      particle.appendChild(circleSVG);

      particles.push({
        direction,
        element: particle,
        left,
        size,
        speedHorz,
        speedUp,
        spinSpeed,
        spinVal,
        top,
      });
    } else if (
      particleType.startsWith("http") ||
      particleType.startsWith("/")
    ) {
      // Handle URL-based images
      particle.innerHTML = `<img src="${particleType}" width="${size}" height="${size}" style="border-radius: 50%">`;

      particles.push({
        direction,
        element: particle,
        left,
        size,
        speedHorz,
        speedUp,
        spinSpeed,
        spinVal,
        top,
      });
    } else {
      // Handle emoji or text characters
      const fontSizeMultiplier = 3; // Make emojis 3x bigger
      const emojiSize = size * fontSizeMultiplier;
      particle.innerHTML = `<div style="font-size: ${emojiSize}px; line-height: 1; text-align: center; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center; transform: scale(${fontSizeMultiplier}); transform-origin: center;">${particleType}</div>`;

      particles.push({
        direction,
        element: particle,
        left,
        size,
        speedHorz,
        speedUp,
        spinSpeed,
        spinVal,
        top,
      });
    }

    particle.style.position = "absolute";
    particle.style.transform = `translate3d(${left}px, ${top}px, 0px) rotate(${spinVal}deg)`;

    container.appendChild(particle);
  }

  function updateSpritesheetFrame(p: CoolParticle) {
    if (!options?.spritesheet || p.currentFrame === undefined || p.lastFrameTime === undefined || 
        p.frameRangeStart === undefined || p.frameRangeEnd === undefined) {
      return;
    }

    const spritesheet = options.spritesheet;
    const animationType = spritesheet.animationType || 'full';
    
    // Skip animation for static particles
    if (animationType === 'static') {
      return;
    }

    const currentTime = performance.now();
    const animationSpeed = spritesheet.animationSpeed || 100;

    if (currentTime - p.lastFrameTime > animationSpeed) {
      // Cycle within the particle's frame range
      p.currentFrame = p.currentFrame + 1;
      if (p.currentFrame > p.frameRangeEnd) {
        p.currentFrame = p.frameRangeStart;
      }
      
      p.lastFrameTime = currentTime;

      const framesPerRow = spritesheet.framesPerRow || Math.ceil(Math.sqrt(spritesheet.frameCount));
      const frameX = (p.currentFrame % framesPerRow) * spritesheet.frameWidth;
      const frameY = Math.floor(p.currentFrame / framesPerRow) * spritesheet.frameHeight;

      p.element.style.backgroundPosition = `-${(frameX * p.size) / spritesheet.frameWidth}px -${(frameY * p.size) / spritesheet.frameHeight}px`;
    }
  }

  function refreshParticles() {
    particles.forEach((p) => {
      p.left = p.left - p.speedHorz * p.direction;
      p.top = p.top - p.speedUp;
      p.speedUp = Math.min(p.size, p.speedUp - 1);
      p.spinVal = p.spinVal + p.spinSpeed;

      // Update spritesheet animation if applicable
      updateSpritesheetFrame(p);

      if (
        p.top >=
        Math.max(window.innerHeight, document.body.clientHeight) + p.size
      ) {
        particles = particles.filter((o) => o !== p);
        p.element.remove();
      }

      p.element.setAttribute(
        "style",
        [
          "position:absolute",
          "will-change:transform",
          `top:${p.top}px`,
          `left:${p.left}px`,
          `transform:rotate(${p.spinVal}deg)`,
          // Preserve existing background styles for spritesheet
          p.element.style.backgroundImage ? `background-image:${p.element.style.backgroundImage}` : '',
          p.element.style.backgroundSize ? `background-size:${p.element.style.backgroundSize}` : '',
          p.element.style.backgroundPosition ? `background-position:${p.element.style.backgroundPosition}` : '',
          p.element.style.backgroundRepeat ? `background-repeat:${p.element.style.backgroundRepeat}` : '',
          p.element.style.width ? `width:${p.element.style.width}` : '',
          p.element.style.height ? `height:${p.element.style.height}` : '',
        ].filter(Boolean).join(";"),
      );
    });
  }

  let animationFrame: number | undefined;

  let lastParticleTimestamp = 0;
  const particleGenerationDelay = 30;

  function loop() {
    const currentTime = performance.now();
    if (
      autoAddParticle &&
      particles.length < limit &&
      currentTime - lastParticleTimestamp > particleGenerationDelay
    ) {
      generateParticle();
      lastParticleTimestamp = currentTime;
    }

    refreshParticles();
    animationFrame = requestAnimationFrame(loop);
  }

  loop();

  const isTouchInteraction = "ontouchstart" in window;

  const tap = isTouchInteraction ? "touchstart" : "mousedown";
  const tapEnd = isTouchInteraction ? "touchend" : "mouseup";
  const move = isTouchInteraction ? "touchmove" : "mousemove";

  const updateMousePosition = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e) {
      mouseX = e.touches?.[0].clientX;
      mouseY = e.touches?.[0].clientY;
    } else {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
  };

  const tapHandler = (e: MouseEvent | TouchEvent) => {
    updateMousePosition(e);
    autoAddParticle = true;
  };

  const disableAutoAddParticle = () => {
    autoAddParticle = false;
  };

  element.addEventListener(move, updateMousePosition, { passive: true });
  element.addEventListener(tap, tapHandler, { passive: true });
  element.addEventListener(tapEnd, disableAutoAddParticle, { passive: true });
  element.addEventListener("mouseleave", disableAutoAddParticle, {
    passive: true,
  });

  return () => {
    element.removeEventListener(move, updateMousePosition);
    element.removeEventListener(tap, tapHandler);
    element.removeEventListener(tapEnd, disableAutoAddParticle);
    element.removeEventListener("mouseleave", disableAutoAddParticle);

    const interval = setInterval(() => {
      if (animationFrame && particles.length === 0) {
        cancelAnimationFrame(animationFrame);
        clearInterval(interval);

        if (--instanceCounter === 0) {
          container.remove();
        }
      }
    }, 500);
  };
};

interface CoolModeProps {
  children: ReactNode;
  className?: string;
  options?: CoolParticleOptions;
}

export const CoolMode: React.FC<CoolModeProps> = ({ children, className, options }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      return applyParticleEffect(ref.current, options);
    }
  }, [options]);

  return React.createElement('span', { className, ref }, children);
};