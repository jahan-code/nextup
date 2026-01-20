'use client';

import React from 'react';
import { Music, Zap, Link2, BarChart3, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card3D, FeatureScene3D as FeatureScene3DComponent } from '@/src/components';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  image: string;
}

const features: Feature[] = [
  {
    icon: Music,
    title: 'Let Your Fans Choose',
    description: 'Give your audience the power to vote on which songs play next. Real-time voting keeps your stream interactive and engaging.',
    gradient: 'from-indigo-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80',
  },
  {
    icon: Zap,
    title: 'Real-Time Control',
    description: 'See votes instantly and change tracks on the fly. Your fans\' choices appear immediately, keeping the energy high.',
    gradient: 'from-yellow-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
  },
  {
    icon: Link2,
    title: 'Easy Integration',
    description: 'Simple setup that works with your existing streaming setup. Connect your YouTube playlists and start in minutes.',
    gradient: 'from-green-500 to-emerald-500',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  },
  {
    icon: BarChart3,
    title: 'Track Popularity',
    description: 'See which songs your fans love most. Analytics help you understand your audience\'s music preferences.',
    gradient: 'from-pink-500 to-rose-500',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '30px 30px',
        }}
      ></div>
      
      {/* 3D Background Scene */}
      <div className="absolute inset-0 opacity-30 z-0">
        <FeatureScene3DComponent />
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
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to create an interactive music streaming experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="perspective-1000"
              >
                <Card3D className="group bg-gray-800/60 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 h-full">
                  {/* Feature Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20`}></div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="absolute top-4 right-4"
                    >
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                        <IconComponent className="text-white" size={24} strokeWidth={2.5} />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-100 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

