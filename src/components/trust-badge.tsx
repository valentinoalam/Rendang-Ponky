import Image from "next/image";
import React from "react";

const TrustBadges = () => {
  return (
    <div className="flex flex-col items-center mb-8 md:mb-0">
      <div className="flex flex-wrap justify-center gap-6 mb-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-white outline-16 outline-rendang-cream flex items-center justify-center mb-2 relative">
            <Image width={64} height={64}
              src="/logo/sertifikasi-halal.png"
              alt="Sertifikasi halal"
              className="object-contain w-full h-full absolute top-0 left-0 translate-x-[8%] right-0"
            />
          </div>
          <span className="text-xs text-rendang-darkbrown">Sertifikasi Halal</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-white outline-16 outline-rendang-cream flex items-center justify-center mb-2 relative">
            <Image width={48} height={48}
              src="/logo/sertifikasi-bpom.png"
              alt="Sertifikasi bpom"
              className="object-contain w-full h-full absolute top-0 left-0 right-0"
            />
          </div>
          <span className="text-xs text-rendang-darkbrown">Terjamin BPOM</span>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
