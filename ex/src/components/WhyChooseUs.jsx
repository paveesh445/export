import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Users, Navigation, ShieldCheck } from 'lucide-react';

function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const animatedRef = useRef(false);

  useEffect(() => {
    if (isInView && !animatedRef.current) {
      animatedRef.current = true;
      const end = parseInt(target, 10);
      if (isNaN(end)) return;
      
      let startTime = null;
      
      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function: easeOutQuad
        const easeProgress = progress * (2 - progress);
        const currentCount = Math.floor(easeProgress * end);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(updateCount);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  const stats = [
    {
      target: '25',
      suffix: '+',
      label: 'Countries Served',
      desc: 'Active cargo supply lines across Europe, Americas, Middle East, and APAC.',
      color: 'from-blue-600 to-blue-400',
      icon: Globe,
    },
    {
      target: '500',
      suffix: '+',
      label: 'Global Clients',
      desc: 'Trusted by international manufacturing groups and food distributors.',
      color: 'from-teal-600 to-teal-400',
      icon: Users,
    },
    {
      target: '1000',
      suffix: '+',
      label: 'Successful Shipments',
      desc: 'Container cargos cleared and delivered with full documentation logs.',
      color: 'from-amber-600 to-amber-400',
      icon: Navigation,
    },
    {
      target: '99',
      suffix: '%',
      label: 'On Time Delivery',
      desc: 'Rigid vessel schedule allocations and custom pre-cleared logistics.',
      color: 'from-emerald-600 to-emerald-400',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="why-choose-us" className="relative py-24 md:py-32 w-full bg-[#121829] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 dots-bg opacity-15 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 text-left space-y-6 md:space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs text-blue-500 tracking-widest uppercase font-bold">
                // THE ARAVIND ADVANTAGE
              </span>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                Why International Brands <span className="text-gradient-secondary">Partner With Us</span>
              </h2>
            </div>
            
            <p className="font-sans text-gray-400 text-base md:text-lg leading-relaxed">
              Logistics is more than just cargo transport. It is the lifeblood of global trade. We build robust cargo highways ensuring compliance, velocity, and quality control.
            </p>

            <ul className="space-y-4">
              {[
                'Rigid crop & merchandise inspection protocols',
                'Comprehensive marine risk insurance coverage',
                'Dynamic pricing and contract container rates',
                'End-to-end custom documentation accuracy',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3 text-teal-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="font-sans text-gray-300 text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Stats Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl glass-card border border-white/5 flex flex-col items-start space-y-4 text-left group hover:border-white/10 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-500 transition-all duration-300">
                    <Icon className="w-6 h-6 text-teal-400 group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Stat Number */}
                  <div className="font-display font-black text-5xl md:text-6xl text-white">
                    <Counter target={stat.target} suffix={stat.suffix} />
                  </div>

                  {/* Labels */}
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-sm text-gray-200">
                      {stat.label}
                    </h4>
                    <p className="font-sans text-xs text-gray-500 leading-normal">
                      {stat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
