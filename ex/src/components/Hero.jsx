import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { ArrowRight, Ship, Plane } from 'lucide-react';

function ContainerMesh() {
  const containerRef = useRef();
  
  // Create ribs for the corrugated container look
  const ribCount = 18;
  const ribs = [];
  const spacing = 0.12;
  const startOffset = -((ribCount - 1) * spacing) / 2;
  
  for (let i = 0; i < ribCount; i++) {
    ribs.push(startOffset + i * spacing);
  }

  useFrame((state) => {
    if (containerRef.current) {
      // Base auto rotation
      containerRef.current.rotation.y += 0.003;
      
      // Interactive mouse follow rotation
      const targetX = (state.mouse.x * Math.PI) / 3;
      const targetY = -(state.mouse.y * Math.PI) / 6;
      
      containerRef.current.rotation.y = THREE.MathUtils.lerp(containerRef.current.rotation.y, containerRef.current.rotation.y + targetX * 0.05, 0.1);
      containerRef.current.rotation.x = THREE.MathUtils.lerp(containerRef.current.rotation.x, targetY, 0.1);
      
      // Floating animation
      containerRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15;
    }
  });

  return (
    <group ref={containerRef} scale={[1.4, 1.4, 1.4]} position={[0, 0, 0]}>
      {/* Main Box - Dark Blue Container Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.0, 1.0]} />
        <meshStandardMaterial 
          color="#2563EB" 
          roughness={0.2} 
          metalness={0.8} 
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Vertical Ribs on the Front Face */}
      {ribs.map((pos, idx) => (
        <mesh key={`rib-front-${idx}`} position={[pos, 0, 0.505]}>
          <boxGeometry args={[0.04, 0.98, 0.02]} />
          <meshStandardMaterial color="#1d4ed8" roughness={0.3} metalness={0.9} />
        </mesh>
      ))}

      {/* Vertical Ribs on the Back Face */}
      {ribs.map((pos, idx) => (
        <mesh key={`rib-back-${idx}`} position={[pos, 0, -0.505]}>
          <boxGeometry args={[0.04, 0.98, 0.02]} />
          <meshStandardMaterial color="#1d4ed8" roughness={0.3} metalness={0.9} />
        </mesh>
      ))}

      {/* Ribs on the Top Face */}
      {ribs.map((pos, idx) => (
        <mesh key={`rib-top-${idx}`} position={[pos, 0.505, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.04, 0.98, 0.02]} />
          <meshStandardMaterial color="#1d4ed8" roughness={0.3} metalness={0.9} />
        </mesh>
      ))}

      {/* Ribs on the Bottom Face */}
      {ribs.map((pos, idx) => (
        <mesh key={`rib-bottom-${idx}`} position={[pos, -0.505, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.04, 0.98, 0.02]} />
          <meshStandardMaterial color="#1d4ed8" roughness={0.3} metalness={0.9} />
        </mesh>
      ))}

      {/* Frame Outlines for high premium detailing */}
      {/* Front Outer Border */}
      <mesh position={[0, 0.51, 0.51]}>
        <boxGeometry args={[2.42, 0.03, 0.03]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0, -0.51, 0.51]}>
        <boxGeometry args={[2.42, 0.03, 0.03]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[1.21, 0, 0.51]}>
        <boxGeometry args={[0.03, 1.02, 0.03]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[-1.21, 0, 0.51]}>
        <boxGeometry args={[0.03, 1.02, 0.03]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Back Outer Border */}
      <mesh position={[0, 0.51, -0.51]}>
        <boxGeometry args={[2.42, 0.03, 0.03]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0, -0.51, -0.51]}>
        <boxGeometry args={[2.42, 0.03, 0.03]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[1.21, 0, -0.51]}>
        <boxGeometry args={[0.03, 1.02, 0.03]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[-1.21, 0, -0.51]}>
        <boxGeometry args={[0.03, 1.02, 0.03]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Glowing Neon Cargo Label */}
      <mesh position={[0, 0.15, 0.515]}>
        <planeGeometry args={[1.5, 0.25]} />
        <meshBasicMaterial color="#14B8A6" transparent opacity={0.15} />
      </mesh>
      
      {/* Corner Locks Details */}
      {[-1.2, 1.2].map((x) => 
        [-0.5, 0.5].map((y) => 
          [-0.5, 0.5].map((z) => (
            <mesh key={`lock-${x}-${y}-${z}`} position={[x, y, z]}>
              <boxGeometry args={[0.06, 0.06, 0.06]} />
              <meshStandardMaterial color="#64748b" roughness={0.2} metalness={0.9} />
            </mesh>
          ))
        )
      )}
    </group>
  );
}

