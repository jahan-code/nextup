'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Action {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
}

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actions?: Action[];
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon: Icon,
  actions = [],
  className = '',
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center py-20 bg-gray-800/30 rounded-xl border border-purple-500/20 ${className}`}
    >
      {Icon && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex justify-center mb-6"
        >
          <div className="p-4 bg-gray-800/50 rounded-full">
            <Icon className="text-gray-400" size={48} />
          </div>
        </motion.div>
      )}

      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">{description}</p>

      {actions.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {actions.map((action, index) => {
            const ActionIcon = action.icon;
            const isPrimary = action.variant === 'primary' || index === 0;

            return (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={action.onClick}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  isPrimary
                    ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70 border border-purple-500/20'
                }`}
              >
                {ActionIcon && <ActionIcon size={20} />}
                {action.label}
              </motion.button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
