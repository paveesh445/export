import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';

export default function WorldPresence() {
  const [activeCountry, setActiveCountry] = useState(null);

  const connectionData = [
    {
      id: 'usa',
      name: 'United States',
      port: 'Port of New York / LA',
      transit: '14 - 18 Days (Sea) | 2 Days (Air)',
      cargo: 'Garments, Spices, Engineering Castings',
      coords: { x: 220, y: 160 },
      flag: '🇺🇸',
      status: 'Active sea lanes, 8 container cargos en route',
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      port: 'Port of Felixstowe / London Gateway',
      transit: '12 - 14 Days (Sea) | 1.5 Days (Air)',
      cargo: 'Rice, Coconut Coir, Organic Textiles',
      coords: { x: 480, y: 130 },
      flag: '🇬🇧',
      status: 'Customs cleared at Southampton, 3 containers pending',
    },
    {
      id: 'germany',
      name: 'Germany',
      port: 'Port of Hamburg / Frankfurt CargoCity',
      transit: '14 Days (Sea) | 2 Days (Air)',
      cargo: 'Precision Castings, Organic Chemicals',
      coords: { x: 520, y: 125 },
      flag: '🇩🇪',
      status: '4 shipments cleared this week via DHL Global',
    },
    {
      id: 'dubai',
      name: 'United Arab Emirates',
      port: 'Port of Jebel Ali, Dubai',
      transit: '4 Days (Sea) | 4 Hours (Air)',
      cargo: 'Basmati Rice, Cardamom, Fresh Produce',
      coords: { x: 570, y: 220 },
      flag: '🇦🇪',
      status: 'Daily express cargo lines active',
    },
    {
      id: 'singapore',
      name: 'Singapore',
      port: 'PSA Singapore Terminal',
      transit: '5 Days (Sea) | 5 Hours (Air)',
      cargo: 'Refined Chemicals, Coconut Oils, Textiles',
      coords: { x: 710, y: 310 },
      flag: '🇸🇬',
      status: 'Transshipment hub clearances standard',
    },
    {
      id: 'australia',
      name: 'Australia',
      port: 'Port of Sydney / Melbourne',
      transit: '16 - 20 Days (Sea) | 3 Days (Air)',
      cargo: 'Spices, Jute Packaging, Finished Garments',
      coords: { x: 820, y: 390 },
      flag: '🇦🇺',
      status: 'Quarterly bulk contract ship loaded',
    },
  ];

  const indiaCoords = { x: 620, y: 240 };

  return (
    <section id="network" className="relative py-24 md:py-32 w-full bg-[#121829] overflow-hidden">
      <div className="absolute inset-0 dots-bg opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* SVG glow line animation stylesheet */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
        .glowing-arc {
          stroke-dasharray: 8, 12;
          animation: dash 2s linear infinite;
        }
      `}} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-4 mb-16">
          <span className="font-mono text-xs text-teal-400 tracking-widest uppercase font-bold">
            // CARGO PATHWAYS
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Our World <span className="text-gradient-primary">Presence</span>
          </h2>
          <p className="font-sans text-gray-400 text-base md:text-lg max-w-xl">
            Hover over the global destination nodes below to view active cargo routes, ports, transit periods, and delivery status.
          </p>
        </div>

        {/* Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Interactive Map */}
          <div className="lg:col-span-8 relative w-full border border-white/5 bg-white/3 backdrop-blur-md rounded-3xl p-4 md:p-8 overflow-x-auto shadow-2xl">
            <div className="min-w-[850px] relative">
              {/* World map vector background representing simplified landmasses */}
              <svg viewBox="0 0 1000 500" className="w-full h-auto select-none opacity-40">
                {/* Simplified Continents outline paths for sci-fi look */}
                {/* North America */}
                <path d="M 50,100 Q 150,80 200,120 T 300,160 T 250,220 T 180,260 Z" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                {/* South America */}
                <path d="M 230,280 Q 280,310 320,380 T 260,480 T 210,400 Z" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                {/* Eurasia */}
                <path d="M 450,80 Q 600,50 800,80 T 950,150 T 800,300 T 680,250 T 550,150 Z" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                {/* Africa */}
                <path d="M 460,200 Q 580,200 600,280 T 550,420 T 480,300 Z" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                {/* Australia */}
                <path d="M 780,350 Q 880,360 850,420 T 750,400 Z" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                {/* Shipping routes from India (pulsing connections) */}
                {connectionData.map((c) => {
                  const midX = (indiaCoords.x + c.coords.x) / 2;
                  const midY = Math.min(indiaCoords.y, c.coords.y) - 60; // Curve arc upwards
                  return (
                    <g key={`arc-${c.id}`}>
                      {/* Background static curve */}
                      <path
                        d={`M ${indiaCoords.x} ${indiaCoords.y} Q ${midX} ${midY} ${c.coords.x} ${c.coords.y}`}
                        fill="none"
                        stroke="rgba(20, 184, 166, 0.15)"
                        strokeWidth="1.5"
                      />
                      {/* Active running pulse path */}
                      <path
                        d={`M ${indiaCoords.x} ${indiaCoords.y} Q ${midX} ${midY} ${c.coords.x} ${c.coords.y}`}
                        fill="none"
                        stroke={activeCountry?.id === c.id ? '#F59E0B' : '#14B8A6'}
                        strokeWidth={activeCountry?.id === c.id ? '2' : '1.5'}
                        className="glowing-arc"
                      />
                    </g>
                  );
                })}

                {/* India HQ Node */}
                <g transform={`translate(${indiaCoords.x}, ${indiaCoords.y})`}>
                  <circle r="12" fill="rgba(245, 158, 11, 0.2)" className="animate-ping" />
                  <circle r="6" fill="#F59E0B" />
                  <circle r="3" fill="#ffffff" />
                </g>

                {/* Destination Nodes */}
                {connectionData.map((c) => {
                  const isHovered = activeCountry?.id === c.id;
                  return (
                    <g
                      key={c.id}
                      transform={`translate(${c.coords.x}, ${c.coords.y})`}
                      className="cursor-pointer group"
                      onMouseEnter={() => setActiveCountry(c)}
                      onMouseLeave={() => setActiveCountry(null)}
                    >
                      <circle
                        r={isHovered ? '10' : '6'}
                        fill={isHovered ? 'rgba(37, 99, 235, 0.4)' : 'rgba(20, 184, 166, 0.2)'}
                        className="transition-all duration-300"
                      />
                      <circle
                        r="4"
                        fill={isHovered ? '#2563EB' : '#14B8A6'}
                        className="transition-colors duration-300"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* HQ Label overlay */}
              <div
                style={{ left: `${indiaCoords.x - 40}px`, top: `${indiaCoords.y + 12}px` }}
                className="absolute font-mono text-[9px] bg-[#F59E0B] text-[#121829] font-bold px-2 py-0.5 rounded tracking-widest uppercase select-none pointer-events-none"
              >
                INDIA (HQ)
              </div>
            </div>
          </div>

          {/* Right: Dynamic Route Info Overlay */}
          <div className="lg:col-span-4 h-full flex flex-col justify-center text-left">
            <AnimatePresence mode="wait">
              {activeCountry ? (
                <motion.div
                  key={activeCountry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-8 rounded-2xl border border-white/8 bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-md shadow-2xl relative"
                >
                  {/* Glowing vertical header line */}
                  <div className="absolute top-0 left-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-teal-500 to-transparent opacity-20" />

                  <div className="relative z-10 pl-4 space-y-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{activeCountry.flag}</span>
                      <div>
                        <h3 className="font-display font-black text-2xl text-white">
                          {activeCountry.name}
                        </h3>
                        <p className="font-mono text-[10px] text-teal-400 tracking-wider uppercase font-semibold">
                          {activeCountry.port}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                          TRANSIT DURATION
                        </span>
                        <p className="font-sans text-xs md:text-sm text-white font-semibold mt-0.5">
                          {activeCountry.transit}
                        </p>
                      </div>

                      <div>
                        <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                          EXPORT FREIGHT COMMODITY
                        </span>
                        <p className="font-sans text-xs md:text-sm text-gray-300 mt-0.5">
                          {activeCountry.cargo}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-white/3 border border-white/5">
                        <span className="font-mono text-[9px] text-teal-400 uppercase tracking-widest block font-bold">
                          LIVE STATUS LOG
                        </span>
                        <p className="font-sans text-xs text-gray-400 mt-1 leading-relaxed">
                          {activeCountry.status}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href="#contact"
                        className="inline-flex items-center space-x-1.5 font-mono text-[10px] text-teal-400 font-bold uppercase tracking-wider group hover:text-white transition-colors"
                      >
                        <span>BOOK CARGO SLOT</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="p-8 rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md opacity-40 flex flex-col items-center justify-center text-center py-20">
                  <MapPin className="w-8 h-8 text-gray-500 animate-bounce mb-3" />
                  <p className="font-sans text-xs text-gray-400 tracking-wider uppercase">
                    Hover over a map marker to inspect shipment corridors
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