function WorldMapParticles() {
  const pointsRef = useRef();

  // Generate particle coordinate data mimicking a world map grid outline
  const particles = useMemo(() => {
    const arr = [];
    const countX = 90;
    const countY = 45;
    
    // Abstract Continent shapes (pixel mapping)
    // simple bounds check helper
    const isLand = (x, y) => {
      // Normalize to 0-1
      const nx = x / countX;
      const ny = y / countY;
      
      // North America
      if (nx > 0.1 && nx < 0.35 && ny > 0.6 && ny < 0.9) return true;
      // South America
      if (nx > 0.25 && nx < 0.4 && ny > 0.15 && ny < 0.55) return true;
      // Africa
      if (nx > 0.45 && nx < 0.6 && ny > 0.2 && ny < 0.6) return true;
      // Europe
      if (nx > 0.45 && nx < 0.6 && ny > 0.6 && ny < 0.85) return true;
      // Asia
      if (nx > 0.55 && nx < 0.85 && ny > 0.4 && ny < 0.9) return true;
      // India Specific region
      if (nx > 0.62 && nx < 0.69 && ny > 0.42 && ny < 0.58) return true;
      // Australia
      if (nx > 0.78 && nx < 0.92 && ny > 0.15 && ny < 0.4) return true;
      
      return false;
    };

    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        if (isLand(x, y)) {
          const px = (x - countX / 2) * 0.07;
          const py = (y - countY / 2) * 0.07;
          const pz = -1.2 + Math.sin(x * 0.1) * 0.05; // Slightly curved screen
          arr.push(px, py, pz);
        }
      }
    }
    return new Float32Array(arr);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Gentle floating animation
      pointsRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      pointsRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.02;
    }
  });

  return (
    <points ref={pointsRef} positions={particles} stride={3}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#14B8A6"
        size={0.018}
        sizeAttenuation={true}
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  );
}

