'use client'
import React, { useState } from 'react';
import { storyData } from './data';
import Page from './page';


const Book: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [flippedPages, setFlippedPages] = useState<number[]>([]);
  const totalPages = Object.keys(storyData).length;

  const flipPage = (pageNumber: number) => {
    if (flippedPages.includes(pageNumber)) {
      setFlippedPages(flippedPages.filter(p => p !== pageNumber));
    } else {
      setFlippedPages([...flippedPages, pageNumber]);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      if (!flippedPages.includes(currentPage)) {
        flipPage(currentPage);
      }
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      if (flippedPages.includes(currentPage - 1)) {
        flipPage(currentPage - 1);
      }
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate visible pages
  const visiblePages = [];
  
  // Add previous page (left side when not flipped)
  if (currentPage > 1) {
    visiblePages.push(
      <Page
        key={`page-${currentPage - 1}`}
        data={storyData[currentPage - 1]}
        isFlipped={flippedPages.includes(currentPage - 1)}
        pageNumber={currentPage - 1}
        onClick={() => flipPage(currentPage - 1)}
      />
    );
  }
  
  // Add current page (right side when not flipped)
  if (currentPage <= totalPages) {
    visiblePages.push(
      <Page
        key={`page-${currentPage}`}
        data={storyData[currentPage]}
        isFlipped={flippedPages.includes(currentPage)}
        pageNumber={currentPage}
        onClick={() => flipPage(currentPage)}
      />
    );
  }
  
  // Add next page (which becomes visible when current page is flipped)
  if (currentPage < totalPages && flippedPages.includes(currentPage)) {
    visiblePages.push(
      <Page
        key={`page-${currentPage + 1}`}
        data={storyData[currentPage + 1]}
        isFlipped={flippedPages.includes(currentPage + 1)}
        pageNumber={currentPage + 1}
        onClick={() => flipPage(currentPage + 1)}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-100 p-4">
      <h1 className="text-3xl font-bold mb-8 text-amber-900">Digital Storybook</h1>
      
      <div className="book-container w-full max-w-4xl aspect-[2/1] relative mb-8">
        <div className="book relative w-full h-full flex">
          {/* Book cover and spine */}
          <div className="absolute inset-0 bg-amber-700 rounded-lg shadow-2xl z-0 transform -translate-x-4 -translate-y-4 scale-[1.03]"></div>
          <div className="absolute left-[49.5%] h-full w-[1%] bg-amber-800 z-10"></div>
          
          {/* Pages container */}
          <div className="relative flex w-full h-full z-[5] overflow-hidden">
            {/* Left side (open book) - clicking here goes to previous page */}
            <div 
              className="w-1/2 h-full bg-amber-50 rounded-l-lg shadow-inner flex items-center justify-center relative"
              onClick={goToPreviousPage}
            >
              {visiblePages[0]}
            </div>
            
            {/* Right side (open book) - clicking here goes to next page */}
            <div 
              className="w-1/2 h-full bg-amber-50 rounded-r-lg shadow-inner flex items-center justify-center relative"
              onClick={goToNextPage}
            >
              {visiblePages[1]}
              {visiblePages[2]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
