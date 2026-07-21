import React from 'react';

export default function Partners() {
  const brands = [
    'MAERSK LINE', 'MSC SHIPPING', 'COSCO SHIPPING', 'HAPAG-LLOYD',
    'DHL GLOBAL', 'FEDEX EXPRESS', 'SGS AUDITING', 'APEDA INDIA',
    'FIATA ALLIANCE', 'CMA CGM CARGO'
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-[#121829] overflow-hidden w-full select-none">
      <div className="w-full relative flex items-center">
        {/* Soft blur overlay at left/right edges for premium visual fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#121829] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#121829] to-transparent z-10 pointer-events-none" />
        
        {/* Horizontal Marquee Container */}
        <div className="marquee-content py-2">
          {/* Double content array to support seamless infinite loop */}
          {[...brands, ...brands].map((brand, idx) => (
            <div
              key={idx}
              className="mx-10 md:mx-16 font-display font-black text-sm md:text-lg tracking-widest text-gray-500 hover:text-white transition-colors duration-300 flex items-center space-x-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 opacity-60" />
              <span>{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
