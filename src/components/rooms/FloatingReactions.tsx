'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Reaction {
  id: string;
  emoji: string;
  x: number; // horizontal offset in %
}

interface FloatingReactionsProps {
  reactions: Reaction[];
  onComplete: (id: string) => void;
}

const FloatingReactions: React.FC<FloatingReactionsProps> = ({ reactions, onComplete }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence>
        {reactions.map((reaction) => (
          <motion.div
            key={reaction.id}
            initial={{ opacity: 0, scale: 0.5, y: '100%', x: `${reaction.x}%` }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: '-20%',
              scale: [0.5, 1.2, 1, 0.8],
              rotate: [0, 10, -10, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: "easeOut" }}
            onAnimationComplete={() => onComplete(reaction.id)}
            className="absolute bottom-0 text-3xl md:text-5xl"
            style={{ left: `${reaction.x}%` }}
          >
            {reaction.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingReactions;
