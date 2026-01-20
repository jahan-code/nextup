'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function StatSphere({ position, color, delay = 0 }: { 
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
      meshRef.current.position.y = position[1] + Math.sin(time) * 0.3;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function StatsScene3D() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1} color="#6366f1" />
      <pointLight position={[-3, -3, -3]} color="#ec4899" intensity={0.7} />
      
      <StatSphere position={[-1.5, 0, 0]} color="#6366f1" delay={0} />
      <StatSphere position={[0, 0, 0]} color="#8b5cf6" delay={0.5} />
      <StatSphere position={[1.5, 0, 0]} color="#ec4899" delay={1} />
    </>
  );
}

interface StatsScene3DProps {
  className?: string;
}

const StatsScene3DComponent: React.FC<StatsScene3DProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 70 }}
        gl={{ alpha: true, antialias: true }}
      >
        <StatsScene3D />
      </Canvas>
    </div>
  );
};

export default StatsScene3DComponent;












