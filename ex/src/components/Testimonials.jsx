import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'David Thorne',
      role: 'CEO, Thorne AgriFoods LLC',
      country: 'United States',
      flag: '🇺🇸',
      text: 'Aravind\'s team has streamlined our foodgrain supply pipeline. Their quality inspection audits are consistently flawless, and customs clearance has saved us thousands in port storage fees.',
      initials: 'DT',
      delay: 0,
      floatDuration: 5,
    },
    {
      name: 'Sarah Jenkins',
      role: 'Procurement Director, Jenkins Textiles',
      country: 'United Kingdom',
      flag: '🇬🇧',
      text: 'We import organic cotton weaves quarterly. The quality of Indian mills is unmatched, and Aravind’s door-to-door freight forwarding handles all Felixstowe clearing smoothly.',
      initials: 'SJ',
      delay: 0.5,
      floatDuration: 6,
    },
    {
      name: 'Farhan Al-Mansoori',
      role: 'VP Logistics, Al-Mansoori Food Group',
      country: 'United Arab Emirates',
      flag: '🇦🇪',
      text: 'Daily spice cargos are critical for our hypermarket chains in the Gulf. Aravind’s fast air cargo slots assure transit times under 6 hours, delivering maximum product quality.',
      initials: 'FA',
      delay: 0.2,
      floatDuration: 5.5,
    },
    {
      name: 'Hans Müller',
      role: 'Head of Quality, Müller Precision Gears',
      country: 'Germany',
      flag: '🇩🇪',
      text: 'Sourcing custom brass castings requires strict tolerances. Aravind’s local inspection audits in India assure raw goods conform perfectly to our specifications.',
      initials: 'HM',
      delay: 0.7,
      floatDuration: 6.5,
    },
  ];

  return (
    <section id="testimonials" className="relative py-24 md:py-32 w-full bg-[#121829] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 dots-bg opacity-15 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-4 mb-16 md:mb-20">
          <span className="font-mono text-xs text-blue-500 tracking-widest uppercase font-bold">
            // CLIENT FEEDBACK
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Trusted Across <br />
            <span className="text-gradient-secondary">Global Borders</span>
          </h2>
          <p className="font-sans text-gray-400 text-base md:text-lg max-w-xl">
            Hear from some of the leading international importers who rely on Aravind for their supply lines.
          </p>
        </div>

        {/* Floating Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              animate={{
                y: [0, -12, 0],
              }}
              className="p-8 rounded-2xl glass-card border border-white/5 flex flex-col justify-between text-left group hover:border-white/15 hover:shadow-2xl hover:shadow-teal-500/5 transition-all duration-300 relative"
              style={{
                // Custom Framer Motion floating loop settings per card
                animation: `float-anim-${index} ${rev.floatDuration}s ease-in-out infinite`,
                animationDelay: `${rev.delay}s`,
              }}
            >
              {/* Injecting CSS Keyframes inline dynamically to avoid cluttering index.css */}
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes float-anim-${index} {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-12px); }
                }
              `}} />

              {/* Quote Icon overlay */}
              <Quote className="absolute right-8 top-8 w-12 h-12 text-white/3 group-hover:text-teal-400/5 transition-colors" />

              <div className="space-y-6">
                {/* Review Text */}
                <p className="font-sans text-sm md:text-base text-gray-300 italic leading-relaxed relative z-10">
                  "{rev.text}"
                </p>

                {/* Divider */}
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500" />

                {/* Reviewer Details */}
                <div className="flex items-center space-x-4 relative z-10">
                  {/* Initials Avatar */}
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center font-display font-bold text-xs text-white shadow-md">
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      <span className="text-xs filter saturate-100">{rev.flag}</span>
                    </h4>
                    <p className="font-sans text-[11px] text-gray-500">
                      {rev.role} | <span className="text-teal-400">{rev.country}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
