import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenContact }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Products', href: '#products' },
    { name: 'Network', href: '#network' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-40 bg-[#121829]/30 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between"
    >
      <a href="#" className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
          </svg>
        </div>
        <span className="font-display font-black tracking-widest text-base text-white">ARAVIND</span>
      </a>

      {/* Desktop Links */}
      <nav className="hidden lg:flex items-center space-x-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="font-sans text-xs font-semibold tracking-wider text-gray-400 hover:text-white uppercase transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* Action Button */}
      <div className="hidden lg:block">
        <button
          onClick={onOpenContact}
          className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-sans font-semibold text-xs tracking-wider uppercase text-white border border-teal-500/30 rounded-lg group bg-white/5 backdrop-blur-sm cursor-pointer"
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-r from-blue-600 to-teal-500 group-hover:opacity-100" />
          <span className="relative group-hover:text-white">Get A Quote</span>
        </button>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block lg:hidden text-white focus:outline-none"
        aria-label="Toggle navigation menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
        </svg>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#121829]/95 border-b border-white/10 backdrop-blur-lg flex flex-col p-6 space-y-4 z-50"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-sans text-sm font-semibold tracking-wider text-gray-300 hover:text-white uppercase transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenContact();
              }}
              className="w-full text-center py-3 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg font-sans font-semibold text-xs tracking-wider uppercase text-white shadow-lg cursor-pointer"
            >
              Get A Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
