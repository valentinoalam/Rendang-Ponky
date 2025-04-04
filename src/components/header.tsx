'use client'
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import React from "react";

const Header = () => {
  const isMobile = useIsMobile();
  return (
    <header className="w-full h-15 py-4 px-4 md:px-8 lg:px-16 bg-rendang-light/90 backdrop-blur-sm fixed top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="relative min-w-20 font-playfair text-rendang-maroon text-2xl font-bold">
          {isMobile? <h1>Rendang Pongky</h1> :
          <div className="fixed w-2/12 lg:w-42 bg-gradient-to-b from-transparent via-rendang-light/90 to-rendang-light/60 p-2 rounded-full left-6 top-3"

          >
            <Image
              src='/logo/logo-rendangponky.svg'
              alt="Rendang Pongky"
              width={150}
              height={150}
              className="inline-flex"
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </div>
          }
        </div>
        <nav className="hidden  md:flex space-x-8">
          <a href="#products" className="font-medium text-rendang-darkbrown hover:text-rendang-maroon transition-colors">
            Produk
          </a>
          <a href="#testimonials" className="font-medium text-rendang-darkbrown hover:text-rendang-maroon transition-colors">
            Testimoni
          </a>
          <a href="#about" className="font-medium text-rendang-darkbrown hover:text-rendang-maroon transition-colors">
            Tentang Kami
          </a>
          <a href="#contact" className="font-medium text-rendang-darkbrown hover:text-rendang-maroon transition-colors">
            Kontak
          </a>
        </nav>
        <div className="flex space-x-4">
          <button className="bg-rendang-maroon text-white py-2 px-4 rounded-md font-medium hidden md:block hover:bg-opacity-90 transition-colors">
            Pesan Sekarang
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
