'use client';

import React from 'react';
import { UserPlus, Music2, Vote, PlayCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Card3D, ParallaxSection, HowItWorksScene3D as HowItWorksScene3DComponent } from '@/src/components';

interface Step {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  number: number;
  image: string;
}

const steps: Step[] = [
  {
    icon: UserPlus,
    title: 'Sign Up & Connect',
    description: 'Create your account and connect your streaming platform. Link your YouTube playlists in just a few clicks.',
    number: 1,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
  },
  {
    icon: Music2,
    title: 'Add Your Playlist',
    description: 'Import your favorite songs or let fans suggest tracks. Build a library that represents your style.',
    number: 2,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80',
  },
  {
    icon: Vote,
    title: 'Fans Vote in Real-Time',
    description: 'Your audience votes on which song plays next. Watch the votes come in live during your stream.',
    number: 3,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
  },
  {
    icon: PlayCircle,
    title: 'Music Plays Automatically',
    description: 'The winning song plays automatically. Keep the energy high with fan-selected music.',
    number: 4,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
  },
];

const HowItWorks = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 opacity-25 z-0">
        <HowItWorksScene3DComponent />
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get started in minutes and let your fans take control of your stream's music
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop only) */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 origin-left"
            ></motion.div>

            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isLast = index === steps.length - 1;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 100 }}
                  className="relative perspective-1000"
                >
                  {/* Step Card with 3D */}
                  <Card3D className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 text-center h-full">
                    {/* Step Number Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: "spring" }}
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {step.number}
                      </div>
                    </motion.div>

                    {/* Step Image */}
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-pink-500/30"></div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="p-3 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-purple-500/30">
                          <IconComponent className="text-indigo-400" size={32} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-100 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </Card3D>

                  {/* Arrow (Desktop only, not for last item) with 3D effect */}
                  {!isLast && (
                    <motion.div
                      initial={{ opacity: 0, x: -20, rotateY: -90 }}
                      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.5, type: "spring" }}
                      whileHover={{ scale: 1.2, x: 5 }}
                      className="hidden lg:block absolute top-16 -right-4 z-10"
                    >
                      <ArrowRight className="text-purple-400" size={32} />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-gray-800/60 backdrop-blur-sm border border-purple-500/20 rounded-lg px-6 py-4">
              <CheckCircle2 className="text-green-400" size={24} />
              <span className="text-gray-300 font-medium">
                Ready to get started? It only takes a few minutes!
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

