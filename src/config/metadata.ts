import type { Metadata } from 'next'

interface MetadataConfig {
  [key: string]: Metadata
}

// Ganti dengan URL Rendang Ponky Anda
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://rendang-ponky.vercel.app" 

export const METADATA: MetadataConfig = {
  global: {
    // --- Judul Halaman Global ---
    title: {
      template: '%s | Rendang Ponky - Rendang Nusantara Otentik',
      default: 'Rendang Ponky | Rendang Otentik, Original & Paru', // Digunakan jika halaman tidak menyediakan judulnya sendiri
    },
    category: 'food, culinary, indonesian food, rendang',
    // --- Deskripsi Global SEO (Meta Description) ---
    description: 'Nikmati kelezatan Rendang Ponky, rendang Nusantara otentik. Tersedia varian: Rendang Daging Sapi Original dan Rendang Paru yang kaya rasa.',
    // --- Kata Kunci Global SEO ---
    keywords: [
      'rendang ponky', 
      'rendang otentik', 
      'rendang nusantara', 
      'rendang paru', 
      'rendang daging sapi', 
      'makanan indonesia', 
      'kuliner minang', 
      'bumbu rendang', 
      'jual rendang online'
    ],
    // --- Icons & Favicons (Ganti dengan aset Rendang Ponky) ---
    icons: {
      icon: [
        { url: '/favicon.ico' },
        // { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        // { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon1.png', sizes: '96x96', type: 'image/png' },
        { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
        
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/manifest.json',
    // --- Open Graph protocol for social media sharing ---
    openGraph: {
      title: "Rendang Ponky | Rendang Nusantara Otentik - Original & Paru",
      description: "Rendang dengan bumbu asli khas Nusantara. Pilihan sempurna untuk hidangan istimewa: Rendang Daging Original dan Rendang Paru.",
      url: `${baseUrl}`,
      siteName: "Rendang Ponky",
      images: [
        {
          // Ganti dengan gambar Rendang Ponky Anda
          url: `${baseUrl}/hero/insta5.png`, 
          width: 1080, // Ukuran ideal untuk Open Graph
          height: 600, // Ukuran ideal untuk Open Graph
          alt: "Rendang Ponky - Kelezatan Rendang Otentik",
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    // --- Twitter Card Metadata ---
    twitter: {
      title: 'Rendang Ponky | Jual Rendang Daging dan Paru Online',
      description: 'Citarasa Minang yang sesungguhnya. Pesan Rendang Daging Sapi Original atau Rendang Paru Ponky secara online.',
      card: "summary_large_image",
      creator: "@rendangponky", // Ganti dengan handle Twitter Anda
      // Ganti dengan gambar Rendang Ponky Anda
      images: `${baseUrl}/hero/insta5.png`, 
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    // --- Robots directives ---
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // Konfigurasi Facebook (jika diperlukan)
    facebook: {
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string,
    },
    // Verifikasi untuk search console
    verification: {
      google: "",
      yandex: "",
    },
    other: {
      "msvalidate.01": '',
      "p:domain_verify": '',

    },
    
    // Informasi Penulis/Pembuat
    authors: [{ 
        name: "Rendang Ponky Team", 
        url: baseUrl }], 
    creator: 'Rendang Ponky', 
    publisher: 'Rendang Ponky', 
  },
  // --- Metadata Halaman Utama (Homepage) ---
  default: {
    title: "Rendang Ponky | Rendang Daging Original & Rendang Paru",
    // 150-160 characters.
    description: "Rendang Ponky menyajikan rendang daging sapi otentik dan rendang paru premium. Bumbu melimpah, rasa Nusantara sejati. Pesan sekarang!",
    
    // Kata kunci spesifik untuk homepage
    keywords: [
      'rendang ponky beli', 
      'harga rendang paru',
      'rendang daging kaleng',
      'jual rendang paru online', 
      'rendang siap saji',
      'beli rendang premium', 
      'makanan khas padang', 
      'olahan paru sapi rendang'
    ],
  
    // Canonical URL 
    alternates: {
      canonical: "https://rendang-ponky.vercel.app/", // Ganti dengan URL proyek Anda
    },
  },
  // --- Metadata Halaman Tentang Kami ---
  about: {
      title: "Tentang Kami | Cerita Rendang Ponky",
      description: "Pelajari filosofi di balik bumbu otentik Rendang Ponky, warisan resep Nusantara yang kaya rasa dan lezat.",
      keywords: ["tentang rendang ponky", "sejarah rendang", "filosofi bumbu rendang"],
  },
  // Anda bisa menambahkan entri halaman lain seperti 'products', 'contact', dll. di sini
};