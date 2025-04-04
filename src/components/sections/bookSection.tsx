'use client'
import InteractiveBook from '../interactiveBook/ebook2'
import { useIsMobile } from '@/hooks/use-mobile'

export default function InteractiveBookSection() {
  const isMobile = useIsMobile()
  return (
    <section id="demo" className="py-20">
      <div className="container relative mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Ada Sebuah Kisah Menarik</h2>
        <div className="w-full mx-auto">
          {!isMobile && <InteractiveBook /> }
        </div>
      </div>
    </section>
  )
}

