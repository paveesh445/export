import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, BarChart3, PieChart } from 'lucide-react';

export default function StatsDashboard() {
  const [activeTab, setActiveTab] = useState('volume'); // volume or commodity

  const commodities = [
    { name: 'Basmati Rice & Grains', percentage: 35, color: 'bg-blue-600', val: '$14.8M' },
    { name: 'Whole Organic Spices', percentage: 20, color: 'bg-teal-500', val: '$8.5M' },
    { name: 'Coconut Products', percentage: 15, color: 'bg-amber-500', val: '$6.3M' },
    { name: 'Garments & Textiles', percentage: 15, color: 'bg-indigo-500', val: '$6.3M' },
    { name: 'Engineering Castings', percentage: 10, color: 'bg-rose-500', val: '$4.2M' },
    { name: 'Chemical Derivatives', percentage: 5, color: 'bg-emerald-500', val: '$2.1M' },
  ];

  return (
    <section id="stats" className="relative py-24 w-full bg-[#121829] overflow-hidden">
      <div className="absolute inset-0 dots-bg opacity-15 pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 text-left space-y-4">
            <span className="font-mono text-xs text-blue-500 tracking-widest uppercase font-bold">
              // TRADE ANALYTICS
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              Export Statistics <span className="text-gradient-secondary">Dashboard</span>
            </h2>
            <p className="font-sans text-gray-400 text-base md:text-lg max-w-xl">
              Real-time audited annual metrics representing trade volumes, commodities valuation, and regional growth.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end gap-3">
            <button
              onClick={() => setActiveTab('volume')}
              className={`px-5 py-2.5 rounded-xl font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'volume'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              Volume Growth
            </button>
            <button
              onClick={() => setActiveTab('commodity')}
              className={`px-5 py-2.5 rounded-xl font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'commodity'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              Commodity Shares
            </button>
          </div>
        </div>

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Chart Panel */}
          <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl border border-white/5 glass-card shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
              <div className="text-left">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">AUDITED METRIC TYPE</span>
                <h3 className="font-display font-bold text-base text-white">
                  {activeTab === 'volume' ? 'Annual Volume Growth (Metric Tons)' : 'Commodity Export Valuation Share'}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+ 28.5% YoY Growth</span>
              </div>
            </div>

            {/* Rendering Custom SVG Charts */}
            <div className="h-[250px] md:h-[300px] w-full flex items-center justify-center relative">
              {activeTab === 'volume' ? (
                /* Dynamic SVG Line Graph */
                <svg viewBox="0 0 500 200" className="w-full h-full">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="40" y1="60" x2="480" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="40" y1="100" x2="480" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="40" y1="140" x2="480" y2="140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  
                  {/* Area fill beneath line */}
                  <path
                    d="M 40,170 Q 120,130 200,110 T 360,70 T 480,30 L 480,170 Z"
                    fill="url(#chartGrad)"
                    opacity="0.15"
                  />

                  {/* Bezier Trend Line */}
                  <motion.path
                    d="M 40,170 Q 120,130 200,110 T 360,70 T 480,30"
                    fill="none"
                    stroke="#14B8A6"
                    strokeWidth="3.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />

                  {/* Nodes */}
                  <circle cx="40" cy="170" r="5" fill="#2563EB" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="150" cy="125" r="5" fill="#2563EB" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="260" cy="100" r="5" fill="#2563EB" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="370" cy="68" r="5" fill="#2563EB" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="480" cy="30" r="5" fill="#2563EB" stroke="#ffffff" strokeWidth="1.5" />

                  {/* X Axis Labels */}
                  <text x="35" y="190" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">2022</text>
                  <text x="145" y="190" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">2023</text>
                  <text x="255" y="190" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">2024</text>
                  <text x="365" y="190" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">2025</text>
                  <text x="465" y="190" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">2026</text>

                  {/* Y Axis Labels */}
                  <text x="10" y="25" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">50K T</text>
                  <text x="10" y="105" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">25K T</text>
                  <text x="15" y="175" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">0 T</text>

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#14B8A6" />
                      <stop offset="100%" stopColor="#121829" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                /* Commodities Percentage share display using horizontal bar stacks */
                <div className="w-full space-y-4 px-4">
                  {commodities.map((item, idx) => (
                    <div key={item.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-300">{item.name}</span>
                        <span className="text-teal-400 font-mono">{item.percentage}% ({item.val})</span>
                      </div>
                      <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          className={`h-full ${item.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, delay: idx * 0.08 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Summary Info */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            <div className="p-6 rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm text-left flex flex-col justify-between">
              <div className="space-y-2">
                <BarChart3 className="w-8 h-8 text-blue-500" />
                <h4 className="font-display font-bold text-sm text-white">Compound Growth Rate</h4>
                <p className="font-sans text-xs text-gray-500 leading-relaxed">
                  Consistently expanding our ocean container slot booking and flight route access.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 mt-4">
                <span className="font-display font-black text-4xl text-gradient-primary">24.2%</span>
                <span className="font-sans text-[10px] text-gray-500 block font-semibold uppercase tracking-wider">ANNUAL COMPOUND CAGR</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm text-left flex flex-col justify-between">
              <div className="space-y-2">
                <Award className="w-8 h-8 text-amber-500" />
                <h4 className="font-display font-bold text-sm text-white">Vetted Suppliers</h4>
                <p className="font-sans text-xs text-gray-500 leading-relaxed">
                  Maintaining partnerships with local mills, farmers, and heavy casting machine shops.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 mt-4">
                <span className="font-display font-black text-4xl text-gradient-secondary">180+</span>
                <span className="font-sans text-[10px] text-gray-500 block font-semibold uppercase tracking-wider">VETTED PRODUCERS IN SYSTEM</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
