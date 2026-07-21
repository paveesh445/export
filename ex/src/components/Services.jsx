import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Box, Ship, Plane, FileCheck, Factory, Globe } from 'lucide-react';

function TiltCard({ icon: Icon, title, description, tag, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse x within card
    const y = e.clientY - rect.top;  // mouse y within card
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Calculate rotation angle (max 15 degrees)
    const rotateX = -((y - yc) / yc) * 12;
    const rotateY = ((x - xc) / xc) * 12;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="interactive-card relative rounded-2xl glass-card p-8 flex flex-col items-start justify-between cursor-pointer border border-white/5 shadow-xl transition-all duration-150 ease-out overflow-hidden group select-none"
    >
      {/* Glow highlight behind card */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-teal-500/0 to-teal-500/5 group-hover:from-blue-600/5 group-hover:to-teal-500/10 transition-all duration-500" />
      
      {/* Absolute floating pattern */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/3 rounded-full blur-xl group-hover:bg-blue-600/10 transition-all duration-500" />

      <div className="w-full space-y-6 z-10">
        {/* Icon & Tag */}
        <div className="flex items-center justify-between w-full">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-500 transition-all duration-300">
            <Icon className="w-6 h-6 text-teal-400 group-hover:text-white transition-colors duration-300" />
          </div>
          <span className="font-mono text-[9px] text-gray-500 group-hover:text-teal-400 transition-colors tracking-widest uppercase border border-white/5 px-2.5 py-1 rounded-full bg-white/3">
            {tag}
          </span>
        </div>

        {/* Title & Desc */}
        <div className="text-left space-y-2">
          <h3 className="font-display font-bold text-lg text-white group-hover:text-gradient-primary">
            {title}
          </h3>
          <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
            {description}
          </p>
        </div>
      </div>

      {/* Decorative arrow link at bottom */}
      <div className="flex items-center space-x-2 pt-6 font-mono text-[10px] text-teal-400 uppercase tracking-widest font-semibold group-hover:translate-x-1 transition-transform duration-300 mt-4 z-10">
        <span>LEARN MORE</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const servicesList = [
    {
      icon: Box,
      title: 'Product Export',
      description: 'Delivering vetted agricultural crops, spices, engineering components, garments, and chemicals to buyers worldwide.',
      tag: 'Global Supply',
    },
    {
      icon: Ship,
      title: 'Sea Freight',
      description: 'Cost-effective FCL and LCL container shipment with top shipping carriers, ensuring complete volume reliability.',
      tag: 'Ocean Cargo',
    },
    {
      icon: Plane,
      title: 'Air Cargo',
      description: 'Express priority shipping for high-value and perishable goods via global passenger & freighter flight networks.',
      tag: 'Fast Delivery',
    },
    {
      icon: FileCheck,
      title: 'Customs Clearance',
      description: 'Certified customs brokers handling documentations, tariff valuations, HS classifications, and smooth ports clearing.',
      tag: 'Compliance',
    },
    {
      icon: Factory,
      title: 'Supplier Management',
      description: 'Local audits, manufacturing quality control inspects, packaging checks, and compliance validation reports.',
      tag: 'Source Control',
    },
    {
      icon: Globe,
      title: 'Global Logistics',
      description: 'Integrated door-to-door multi-modal shipments, secure warehousing, and dynamic route tracking optimization.',
      tag: 'End-to-End',
    },
  ];

  return (
    <section id="services" className="relative py-24 md:py-32 w-full bg-[#121829] overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 dots-bg opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-4 mb-16 md:mb-20">
          <span className="font-mono text-xs text-teal-400 tracking-widest uppercase font-bold">
            // OUR LOGISTICS PORTFOLIO
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            High-Performance <br />
            <span className="text-gradient-primary">Cargo Solutions</span>
          </h2>
          <p className="font-sans text-gray-400 text-base md:text-lg max-w-xl">
            We provide structured, fully audited logistical solutions optimized for promptness, safety, and tariff compliance.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesList.map((service, index) => (
            <TiltCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              tag={service.tag}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
