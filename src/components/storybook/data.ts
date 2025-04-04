export type ImageProps = {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  
  export type PageContent = {
    title?: string;
    image?: ImageProps;
    paragraphs: string[];
  };
  
  export type PageData = {
    front: PageContent;
    back: PageContent;
  };
  
  export type StoryData = {
    [key: number]: PageData;
  };
  
  export const storyData: StoryData = {
    1: {
      front: {
        title: "Dua Jasa Fotografi, Dua Strategi Berbeda",
        image: { src: "/illust/2.png", alt: "Cover illustration", width: 200, height: 200 },
        paragraphs: [
          "Di kota yang sama, ada dua fotografer berbakat:",
          " Aji dengan usahanya 'MomentCapture' dan Budi dengan usahanya 'SnapMagic'."
        ]
      },
      back: {
        paragraphs: [
          " Keduanya memiliki keterampilan yang setara,", 
          " tetapi cara mereka menjalankan bisnisnya sangat berbeda, terutama dalam hal penggunaan teknologi digital."
        ]
      }
    },
    2: {
      front: {
        title: "MomentCapture: Mengandalkan Portofolio Fisik",
        image: { src: "/illust/1.jpg", alt: "Luna's room", width: 150, height: 150 },
        paragraphs: [
          "Aji menjalankan MomentCapture dengan cara yang cukup tradisional. Ia mengandalkan portofolio fisik berupa album foto yang dibawa ke setiap pertemuan dengan calon klien."
        ]
      },
      back: {
        paragraphs: [
          " Aji juga memiliki akun Instagram, tetapi jarang di-update dan hanya menampilkan beberapa foto tanpa informasi lengkap tentang layanannya."
        ]
      }
    },
    3: {
      front: {
        image: { src: "/illust/3.png", alt: "Mysterious map", width: 150, height: 150 },
        paragraphs: [
          "Suatu hari, Aji dihubungi oleh seorang calon klien yang ingin memesan jasa fotografi untuk acara pernikahan.",
          " Calon klien tersebut meminta Aji untuk mengirimkan portofolio dan informasi harga melalui email.",
        ]
      },
      back: {
        paragraphs: [
          " Aji pun mengirimkan file PDF berisi beberapa foto dan penawaran harga.",
          " Namun, calon klien merasa kurang puas karena informasi yang diberikan terbatas dan tidak ada testimoni dari klien sebelumnya."
        ]
      }
    },
    4: {
      front: {
        paragraphs: [
          "Calon klien itu akhirnya memilih fotografer lain yang memiliki website profesional dengan portofolio lengkap, testimoni, dan informasi harga yang transparan.",
          "Meskipun toko fisiknya ramai dikunjungi oleh warga sekitar, bisnisnya sulit berkembang karena terbatas pada pasar lokal."
        ]
      },
      back: {
        image: { src: "/illust/4.png", alt: "Oliver the owl", width: 150, height: 150 },
        paragraphs: [
          " Aji pun kehilangan peluang besar karena calon kliennya merasa kurang yakin dengan layanannya."
        ]
      }
    },
    5: {
      front: {
        title: "SnapMagic: Menggunakan Website Profesional",
        image: { src: "/illust/cartoon1.png", alt: "The first clue", width: 150, height: 150 },
        paragraphs: [
          "Sementara itu, Budi menjalankan SnapMagic dengan cara yang lebih modern."
        ]
      },
      back: {
        paragraphs: [
          "Ia memiliki website profesional yang menampilkan semua informasi seputar produknya.", 
          "Budi juga aktif mempromosikan website-nya melalui media sosial dan iklan Google Ads."
        ]
      }
    },
    6: {
      front: {
        paragraphs: [
          " Suatu hari, seorang calon klien menemukan SnapMagic melalui pencarian Google.", 
          " Ia langsung mengunjungi website-nya dan terkesan dengan portofolio serta informasi lengkap yang tersedia."
        ]
      },
      back: {
        title: "The End",
        image: { src: "/illust/cartoon2.png", alt: "Back cover", width: 150, height: 150 },
        paragraphs: [
          " Tanpa perlu bertemu langsung, calon klien itu langsung memesan jasa fotografi untuk acara pernikahannya melalui formulir online.", 
          "Berkat website-nya, SnapMagic tidak hanya mendapatkan klien dari kota tersebut, tetapi juga dari kota-kota lain.", 
          " Bahkan, Budi mulai menerima pesanan untuk acara-acara besar seperti konferensi dan konser."
        ]
      }
    }
  };