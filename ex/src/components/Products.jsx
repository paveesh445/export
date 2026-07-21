import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

// 3D Stylized Rice Grain mesh representation
function RiceMesh() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={ref}>
      {/* Bowl */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.5, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#64748b" roughness={0.1} metalness={0.8} transparent opacity={0.7} />
      </mesh>
      {/* Rice Grains (particles/spheres) */}
      <group position={[0, -0.08, 0]}>
        {Array.from({ length: 35 }).map((_, i) => {
          const r = Math.random() * 0.35;
          const theta = Math.random() * Math.PI * 2;
          const x = Math.cos(theta) * r;
          const z = Math.sin(theta) * r;
          const y = Math.random() * 0.15;
          return (
            <mesh key={i} position={[x, y, z]} rotation={[Math.random(), Math.random(), Math.random()]}>
              <boxGeometry args={[0.1, 0.03, 0.03]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.5} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// 3D Spices mesh representation
function SpicesMesh() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.6;
    }
  });

  return (
    <group ref={ref}>
      {/* Plate */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.5, 0.3, 0.1, 16]} />
        <meshStandardMaterial color="#b45309" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Red Chili Pile */}
      <mesh position={[0, -0.15, 0]}>
        <coneGeometry args={[0.3, 0.3, 12]} />
        <meshStandardMaterial color="#dc2626" roughness={0.8} />
      </mesh>
      {/* Star Anise or cloves details */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 5;
        return (
          <mesh key={i} position={[Math.cos(angle)*0.25, -0.18, Math.sin(angle)*0.25]} rotation={[0, angle, 0.5]}>
            <boxGeometry args={[0.15, 0.04, 0.04]} />
            <meshStandardMaterial color="#78350f" roughness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

// 3D Coconut mesh representation
function CoconutMesh() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.15;
    }
  });

  return (
    <group ref={ref}>
      {/* Main Brown Shell */}
      <mesh castShadow>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.9} bumpScale={0.1} />
      </mesh>
      {/* Inner White Hemisphere (cracked coconut view) */}
      <mesh position={[0.02, 0.02, 0.02]}>
        <sphereGeometry args={[0.43, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#fdfdfd" roughness={0.3} />
      </mesh>
    </group>
  );
}

// 3D Garments mesh representation
function GarmentsMesh() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={ref}>
      {/* Folded Shirt (Stack of flat boxes) */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.6, 0.06, 0.6]} />
        <meshStandardMaterial color="#0d9488" roughness={0.6} />
      </mesh>
      <mesh position={[-0.02, -0.03, 0.02]} castShadow>
        <boxGeometry args={[0.6, 0.06, 0.6]} />
        <meshStandardMaterial color="#f43f5e" roughness={0.6} />
      </mesh>
      <mesh position={[0.02, -0.11, -0.02]} castShadow>
        <boxGeometry args={[0.6, 0.06, 0.6]} />
        <meshStandardMaterial color="#2563EB" roughness={0.6} />
      </mesh>
    </group>
  );
}

// 3D Engineering Goods (Gear)
function EngineeringMesh() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.8;
      ref.current.rotation.x = Math.PI / 6;
    }
  });

  return (
    <group ref={ref}>
      {/* Central Ring */}
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.15, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Gear Teeth */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        return (
          <mesh key={i} position={[Math.cos(angle)*0.35, 0, Math.sin(angle)*0.35]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
          </mesh>
        );
      })}
    </group>
  );
}

// 3D Chemicals Flask
function ChemicalsMesh() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.08;
    }
  });

  return (
    <group ref={ref}>
      {/* Flask Base */}
      <mesh castShadow>
        <coneGeometry args={[0.4, 0.5, 16]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.3} transparent opacity={0.6} />
      </mesh>
      {/* Flask Neck */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.3, 16]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.3} transparent opacity={0.6} />
      </mesh>
      {/* Chemical Fluid Inside */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.2, 16]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.1} metalness={0.1} emissive="#f59e0b" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

