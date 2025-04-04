'use client'
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import Image from "next/image";

const VideoReview: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Replace with your actual YouTube video ID
  const YOUTUBE_VIDEO_ID = 'QkVv2VL_WzI';
  const YOUTUBE_PLAYLIST_ID = 'PLJOFnpUbt3oBWkAoDGSk17kW3K8nOD3SC';
  const thumbnailUrl = `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/?listType=playlist&list=${YOUTUBE_PLAYLIST_ID}&version=3`;
  https://www.youtube.com/playlist?list=PLJOFnpUbt3oBWkAoDGSk17kW3K8nOD3SC
  return (
    <div className="bg-rendang-cream/50 rounded-xl p-6 md:p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-rendang-darkbrown mb-2 font-playfair">
          Lihat Sendiri Kualitas Rendang Kami
        </h3>
        <p className="text-rendang-darkbrown/80 max-w-2xl mx-auto">
          Tontonan autentik dari dapur kami ke meja makan pelanggan. Lihat bagaimana rendang kami dibuat dengan penuh cinta dan rempah pilihan.
        </p>
      </div>
      <div className="max-w-3xl mx-auto relative">
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="relative group cursor-pointer aspect-video bg-rendang-darkbrown/20">
              {!isPlaying ? (
                <>
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={() => setIsPlaying(true)}
                  role="button"
                  aria-label="Play video"
                >
                  <div className="w-20 h-20 rounded-full bg-rendang-maroon/90 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play className="h-10 w-10 text-white" fill="white" />
                  </div>
                  </div>
                  <Image
                    src={thumbnailUrl}
                    alt="Video thumbnail"
                    width={768}
                    height={432}
                    className="w-full h-full object-cover"
                  />
                </>
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src={embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full h-full"
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-rendang-maroon font-semibold">
          ⭐ Video ini telah ditonton lebih dari 10,000 kali di media sosial kami!
        </p>
      </div>
    </div>
  );
};

export default VideoReview;
