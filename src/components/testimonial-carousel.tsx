'use client'
import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  location: string;
  content: string;
  avatarUrl?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Anna Sari",
    location: "Jakarta",
    content: "Rasanya persis seperti buatan nenek! Langganan tiap bulan karena kualitasnya konsisten dan bumbu meresap sempurna.",
    rating: 5,
    initials: "AS"
  },
  {
    name: "Budi Santoso", 
    location: "Surabaya",
    content: "Rendang paru nya kriuk di luar, lembut di dalam. Ga ada tandingannya! Sudah jadi favorit keluarga.",
    rating: 5,
    initials: "BS"
  },
  {
    name: "Cindy Wijaya",
    location: "Bandung", 
    content: "Praktis banget, tinggal panaskan. Sudah 3 kali reorder karena keluarga suka banget rasanya yang autentik.",
    rating: 4,
    initials: "CW"
  },
  {
    name: "Denny Pratama",
    location: "Medan",
    content: "Walau saya orang Medan yang kuat pedas, rendang ini tetap juara! Bumbunya meresap sampai ke dalam.",
    rating: 5,
    initials: "DP"
  },
  {
    name: "Eka Putri",
    location: "Yogyakarta",
    content: "Packaging rapih, rendang masih panas sampai rumah. Rasanya bikin kangen kampung halaman!",
    rating: 5,
    initials: "EP"
  },
  {
    name: "Fajar Nugroho",
    location: "Semarang", 
    content: "Harga sebanding dengan kualitas. Porsi banyak, rasa juara. Pasti order lagi minggu depan!",
    rating: 4,
    initials: "FN"
  }
];

const TestimonialCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    // const clientWidth = scrollContainer.clientWidth;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const autoScroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset to beginning when we've scrolled past half the content
      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      requestAnimationFrame(autoScroll);
    };

    const animationId = requestAnimationFrame(autoScroll);

    // Pause scrolling on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      requestAnimationFrame(autoScroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer?.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={18}
          className={`${
            index < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
          } transition-colors duration-200`}
        />
      ));
  };

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center w-fit px-3 rounded-lg mx-auto mb-12 backdrop-blur-2xl bg-gradient-to-br from-orange-50 to-red-50/90">
          <h2 className="text-4xl md:text-6xl font-bold text-rendang-maroon mb-4 text-center font-playfair">
            Dipercaya & Direkomendasikan
          </h2>
          <p className="text-lg text-orange-700 max-w-2xl mx-auto">
            Ribuan pelanggan telah merasakan kelezatan rendang autentik kami
          </p>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-hidden"
          style={{ 
            scrollBehavior: 'auto',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-orange-100 overflow-hidden">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r h-1/2 from-orange-400 to-red-400 p-6 relative overflow-clip">
                  <Image
                    className="absolute mix-blend-multiply w-full h-full left-0 top-0 object-cover opacity-65"
                    src="https://images.unsplash.com/photo-1671726203390-cdc4354ee2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="Image Description"
                    width={400}
                    height={400}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto"
                    }} />
                  <Quote className="absolute top-4 right-4 text-white/30" size={40} />
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl font-bold border-2 border-white/30">
                      {testimonial.initials}
                    </div>
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-white/80 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex justify-center mb-4 gap-1">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial text */}
                  <blockquote className="text-gray-700 text-center leading-relaxed font-medium relative">
                    <span className="text-4xl text-orange-300 absolute -top-2 -left-2 font-serif">&quot;</span>
                    {testimonial.content}
                    <span className="text-4xl text-orange-300 absolute -bottom-4 -right-2 font-serif">&quot;</span>
                  </blockquote>
                </div>

                {/* Bottom decoration */}
                <div className="h-2 bg-gradient-to-r from-orange-200 via-red-200 to-orange-200"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="flex justify-center items-center gap-8 mt-12 text-center">
          <div className="text-orange-800">
            <div className="text-3xl font-bold">1000+</div>
            <div className="text-sm">Pelanggan Puas</div>
          </div>
          <div className="w-px h-12 bg-orange-300"></div>
          <div className="text-orange-800">
            <div className="text-3xl font-bold">4.8/5</div>
            <div className="text-sm flex items-center gap-1">
              Rating Rata-rata
              <Star size={16} className="text-amber-400 fill-amber-400" />
            </div>
          </div>
          <div className="w-px h-12 bg-orange-300"></div>
          <div className="text-orange-800">
            <div className="text-3xl font-bold">95%</div>
            <div className="text-sm">Repeat Orders</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;