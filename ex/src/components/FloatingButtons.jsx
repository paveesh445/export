import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingButtons({ onOpenContact }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
      {/* WhatsApp/Call Contact Floating Action Button */}
      <button
        onClick={onOpenContact}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white flex items-center justify-center shadow-xl shadow-teal-500/20 hover:shadow-teal-400/40 hover:scale-110 transition-all relative group cursor-pointer border border-white/10"
        aria-label="Contact options"
      >
        {/* Pulsing Outer Aura */}
        <div className="absolute inset-0 rounded-full bg-teal-500/30 animate-ping group-hover:hidden" style={{ animationDuration: '2.5s' }} />
        <MessageCircle className="w-6 h-6 fill-white text-blue-600 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}
