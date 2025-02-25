
import Image from "next/image"
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link';

const contents = [
  {
    image: {
      src: "https://images.unsplash.com/photo-1671726203390-cdc4354ee2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      alt: "Image Description",
    },
    text: "I've been missing my mom's rendang ever since I moved away from home, but this packaged rendang is a close second!",
    profile: {
      src: "https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074",
      name: "Laila Bahar",
      role: "Designer",
    },
  },
  {
    image: {
      src: "https://images.unsplash.com/photo-1671726203390-cdc4354ee2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      alt: "Image Description",
    },
    text: "I love how easy it is to prepare and how flavorful it tastes. Definitely my go-to option for a quick and delicious meal.",
    profile: {
      src: "https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074",
      name: "Laila Bahar",
      role: "Designer",
    },
  },
  {
    image: {
      src: "https://images.unsplash.com/photo-1671726203390-cdc4354ee2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      alt: "Image Description",
    },
    text: "Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet luctus venenatis elit ut aliquam, purus sit amet luctus venenatis",
    profile: {
      src: "https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074",
      name: "Laila Bahar",
      role: "Designer",
    },
  },
  {
    image: {
      src: "https://images.unsplash.com/photo-1671726203390-cdc4354ee2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      alt: "Image Description",
    },
    text: "Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet luctus venenatis elit ut aliquam, purus sit amet luctus venenatis",
    profile: {
      src: "https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074",
      name: "Laila Bahar",
      role: "Designer",
    },
  },
];
const Testimonial = () => {
  return (
    (<section>
      {/* Container */}
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl lg:mb-16 flex items-center justify-center gap-1">
            Apa kata mereka yang sudah menikmati 
            <Image
              src={'/logo-base.png'}
              alt="Rendang Pongky"
              // Adjust size as needed
              width={150}
              // Adjust size as needed
              height={150}
              className="inline-flex"
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </h2>
        </div>

        {/* Contents */}
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full container relative mx-auto"
        >
        <CarouselContent>
          {contents.map((content, index) => (
            <CarouselItem 
              key={index}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="grid grid-cols-1 gap-6 rounded-md border border-solid border-gray-300 bg-white p-8 md:p-10">
                <Image
                  className="rounded-xl"
                  src={content.image.src}
                  alt={content.image.alt}
                  width={400}
                  height={400}
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
                <CardContent className="text-gray-500">{content.text}</CardContent>
                <div className="flex flex-row items-start">
                  <Image
                    src={content.profile.src}
                    alt=""
                    width={140}
                    height={140}
                    className="mr-4 inline-block h-16 w-16 object-cover rounded-full"
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }} />
                  <div className="flex flex-col items-start">
                    <h6 className="text-base font-bold">{content.profile.name}</h6>
                    <p className="text-sm text-gray-500">{content.profile.role}</p>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {/* Buttons */}
        <div className="flex justify-center">
          <Link
            href="#"
            className="mr-5 inline-block items-center bg-black px-6 py-3 text-center font-semibold text-white"
          >
            Get Started
          </Link>
          <Link
            href="#"
            className="inline-block items-center border border-solid border-black bg-white px-6 py-3 text-center font-semibold text-black"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </section>)
  );
}

export default Testimonial