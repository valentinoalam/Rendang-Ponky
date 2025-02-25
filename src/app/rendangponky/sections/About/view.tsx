import Image from "next/image"
import React from 'react'

export const About = () => {
  return (
    (<section>
      {/* Container */}
      <div className="w-full px-5 py-12 mx-auto max-w-7xl md:px-10 md:py-16 lg:py-20">
        {/* Component */}
        <div className="flex flex-col gap-14 lg:gap-20">
          {/* Image */}
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2Fbg-about.png?alt=media&token=0d5ea1c5-61cf-4b0d-beab-bd023e3d9ee8"
            alt=""
            width={450}
            height={350}
            className="w-full"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          {/* Content */}
          <div className="flex flex-col gap-14 lg:gap-20">
            <div className="flex flex-col gap-5 md:flex-row">
              <h2 className="flex-1 text-3xl font-bold md:text-5xl">
                Our Story
              </h2>
              <p className="flex-1">
              Perjalanan kami didorong oleh hasrat untuk mengubah ide menjadi pengalaman visual yang mendalam. 
              Didirikan dengan visi untuk merevolusi dunia konten video, kami telah berkembang menjadi pusat kreativitas dan inovasi.
              </p>
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <h2 className="flex-1 text-3xl font-semibold md:text-5xl">
                Mission
              </h2>
              <p className="flex-1">
              Misi kami jelas: memberdayakan merek melalui kekuatan penceritaan yang tak tertandingi. 
              Kami percaya bahwa setiap merek memiliki narasi unik yang siap diceritakan, dan misi kami adalah menghidupkan kisah-kisah tersebut dengan keaslian, kreativitas, dan dampak.
              </p>
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <h2 className="flex-1 text-3xl font-bold md:text-5xl">
                Approach
              </h2>
              <p className="flex-1">
              Yang membedakan kami adalah pendekatan holistik kami dalam mengembangkan image dari produk tersebut.
              Dari konsep hingga kreasi dan promosi, kami memandu klien kami
              melalui setiap langkah, memastikan proses yang lancar dan efektif.
              Kami menggabungkan kreativitas dengan strategi, menghasilkan konten yang tidak hanya terlihat memukau tetapi juga mencapai hasil nyata.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>)
  );
}
