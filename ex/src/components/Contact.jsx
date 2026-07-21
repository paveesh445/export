import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Send } from 'lucide-react';

function EarthGrid() {
  const earthRef = useRef();
  const orbitGroupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = t * 0.15;
      earthRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = -t * 0.08;
      orbitGroupRef.current.rotation.z = Math.sin(t * 0.1) * 0.2;
    }
  });

  // Orbit ring points helper
  const ringPoints = useMemo(() => {
    const pts = [];
    const radius = 1.9;
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, []);

  return (
    <group>
      {/* 3D Wireframe Earth Grid */}
      <group ref={earthRef}>
        {/* Core Sphere */}
        <mesh>
          <sphereGeometry args={[1.4, 18, 18]} />
          <meshStandardMaterial
            color="#2563EB"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
        
        {/* Outer Lat/Lng Rings */}
        <mesh>
          <sphereGeometry args={[1.42, 8, 8]} />
          <meshStandardMaterial
            color="#14B8A6"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>

        {/* Small glowing core sphere */}
        <mesh>
          <sphereGeometry args={[1.0, 16, 16]} />
          <meshBasicMaterial
            color="#121829"
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* Orbiting Satellite Rings */}
      <group ref={orbitGroupRef}>
        {/* Orbit Ring 1 (Tilted X) */}
        <group rotation={[Math.PI / 4, 0, 0]}>
          <Line points={ringPoints} color="#F59E0B" lineWidth={0.8} transparent opacity={0.3} />
          {/* Satellite dot */}
          <SatellitePulse speed={1.2} radius={1.9} color="#F59E0B" />
        </group>

        {/* Orbit Ring 2 (Tilted Z) */}
        <group rotation={[0, 0, -Math.PI / 4]}>
          <Line points={ringPoints} color="#14B8A6" lineWidth={0.8} transparent opacity={0.3} />
          {/* Satellite dot */}
          <SatellitePulse speed={0.9} radius={1.9} color="#14B8A6" delay={2} />
        </group>
      </group>
    </group>
  );
}

function SatellitePulse({ speed, radius, color, delay = 0 }) {
  const satRef = useRef();

  useFrame((state) => {
    if (satRef.current) {
      const t = state.clock.getElapsedTime() * speed + delay;
      satRef.current.position.x = Math.cos(t) * radius;
      satRef.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <mesh ref={satRef}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate premium form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', country: '', message: '' });
    }, 4000);
  };

  const countriesList = [
    'United States',
    'United Kingdom',
    'United Arab Emirates',
    'Germany',
    'Singapore',
    'Australia',
    'Canada',
    'Saudi Arabia',
    'Netherlands',
    'Other / Global',
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 w-full bg-[#121829] overflow-hidden">
      <div className="absolute inset-0 dots-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-4 mb-16">
          <span className="font-mono text-xs text-blue-500 tracking-widest uppercase font-bold">
            // SHIPMENT REQUESTS
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Initiate Your <span className="text-gradient-secondary">Global Cargo</span>
          </h2>
          <p className="font-sans text-gray-400 text-base md:text-lg max-w-xl">
            Submit your freight parameters. Our custom house brokers will reply with tailored FCL/LCL or air cargo quotes within 12 hours.
          </p>
        </div>

        {/* 3D Earth & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: 3D Earth */}
          <div className="lg:col-span-5 h-[350px] md:h-[500px] relative w-full rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm shadow-xl overflow-hidden">
            {/* Quick stats floating overlays for premium look */}
            <div className="absolute top-6 left-6 z-10 text-left space-y-1">
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">HQ PORT CLEARANCE</span>
              <p className="font-display font-bold text-xs text-white">Chennai Port, Chennai, India</p>
            </div>
            
            <div className="absolute bottom-6 left-6 z-10 text-left space-y-1">
              <span className="font-mono text-[9px] text-teal-400 uppercase tracking-widest block font-bold">// SECURE_PROTOCOL</span>
              <p className="font-sans text-[10px] text-gray-500">AES-256 SSL Encrypted Manifests</p>
            </div>

            <Canvas camera={{ position: [0, 0, 3.2], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} intensity={1.5} />
              <pointLight position={[-5, 5, -5]} intensity={0.5} />
              
              <EarthGrid />
            </Canvas>
          </div>

          {/* Right: Premium Form */}
          <div className="lg:col-span-7 text-left">
            <div className="p-8 md:p-10 rounded-3xl glass-card border border-white/8 shadow-2xl relative overflow-hidden">
              
              {/* Form submit success banner */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#121829] z-20 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-8 h-8 text-teal-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="font-display font-black text-2xl text-white mb-2">Quote Request Submitted</h3>
                    <p className="font-sans text-xs md:text-sm text-gray-400 max-w-sm leading-relaxed">
                      Your query has been logged securely under ID <span className="font-mono text-teal-400 font-bold">#TG-{Math.floor(Math.random()*90000)+10000}</span>. A logistics agent will contact you shortly with rate schedules.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="David Thorne"
                      className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3.5 font-sans text-xs md:text-sm text-white focus:outline-none focus:border-teal-500 focus:bg-white/8 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="david@thornefoods.com"
                      className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3.5 font-sans text-xs md:text-sm text-white focus:outline-none focus:border-teal-500 focus:bg-white/8 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 234-5678"
                      className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3.5 font-sans text-xs md:text-sm text-white focus:outline-none focus:border-teal-500 focus:bg-white/8 transition-all"
                    />
                  </div>

                  {/* Country Destination */}
                  <div className="space-y-2">
                    <label htmlFor="country" className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                      Destination Country
                    </label>
                    <select
                      id="country"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3.5 font-sans text-xs md:text-sm text-white focus:outline-none focus:border-teal-500 focus:bg-white/8 transition-all cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#121829] text-gray-500">Select country...</option>
                      {countriesList.map((c) => (
                        <option key={c} value={c} className="bg-[#121829] text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                    Message / Cargo Parameters
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe product type, estimated quantity/weight, preferred port, and desired shipment dates (e.g. 50 Tons Basmati Rice to Port of New York)..."
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3.5 font-sans text-xs md:text-sm text-white focus:outline-none focus:border-teal-500 focus:bg-white/8 transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-sans font-bold text-xs tracking-wider uppercase text-[#121829] bg-gradient-to-r from-blue-600 via-teal-500 to-teal-400 rounded-xl group transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-400/40 cursor-pointer"
                >
                  <span className="relative flex items-center space-x-2">
                    <span>Submit Rfq manifest</span>
                    <Send className="w-3.5 h-3.5" />
                  </span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
