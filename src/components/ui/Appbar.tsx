'use client';

import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Sparkles, Workflow, User, LogOut, LayoutDashboard, Users } from 'lucide-react';
import Logo from './Logo';
import MagneticButton from './MagneticButton';
import JoinRoomModal from '../features/JoinRoomModal';

const Appbar = () => {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
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

  const navItems = session.data?.user
    ? [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    ]
    : [
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-black/95 backdrop-blur-xl border-b border-gray-600/30 shadow-2xl shadow-black/40'
          : 'bg-black/80 backdrop-blur-lg border-b border-gray-600/20 shadow-lg shadow-black/20'
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
                if (session.data?.user) {
                  router.push('/dashboard');
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
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
                      if (item.href.startsWith('/')) {
                        window.location.href = item.href;
                      } else if (item.id === 'home') {
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
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"
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
                  {/* Removed separate Dashboard button as it's now in navItems */}
                  <div className="flex items-center gap-3">
                    {session.data?.user?.image ? (
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={session.data.user.image}
                        alt={session.data.user.name || 'User'}
                        className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg cursor-pointer"
                        title={session.data.user.name || session.data.user.email || ''}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-white/10 text-gray-400">
                        <User size={20} />
                      </div>
                    )}
                    <MagneticButton
                      onClick={() => signOut()}
                      className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2 rounded-lg hover:bg-gray-800/50"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </MagneticButton>
                  </div>
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
                    className="px-6 py-2.5 text-sm font-semibold bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all flex items-center gap-2"
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
              className="lg:hidden overflow-hidden border-t border-gray-600/20 bg-black/95 backdrop-blur-xl"
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
                        if (item.href.startsWith('/')) {
                          router.push(item.href);
                        } else if (item.id === 'home') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          scrollToSection(item.id);
                        }
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                    >
                      <IconComponent size={20} />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
                <div className="pt-4 border-t border-gray-600/20">
                  {session.data?.user ? (
                    <>
                      <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        {session.data?.user?.image ? (
                          <img
                            src={session.data.user.image}
                            alt={session.data.user.name || 'User'}
                            className="w-10 h-10 rounded-full border border-white/10"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-white/10 text-gray-400">
                            <User size={20} />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400 truncate max-w-[150px]">{session.data?.user?.email}</span>
                        </div>
                      </div>
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
                      {/* Removed separate Dashboard button in mobile menu */}
                    </>
                  ) : (
                    <>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                        onClick={() => {
                          window.location.href = '/login';
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors mb-2"
                      >
                        <span>Sign In</span>
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (navItems.length + 1) * 0.1 }}
                        onClick={() => {
                          window.location.href = '/signup';
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all"
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