import React, { useState } from 'react';
import { Mail, MapPin, Phone, Ship } from 'lucide-react';
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="relative bg-[#121829] border-t border-white/5 pt-20 pb-10 w-full overflow-hidden text-left">
      <div className="absolute inset-0 dots-bg opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
        
        {/* Left Column: Brand & Newsletter */}
        <div className="lg:col-span-5 space-y-6">
          <a href="#" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
              </svg>
            </div>
            <span className="font-display font-black tracking-widest text-base text-white">ARAVIND</span>
          </a>

          <p className="font-sans text-xs md:text-sm text-gray-400 max-w-sm leading-relaxed">
            Connecting India to the world. We export vetted agricultural goods, engineering casts, garments, and industrial chemicals across ocean cargo and air lanes.
          </p>

          {/* Newsletter Form */}
          <div className="space-y-3 max-w-sm">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block font-bold">
              SUBSCRIBE TO EXPORT BULLETIN
            </span>
            {subscribed ? (
              <p className="font-mono text-xs text-teal-400">
                ✓ Subscribed! Thank you for joining our manifest database.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center bg-white/4 border border-white/8 rounded-xl p-1.5 focus-within:border-teal-500/50 transition-all">
                <input
                  type="email"
                  required
                  placeholder="Enter email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent font-sans text-xs text-white px-3 focus:outline-none placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-sans text-[10px] tracking-wider uppercase font-bold px-4 py-2.5 rounded-lg transition-all cursor-pointer flex-shrink-0"
                >
                  Join List
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Column: Quick Links */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-gray-300 uppercase tracking-widest font-bold">NAVIGATION</h4>
            <ul className="space-y-2.5 font-sans text-xs text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Workflow</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#network" className="hover:text-white transition-colors">Network Map</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-gray-300 uppercase tracking-widest font-bold">CONTACT</h4>
            <ul className="space-y-2.5 font-sans text-xs text-gray-400">
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>Chennai, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>+91 7094167742</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>aravind@transglobal.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Stylized Vector Map of Head Office */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="font-mono text-[10px] text-gray-300 uppercase tracking-widest font-bold">HEAD OFFICE TERMINAL</h4>
          {/* A premium vector styled card layout representing location map */}
          <div className="p-4 rounded-xl border border-white/5 bg-white/3 backdrop-blur-sm relative h-36 flex flex-col justify-between overflow-hidden group">
            {/* Visual background vector dots layout mimicking geographical roads/ports */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-15 pointer-events-none group-hover:scale-105 transition-transform duration-500">
              <line x1="10" y1="20" x2="90" y2="80" stroke="#fff" strokeWidth="1" />
              <line x1="80" y1="10" x2="30" y2="90" stroke="#fff" strokeWidth="0.8" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="3, 3" />
              <circle cx="62" cy="59" r="3" fill="#F59E0B" />
            </svg>
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="font-mono text-[8px] text-teal-400 uppercase tracking-widest font-bold">Chennai HQ</span>
                <p className="font-sans text-[10px] text-gray-400 mt-1 max-w-[180px]">
                  Rajaji Salai, Chennai Port Trust, Chennai, Tamil Nadu 600001
                </p>
              </div>
              <Ship className="w-5 h-5 text-gray-500" />
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 font-mono text-[9px] text-white font-bold uppercase tracking-widest flex items-center space-x-1 group-hover:text-teal-400 transition-colors"
            >
              <span>OPEN MAP NAVIGATION</span>
              <span>→</span>
            </a>
          </div>
        </div>

      </div>

      {/* Sub Footer */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="font-mono text-[10px] text-gray-600">
          © {new Date().getFullYear()} ARAVIND. ALL RIGHTS RESERVED.
        </p>

        {/* Social Icons */}
        <div className="flex items-center space-x-5">
          {[
            { icon: FaLinkedin, href: 'https://linkedin.com' },
            { icon: FaTwitter, href: 'https://twitter.com' },
            { icon: FaInstagram, href: 'https://instagram.com' },
            { icon: FaFacebook, href: 'https://facebook.com' },
          ].map((soc, idx) => {
            const Icon = soc.icon;
            return (
              <a
                key={idx}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/5 bg-white/3 flex items-center justify-center text-gray-500 hover:text-teal-400 hover:border-teal-500/40 hover:scale-105 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
