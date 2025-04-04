import React from 'react'
// import InteractiveBookSection from '@/components/sections/bookSection'
import Products from '@/components/sections/products'
import ProductCard from '@/components/product/card'
import KeyBenefits from '@/components/sections/benefit'
import TrustBadges from '@/components/trust-badge'
import VideoReview from '@/components/video-review'
import TestimonialCarousel from '@/components/testimonial-carousel'
// import CTA from '@/components/sections/cta'

const Index = () => {
  // Placeholder images - in a real project, you would import actual images
  const rendangOriginalImg = "/products/rendangpongky-daging.jpg";
  const rendangParuImg = "/ResepRendangParu.jpeg";

  return (
    <main className="w-full min-h-screen spice-bg text-foreground pt-24 pb-16 relative z-10 m-4 space-y-11 md:m-8">
      <div className="max-w-7xl px-4 md:px-8 lg:px-16 mx-auto">
        {/* Hero Section */}
        
        <section className="mb-16">
          <div className="text-center max-w-4xl mx-auto mb-12">
          <p className='text-gray-900 mx-auto pb-0 md:pb-5 lg:pb-11 font-extrabold text-2xl max-w-8/12 md:max-w-9/12 lg:max-w-10/12'>Cari lauk makan instan yang enak dan <span className='text-nowrap'>🥩 semua</span>?</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rendang-darkbrown mb-4 font-playfair">
              🔥 Rendang Warisan Leluhur, Nikmati Keaslian Rasa di Setiap Gigitan!
            </h1>
            <p className="text-xl md:text-2xl text-rendang-maroon mb-8">
              🍴 Rendang Original Juara & Rendang Paru Gurih – Dibuat dengan Rempah Pilihan, Tanpa Pengawet!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button className="cta-button animate-pulse-soft">
                🛒 Pesan Sekarang – Sebelum kehabisan!
              </button>
              {/* <button className="cta-button-secondary">
                🎁 Beli 2 Gratis 1 – Buruan, Stok Terbatas!
              </button> */}
            </div>
          </div>

          {/* Product Showcase */}
          <div className="space-y-12 md:space-y-24">
            <ProductCard
              title="Rendang Original Premium"
              description="Daging empuk dimasak dengan 18 rempah pilihan selama 8 jam hingga bumbu meresap sempurna. Citarasa autentik yang membangkitkan kenangan masa kecil."
              imagePath={rendangOriginalImg}
            />
            
            <ProductCard
              title="Rendang Paru Garing"
              description="Paru sapi berkualitas dimasak dengan bumbu rendang khas hingga garing sempurna. Tekstur renyah diluar, lembut di dalam, dengan rasa yang menggugah selera."
              imagePath={rendangParuImg}
              isReversed={true}
            />
          </div>
        </section>
        {/* <InteractiveBookSection /> */}
        {/* Video Review Section */}
        <section className="mb-16" id="video-review">
          <VideoReview />
        </section>

        {/* Testimonials Section */}
        <section className="mb-16" id="testimonials">
          <h2 className="text-2xl md:text-3xl font-bold text-rendang-maroon mb-8 text-center font-playfair">
            Apa Kata Pelanggan Kami?
          </h2>
          <TestimonialCarousel />
        </section>

        {/* Key Benefits */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-rendang-maroon mb-8 text-center font-playfair">
            Keunggulan Rendang Kami
          </h2>
          <KeyBenefits />
        </section>

        {/* Trust Badges Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-rendang-maroon mb-8 text-center font-playfair">
            Dipercaya & Direkomendasikan
          </h2>
          <TrustBadges />
        </section>

        {/* CTA Section */}
        {/* <section>
          <CTA />
        </section> */}
      </div>
      <Products />
    </main>
  )
}

export default Index