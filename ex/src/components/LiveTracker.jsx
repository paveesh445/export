import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Ship, Anchor, ShieldCheck, MapPin, Compass, Box } from 'lucide-react';

export default function LiveTracker() {
  const [trackingId, setTrackingId] = useState('');
  const [activeTracking, setActiveTracking] = useState(null);
  const [error, setError] = useState('');

  const dummyShipments = {
    'TG-74921': {
      id: 'TG-74921',
      product: '50 Tons Organic Basmati Rice',
      vessel: 'MSC TERESA v2401',
      shippingLine: 'MSC Mediterranean Shipping',
      origin: 'Chennai Port, Chennai, India',
      destination: 'Port of New York, USA',
      departure: 'July 12, 2026',
      arrival: 'July 28, 2026',
      progress: 65,
      stage: 2, // 0: Sealed, 1: Departed, 2: In Transit, 3: Custom Clearance, 4: Delivered
      coordinates: '24.8607° N, 67.0011° E (Arabian Sea)',
      logs: [
        { time: 'July 18, 08:30 UTC', desc: 'Vessel mid-transit. Temperature & humidity checked: STABLE.' },
        { time: 'July 15, 14:00 UTC', desc: 'Departed Chennai Port, Chennai. Voyage initiated.' },
        { time: 'July 12, 10:15 UTC', desc: 'Cargo sealed, container loaded. Phytosanitary certificate issued.' },
      ],
    },
    'TG-88129': {
      id: 'TG-88129',
      product: '12 Tons Premium Cardamom & Cinnamon',
      vessel: 'EMIRATES CARGO EK982',
      shippingLine: 'Emirates SkyCargo Alliance',
      origin: 'Kochi Airport, India',
      destination: 'Al Maktoum Airport, Dubai',
      departure: 'July 21, 2026',
      arrival: 'July 21, 2026',
      progress: 90,
      stage: 3, // Custom Clearance
      coordinates: '25.2048° N, 55.2708° E (Dubai Hub)',
      logs: [
        { time: 'July 21, 15:10 UTC', desc: 'Pre-customs filing processed. Awaiting local authority clearance.' },
        { time: 'July 21, 11:30 UTC', desc: 'Departed Kochi International Airport (COK).' },
        { time: 'July 20, 18:00 UTC', desc: 'Cargo security check cleared. Cold storage holding completed.' },
      ],
    },
    'TG-10552': {
      id: 'TG-10552',
      product: '28 Tons Precision Machine Castings',
      vessel: 'MAERSK MC-KINNEY MOLLER',
      shippingLine: 'Maersk Ocean Freight',
      origin: 'Chennai Port, India',
      destination: 'Port of Hamburg, Germany',
      departure: 'June 25, 2026',
      arrival: 'July 10, 2026',
      progress: 100,
      stage: 4, // Delivered
      coordinates: '53.5511° N, 9.9937° E (Hamburg Warehouse)',
      logs: [
        { time: 'July 10, 11:00 UTC', desc: 'Delivered to Müller Precision Warehouse. Signed by H. Müller.' },
        { time: 'July 09, 09:30 UTC', desc: 'Customs cleared at Hamburg Port. Cargo transferred to trailer.' },
        { time: 'June 25, 16:00 UTC', desc: 'Vessel departed Chennai Port terminal.' },
      ],
    },
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanId = trackingId.trim().toUpperCase();
    if (!cleanId) return;

    if (dummyShipments[cleanId]) {
      setActiveTracking(dummyShipments[cleanId]);
      setError('');
    } else {
      setError('Active shipment ID not found. Try searching: TG-74921, TG-88129, or TG-10552');
      setActiveTracking(null);
    }
  };

  const stages = [
    { title: 'Cargo Sealed', icon: Box },
    { title: 'Port Departed', icon: Anchor },
    { title: 'In Transit', icon: Ship },
    { title: 'Custom Clearance', icon: ShieldCheck },
    { title: 'Delivered', icon: MapPin },
  ];

  return (
    <section id="dashboard" className="relative py-24 md:py-32 w-full bg-[#121829] overflow-hidden">
      <div className="absolute inset-0 dots-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="font-mono text-xs text-teal-400 tracking-widest uppercase font-bold">
            // CARGO METRICS PORTAL
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Live Shipment <span className="text-gradient-secondary">Tracker</span>
          </h2>
          <p className="font-sans text-gray-400 text-base md:text-lg max-w-xl mx-auto">
            Input your bill of lading tracking code below to fetch live container coordinates, logistics vessels, and delivery stages.
          </p>
        </div>

        {/* Tracking Input Search bar */}
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex items-center bg-white/4 border border-white/8 rounded-2xl p-2.5 backdrop-blur-md focus-within:border-teal-500/50 focus-within:shadow-xl focus-within:shadow-teal-500/5 transition-all">
            <Search className="w-5 h-5 text-gray-500 ml-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Enter ID (e.g. TG-74921, TG-88129, TG-10552)..."
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="w-full bg-transparent font-mono text-sm text-white px-3 focus:outline-none placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs tracking-wider uppercase font-bold px-6 py-3.5 rounded-xl transition-all cursor-pointer flex-shrink-0 active:scale-95"
            >
              Track Cargo
            </button>
          </form>
          {error ? (
            <p className="font-mono text-[10px] text-amber-400 mt-3 text-left pl-2">
              {error}
            </p>
          ) : (
            <p className="font-mono text-[9px] text-gray-500 mt-3 text-left pl-2">
              Try testing: <span className="text-teal-400 font-bold">TG-74921</span> (Rice to NY), <span className="text-teal-400 font-bold">TG-88129</span> (Spices to Dubai), or <span className="text-teal-400 font-bold">TG-10552</span> (Machine parts to Hamburg).
            </p>
          )}
        </div>

        {/* Tracking Panel Dashboard Output */}
        <AnimatePresence mode="wait">
          {activeTracking && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto rounded-3xl border border-white/8 glass-card p-8 md:p-10 shadow-2xl text-left"
            >
              {/* Header Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-white/5">
                <div>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">CARGO SPECIFICATION</span>
                  <span className="font-display font-bold text-sm text-white">{activeTracking.product}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">SHIPPING VESSEL / CARRIER</span>
                  <span className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                    <Ship className="w-4 h-4 text-blue-500" />
                    <span>{activeTracking.vessel}</span>
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">CURRENT COORDINATES</span>
                  <span className="font-mono font-bold text-xs text-teal-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                    <span>{activeTracking.coordinates}</span>
                  </span>
                </div>
              </div>

              {/* Progress Flow timeline */}
              <div className="py-12">
                <div className="relative">
                  {/* Background track line */}
                  <div className="absolute top-5 left-0 right-0 h-1 bg-white/5 rounded-full" />
                  {/* Progress fill */}
                  <div
                    className="absolute top-5 left-0 h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-amber-500 rounded-full"
                    style={{ width: `${activeTracking.progress}%` }}
                  />

                  {/* Flow Nodes */}
                  <div className="relative flex justify-between">
                    {stages.map((stg, idx) => {
                      const StageIcon = stg.icon;
                      const isCompleted = activeTracking.stage >= idx;
                      const isCurrent = activeTracking.stage === idx;
                      
                      return (
                        <div key={idx} className="flex flex-col items-center space-y-3 z-10 w-24 text-center">
                          <div
                            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                              isCompleted
                                ? isCurrent
                                  ? 'bg-amber-500 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)] text-[#121829]'
                                  : 'bg-teal-500 border-teal-400 text-[#121829]'
                                : 'bg-[#121829] border-white/10 text-gray-500'
                            }`}
                          >
                            <StageIcon className="w-5 h-5" />
                          </div>
                          <span className={`font-display text-[10px] md:text-xs font-bold ${
                            isCompleted ? 'text-white' : 'text-gray-600'
                          }`}>
                            {stg.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Voyage Route Logistics Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                {/* Ports details */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/3 border border-white/5">
                    <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-500 font-mono text-[9px] font-bold">
                      ORG
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block">DEPARTURE PORT</span>
                      <span className="font-display font-bold text-xs text-white">{activeTracking.origin}</span>
                      <span className="font-sans text-[10px] text-gray-500 block mt-0.5">{activeTracking.departure}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/3 border border-white/5">
                    <div className="w-8 h-8 rounded bg-teal-500/10 border border-teal-500/30 flex items-center justify-center flex-shrink-0 text-teal-400 font-mono text-[9px] font-bold">
                      DES
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block">DESTINATION PORT</span>
                      <span className="font-display font-bold text-xs text-white">{activeTracking.destination}</span>
                      <span className="font-sans text-[10px] text-gray-500 block mt-0.5">{activeTracking.arrival}</span>
                    </div>
                  </div>
                </div>

                {/* Live Activity Logs */}
                <div className="space-y-3">
                  <span className="font-mono text-[9px] text-teal-400 uppercase tracking-widest font-bold block">// TELEMETRY LOGS</span>
                  <div className="space-y-3.5 max-h-[170px] overflow-y-auto pr-2">
                    {activeTracking.logs.map((log, idx) => (
                      <div key={idx} className="text-xs space-y-0.5">
                        <span className="font-mono text-[9px] text-gray-500">{log.time}</span>
                        <p className="font-sans text-gray-300">{log.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
