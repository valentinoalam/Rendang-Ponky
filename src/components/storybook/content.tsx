import React from 'react';
import { PageContent as PageContentType } from './data';
import Image from 'next/image';

interface PageContentProps {
  content: PageContentType;
  isBackPage?: boolean;
}

const PageContent: React.FC<PageContentProps> = ({ content, isBackPage = false }) => {
  return (
    <div className={`p-6 h-full flex flex-col ${isBackPage ? 'items-end text-right' : 'items-start text-left'}`}>
      {content.title && (
        <h2 className="text-xl font-bold mb-4 text-amber-800">{content.title}</h2>
      )}
      
      {content.image && (
        <div className={`my-4 ${isBackPage ? 'self-end' : 'self-start'}`}>
          <Image
            src={content.image.src}
            alt={content.image.alt}
            width={content.image.width}
            height={content.image.height}
            className="rounded shadow-md"
          />
        </div>
      )}
      
      <div className="flex-grow">
        {content.paragraphs.map((paragraph, idx) => (
          <p key={idx} className="mb-3 text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PageContent;