import Image from "next/image";
import React, { forwardRef } from 'react';

interface PageProps {
  index: number;
  iscover: boolean;
  nextPage: ()=>void;
  previousPage: ()=>void;
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ index, iscover, nextPage=()=>{}, previousPage=()=>{}}, ref) => {
  const pageIndex = index;
  const isFrontCover = iscover && index === 0;
  const isBackCover = iscover && index !== 0;

  const pageContents = [
    {
      front: {
        title: "The Little Adventure",
        image: { src: "/illust/2.png", alt: "Cover illustration", width: 200, height: 200 },
        paragraphs: ["By The Storyteller"]
      },
      back: {
        title: "Dedication",
        paragraphs: ["To all dreamers and adventurers..."]
      }
    },
    {
      front: {
        title: "Chapter 1: A New Beginning",
        image: { src: "/illust/1.jpg", alt: "Luna's room", width: 150, height: 150 },
        paragraphs: ["Ibu Ani menjalankan Butik Cantik dengan cara tradisional."]
      },
      back: {
        paragraphs: ["Promosinya hanya mengandalkan spanduk di depan toko serta brosur yang dibagikan ke tetangga dan teman-temannya."]
      }
    },
    {
      front: {
        title: "The Discovery",
        image: { src: "/illust/3.png", alt: "Mysterious map", width: 150, height: 150 },
        paragraphs: [
          "Suatu hari, seorang calon pelanggan dari kota sebelah mendengar tentang Butik Cantik dari temannya...",
          "Namun, karena tidak ada website atau media sosial yang bisa diakses, calon pelanggan itu kebingungan."
        ]
      },
      back: {
        paragraphs: [
          "Ia mencoba mencari informasi online, tetapi tidak menemukan apa pun tentang Butik Cantik.",
          "Akhirnya, ia memutuskan untuk pergi ke toko lain yang memiliki website dengan koleksi lengkap dan cara pemesanan online."
        ]
      }
    },
    {
      front: {
        title: "Forest Friends",
        image: { src: "/illust/4.png", alt: "Oliver the owl", width: 150, height: 150 },
        paragraphs: [
          "Ibu Ani pun kehilangan pelanggan potensial karena calon pelanggannya tidak bisa menemukan informasi yang mereka butuhkan.",
          "Meskipun toko fisiknya ramai dikunjungi oleh warga sekitar, bisnisnya sulit berkembang karena terbatas pada pasar lokal."
        ]
      },
      back: {
        paragraphs: ["Sementara itu, Ibu Rina menjalankan FashionHub dengan cara yang lebih modern.", "Ia tidak hanya memiliki toko fisik, tetapi juga membuat landing page sederhana untuk bisnisnya."]
      }
    },
    {
      front: {
        title: "The Magic Begins",
        image: { src: "/illust/cartoon1.png", alt: "The first clue", width: 150, height: 150 },
        paragraphs: ["Di landing page tersebut, Ibu Rina menampilkan semua informasi seputar produknya."]
      },
      back: {
        paragraphs: ["Ibu Rina juga mempromosikan landing page-nya melalui media sosial dan iklan Facebook.", "Suatu hari, seorang calon pelanggan dari kota besar menemukan FashionHub melalui iklan online."]
      }
    },
    {
      front: {
        paragraphs: ["Ia langsung mengunjungi landing page-nya dan terkesan dengan koleksi baju yang ditawarkan.", "Tanpa perlu repot datang ke toko fisik, calon pelanggan itu langsung memesan beberapa baju melalui WhatsApp."]
      },
      back: {
        title: "The End",
        image: { src: "/illust/cartoon2.png", alt: "Back cover", width: 150, height: 150 },
        paragraphs: ["FashionHub tidak hanya menjangkau pelanggan lokal, tetapi juga pelanggan dari luar kota.", "Bahkan, Ibu Rina mulai menerima pesanan dari luar pulau!"]
      }
    }
  ];

  const renderContent = () => {
    const content  = pageContents[pageIndex];
    if (!content) {
      return { front: null, back: null };
    }
  
    const { front, back } = content;
    
    return {
      front: (
        <div className="page-content">
          {front.title && <h2 className="text-2xl mb-4">{front.title}</h2>}
          {front.paragraphs &&
            front.paragraphs.map((text, index) => <p key={index} className="mb-4">{text}</p>)}
          {front.image && (
            <Image
              width={150}
              height={150}
              src={front.image.src}
              alt={front.image.alt}
              className="mx-auto my-4"
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          )}
        </div>
      ),
      back: (
        <div className="page-back" style={{ zIndex: index + 1 }}>
          {back.title && <h2 className="text-xl mb-4">{back.title}</h2>}
          {back.paragraphs &&
            back.paragraphs.map((text, index) => <p key={index} className="mb-4">{text}</p>)}
          {back.image && (
            <Image
              width={150}
              height={150}
              src={back.image.src}
              alt={back.image.alt}
              className="mx-auto my-4"
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          )}
        </div>
      )
    };
  };

  const content = renderContent();

  return (
    <div
      ref={ref}
      className={`page book__page${iscover ? ' book__cover' : ''} ${isFrontCover ? ' book__cover--front' : ''} ${isBackCover ? ' book__cover--back' : ''}`}
      style={{ '--page-index': pageIndex } as React.CSSProperties}
    >
      <div onClick={nextPage} className="page__half page__half--front py-6 px-4 rounded-lg">
        <div className="book-shadow shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-blue-500/40"></div>
        {content.front}
        {!iscover && <div className="page__number">{2 * index - 1}</div>}
      </div>

      <div onClick={previousPage} className="page__half page__half--back py-6 px-4 rounded-lg shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-blue-500/40">
        <div className="book-shadow"></div>
        {content.back}
        {!iscover && <div className="page__number">{2 * index}</div>}
        {isFrontCover && <div className="book__insert"></div>}
      </div>

      {isBackCover && (
          // <div className="book__insert">
            <div className="page-content"></div>
          // </div>
      )}
    </div>
  );
});

Page.displayName = 'Page';

export default Page;