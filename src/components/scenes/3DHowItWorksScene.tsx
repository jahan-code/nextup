'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Torus, Ring } from '@react-three/drei';
import * as THREE from 'three';

function StepRing({ position, color, delay = 0 }: { 
  position: [number, number, number]; 
  color: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + delay;
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(time) * 0.4;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.5, 0.15, 16, 100]} />
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function HowItWorksScene3D() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#6366f1" />
      <pointLight position={[-5, -5, -5]} color="#ec4899" intensity={0.7} />
      <directionalLight position={[0, 5, 0]} intensity={0.3} />
      
      <StepRing position={[-2, 0, -2]} color="#6366f1" delay={0} />
      <StepRing position={[0, 0, -2]} color="#8b5cf6" delay={0.3} />
      <StepRing position={[2, 0, -2]} color="#a855f7" delay={0.6} />
      <StepRing position={[0, 2, -2]} color="#ec4899" delay={0.9} />
    </>
  );
}

interface HowItWorksScene3DProps {
  className?: string;
}

const HowItWorksScene3DComponent: React.FC<HowItWorksScene3DProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 65 }}
        gl={{ alpha: true, antialias: true }}
      >
        <HowItWorksScene3D />
      </Canvas>
    </div>
  );
};

export default HowItWorksScene3DComponent;












