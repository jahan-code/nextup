'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float, MeshDistortMaterial, Sphere, Torus, Box, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function FloatingShape({ position, color, shape = 'icosahedron' }: { 
  position: [number, number, number]; 
  color: string;
  shape?: 'icosahedron' | 'torus' | 'sphere' | 'box';
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'torus':
        return <torusGeometry args={[0.4, 0.15, 16, 100]} />;
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case 'box':
        return <boxGeometry args={[0.6, 0.6, 0.6]} />;
      default:
        return <icosahedronGeometry args={[0.5, 0]} />;
    }
  }, [shape]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 1000;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 30;
      positions[i + 2] = (Math.random() - 0.5) * 30;
      
      const color = new THREE.Color();
      const hue = Math.random() * 0.2 + 0.7; // Purple to pink range
      color.setHSL(hue, 0.8, 0.6);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        vertexColors 
        transparent 
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function MusicWave() {
  const groupRef = useRef<THREE.Group>(null);
  const bars = 20;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((bar, i) => {
        if (bar instanceof THREE.Mesh) {
          const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.2) * 0.5;
          bar.scale.y = scale;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, -3]}>
      {Array.from({ length: bars }).map((_, i) => (
        <mesh key={i} position={[(i - bars / 2) * 0.2, 0, 0]}>
          <boxGeometry args={[0.1, 0.5, 0.1]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? '#6366f1' : '#ec4899'} 
            emissive={i % 2 === 0 ? '#6366f1' : '#ec4899'}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene3D() {
  const { viewport } = useThree();
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} color="#ec4899" intensity={0.8} />
      <directionalLight position={[0, 5, 5]} intensity={0.5} />
      
      <Stars 
        radius={150} 
        depth={100} 
        count={2000} 
        factor={6} 
        fade 
        speed={1.5}
      />
      
      <ParticleField />
      
      <MusicWave />
      
      <FloatingShape position={[-4, 2, -2]} color="#6366f1" shape="icosahedron" />
      <FloatingShape position={[4, -2, -3]} color="#ec4899" shape="torus" />
      <FloatingShape position={[0, 3, -4]} color="#8b5cf6" shape="sphere" />
      <FloatingShape position={[-2, -3, -3]} color="#a855f7" shape="box" />
      <FloatingShape position={[3, 1, -2]} color="#ec4899" shape="torus" />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
}

interface Scene3DComponentProps {
  className?: string;
}

const Scene3DComponent: React.FC<Scene3DComponentProps> = ({ className = '' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`absolute inset-0 w-full h-full ${className}`}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Scene3D />
      </Canvas>
    </motion.div>
  );
};

export default Scene3DComponent;

