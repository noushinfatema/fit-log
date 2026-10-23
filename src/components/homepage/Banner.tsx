'use client';

import Image from 'next/image';
import bannerimg from '@/assets/banner.png';

const Banner = () => {
  const handleScrollToLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const libraryElement = document.getElementById('library');
    if (libraryElement) {
      libraryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#0C0D10] px-6 md:px-12 py-8">
      {/* Dark Outer Card spanning full container width */}
      <div className="w-full bg-[#15171D] border border-[#222630] rounded-2xl p-8 md:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
        
        {/* Left Text Content */}
        <div className="lg:col-span-7 space-y-6">
          <p className="text-[#C2F800] text-xs md:text-sm font-bold tracking-widest uppercase">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold font-black uppercase tracking-tight leading-[1.1]">
            TRAIN WITH INTENT. <br className="hidden sm:inline" />
            LOG EVERY SET.
          </h1>

          <p className="text-[#9CA3AF] text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="pt-2">
            <a
              href="#library"
              onClick={handleScrollToLibrary}
              className="inline-flex items-center justify-center gap-2 bg-[#C2F800] hover:bg-[#b0e200] text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase px-6 py-3.5 rounded-lg transition-all duration-200 active:scale-95 shadow-md"
            >
              <span>BROWSE WORKOUTS</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                className="w-4 h-4"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <Image
            src={bannerimg}
            alt="Gym Athlete Training"
            priority
            className="object-contain max-h-87.5 lg:max-h-100 drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;