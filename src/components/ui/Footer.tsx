'use client';

import React from 'react';
import { Twitter, Github, Mail, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Twitter,
      label: 'Twitter',
      href: '#',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: '#',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:contact@nextup.com',
    },
  ];

  const footerLinks = {
    Product: ['Features', 'How It Works', 'Pricing'],
    Company: ['About', 'Blog', 'Careers'],
    Legal: ['Privacy', 'Terms', 'Cookie Policy'],
  };

  return (
    <footer className="bg-gray-950 border-t border-purple-500/20 relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Logo size="lg" showText={true} />
              <p className="text-gray-400 mt-4 max-w-md">
                Let your fans choose the music that plays on your stream. Connect with your audience through real-time music selection and voting.
              </p>
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-lg bg-gray-800/50 border border-purple-500/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/40 hover:bg-gray-800/70 transition-all"
                    >
                      <IconComponent size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-gray-200 font-semibold mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-purple-500/20 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} NextUp. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Music size={16} className="text-purple-400" />
              <span>Made with passion for creators</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

