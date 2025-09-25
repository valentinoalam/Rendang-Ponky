import React, { lazy, Suspense } from 'react'
// import InteractiveBookSection from '@/components/sections/bookSection'
import Products from '@/components/sections/products'
import ProductCard from '@/components/product/card'
import KeyBenefits from '@/components/sections/benefit'
import TestimonialCarousel from '@/components/testimonial-carousel'
import { CoolMode } from '@/components/ui/cool'
import RandomStickersPage from '@/components/ui/random-sticker'
import { FaqSection } from '@/components/sections/Faq'
const VideoReview = lazy(() => import('@/components/video-review'));
const SectionPlaceholder = ({ minHeight = 300 }: { minHeight?: number }) => (
  <div 
    className="w-full bg-gray-800 rounded-xl animate-pulse" 
    style={{ minHeight: `${minHeight}px` }}
  />
);
const Index = () => {
  // Placeholder images - in a real project, you would import actual images
  const rendangOriginalImg = "/products/rendangpongky-daging.jpg";
  const rendangParuImg = "/hero/ResepRendangParu.jpeg";
  /**
   * HALAL MUI : LPPOM-01011275600622 

    P-IRT : 2013275010021-26
    (Lingkungan Bersih & Higenis sesuai Standart)
   */
  return (
    <main className="w-full min-h-screen spice-bg text-foreground pt-16 pb-16 relative z-10 m-4 space-y-11 md:m-8">
      <div className="max-w-7xl px-4 md:px-8 lg:px-16 mx-auto">
        {/* Hero Section */}
        <section className="mb-16 min-h-screen relative">
          <div className="max-w-4xl mx-auto mb-12 absolute top-[3%] left-0 right-0">
            <div className="inline-block w-full">
              <p className="float-left text-gray-900 bg-primary/10 rounded-full mx-auto font-extrabold text-lg md:text-2xl w-fit md:max-w-11/12 lg:max-w-10/12 tracking-wider">
                Pengen makan <span className='text-nowrap'>🥩</span>?
              </p>
            </div>
            <div className='lightning' style={{ left: "-11%" }}>
              <div className="noisy">
                Rendang</div>
              <div className="noisy">
                Nusantara</div>
            </div>
            <div className='lightning'>
              <div className="noisy">
                <span>Nikmati Keaslian Rasa, 
                d🍴 Setiap Gigitan!</span></div>
            </div>
            {/* <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-rendang-darkbrown mb-4 font-playfair">
                            <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-xs rounded-full px-4 py-2 shadow-lg">
              <span className="text-primary font-medium">特許取得製法</span>
            </div>  
            </h1> */}
            
            <CoolMode 
              options={{
                spritesheet: {
                  url: '/ingredients/Desktop1k.png',
                  frameWidth: 48,
                  frameHeight: 48,
                  frameCount: 147,
                  animationType: 'static',
                  framesPerRow: 7,
                  animationSpeed: 10
                },
                size: 80,
                speedHorz: 8,
                spinSpeed: 12.5,
                particleCount: 16
              }}
            >
              <div className='max-w-70 w-fit z-30 -translate-y-9 justify-self-end p-0.5 md:p-2 backdrop-blur-xs rounded-lg py-2 shadow-lg border-rendang-darkbrown/30 border-2 bg-white/80'>
                <button className="text-center cursor-pointer text-md md:text-xl text-rendang-maroon">
                  Dibuat dengan Rempah Pilihan, Tanpa Pengawet!
                </button>
              </div>
            </CoolMode>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button className="cta-button border animate-pulse-soft">
                Pesan Sekarang? Persediaan terbatas!
              </button>
              {/* <button className="cta-button-secondary">
                🎁 Beli 2 Gratis 1 – Buruan, Stok Terbatas!
              </button> */}
            </div>
          </div>

        </section>
        
        <RandomStickersPage >
        {/* Product Showcase */}
        <section className="space-y-12 md:space-y-24">
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
        </section>
        </RandomStickersPage>
        {/* <InteractiveBookSection /> */}
        {/* Video Review Section */}
        <section className="mb-16" id="video-review">
          <Suspense fallback={<SectionPlaceholder minHeight={400} />}>
            <VideoReview />
          </Suspense>
        </section>
        
        {/* Testimonials Section */}
        <section className="mb-16" id="testimonials">
          <TestimonialCarousel />
        </section>

        {/* Key Benefits */}
        <section id='key-benefit' className="mb-16">
          <KeyBenefits />
        </section>

        {/* CTA Section */}
        <section id='faq' >
          <FaqSection />
        </section>
      </div>
      <Products />
    </main>
  )
}

export default Index