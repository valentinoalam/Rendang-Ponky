'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Page from './page';
import './InteractiveBook.css';

const TOTAL_PAGES = 7;

const InteractiveBook = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bookRef = useRef<HTMLDivElement | null>(null);
  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const book = bookRef.current;
    const pages = pagesRef.current;

    if (!book || pages.length === 0) {
      console.warn('Book initialization failed: Missing references');
      return;
    }

    // First, reset all pages to ensure consistent state
    pages.forEach((page, index) => {
      if (page) {
        // Set initial state where front cover is at top, then pages in order, back cover at bottom
        // Use a much higher z-index value for unturned pages
        const zValue = 1000 - index; // Highest value for index 0 (front cover)
        gsap.set(page, {
          rotateY: 0,
          zIndex: zValue,
        });
      }
    });

    // Then, animate based on current page
    const animatePage = (pageIndex: number) => {
      // Turn all pages up to the current one
      for (let i = 0; i <= pageIndex; i++) {
        const page = pages[i];
        if (page) {
          // When a page turns, its z-index needs to go below unturned pages
          // but above pages that have already been turned
          gsap.to(page, {
            rotateY: -180,
            zIndex: i, // Lower values for turned pages
            duration: 0.5,
          });
        }
      }

      // Keep all pages after the current one in their original position
      for (let i = pageIndex + 1; i < TOTAL_PAGES; i++) {
        const page = pages[i];
        if (page) {
          gsap.to(page, {
            rotateY: 0,
            zIndex: 1000 - i, // Higher values for unturned pages
            duration: 0.5,
          });
        }
      }
    };

    animatePage(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className="book-container w-max mx-auto aspect-[2/1] relative mb-8 h-screen flex items-center justify-center"
    >
      <div className="w-full h-screen sticky top-0 overflow-hidden">
        <div
          ref={bookRef}
          className="book relative flex item-center transform -translate-y-1/2"
        >
          <div className="book__spine"></div>
          {[...Array(TOTAL_PAGES)].map((_, index) => (
            <Page
              key={index}
              index={index}
              ref={(el: HTMLDivElement | null) => {
                pagesRef.current[index] = el;
              }}
              iscover={index === 0 || index === TOTAL_PAGES - 1}
              nextPage={handleNextPage}
              previousPage={handlePreviousPage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveBook;