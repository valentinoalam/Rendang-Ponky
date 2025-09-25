import Image from "next/image"
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    (<footer className="py-6 h-60 w-full bg-rendang-darkbrown text-white text-center">
      {/* Container */}
      <div className="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
        {/* Component */}
        <div className="sm:flex-row flex justify-between flex-col">
          <h2 className="font-bold text-3xl md:text-5xl w-full max-w-xl">
            Lightning fast Webflow Dev made easy
          </h2>
          <div className="mt-8 md:mt-0">
            <div className="mb-4 flex max-w-72 items-start justify-start">
              <Image
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94bb99e6cf78_MapPin.svg"
                alt=""
                width={32}
                height={32}
                className="inline-block mr-3"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
              <p className="text-gray-500 text-sm sm:text-base">
                8502 Preston Rd. Inglewood, Maine 98380, USA
              </p>
            </div>
            <div className="mb-4 flex max-w-72 items-start justify-start">
              <Image
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a944119e6cf76_EnvelopeSimple-2.svg"
                alt=""
                width={32}
                height={32}
                className="inline-block mr-3"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
              <p className="text-gray-500 text-sm sm:text-base">
                support@flowspark.co
              </p>
            </div>
          </div>
        </div>
        <div className="mb-14 w-full border-b border-black mt-16"></div>
        <div className="md:flex-row flex justify-between sm:items-center sm:flex-col items-start flex-col-reverse">
          <div className="font-semibold mb-4 sm:mb-0 py-1 text-center sm:text-center">
            <Link
              href="#"
              className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              About
            </Link>
            <Link
              href="#"
              className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              Features
            </Link>
            <Link
              href="#"
              className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              Works
            </Link>
            <Link
              href="#"
              className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              Support
            </Link>
            <Link
              href="#"
              className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              Help
            </Link>
          </div>
          <div className="container mx-auto px-4 md:px-6 text-center">
            {/* bg-rendang-900 */}
        {/* Logo Rendang Ponky  

          Kontak: "Hubungi kami di WhatsApp: 0812-xxx-xxxx"  

          Ikon media sosial (Instagram, Facebook)  

          "© 2025 Rendang Ponky – Kelezatan Tradisi dalam Setiap Gigitan"

          Tujuan: Memberikan informasi kontak dan memperkuat branding.  

          Tips: Jaga desain simpel dan bersih agar tidak mengalihkan perhatian dari CTA utama.
        */}
            <p>© 2025 Rendang Ponky All rights reserved.</p>
            <p className="text-sm opacity-75 mt-2">– Kelezatan Tradisi dalam Setiap Gigitan.</p>
          </div>
        </div>
      </div>
    </footer>)
  );
}

export default Footer