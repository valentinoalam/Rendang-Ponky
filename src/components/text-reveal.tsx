import React, { useState, useEffect } from 'react';

const AnimatedTextReveal = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const titleWords = ["Rendang", "Delight"];
  const descriptionWords = [
    "Experience", "the", "authentic", "taste", "of", "Indonesian", "cuisine",
    "with", "our", "premium", "rendang", "dishes,", "delivered", "straight",
    "to", "your", "door."
  ];
  
  const totalWords = titleWords.length + descriptionWords.length;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % (totalWords + 3)); // +3 for pause between loops
    }, 300);
    
    return () => clearInterval(interval);
  }, [totalWords]);
  
  const getWordOpacity = (wordIndex: number, isTitle = false) => {
    const adjustedIndex = isTitle ? wordIndex : wordIndex + titleWords.length;
    
    if (currentWordIndex === adjustedIndex) {
      return 1;
    } else if (currentWordIndex > adjustedIndex) {
      const diff = currentWordIndex - adjustedIndex;
      if (diff <= 3) {
        return Math.max(0.2, 1 - (diff * 0.3));
      }
    }
    return 0.2;
  };
  
  return (
    <div className="absolute z-60 lg:static">
      <div className="container px-4 md:px-8 lg:px-16 mx-auto">
        <h1 className="text-3xl md:text-5xl font-black mb-4 text-center">
          {titleWords.map((word, index) => (
            <span
              key={index}
              className="inline-block mr-3 transition-opacity duration-300 ease-in-out text-red-800"
              style={{
                opacity: getWordOpacity(index, true)
              }}
            >
              {word}
            </span>
          ))}
        </h1>
        
        <p className="text-2xl text-stone-950/80 md:text-4xl max-w-3xl font-extrabold text-center mx-auto leading-relaxed">
          {descriptionWords.map((word, index) => (
            <span
              key={index}
              className="inline-block mr-2 transition-opacity duration-300 ease-in-out"
              style={{
                opacity: getWordOpacity(index)
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default AnimatedTextReveal;