function BackgroundContainers() {
  const refs = useRef([]);
  const containerCount = 4;

  const data = useMemo(() => [
    {
      xStart: -5,
      y: -0.8,
      z: -2.2,
      speed: 0.12,
      scale: 0.2,
      color: '#1d4ed8',
      rotSpeed: { x: 0.02, y: 0.05, z: 0.01 },
      bobSpeed: 0.6,
      bobHeight: 0.08
    },
    {
      xStart: -2,
      y: -1.2,
      z: -1.8,
      speed: 0.09,
      scale: 0.15,
      color: '#14b8a6',
      rotSpeed: { x: 0.04, y: 0.03, z: 0.02 },
      bobSpeed: 0.8,
      bobHeight: 0.05
    },
    {
      xStart: 1,
      y: -0.5,
      z: -2.5,
      speed: 0.15,
      scale: 0.18,
      color: '#F59E0B',
      rotSpeed: { x: 0.01, y: 0.04, z: 0.03 },
      bobSpeed: 0.5,
      bobHeight: 0.1
    },
    {
      xStart: 3,
      y: -1.0,
      z: -1.5,
      speed: 0.08,
      scale: 0.22,
      color: '#2563EB',
      rotSpeed: { x: 0.03, y: 0.06, z: 0.01 },
      bobSpeed: 0.7,
      bobHeight: 0.06
    }
  ], []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    refs.current.forEach((ref, idx) => {
      if (ref) {
        const cData = data[idx];
        const rangeX = 10;
        let currentX = cData.xStart + (t * cData.speed);
        currentX = ((currentX + 5) % rangeX) - 5;

        ref.position.x = currentX;
        ref.position.y = cData.y + Math.sin(t * cData.bobSpeed) * cData.bobHeight;
        ref.position.z = cData.z;

        ref.rotation.x = t * cData.rotSpeed.x;
        ref.rotation.y = t * cData.rotSpeed.y;
        ref.rotation.z = t * cData.rotSpeed.z;
      }
    });
  });

  return (
    <group>
      {data.map((cData, idx) => (
        <group
          key={idx}
          ref={el => refs.current[idx] = el}
          scale={[cData.scale * 2.4, cData.scale, cData.scale]}
        >
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={cData.color}
              roughness={0.3}
              metalness={0.7}
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh>
            <boxGeometry args={[1.02, 1.02, 1.02]} />
            <meshBasicMaterial
              color="#ffffff"
              wireframe
              transparent
              opacity={0.15}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function FlyingAirplane() {
  const planeRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speed = 0.5;
    const rangeX = 12;
    const startX = -6;
    
    let currentX = startX + (t * speed);
    currentX = ((currentX + 6) % rangeX) - 6;

    if (planeRef.current) {
      planeRef.current.position.x = currentX;
      planeRef.current.position.y = 1.35 + Math.sin(t * 0.5) * 0.05;
      planeRef.current.position.z = -1.5;

      planeRef.current.rotation.set(0, Math.PI / 2, 0);
      planeRef.current.rotation.z = -Math.cos(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={planeRef}>
      <mesh>
        <cylinderGeometry args={[0.02, 0.015, 0.3, 8]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.38, 0.004, 0.05]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, -0.11]}>
        <boxGeometry args={[0.13, 0.004, 0.025]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.035, -0.11]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[0.004, 0.06, 0.025]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

function MovingTrucks() {
  const refs = useRef([]);
  const truckCount = 2;

  const data = useMemo(() => [
    {
      xStart: -5,
      y: -1.35,
      z: -1.0,
      speed: 0.45,
      scale: 0.12,
      color: '#10b981',
      cabinColor: '#e2e8f0',
      direction: 1
    },
    {
      xStart: 4,
      y: -1.4,
      z: -1.3,
      speed: 0.35,
      scale: 0.1,
      color: '#ef4444',
      cabinColor: '#1e293b',
      direction: -1
    }
  ], []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    refs.current.forEach((ref, idx) => {
      if (ref) {
        const tData = data[idx];
        const rangeX = 12;
        let currentX;
        
        if (tData.direction === 1) {
          currentX = tData.xStart + (t * tData.speed);
          currentX = ((currentX + 6) % rangeX) - 6;
          ref.position.x = currentX;
          ref.rotation.y = Math.PI / 2;
        } else {
          currentX = tData.xStart - (t * tData.speed);
          currentX = ((currentX + 6) % rangeX) - 6;
          ref.position.x = currentX;
          ref.rotation.y = -Math.PI / 2;
        }

        ref.position.y = tData.y + Math.sin(t * 5 + idx) * 0.005;
        ref.position.z = tData.z;
      }
    });
  });

  return (
    <group>
      {data.map((tData, idx) => (
        <group
          key={idx}
          ref={el => refs.current[idx] = el}
          scale={[tData.scale, tData.scale, tData.scale]}
        >
          <mesh position={[0, 0.2, -0.4]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 1.0, 3.2]} />
            <meshStandardMaterial
              color={tData.color}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          <mesh position={[0, 0.15, 1.4]} castShadow receiveShadow>
            <boxGeometry args={[1.1, 0.9, 1.0]} />
            <meshStandardMaterial
              color={tData.cabinColor}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          <mesh position={[0, 0.4, 1.91]}>
            <planeGeometry args={[0.9, 0.4]} />
            <meshStandardMaterial
              color="#0284c7"
              roughness={0.0}
              metalness={0.9}
              transparent
              opacity={0.8}
            />
          </mesh>
          {[-0.5, 0.5].map((wX) =>
            [-0.9, -0.3, 0.8, 1.3].map((wZ) => (
              <mesh
                key={`wheel-${wX}-${wZ}`}
                position={[wX, -0.3, wZ]}
                rotation={[0, 0, Math.PI / 2]}
              >
                <cylinderGeometry args={[0.22, 0.22, 0.15, 12]} />
                <meshStandardMaterial color="#0f172a" roughness={0.9} />
              </mesh>
            ))
          )}
          <mesh position={[0.35, 0.05, 1.92]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <mesh position={[-0.35, 0.05, 1.92]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function Hero({ onOpenContact }) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* 3D Background Canvas Layer */}
      <div className="absolute inset-0 w-full h-full -z-5">
        <Canvas camera={{ position: [0, 0, 3.5], fov: 60 }} shadows>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.5} castShadow />
          <spotLight position={[-5, 8, 3]} intensity={1.2} angle={0.3} penumbra={1} castShadow />
          <directionalLight position={[0, -2, -2]} intensity={0.5} />
          
          <ContainerMesh />
          <WorldMapParticles />
          <BackgroundContainers />
          <MovingTrucks />
          <FlyingAirplane />
        </Canvas>
      </div>

      {/* Content Layout */}
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 w-full h-full pointer-events-none">
        
        {/* Left Side Info */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start space-y-6 md:space-y-8 pointer-events-auto">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs text-teal-400 tracking-wider uppercase font-semibold">
              Premium Global Logistics Portal
            </span>
          </motion.div>

          {/* Main Title */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display font-black text-5xl md:text-7xl xl:text-8xl leading-[1.05] tracking-tight text-white"
            >
              Connecting <br />
              <span className="text-gradient-primary">India</span> to the <br />
              <span className="text-gradient-secondary">World</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans text-base md:text-xl text-gray-400 max-w-xl font-normal leading-relaxed"
            >
              Exporting Quality Products Across Global Markets. We provide end-to-end premium freight, customs clearance, and global logistics solutions.
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onOpenContact}
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-sans font-bold text-sm tracking-wider uppercase text-[#121829] bg-gradient-to-r from-blue-600 via-teal-500 to-teal-400 rounded-xl group transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-400/40 hover:scale-105 cursor-pointer"
            >
              <span className="relative flex items-center space-x-2">
                <span>Get Quote</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <a
              href="#products"
              className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-sans font-semibold text-sm tracking-wider uppercase text-white border border-white/10 rounded-xl group bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              Explore Products
            </a>
          </motion.div>

          {/* Micro Stats Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex items-center gap-8 pt-6 border-t border-white/5 w-full max-w-lg"
          >
            <div className="flex items-center gap-3">
              <Ship className="w-5 h-5 text-blue-500" />
              <div className="font-mono text-left">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">SEA FREIGHT</div>
                <div className="text-xs text-white font-bold">24 Cargo Active</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Plane className="w-5 h-5 text-amber-500" />
              <div className="font-mono text-left">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">AIR CARGO</div>
                <div className="text-xs text-white font-bold">12 Active Routes</div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Side Empty Space for 3D Container placement */}
        <div className="lg:col-span-5 h-[300px] lg:h-auto" />
      </div>

      {/* Ambient Mouse-Move Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none opacity-40">
        <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500">Scroll Down</span>
        <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1 h-2 bg-teal-400 rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
