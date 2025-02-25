import Image from "next/image"
import Link from 'next/link'
import React from 'react'

const CTA = () => {
  return (
    (<section>
      {/* Container */}
      <div className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto w-full max-w-7xl bg-gray-100 px-4 py-32 text-center">
          {/* Title */}
          <h2 className="mx-auto mb-6 max-w-3xl flex-col text-3xl font-bold md:mb-10 md:text-5xl lg:mb-12">
            Lightning Fast Webflow Dev Made Easy
          </h2>
          <ul className="mx-auto mb-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8 md:gap-10 lg:mb-12">
            <li className="flex items-center">
              <Image
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9473e2e6cf65_tick-circle.svg"
                alt=""
                width={32}
                height={32}
                className="mr-2 h-8 w-8"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
              <p className="text-sm sm:text-base">300+ UI Blocks</p>
            </li>
            <li className="flex items-center">
              <Image
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9473e2e6cf65_tick-circle.svg"
                alt=""
                width={32}
                height={32}
                className="mr-2 h-8 w-8"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
              <p className="text-sm sm:text-base">Fully responsive</p>
            </li>
            <li className="flex items-center">
              <Image
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9473e2e6cf65_tick-circle.svg"
                alt=""
                width={32}
                height={32}
                className="mr-2 h-8 w-8"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
              <p className="text-sm sm:text-base">Just copy & paste</p>
            </li>
          </ul>
          <Link
            href="#"
            className="mb-4 inline-block items-center bg-black px-6 py-3 text-center font-semibold text-white"
          >
            Get Started
          </Link>
          <p className="text-sm sm:text-base">No credit card required.</p>
        </div>
      </div>
    </section>)
  );
}

export default CTA