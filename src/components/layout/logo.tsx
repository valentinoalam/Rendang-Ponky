import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link 
        href="/" 
        className="relative flex items-center group min-w-20 w-42"
        >
        <div className="absolute left-0 -top-5 md:-top-10 font-playfair text-rendang-maroon text-2xl font-bold to-rendang-light/60 p-2 rounded-full
                        group-hover:scale-110 transition-all duration-300 ease-out
                        group-hover:shadow-lg group-hover:shadow-blue-400/25"
        
        >
            <Image
            src='/logo/logo-rendangponky.svg'
            alt="Rendang Pongky"
            width={150}
            height={150}
            className="inline-flex"
            style={{
                maxWidth: "100%",
                height: "auto"
            }} />
        {/* </div> */}
        </div>
        </Link>
  );
};

export default Logo;