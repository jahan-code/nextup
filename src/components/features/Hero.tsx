'use client';

import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Music, Users, TrendingUp, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Scene3D as Scene3DComponent, MagneticButton, StatsScene3D as StatsScene3DComponent } from '@/src/components';

const Hero = () => {
  const session = useSession();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 200]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const stats = [
    { icon: Users, value: '1,000+', label: 'Active Creators' },
    { icon: Music, value: '50K+', label: 'Songs Played' },
    { icon: TrendingUp, value: '99%', label: 'Satisfaction' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Base Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-950"></div>
      
      {/* 3D Scene Background */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 z-0"
      >
        <Scene3DComponent />
      </motion.div>
      
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10 z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      ></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 gradient-animated z-10"></div>
      
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 overflow-hidden z-5"
      >
        <Image
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80"
          alt="Music background"
          fill
          className="object-cover opacity-10"
          priority
        />
      </motion.div>

      {/* Floating Music Notes / Visual Elements with 3D transforms */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-15">
        <motion.div
          style={{ y: y2 }}
          className="absolute top-20 left-10"
          animate={{
            y: [0, -20, 0],
            rotateX: [0, 15, 0],
            rotateY: [0, 5, 0],
            rotateZ: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Music className="text-purple-400/30" size={60} />
        </motion.div>
        <motion.div
          style={{ y: y1 }}
          className="absolute top-40 right-20"
          animate={{
            y: [0, -25, 0],
            rotateX: [0, -15, 0],
            rotateY: [0, -5, 0],
            rotateZ: [0, -5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Play className="text-pink-400/30" size={50} />
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-40 left-20"
          animate={{
            y: [0, -15, 0],
            rotateX: [0, 10, 0],
            rotateY: [0, 3, 0],
            rotateZ: [0, 3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Music className="text-indigo-400/30" size={45} />
        </motion.div>
        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-20 right-10"
          animate={{
            y: [0, -22, 0],
            rotateX: [0, -10, 0],
            rotateY: [0, -3, 0],
            rotateZ: [0, -3, 0],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <Play className="text-purple-400/30" size={55} />
        </motion.div>
      </div>
      
      {/* Content */}
      <motion.div 
        style={{ y: y2 }}
        className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let Your Fans
            </span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-100"
            >
              Choose the Music
            </motion.span>
          </motion.h1>
          
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Connect with your audience like never before. Give your fans the power to vote and select the music that plays on your stream in real-time.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 relative z-20"
          >
            {session.data?.user ? (
              <MagneticButton
                onClick={() => window.location.href = '/dashboard'}
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
              >
                Go to Dashboard
              </MagneticButton>
            ) : (
              <>
                <MagneticButton
                  onClick={() => window.location.href = '/signup'}
                  className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
                >
                  Get Started
                </MagneticButton>
                <MagneticButton
                  onClick={() => {
                    const featuresSection = document.getElementById('features');
                    featuresSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 text-lg font-semibold bg-gray-800/50 text-gray-300 border border-purple-500/30 rounded-lg hover:bg-gray-800/70 hover:border-purple-500/50 transition-all"
                >
                  Learn More
                </MagneticButton>
              </>
            )}
          </motion.div>

          {/* Stats Preview with 3D */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto relative"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gray-800/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/40 hover:bg-gray-800/60 transition-all relative overflow-hidden"
                >
                  {/* 3D Background for each stat */}
                  <div className="absolute inset-0 opacity-20">
                    <StatsScene3DComponent />
                  </div>
                  <div className="flex flex-col items-center relative z-10">
                    <IconComponent className="text-indigo-400 mb-3" size={32} />
                    <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
};

export default Hero;

