import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import LenisScroll from './components/LenisScroll';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import ThreeBackground from './components/ThreeBackground';
import Hero from './components/Hero';
import Partners from './components/Partners';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Timeline from './components/Timeline';
import Products from './components/Products';
import WorldPresence from './components/WorldPresence';
import StatsDashboard from './components/StatsDashboard';
import LiveTracker from './components/LiveTracker';
import Testimonials from './components/Testimonials';
import FAQs from './components/FAQs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import ContactModal from './components/ContactModal';

function App() {
  const [loading, setLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      {/* Custom Cursor Glow (Desktop Only) */}
      <CustomCursor />
      
      {/* Smooth scroll engine (Lenis) */}
      <LenisScroll />
      
      {/* Interactive global 3D space backdrop */}
      <ThreeBackground />

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen onFinish={() => setLoading(false)} key="loader" />
        ) : (
          <div className="relative min-h-screen text-white select-none overflow-x-hidden font-sans">
            {/* Header Navigation */}
            <Navbar onOpenContact={() => setIsContactOpen(true)} />
            
            {/* Main Sections */}
            <main>
              <Hero onOpenContact={() => setIsContactOpen(true)} />
              <Partners />
              <About />
              <Services />
              <WhyChooseUs />
              <Timeline />
              <Products />
              <WorldPresence />
              <StatsDashboard />
              <LiveTracker />
              <Testimonials />
              <FAQs />
              <Contact />
            </main>
            
            {/* Footer & Contacts */}
            <Footer />
            <FloatingButtons onOpenContact={() => setIsContactOpen(true)} />

            {/* Premium Animated Contact Modal */}
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
