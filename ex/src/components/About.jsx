import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { ShieldCheck, Award, FileSpreadsheet } from 'lucide-react';

// Helper to convert lat/lng to 3D Cartesian coordinates
function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);
  return new THREE.Vector3(x, y, z);
}

// Bezier arc between two coordinates
function BezierArc({ start, end, radius, color, delay }) {
  const points = useMemo(() => {
    const startVec = latLngToVector3(start.lat, start.lng, radius);
    const endVec = latLngToVector3(end.lat, end.lng, radius);
    
    // Calculate middle control point representing altitude of arc
    const midVec = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    const distance = startVec.distanceTo(endVec);
    midVec.normalize().multiplyScalar(radius + distance * 0.25);
    
    const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
    return curve;
  }, [start, end, radius]);

  const linePoints = useMemo(() => points.getPoints(30), [points]);

  const lightPulseRef = useRef();

  useFrame((state) => {
    if (lightPulseRef.current) {
      const speed = 0.4;
      const t = ((state.clock.getElapsedTime() * speed) + delay) % 1.0;
      const pos = points.getPointAt(t);
      lightPulseRef.current.position.copy(pos);
    }
  });

  return (
    <group>
      {/* Arc Line */}
      <Line
        points={linePoints}
        color={color || '#14B8A6'}
        lineWidth={1.2}
        transparent
        opacity={0.3}
      />
      {/* Pulse Dot */}
      <mesh ref={lightPulseRef}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#F59E0B" />
      </mesh>
    </group>
  );
}

function GlobeWithMarkers({ scrollProgress }) {
  const globeGroupRef = useRef();

  // Country coordinates
  const countries = useMemo(() => [
    { name: 'India', lat: 20.5937, lng: 78.9629, main: true },
    { name: 'USA', lat: 40.7128, lng: -74.0060 },
    { name: 'UK', lat: 51.5074, lng: -0.1278 },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
    { name: 'Australia', lat: -33.8688, lng: 151.2093 },
    { name: 'Germany', lat: 50.1109, lng: 8.6821 },
  ], []);

  const radius = 1.6;

  useFrame((state) => {
    if (globeGroupRef.current) {
      // Auto rotation
      globeGroupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  // Calculate dynamic scale based on scroll progress
  // Zooms from 0.85 to 1.3
  const currentScale = 0.85 + scrollProgress * 0.45;

  return (
    <group ref={globeGroupRef} scale={[currentScale, currentScale, currentScale]}>
      {/* Main Sphere Grid Wireframe */}
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color="#2563EB"
          wireframe
          transparent
          opacity={0.06}
          roughness={0.8}
        />
      </mesh>

      {/* Outer Dotted Grid Mesh for high premium visual depth */}
      <mesh>
        <sphereGeometry args={[radius + 0.02, 18, 18]} />
        <meshStandardMaterial
          color="#14B8A6"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Inner Solid Core */}
      <mesh>
        <sphereGeometry args={[radius - 0.05, 32, 32]} />
        <meshStandardMaterial
          color="#121829"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Country Markers (Pins) */}
      {countries.map((c, idx) => {
        const pos = latLngToVector3(c.lat, c.lng, radius);
        return (
          <group key={c.name} position={[pos.x, pos.y, pos.z]}>
            {/* Base Dot */}
            <mesh>
              <sphereGeometry args={[c.main ? 0.04 : 0.03, 12, 12]} />
              <meshBasicMaterial color={c.main ? '#F59E0B' : '#14B8A6'} />
            </mesh>

            {/* Pulsing ring */}
            <MarkerRing color={c.main ? '#F59E0B' : '#14B8A6'} />
          </group>
        );
      })}

      {/* Bezier shipment curves from India to other parts */}
      {countries
        .filter((c) => !c.main)
        .map((c, idx) => (
          <BezierArc
            key={`arc-${c.name}`}
            start={countries[0]} // India
            end={c}
            radius={radius}
            color={idx % 2 === 0 ? '#14B8A6' : '#2563EB'}
            delay={idx * 0.15}
          />
        ))}
    </group>
  );
}

// Pulsing ring around marker
function MarkerRing({ color }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      const scale = 1 + (state.clock.getElapsedTime() * 1.5 % 1.5);
      const opacity = 1 - (state.clock.getElapsedTime() * 1.5 % 1.5) / 1.5;
      ringRef.current.scale.set(scale, scale, scale);
      ringRef.current.material.opacity = opacity;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.04, 0.08, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress of container moving through viewport
      const totalDist = rect.height + windowHeight;
      const current = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, current / totalDist));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-24 md:py-32 w-full overflow-hidden bg-[#121829]"
    >
      <div className="absolute inset-0 dots-bg opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col space-y-6 md:space-y-8 text-left"
        >
          
          <div className="space-y-3">
            <span className="font-mono text-xs text-blue-500 tracking-widest uppercase font-bold">
              // FOUNDER & DIRECTOR
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white">
              Aravind | <span className="text-gradient-secondary">Chennai, India</span>
            </h2>
          </div>

          <p className="font-sans text-gray-400 text-base md:text-lg leading-relaxed">
            Aravind leads India’s premium export enterprise, managing secure logistics pathways across six continents. Linking agricultural farms, manufacturers, and industrial suppliers with global importers using modern digital workflows, ensuring premium quality standards.
          </p>

          <p className="font-sans text-gray-400 text-base md:text-lg leading-relaxed">
            By combining full shipment transparency, rigid supplier vetting, and optimal customs brokerage compliance, Aravind's network ensures cargo is delivered on time, intact, and compliant with international trade standards.
          </p>

          {/* Icon Stats / Achievements */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="flex flex-col space-y-2 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <Award className="w-6 h-6 text-teal-400" />
              <div className="font-display font-bold text-sm text-white">Vetted Quality</div>
              <div className="font-sans text-xs text-gray-500">Rigid multi-stage testing on all goods</div>
            </div>

            <div className="flex flex-col space-y-2 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
              <div className="font-display font-bold text-sm text-white">100% Compliant</div>
              <div className="font-sans text-xs text-gray-500">Fully certified custom brokers on board</div>
            </div>

            <div className="flex flex-col space-y-2 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <FileSpreadsheet className="w-6 h-6 text-amber-500" />
              <div className="font-display font-bold text-sm text-white">Live Tracking</div>
              <div className="font-sans text-xs text-gray-500">Full cargo metrics visibility 24/7</div>
            </div>
          </div>

        </motion.div>

        {/* Right Side 3D Globe */}
        <div className="lg:col-span-6 h-[400px] md:h-[550px] relative w-full">
          {/* Subtle instructions */}
          <div className="absolute top-4 right-4 z-10 font-mono text-[9px] text-gray-500 tracking-wider bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
            SCROLL TO ZOOM / AUTOROTATING
          </div>

          <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1.5} />
            <pointLight position={[-5, -5, -5]} intensity={0.5} />
            
            <GlobeWithMarkers scrollProgress={scrollProgress} />
          </Canvas>
        </div>

      </div>
    </section>
  );
}
