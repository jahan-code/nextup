'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, variant?: ToastVariant, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, variant: ToastVariant = 'info', duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, message, variant, duration };
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full sm:w-auto">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const getVariantStyles = () => {
    switch (toast.variant) {
      case 'success':
        return {
          bg: 'bg-green-900/90',
          border: 'border-green-500/50',
          icon: <CheckCircle className="text-green-400" size={20} />,
        };
      case 'error':
        return {
          bg: 'bg-red-900/90',
          border: 'border-red-500/50',
          icon: <AlertCircle className="text-red-400" size={20} />,
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-900/90',
          border: 'border-blue-500/50',
          icon: <Info className="text-blue-400" size={20} />,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
      className={`${styles.bg} ${styles.border} backdrop-blur-sm border rounded-lg p-4 shadow-lg flex items-start gap-3`}
    >
      {styles.icon}
      <p className="flex-1 text-white text-sm">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
        aria-label="Close toast"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}
