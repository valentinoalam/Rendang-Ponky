'use client'
import React, { useState, useEffect } from 'react';
import Logo from './logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const pathName = usePathname();
  
  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element)?.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#video-review', label: 'Review' },
    { href: '#key-benefit', label: 'Benefit' },
    { href: '#testimonials', label: 'Testimonial' },
    { href: '#faq', label: 'faq' },
    { href: '#products', label: 'products' },
  ];

  const isActive = (href: string) => {
    return pathName === href;
  };

  const leftNavLinks = navLinks.slice(0, 2);
  const rightNavLinks = navLinks.slice(2);

  return (
    <header className="w-full h-15 py-4 px-4 md:px-8 lg:px-16 bg-rendang-light/90 backdrop-blur-sm fixed top-0 z-50">
      {/* Fixed navbar */}
      <div className={`fixed font-playfair top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-#FDF4EE/95 backdrop-blur-md shadow-lg border-b border-solid border-b-[#393528]/10' 
          : 'bg-transparent backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20 min-w-20 font-playfair text-rendang-maroon text-2xl font-bold gap-5">
            {/* Left Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {leftNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium leading-normal transition-all duration-700 font-inter 
                    tracking-wide hover:scale-105 ease-out relative group text-rendang-darkbrown hover:text-rendang-maroon
                    ${
                    isActive(link.href) 
                      ? 'text-[#f3c334] font-bold' 
                      : isScrolled 
                        ? 'text-black text-shadow-lg' 
                        : 'text-white hover:text-[#f3c334]'
                  } ${
                    isScrolled && !isActive(link.href) 
                      ? 'hover:text-lg hover:font-bold hover:text-shadow-xl hover:text-shadow-gray-800/30 text-shadow-lg text-shadow-gray-300' 
                      : ''
                  }`}
                  onClick={closeMobileMenu}
                >
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rendang-maroon group-hover:w-full transition-all duration-300 ease-out"></span>
                  {link.label}
                  
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden mobile-menu-container">
              <button
                onClick={toggleMobileMenu}
                className="text-white p-2 rounded-lg hover:bg-white/10 
                           transition-all duration-200 ease-out
                           focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`block h-0.5 w-full bg-current transform transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}></span>
                  <span className={`block h-0.5 w-full bg-current transition-all duration-200 ease-out ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`block h-0.5 w-full bg-current transform transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}></span>
                </div>
              </button>
            </div>

            {/* Centered Logo */}
            <div className="absolute w-1/7 gap-4 z-60 left-1/2 transform -translate-x-1/2">
              <Logo />
            </div>

            {/* Right Navigation - Desktop */}
            <nav className="hidden lg:flex items-center justify-end flex-1 space-x-8">
              {rightNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium leading-normal transition-all duration-700 font-inter 
                    tracking-wide hover:scale-105 ease-out relative group text-rendang-darkbrown hover:text-rendang-maroon
                    ${
                    isActive(link.href) 
                      ? 'text-[#f3c334] font-bold' 
                      : isScrolled 
                        ? 'text-black text-shadow-lg' 
                        : 'text-white hover:text-[#f3c334]'
                  } ${
                    isScrolled && !isActive(link.href) 
                      ? 'hover:text-lg hover:font-bold hover:text-shadow-xl hover:text-shadow-gray-800/30 text-shadow-lg text-shadow-gray-300' 
                      : ''
                  }`}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rendang-maroon
                                  group-hover:w-full transition-all duration-300 ease-out"></span>
                </Link>
              ))}
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Link
                href="#contact"
                className="cta-button-secondary border md:block hover:bg-opacity-90 text-gold-soft px-6 py-2.5 
                          rounded-full font-medium text-sm tracking-wide shadow-xs border-0.5 border-black
                          hover:scale-105 hover:shadow-lg hover:border-white/30 hover:text-white
                          transition-all duration-300 ease-out
                          focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                onClick={closeMobileMenu}
              >
                Pesan
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-out ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-rendang-700/50 backdrop-blur-sm"></div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden mobile-menu-container fixed top-16 left-0 right-0 z-40 
                      bg-rendang-600/98 backdrop-blur-md
                      transform transition-all duration-500 ease-out ${
        isMobileMenuOpen 
          ? 'translate-y-0 opacity-100 visible' 
          : '-translate-y-full opacity-0 invisible'
      }`}>
        <div className="max-w-md mx-auto px-6 py-8">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-white/90 hover:text-white font-medium text-lg tracking-wide
                          hover:translate-x-2 transition-all duration-300 ease-out
                          relative group py-2
                          transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-4'}
                          transition-transform duration-${300 + index * 100} delay-${index * 50}`}
                onClick={closeMobileMenu}
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 
                                  group-hover:w-full transition-all duration-300 ease-out"></span>
                </span>
              </Link>
            ))}
            
            <div className="flex space-x-4 pt-6 border-t border-white/20">
              <Link
                href="#contact"
                className="block text-white duration-300 ease-out
                          px-6 py-3 rounded-lg font-medium text-center tracking-wide
                          hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25
                          bg-rendang-maroon md:block hover:bg-opacity-90 transition-colors
                          focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                onClick={closeMobileMenu}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;