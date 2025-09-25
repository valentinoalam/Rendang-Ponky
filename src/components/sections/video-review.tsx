'use client'

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Volume2, VolumeX, SkipForward, Power } from 'lucide-react';
import { cn } from '@/lib/utils';
import { gsap, Power2 } from 'gsap';
interface VCREffectConfig {
  fps: number;
  blur: number;
  opacity: number;
  miny: number;
  miny2: number;
  num: number;
}

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class VCREffect {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private config: VCREffectConfig;
  private vcrInterval: number | null = null;

  constructor(canvas: HTMLCanvasElement, options: Partial<VCREffectConfig> = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.config = {
      fps: 60,
      blur: 1,
      opacity: 1,
      miny: 220,
      miny2: 220,
      num: 70,
      ...options
    };

    this.init();
  }

  private init(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.opacity = this.config.opacity.toString();

    this.generateVCRNoise();
    window.addEventListener("resize", () => this.onResize());
  }

  private onResize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private generateVCRNoise(): void {
    if (this.config.fps >= 60) {
      if (this.vcrInterval) cancelAnimationFrame(this.vcrInterval);
      const animate = () => {
        this.renderTrackingNoise();
        this.vcrInterval = requestAnimationFrame(animate);
      };
      animate();
    } else {
      if (this.vcrInterval) clearInterval(this.vcrInterval);
      this.vcrInterval = window.setInterval(() => {
        this.renderTrackingNoise();
      }, 1000 / this.config.fps);
    }
  }

  private renderTrackingNoise(radius: number = 2): void {
    const { canvas, ctx, config } = this;
    let { miny, miny2 } = config;
    const { num } = config;

    canvas.style.filter = `blur(${config.blur}px)`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `#fff`;

    ctx.beginPath();
    for (let i = 0; i <= num; i++) {
      const x = Math.random() * canvas.width;
      const y1 = getRandomInt(miny += 3, canvas.height);
      const y2 = getRandomInt(0, miny2 -= 3);
      ctx.fillRect(x, y1, radius, radius);
      ctx.fillRect(x, y2, radius, radius);
      ctx.fill();

      this.renderTail(ctx, x, y1, radius);
      this.renderTail(ctx, x, y2, radius);
    }
    ctx.closePath();
  }

  private renderTail(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
    const n = getRandomInt(1, 50);
    const dirs = [1, -1];
    const dir = dirs[Math.floor(Math.random() * dirs.length)];

    for (let i = 0; i < n; i++) {
      const r = getRandomInt(radius - 0.01, radius);
      const dx = getRandomInt(1, 4) * dir;
      radius -= 0.1;
      ctx.fillRect((x += dx), y, r, r);
      ctx.fill();
    }
  }

  public destroy(): void {
    if (this.vcrInterval) {
      if (this.config.fps >= 60) {
        cancelAnimationFrame(this.vcrInterval);
      } else {
        clearInterval(this.vcrInterval);
      }
    }
    window.removeEventListener("resize", () => this.onResize());
  }
}

interface YouTubePlayer {
  loadVideoById: (videoId: string) => void;
  setVolume: (volume: number) => void;
  pauseVideo: () => void;
  playVideo: () => void;
}

interface YouTubeEvent {
  data: number;
}

interface YouTubePlayerConfig {
  height: string;
  width: string;
  videoId: string;
  playerVars: Record<string, number>;
  events: {
    onReady: () => void;
    onStateChange: (event: YouTubeEvent) => void;
  };
}

declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, config: YouTubePlayerConfig) => YouTubePlayer;
      PlayerState: {
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

const VideoReview: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const vcrEffectRef = useRef<VCREffect | null>(null);
  const videoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showSnow, setShowSnow] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(50);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [isTVOn, setIsTVOn] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const buildTimeline = () => {
    if (!gsap || !playerContainerRef.current) return;

    // Create timeline with modern GSAP syntax
    const timeline = gsap.timeline({
      paused: true
    });
    
    timeline
      .to(playerContainerRef.current, {
        duration: 0.2,
        width: '100vw',
        height: '2px',
        background: '#ffffff',
        ease: Power2.easeOut
      })
      .to(playerContainerRef.current, {
        duration: 0.2,
        width: '0',
        height: '0',
        background: '#ffffff',
        ease: Power2.easeOut
      });
    
    timelineRef.current = timeline;
  };
  const videoIds = useMemo(() => [
    {link:"QkVv2VL_WzI", dur: 92}, // 1:32
    {link:"Ki6uUPFH38w", dur: 91}, // 1:31
    {link:"-8QdzVlVMM0", dur: 60}, // 1:00
    {link:"oGaTPdtwPpY", dur: 19}, // 0:19
    {link:"UKMFqv2uAL8", dur: 39}, // 0:39
  ], []);

  // Format seconds to time string
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Switch to next video
  const switchVideo = useCallback(() => {
    setShowSnow(true);
    
    // Clear existing timers
    if (videoTimerRef.current) clearTimeout(videoTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    
    transitionTimerRef.current = setTimeout(() => {
      const nextIndex = (currentVideoIndex + 1) % videoIds.length;
      setCurrentVideoIndex(nextIndex);
      
      if (playerRef.current && isPlayerReady) {
        playerRef.current.loadVideoById(videoIds[nextIndex].link);
      }
      
      setShowSnow(false);
    }, 1500);
  }, [currentVideoIndex, videoIds, isPlayerReady]);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setApiLoaded(true);
      };
    } else {
      setApiLoaded(true);
    }
    buildTimeline();
  }, []);

  // Initialize YouTube player
  useEffect(() => {
    if (apiLoaded && playerContainerRef.current && !playerRef.current) {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoIds[currentVideoIndex].link,
        playerVars: {
          autoplay: 1,
          loop: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0
        },
        events: {
          onReady: () => {
            setIsPlayerReady(true);
            if (playerRef.current) {
              playerRef.current.setVolume(isMuted ? 0 : volume);
            }
          },
          onStateChange: (event: YouTubeEvent) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              switchVideo();
            }
          }
        }
      });
    }
  }, [apiLoaded, currentVideoIndex, videoIds, isMuted, volume, switchVideo]);

  // Initialize VCR effect
  useEffect(() => {
    if (canvasRef.current) {
      vcrEffectRef.current = new VCREffect(canvasRef.current, {
        opacity: 0.8,
        miny: 220,
        miny2: 220,
        num: 70,
        fps: 60,
        blur: 1
      });
    }

    return () => {
      if (vcrEffectRef.current) {
        vcrEffectRef.current.destroy();
      }
    };
  }, []);

  // Handle video timing and countdown
  useEffect(() => {
    if (!isPlayerReady) return;

    const currentVideo = videoIds[currentVideoIndex];
    const duration = currentVideo.dur;
    
    setTimeRemaining(duration);

    // Clear existing timers
    if (videoTimerRef.current) clearTimeout(videoTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    // Countdown timer
    countdownIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Switch video when duration is reached
    videoTimerRef.current = setTimeout(() => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      switchVideo();
    }, duration * 1000);

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (videoTimerRef.current) clearTimeout(videoTimerRef.current);
    };
  }, [currentVideoIndex, isPlayerReady, switchVideo, videoIds]);

  // Update player volume when settings change
  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      const volumeLevel = isMuted ? 0 : volume;
      playerRef.current.setVolume(volumeLevel);
    }
  }, [isMuted, volume, isPlayerReady]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const skipToNext = () => {
    if (videoTimerRef.current) clearTimeout(videoTimerRef.current);
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    switchVideo();
  };

  const turnOffTV = () => {
    if (isShuttingDown || !isTVOn) return;
    
    setIsShuttingDown(true);
    if (timelineRef.current) timelineRef.current.restart();
    // Pause the video and mute
    if (playerRef.current && isPlayerReady) {
      playerRef.current.pauseVideo();
      playerRef.current.setVolume(0);
    }
    
    // Clear all timers
    if (videoTimerRef.current) clearTimeout(videoTimerRef.current);
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    
    // TV shutdown sequence
    setTimeout(() => {
      setIsTVOn(false);
      setIsShuttingDown(false);
    }, 1500);
  };

  const turnOnTV = () => {
    if (isTVOn || isShuttingDown) return;
    
    setIsTVOn(true);
    if (timelineRef.current) timelineRef.current.reverse();
    // Restart video after a short delay
    setTimeout(() => {
      if (playerRef.current && isPlayerReady) {
        playerRef.current.playVideo();
        playerRef.current.setVolume(isMuted ? 0 : volume);
      }
    }, 500);
  };
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* TV Screen Frame */}
      <div 
        className="z-10 bg-cover bg-center bg-no-repeat"
        style={{
          width: '100vw',
          height: '50vw',
          maxWidth: '800px',
          maxHeight: '600px',
          backgroundImage: 'url(/base.png)'
        }}
      />
      
      {/* TV Content Container */}
      <div 
        className="absolute z-[1] flex justify-center items-center overflow-hidden rounded-lg"
        style={{
          marginBottom: '3vw',
          width: '60vw',
          marginRight: '10vw',
          height: '45vw',
          maxWidth: '600px',
          maxHeight: '450px',
          background: 'linear-gradient(to left, #16222A, #3A6073)',
          backgroundImage: 'url(https://cldup.com/gn3s3Fg75t.gif)',
          backgroundSize: 'cover',
          color: '#e1eef6'
        }}
      >
        {/* YouTube Player Container */}
        <div 
          ref={playerContainerRef}
          className={`w-full h-full screen transition-all duration-300 ${
            !isTVOn ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            filter: 'contrast(1.2) brightness(1.1) saturate(0.9)'
          }}
        >
          <div id="youtube-player" className="w-full h-full"></div>
        </div>

        {/* TV Shutdown Effect */}
        <div 
          className={`absolute top-0 left-0 w-full h-full z-[5] bg-black transition-all duration-1000 ease-out ${
            isShuttingDown ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            background: isShuttingDown 
              ? 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, rgba(0,0,0,1) 100%)'
              : 'transparent',
            transform: isShuttingDown ? 'scaleY(0.02) scaleX(1)' : 'scaleY(1) scaleX(1)',
            transformOrigin: 'center',
            animation: isShuttingDown ? 'tvShutdown 1.5s ease-out forwards' : 'none'
          }}
        />

        {/* TV Off State */}
        <div 
          className={`absolute top-0 left-0 w-full h-full z-[4] bg-black flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
            !isTVOn && !isShuttingDown ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={turnOnTV}
        >
          <div className="text-gray-600 text-center">
            <Power size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">TV is OFF</p>
            <p className="text-sm opacity-75">Click to turn on</p>
          </div>
        </div>
        {/* Loading Indicator */}
        {!isPlayerReady && isTVOn && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white bg-black/80 px-4 py-2 rounded">
            Loading TV...
          </div>
        )}
        {/* VCR Noise Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute left-0 z-[9] w-full h-full pointer-events-none transition-opacity duration-300"
          style={{
            mixBlendMode: 'screen',
            opacity: !isTVOn ? 0 : 1, // The opacity expression is moved here
          }}
        />

        {/* Glitch Effect */}
        <div 
          className={`pointer-events-none absolute top-0 left-0 w-full h-full z-[2] opacity-20 transition-opacity duration-300 ${
            !isTVOn ? 'opacity-0' : 'opacity-20'
          }`}
          style={{
            background: 'url("/Television_static.gif")',
            mixBlendMode: 'multiply',
            animation: isTVOn ? 'glitchMove 0.2s infinite linear' : 'none'
          }}
        />

        {/* Scan Lines */}
        <div 
          className={`absolute top-0 left-0 w-full h-full pointer-events-none z-[2] transition-opacity duration-300 ${
            !isTVOn ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            background: `repeating-linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) 0px,
              rgba(0, 0, 0, 0.15) 1px,
              rgba(0, 0, 0, 0) 2px
            )`
          }}
        />

        {/* Snow Effect for Transitions */}
        <div 
          className={`absolute top-0 left-0 w-full h-full z-[8] pointer-events-none bg-cover transition-opacity duration-300 ease-in-out ${
            showSnow && isTVOn ? 'opacity-90' : 'opacity-0'
          }`}
          style={{
            background: 'url("/Television_static.gif")',
            backgroundSize: 'cover'
          }}
        />
      </div>

      {/* Control Panel */}
      <div className={`absolute w-full sm:w-[80%] md:w-1/2 justify-around bottom-8 left-1/2 transform -translate-x-1/2 z-30 bg-black/90 backdrop-blur-sm rounded-lg p-2 flex items-center gap-4 border border-gray-600 shadow-2xl transition-opacity duration-300 ${
        !isTVOn ? 'opacity-50' : 'opacity-100'
      }`}>
        {/* Power Button */}
        <button
          onClick={isTVOn ? turnOffTV : turnOnTV}
          disabled={isShuttingDown}
          className={`transition-all duration-200 p-2 rounded-full border-2 ${
            isTVOn 
              ? 'text-red-400 border-red-400 bg-red-400/10 hover:bg-red-400/20 hover:text-red-300' 
              : 'text-green-400 border-green-400 bg-green-400/10 hover:bg-green-400/20 hover:text-green-300'
          } ${isShuttingDown ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          title={isTVOn ? "Turn Off TV" : "Turn On TV"}
        >
          <Power size={24} className={cn( "min-h-8", isShuttingDown ? 'animate-pulse' : '')} />
        </button>
        {/* Time Display */}
        <div className={`text-green-400 font-mono text-lg font-bold min-w-[60px] bg-black/50 px-2 py-1 rounded transition-opacity duration-200 ${
          !isTVOn ? 'opacity-50' : 'opacity-100'
        }`}>
          {formatTime(timeRemaining)}
        </div>

        {/* Video Counter */}
        <div className={`text-gray-300 text-sm bg-gray-800 px-2 py-1 rounded transition-opacity duration-200 ${
          !isTVOn ? 'opacity-50' : 'opacity-100'
        }`}>
          {currentVideoIndex + 1}/{videoIds.length}
        </div>

        {/* Mute Toggle */}
        <button
          onClick={toggleMute}
          disabled={!isTVOn}
          className={`text-white h-max hover:text-green-400 transition-colors p-2 bg-gray-800 hover:bg-gray-700 rounded-full ${
            !isTVOn ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className='min-h-8' size={24} /> : <Volume2 className='min-h-8' size={24} />}
        </button>

        {/* Volume Slider */}
        <div className={`flex w-1/6 min-w-26 items-center gap-3 bg-gray-800 px-3 py-2 rounded-lg transition-opacity duration-200 ${
          !isTVOn ? 'opacity-50' : 'opacity-100'
        }`}>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            disabled={!isTVOn}
            className={`max-w-24 min-w-12  w-1/6 h-2 bg-gray-600 rounded-lg appearance-none slider ${
              !isTVOn ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
          />
          <span className="text-gray-300 text-sm min-w-[35px] font-mono">
            {isMuted ? 0 : volume}%
          </span>
        </div>

        {/* Skip Button */}
        <button
          onClick={skipToNext}
          disabled={!isTVOn}
          className={`text-white w-fit justify-self-end hover:text-green-400 transition-colors px-0.5 md:px-3 py-2 border border-gray-600 rounded-lg hover:border-green-400 bg-gray-800 hover:bg-gray-700 flex items-center gap-2 ${
            !isTVOn ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <SkipForward className='min-h-8' height={8} size={18} />
          <span className="text-sm">Skip</span>
        </button>
      </div>

      

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes glitchMove {
          0% { transform: translateX(0); }
          33% { transform: translateX(-3px); }
          66% { transform: translateX(3px); }
          100% { transform: translateX(0); }
        }
        
        @keyframes tvShutdown {
          0% {
            transform: scaleY(1) scaleX(1);
            opacity: 1;
          }
          50% {
            transform: scaleY(0.02) scaleX(1);
            opacity: 1;
          }
          100% {
            transform: scaleY(0.02) scaleX(1);
            opacity: 0;
          }
        }
        
        .slider {
          background: linear-gradient(to right, #10b981 0%, #10b981 ${isMuted ? 0 : volume}%, #6b7280 ${isMuted ? 0 : volume}%, #6b7280 100%);
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid #065f46;
          box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid #065f46;
          box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
        }
        
        .slider:hover::-webkit-slider-thumb {
          transform: scale(1.1);
        }
        
        .slider:disabled::-webkit-slider-thumb {
          background: #6b7280;
          border-color: #374151;
          cursor: not-allowed;
        }
        
        .slider:disabled::-moz-range-thumb {
          background: #6b7280;
          border-color: #374151;
          cursor: not-allowed;
        }
                
        .screen {
          background-color: #e1eef6;
          content: " ";
          overflow: hidden;
          background: #16222A;
          background: -webkit-linear-gradient(to left, #16222A, #3A6073);
          background: linear-gradient(to left, #16222A, #3A6073);
          background-size: cover;
          background-image: url(https://cldup.com/gn3s3Fg75t.gif);
          color: #e1eef6;
        }
      `}</style>
    </div>
  );
};

export default VideoReview;