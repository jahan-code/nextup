'use client';

import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Sparkles, Workflow, User, LogOut, LayoutDashboard, Users } from 'lucide-react';
import Logo from './Logo';
import MagneticButton from './MagneticButton';
import JoinRoomModal from '../features/JoinRoomModal';

const Appbar = () => {
  const session = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const { scrollY } = useScroll();

  // Listen for join room event
  useEffect(() => {
    const handleOpenJoin = () => setShowJoinModal(true);
    window.addEventListener('open-join-room', handleOpenJoin);
    return () => window.removeEventListener('open-join-room', handleOpenJoin);
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#' },
    { id: 'features', label: 'Features', icon: Sparkles, href: '#features' },
    { id: 'how-it-works', label: 'How It Works', icon: Workflow, href: '#how-it-works' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-900/95 backdrop-blur-xl border-b border-purple-500/30 shadow-2xl shadow-purple-900/20'
            : 'bg-gray-900/80 backdrop-blur-lg border-b border-purple-500/20 shadow-lg shadow-purple-900/10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
            >
              <Logo size="md" showText={true} />
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    onClick={() => {
                      if (item.id === 'home') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        scrollToSection(item.id);
                      }
                    }}
                    className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group flex items-center gap-2 rounded-lg hover:bg-gray-800/50"
                  >
                    <IconComponent size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span>{item.label}</span>
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {session.data?.user ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MagneticButton
                      onClick={() => {
                        const event = new CustomEvent('open-join-room');
                        window.dispatchEvent(event);
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2 rounded-lg hover:bg-gray-800/50"
                    >
                      <Users size={16} />
                      <span>Join Room</span>
                    </MagneticButton>
                  </motion.div>
                  <MagneticButton
                    onClick={() => window.location.href = '/dashboard'}
                    className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </MagneticButton>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MagneticButton
                      onClick={() => signOut()}
                      className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2 rounded-lg hover:bg-gray-800/50"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </MagneticButton>
                  </motion.div>
                </>
              ) : (
                <>
                  <MagneticButton
                    onClick={() => window.location.href = '/login'}
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2 rounded-lg hover:bg-gray-800/50"
                  >
                    <span>Sign In</span>
                  </MagneticButton>
                  <MagneticButton
                    onClick={() => window.location.href = '/signup'}
                    className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                  >
                    <User size={16} />
                    <span>Sign Up</span>
                  </MagneticButton>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
        </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-purple-500/20 bg-gray-900/95 backdrop-blur-xl"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => {
                        if (item.id === 'home') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          scrollToSection(item.id);
                        }
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                    >
                      <IconComponent size={20} />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
                <div className="pt-4 border-t border-purple-500/20">
                  {session.data?.user ? (
                    <>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors mb-2"
                      >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (navItems.length + 1) * 0.1 }}
                        onClick={() => window.location.href = '/dashboard'}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                      >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                        onClick={() => window.location.href = '/login'}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors mb-2"
                      >
                        <span>Sign In</span>
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (navItems.length + 1) * 0.1 }}
                        onClick={() => window.location.href = '/signup'}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                      >
                        <User size={20} />
                        <span>Sign Up</span>
                      </motion.button>
                    </>
                  )}
        </div>
    </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20" />

      {/* Join Room Modal */}
      <JoinRoomModal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} />
    </>
  );
};

export default Appbar;