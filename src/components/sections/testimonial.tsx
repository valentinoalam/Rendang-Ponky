'use client'
import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Testimonial {
  name: string;
  location: string;
  content: string;
  avatarUrl?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  initials: string;
  picUrl: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Anna Sari",
    location: "Jakarta",
    content: "Rasanya persis seperti buatan nenek! Langganan tiap bulan karena kualitasnya konsisten dan bumbu meresap sempurna.",
    rating: 5,
    initials: "AS",
    avatarUrl: "/diverse-woman-avatar.png",
    picUrl: "/testimonial/240876494_395895961958092_5958117326717331875_n.jpg"
  },
  {
    name: "Budi Santoso", 
    location: "Surabaya",
    content: "Rendang paru nya kriuk di luar, lembut di dalam. Ga ada tandingannya! Sudah jadi favorit keluarga.",
    rating: 5,
    avatarUrl: "/man-avatar.png",
    picUrl: "/testimonial/120352172_968602276959512_2784991697189590394_n.jpg",
    initials: "BS"
    
  },
  {
    name: "Cindy Wijaya",
    location: "Bandung", 
    content: "Praktis banget, tinggal panaskan. Sudah 3 kali reorder karena keluarga suka banget rasanya yang autentik.",
    rating: 4,
    picUrl: "/testimonial/RendangPonkygoesAbuDhabi.jpg",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB3juT2SFufvUP45p1y8maz-0fRUAQRq2C_xHrHLb2MHXfz8dEQBH__u8133SdMAnt1Z_bdJ2Z4xkDWjv6pqEX_E5TxJyrMr6xfjqS957e5ajZ1ar3yquOFA6vVOEyecZiKck89T10kkpu92U8AzCJy0NQWNFPN2TXmW-1q5YVA4gC83cIOpU-yV8os5GG3T8g_HutlODI6u0wlvOkq4bJbEtCT9kwKxuyNcUErWnh5JK1BiW74xTXGnia-QrjG2HhhxAl84akRyIj",
    initials: "CW"
  },
  {
    name: "Denny Pratama",
    location: "Medan",
    content: "Walau saya orang Medan yang kuat pedas, rendang ini tetap juara! Bumbunya meresap sampai ke dalam.",
    rating: 5,
    picUrl: "/testimonial/IMG-20220521-WA0020.jpg",
    avatarUrl: "/man-avatar-2.png",
    initials: "DP"
  },
  {
    name: "Eka Putri",
    location: "Yogyakarta",
    content: "Packaging rapih, rendang masih panas sampai rumah. Rasanya bikin kangen kampung halaman!",
    rating: 5,
    picUrl: "/testimonial/IMG-20220503-WA0001.jpg",
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB3juT2SFufvUP45p1y8maz-0fRUAQRq2C_xHrHLb2MHXfz8dEQBH__u8133SdMAnt1Z_bdJ2Z4xkDWjv6pqEX_E5TxJyrMr6xfjqS957e5ajZ1ar3yquOFA6vVOEyecZiKck89T10kkpu92U8AzCJy0NQWNFPN2TXmW-1q5YVA4gC83cIOpU-yV8os5GG3T8g_HutlODI6u0wlvOkq4bJbEtCT9kwKxuyNcUErWnh5JK1BiW74xTXGnia-QrjG2HhhxAl84akRyIj',
    initials: "EP"
  },
  {
    name: "Fajar Nugroho",
    location: "Semarang", 
    content: "Harga sebanding dengan kualitas. Porsi banyak, rasa juara. Pasti order lagi minggu depan!",
    rating: 4,
    picUrl: "/testimonial/IMG-20220521-WA0013.jpg",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPU5awtp_01wXYBzwHzRAiiocnNFk-2BumhPuSO7NP4rYlRoK0dNDYe-ZrHW5LGk_twt5MFxZXKPDjNO31KP-WFXgr4RilaWNeDnrXZgoNV2kYFzq7bz0KfGfpNZRjXAMixjsVhbh5YfazW4CV-RjKpPyAI4f7orkoSsyrkSZl697IhCyBOSoYbciPiyD4yoZJy01utNv5MfIPgF_ykEiZkwJiLBTADMm4V2ayFsKUTuxawCKOFTt7v0ibnOQYgcoKt7BAzY8bk9u2",
    initials: "FN"
  }
];

const TestimonialCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.clientWidth;
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
          className="flex gap-6 pt-3 overflow-hidden"
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
                <div className="p-6 h-full min-h-40 relative">
                  <Image
                    className="absolute top-0 bottom-0 w-full h-full left-0 object-fill object-bottom opacity-65"
                    src={testimonial.picUrl}
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
                    <Avatar className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl font-bold border-2 border-white/30 place-self-center">
                      {testimonial.avatarUrl ? (
                        <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                      ) : (
                        <AvatarFallback className="bg-rendang-cream text-rendang-maroon">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-white/80 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="group-hover:translate-y-full transition-all duration-500 transform bg-gradient-to-r h-1/2 from-orange-400/80 to-red-400/90 backdrop-blur-xs p-6">
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