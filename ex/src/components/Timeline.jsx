import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Factory, ClipboardCheck, Archive, Ship, Landmark, CheckCircle } from 'lucide-react';

export default function Timeline() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Translate horizontal deck from 0% to -70% as user scrolls vertical container
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-70%']);

  const steps = [
    {
      step: '01',
      title: 'Manufacturer sourcing',
      desc: 'Sourcing quality items directly from local certified producers and processing plants across Indian trade corridors.',
      icon: Factory,
      color: 'from-blue-600 to-blue-500',
    },
    {
      step: '02',
      title: 'Quality Check audits',
      desc: 'Rigid testing, SGS/Bureau Veritas inspections, phytosanitary checks for food crop items, and moisture rating audits.',
      icon: ClipboardCheck,
      color: 'from-teal-600 to-teal-500',
    },
    {
      step: '03',
      title: 'Reinforced Packaging',
      desc: 'Seaworthy moisture-barrier shrink wraps, fumigated wooden pallet reinforcements, and unique barcoded cargo markings.',
      icon: Archive,
      color: 'from-amber-600 to-amber-500',
    },
    {
      step: '04',
      title: 'Port-to-Vessel Shipping',
      desc: 'Securing FCL/LCL ocean vessel allocations or air freighter bookings. Transferred and sealed into metal cargo bays.',
      icon: Ship,
      color: 'from-emerald-600 to-emerald-500',
    },
    {
      step: '05',
      title: 'Customhouse Clearance',
      desc: 'Dynamic filing of export declarations, tariff assessments, bills of lading, and certificate of origin clearances.',
      icon: Landmark,
      color: 'from-indigo-600 to-indigo-500',
    },
    {
      step: '06',
      title: 'Guaranteed Delivery',
      desc: 'Local destination unloading, port customs settlement, and last-mile trailer delivery to client warehouses.',
      icon: CheckCircle,
      color: 'from-pink-600 to-pink-500',
    },
  ];

  return (
    <section ref={targetRef} id="process" className="relative h-[250vh] bg-[#121829]">
      {/* Sticky Frame */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Ambient Grid */}
        <div className="absolute inset-0 dots-bg opacity-10 pointer-events-none" />

        {/* Section Header */}
        <div className="container mx-auto px-6 md:px-12 w-full pt-8 md:pt-16 pb-6 text-left relative z-10">
          <span className="font-mono text-xs text-blue-500 tracking-widest uppercase font-bold">
            // SHIPMENT WORKFLOW
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white">
            Export Process <span className="text-gradient-secondary">Timeline</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-gray-500 max-w-lg mt-2">
            Scroll down to view our comprehensive end-to-end global trade process in action.
          </p>
        </div>

        {/* Horizontal Scroll Deck */}
        <div className="flex items-center relative z-10 w-full">
          <motion.div style={{ x }} className="flex space-x-8 px-6 md:px-12 py-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="w-[280px] md:w-[360px] flex-shrink-0 p-8 rounded-2xl glass-card border border-white/5 flex flex-col justify-between text-left group hover:border-white/10 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Glowing step marker */}
                  <div className={`absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br ${step.color} opacity-5 rounded-full blur-xl group-hover:opacity-10 transition-opacity`} />

                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-500 transition-all duration-300">
                        <Icon className="w-6 h-6 text-teal-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="font-mono text-xs text-gray-500 font-bold group-hover:text-teal-400">
                        STEP {step.step}
                      </span>
                    </div>

                    {/* Step Title & Desc */}
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-gradient-primary">
                        {step.title}
                      </h3>
                      <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Flow Arrow (except last step) */}
                  {idx < steps.length - 1 && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden xl:flex items-center translate-x-12 z-20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-8 h-8 text-teal-400/20 animate-pulse">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll Progress Bar Indicator */}
        <div className="container mx-auto px-6 md:px-12 w-full pt-10">
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full bg-gradient-to-r from-blue-600 via-teal-500 to-amber-500 origin-left"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