// Group that handles the 3D rotating nodes carousel
function CarouselGroup({ activeIndex, onCardClick }) {
  const groupRef = useRef();

  const meshes = [
    { component: RiceMesh, index: 0 },
    { component: SpicesMesh, index: 1 },
    { component: CoconutMesh, index: 2 },
    { component: GarmentsMesh, index: 3 },
    { component: EngineeringMesh, index: 4 },
    { component: ChemicalsMesh, index: 5 },
  ];

  const radius = 2.4;

  useFrame(() => {
    if (groupRef.current) {
      // Calculate target rotation to bring selected index to face camera (position z = radius)
      const targetAngle = -activeIndex * (Math.PI * 2 / 6);
      
      // Interpolate rotation
      let diff = targetAngle - groupRef.current.rotation.y;
      // Wrap diff to -PI to PI
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      groupRef.current.rotation.y += diff * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {meshes.map((item, idx) => {
        const angle = (idx * Math.PI * 2) / 6;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const MeshComponent = item.component;
        const isSelected = activeIndex === idx;

        return (
          <group 
            key={idx} 
            position={[x, 0, z]} 
            rotation={[0, angle, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onCardClick(idx);
            }}
          >
            {/* 3D Visual Mesh */}
            <group scale={isSelected ? 1.25 : 0.85}>
              <MeshComponent />
            </group>

            {/* Glowing Floor Circle */}
            <mesh position={[0, -0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.5, 0.55, 32]} />
              <meshBasicMaterial color={isSelected ? '#14B8A6' : '#2563EB'} transparent opacity={isSelected ? 0.8 : 0.2} />
            </mesh>
            
            {/* Interactive invisible clicking layer */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.7, 8, 8]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function Products() {
  const [activeIndex, setActiveIndex] = useState(0);

  const productData = [
    {
      title: 'Basmati Rice & Foodgrains',
      category: 'AGRICULTURAL EXPORT',
      desc: 'Premium extra long-grain Basmati Rice, wheat flour, organic pulses, and millet blends. Sorted via high-tech color graders and sealed to protect aroma and longevity.',
      details: ['Moisture Content: < 12%', 'Average Grain Length: 8.35mm', 'Packaging: Seaworthy Jute / PP Bags', 'Certifications: SGS, APEDA, ISO'],
    },
    {
      title: 'Whole Organic Spices',
      category: 'HOT AGRICULTURAL CARGO',
      desc: 'Export-grade dry red chilies, turmeric fingers, black pepper, cardamom, and coriander seeds. Cultivated organically in prime zones, assuring rich capsaicin and curcumin values.',
      details: ['Admixture: Max 1%', 'Foreign Matter: Negligible', 'Inspection: Phytosanitary Certified', 'Grades: Premium A / Export quality'],
    },
    {
      title: 'Coconut Products & Oils',
      category: 'AGRI DERIVATIVES',
      desc: 'Desiccated coconut powder, coconut coir fibers, active charcoal, and raw extra virgin cold-pressed coconut oils. Sourced from coastal southern farms.',
      details: ['Oil content: > 65%', 'Coir grade: Long fiber / low pith', 'Fumigation: Certified chambers', 'Origin: Southern Indian coastal belt'],
    },
    {
      title: 'Fashion & Industrial Textiles',
      category: 'GARMENTS & FABRIC',
      desc: '100% organic cotton fabrics, home linens, readymade apparel, and high-tensile industrial canvas materials. Produced in energy-efficient solar weaving units.',
      details: ['Yarn count: 30s to 80s combed', 'Dyes: OEKO-TEX Standard compliant', 'Fabric weight: 120-340 GSM options', 'Standard: ISO 9001 certified mills'],
    },
    {
      title: 'Engineering Goods & Castings',
      category: 'INDUSTRIAL FABRICATION',
      desc: 'Precision brass fittings, iron pipe castings, machined fasteners, and electrical motor stators. Fabricated via custom CNC tooling labs to close tolerances.',
      details: ['Tolerance: ± 0.05mm', 'Material: Grade A Brass / SG Iron', 'Finishing: Zinc-plated / Powdered', 'QC: 100% coordinate gauge checked'],
    },
    {
      title: 'Industrial & Agro-Chemicals',
      category: 'CHEMICAL SHIPPINGS',
      desc: 'Bio-fertilizers, organic pesticides, sodium bi-carbonates, and specialized dyes. Shipped under strict IMDG safety cargo declarations.',
      details: ['Purity: > 98.5% scale', 'IMDG Class: Non-hazardous options', 'Drums: UN-approved HDPE packaging', 'MSDS: Provided with export manifest'],
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % productData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + productData.length) % productData.length);
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section id="products" className="relative py-24 md:py-32 w-full bg-[#121829] overflow-hidden">
      <div className="absolute inset-0 dots-bg opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-4 mb-12 md:mb-16">
          <span className="font-mono text-xs text-blue-500 tracking-widest uppercase font-bold">
            // OUR EXPORT CATALOG
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Premium <span className="text-gradient-secondary">Product Verticals</span>
          </h2>
          <p className="font-sans text-gray-400 text-base md:text-lg max-w-xl">
            Click on the 3D items inside the interactive orbit below to view detailed specifications.
          </p>
        </div>

        {/* 3D Carousel & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">
          
          {/* Left 3D Carousel Viewport */}
          <div className="lg:col-span-6 h-[350px] md:h-[450px] relative w-full rounded-2xl border border-white/5 bg-white/3 backdrop-blur-sm shadow-xl flex items-center justify-center">
            
            {/* Carousel Orbit Ring Overlay */}
            <div className="absolute w-[80%] h-[30%] border border-white/5 rounded-full rotate-x-75 pointer-events-none -translate-y-8" />
            
            <Canvas camera={{ position: [0, 0, 3.2], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} intensity={1.5} />
              <pointLight position={[-5, 5, -5]} intensity={0.5} />
              
              <CarouselGroup activeIndex={activeIndex} onCardClick={handleCardClick} />
            </Canvas>

            {/* Quick Carousel Controls */}
            <div className="absolute bottom-6 flex items-center space-x-6">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#121829]/80 text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 cursor-pointer"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-mono text-xs text-gray-400 tracking-wider">
                0{activeIndex + 1} / 0{productData.length}
              </span>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#121829]/80 text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 cursor-pointer"
                aria-label="Next product"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Product Details card */}
          <div className="lg:col-span-6 text-left h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="p-8 rounded-2xl glass-card border border-white/8 flex flex-col space-y-6 relative overflow-hidden"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs text-teal-400 tracking-widest uppercase font-semibold">
                    {productData[activeIndex].category}
                  </span>
                  <h3 className="font-display font-black text-2xl md:text-3xl text-white">
                    {productData[activeIndex].title}
                  </h3>
                </div>

                <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                  {productData[activeIndex].desc}
                </p>

                {/* Details Checklists */}
                <div className="border-t border-white/5 pt-6 space-y-3">
                  <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                    CARGO PARAMETERS & LABELS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {productData[activeIndex].details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-teal-400" />
                        </div>
                        <span className="font-sans text-[11px] md:text-xs text-gray-400">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RFQ Call to action */}
                <div className="pt-2">
                  <a
                    href="#contact"
                    className="relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 overflow-hidden font-sans font-bold text-xs tracking-wider uppercase text-white bg-blue-600 rounded-xl group transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-400/30 hover:scale-102"
                  >
                    <span>Request Spec Sheet & Quote</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
