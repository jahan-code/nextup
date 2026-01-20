'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

function FeatureShape({ position, color, icon }: { 
  position: [number, number, number]; 
  color: string;
  icon: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.6, 0.2, 16, 100]} />
        <MeshDistortMaterial
          color={color}
          distort={0.5}
          speed={1.5}
          roughness={0.2}
          metalness={0.7}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

function FeatureScene3D() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#6366f1" />
      <pointLight position={[-5, -5, -5]} color="#ec4899" intensity={0.6} />
      
      <FeatureShape position={[-1.5, 0, 0]} color="#6366f1" icon="music" />
      <FeatureShape position={[1.5, 0, 0]} color="#ec4899" icon="zap" />
      <FeatureShape position={[0, 1.5, 0]} color="#8b5cf6" icon="link" />
      <FeatureShape position={[0, -1.5, 0]} color="#a855f7" icon="chart" />
    </>
  );
}

interface FeatureScene3DProps {
  className?: string;
}

const FeatureScene3DComponent: React.FC<FeatureScene3DProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <FeatureScene3D />
      </Canvas>
    </div>
  );
};

export default FeatureScene3DComponent;












