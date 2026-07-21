import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Phone, PhoneCall } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0c1020]/60 backdrop-blur-lg cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-[#161c32]/85 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-2xl overflow-hidden z-10"
          >
            {/* Visual Decorative Glow */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all duration-200 active:scale-95 z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8 relative z-10">
              <span className="font-mono text-[10px] text-teal-400 tracking-widest uppercase font-bold block mb-2">
                // GET IN TOUCH
              </span>
              <h3 className="font-display font-black text-2xl md:text-3xl text-white mb-2 leading-none">
                Connect with <span className="text-gradient-secondary">Aravind</span>
              </h3>
              <p className="font-sans text-xs md:text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">
                Select your preferred channel. We are available 24/7 for support and query response.
              </p>
            </div>

            {/* Contact Options List */}
            <div className="space-y-4 relative z-10">
              {/* Option 1: WhatsApp Chat */}
              <a
                href="https://wa.me/917094167742"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center space-x-4 p-4 rounded-2xl bg-white/4 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <MessageCircle className="w-6 h-6 fill-transparent group-hover:fill-white/20" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-display font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                    WhatsApp Chat
                  </div>
                  <div className="font-sans text-xs text-gray-500">
                    Direct message for instant replies
                  </div>
                </div>
                <span className="text-gray-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </a>

              {/* Option 2: Call Now */}
              <a
                href="tel:+917094167742"
                onClick={onClose}
                className="flex items-center space-x-4 p-4 rounded-2xl bg-white/4 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                  <Phone className="w-5 h-5 fill-transparent group-hover:fill-white/20" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-display font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                    Call Now
                  </div>
                  <div className="font-sans text-xs text-gray-500">
                    Talk directly to Aravind
                  </div>
                </div>
                <span className="text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </a>

              {/* Option 3: WhatsApp Call */}
              <a
                href="https://wa.me/917094167742"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center space-x-4 p-4 rounded-2xl bg-white/4 border border-white/5 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-display font-bold text-sm text-white group-hover:text-teal-400 transition-colors">
                    WhatsApp Call
                  </div>
                  <div className="font-sans text-xs text-gray-500">
                    Voice call via WhatsApp (mobile/app)
                  </div>
                </div>
                <span className="text-gray-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </a>
            </div>

            {/* Decorative Footer */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-gray-600 relative z-10">
              <span>LOCATION: CHENNAI, INDIA</span>
              <span>SECURE CHANNEL</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
