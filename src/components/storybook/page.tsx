import React from 'react';
import { PageData } from './data';
import PageContent from './content';


interface PageProps {
  data: PageData;
  isFlipped: boolean;
  pageNumber: number;
  onClick: () => void;
}
const Page: React.FC<PageProps> = ({ data, isFlipped, pageNumber, onClick }) => {
  return (
    <div 
      className={`page ${isFlipped ? 'flipped' : ''}`} 
      onClick={onClick}
    >
      <div className="page-front bg-amber-50 rounded shadow-md">
        <div className="book-shadow"></div>
        <PageContent content={data.front} />
        <div className="absolute bottom-2 left-4 text-amber-800 opacity-60">
          {pageNumber * 2 - 1}
        </div>
      </div>
      <div className="page-back bg-amber-50 rounded shadow-md">
        <div className="book-shadow"></div>
        <PageContent content={data.back} isBackPage={true} />
        <div className="absolute bottom-2 right-4 text-amber-800 opacity-60">
          {pageNumber * 2}
        </div>
      </div>
    </div>
  );
};

export default Page;