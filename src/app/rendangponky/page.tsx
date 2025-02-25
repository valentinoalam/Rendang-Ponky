import React from 'react'
import { About } from './sections/About/view'
import CTA from './sections/CTA/view'
import Testimonial from './sections/Testimonial/view'
import Faq from './sections/FAQ/Faq'

const page = () => {
  return (
    <main className="w-full min-h-screen bg-red-500 text-foreground">
      <About />
      <CTA />
      <Testimonial />
      <Faq />
      
    </main>
  )
}

export default page