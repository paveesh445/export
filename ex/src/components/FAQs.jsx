import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQs() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqList = [
    {
      q: 'What products do you primarily export from India?',
      a: 'We manage agricultural cargos (Basmati long-grain rice, dry whole spices like red chili and turmeric), coconut-based derivatives (coir fibers, activated carbon, organic cold-pressed oils), readymade organic textiles, custom engineering CNC metal castings, and certified agro-chemicals.',
    },
    {
      q: 'What are the typical transit durations for ocean freight?',
      a: 'Typical ocean lane delivery speeds from JNPT/Chennai terminals are: UAE/Gulf ports: 4 days; Singapore/ASEAN: 5-7 days; UK/Northern European gateways: 12-14 days; United States (East Coast): 14-18 days; and Australia: 16-20 days.',
    },
    {
      q: 'How do you guarantee quality compliance for agricultural goods?',
      a: 'All cargos undergo strict pre-shipment tests at certified labs. We measure moisture indexes, foreign matter presence, crop maturity, and secure phytosanitary clearances, alongside reputable third-party audits by SGS or Bureau Veritas at container loading.',
    },
    {
      q: 'Do you provide destination customs clearance and last-mile trucking?',
      a: 'Yes, we manage comprehensive door-to-door delivery. Through our network of registered customs brokers in USA, UK, Germany, UAE, and Singapore, we handle local import entry filings, duty settlements, and trailer transfer to your final warehouse.',
    },
  ];

  return (
    <section id="faq" className="relative py-24 w-full bg-[#121829] overflow-hidden">
      <div className="absolute inset-0 dots-bg opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-4 mb-16">
          <span className="font-mono text-xs text-teal-400 tracking-widest uppercase font-bold">
            // HELP CENTER
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Frequently Asked <span className="text-gradient-secondary">Questions</span>
          </h2>
          <p className="font-sans text-gray-400 text-base md:text-lg max-w-xl">
            Frequently asked questions about our export procedures, freight cargo lanes, and quality controls.
          </p>
        </div>

        {/* Accordions Deck */}
        <div className="max-w-4xl mr-auto text-left space-y-4">
          {faqList.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md overflow-hidden transition-all duration-300"
              >
                {/* Trigger Row */}
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer group"
                >
                  <span className="font-display font-bold text-sm md:text-base text-gray-200 group-hover:text-white transition-colors pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-teal-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {/* Animated content block */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="p-6 pt-0 border-t border-white/3 font-sans text-xs md:text-sm text-gray-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
