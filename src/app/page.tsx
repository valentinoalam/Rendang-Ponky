import React, { lazy, Suspense } from 'react'


// import InteractiveBookSection from '@/components/sections/bookSection'
import { CoolMode } from '@/components/ui/cool'
import RandomStickersPage from '@/components/ui/random-sticker'
import { FaqSection } from '@/components/sections/Faq'
import BubbleDivider from '@/components/ui/bubble-divider';
import { ShineBorder } from '@/components/ui/shine-border';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Steam from '@/components/ui/steam';
const ProductCard = lazy(() => import('@/components/product/card'));
const Products = lazy(() => import('@/components/sections/products'));

const KeyBenefits = lazy(() => import('@/components/sections/benefit'));
const TestimonialCarousel = lazy(() => import('@/components/sections/testimonial'));
const VideoReview = lazy(() => import('@/components/sections/video-review'));
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
      
      <RandomStickersPage >
      <div className="max-w-7xl px-4 md:px-8 lg:px-16 mx-auto">
        {/* Hero Section */}
        <section className="mb-16 min-h-screen relative">
          <div className="max-w-4xl mx-auto mb-12 absolute top-[3%] left-0 right-0">
            <div className="inline-block w-full">
              <p className="float-left text-gray-900 bg-primary/10 rounded-full mx-auto font-extrabold text-lg md:text-2xl w-fit md:max-w-11/12 lg:max-w-10/12 tracking-wider">
                Pengen makan <span className='text-nowrap'>🥩</span>?
              </p>
            </div>
            <div className='relative'>
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
            </div>
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
              className=""
            >
              <div className='animate-floating max-w-70 w-fit z-30 -translate-y-9 justify-self-end p-0.5 md:p-2 backdrop-blur-xs rounded-lg py-2 shadow-lg border-rendang-darkbrown/30 border-2 bg-white/80'>
                <button className="text-center cursor-pointer text-md md:text-xl text-rendang-maroon">
                  Dibuat dengan Rempah Pilihan, Tanpa Pengawet!
                </button>
              </div>
            </CoolMode>
            <div className="flex flex-col z-0 sm:flex-row justify-center gap-4 mb-8">
              <RainbowButton className="py-3 px-6 font-bold text-white shadow-lg rounded-full transition-transform duration-300 transform hover:scale-105">
                <ShineBorder shineColor={"white"} className='opacity-30' />
                <div className='bg-[linear-gradient(90deg,#deff00,#ffc107)] text-transparent bg-clip-text'>Buruan Pesan, <span className={cn(
                  "mx-auto max-w-md",
                  // Shine effect
                  "animate-shiny-text [background-size:var(--shiny-width)_100%] bg-clip-text [background-position:0_0] bg-no-repeat [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
                  // Shine gradient
                  "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80"
                )}>Persediaan terbatas!</span></div>
              </RainbowButton>
              {/* <button className="cta-button-secondary">
                🎁 Beli 2 Gratis 1 – Buruan, Stok Terbatas!
              </button> */}
              
            </div>
          </div>

          <div className='absolute -z-10 left-1/2 md:left-[70%] bottom-0 top-[70%] md:top-[90%] w-max h-full'>
            <div className='relative w-fit'>
              <Image src="/arts/rendang.png" alt="Rendang Paru" width={500} height={300} className="w-1/2 h-auto" />
              <div className='absolute w-1/3 rounded-b-full -top-0 left-2'><Steam /></div>
            </div>
          </div>
        </section>
        
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
        <BubbleDivider className='-translate-y-7 z-50' />
        <FaqSection />
      </div>
      </RandomStickersPage>
      <Products />
    </main>
  )
}

export default Index