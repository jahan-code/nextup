'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning';
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-gray-800/95 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 max-w-md w-full shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`flex-shrink-0 p-2 rounded-lg ${
                    variant === 'danger'
                      ? 'bg-red-900/30 border border-red-500/50'
                      : 'bg-yellow-900/30 border border-yellow-500/50'
                  }`}
                >
                  <AlertTriangle
                    className={variant === 'danger' ? 'text-red-400' : 'text-yellow-400'}
                    size={24}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                  <p className="text-gray-400 text-sm">{message}</p>
                </div>
                {!isLoading && (
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    variant === 'danger'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  }`}
                >
                  {isLoading ? 'Processing...' : confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
