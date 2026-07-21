import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

function StarField(props) {
  const ref = useRef();
  
  // Generate random spherical particles without maath library
  const positions = useMemo(() => {
    const arr = new Float32Array(3000);
    for (let i = 0; i < 3000; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 1.5;
      arr[i] = r * Math.sin(phi) * Math.cos(theta);
      arr[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 25;
      ref.current.rotation.y -= delta / 35;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#14B8A6"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#121829] pointer-events-none">
      {/* Visual Ambient Elements */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute inset-0 radial-glow-1 opacity-60" />
      <div className="absolute inset-0 radial-glow-2 opacity-50" />
      <div className="absolute inset-0 radial-glow-3 opacity-40" />
      
      {/* 3D Stars Canvas */}
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ antialias: true }}>
        <StarField />
      </Canvas>
    </div>
  );
}
