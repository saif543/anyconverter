'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Check, Zap } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: () => void;
}

export default function PremiumModal({ isOpen, onClose, onSignup }: PremiumModalProps) {
  const premiumFeatures = [
    'Convert multiple files at once',
    'Batch processing up to 20 files',
    'Priority conversion speed',
    'No file size limits',
    'Advanced format options',
    'No ads or watermarks',
    'Download history access',
    'API access for developers',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 rounded-3xl opacity-50"></div>

              <div className="relative bg-neutral-900 backdrop-blur-xl rounded-3xl p-8">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>

                <div className="text-center mb-8">
                  {/* Crown Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-yellow-500/20 rounded-2xl flex items-center justify-center border border-yellow-400/30">
                    <Crown className="w-10 h-10 text-yellow-400" />
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-3">
                    Upgrade to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Premium</span>
                  </h3>
                  <p className="text-neutral-400 text-lg">
                    Unlock powerful features for unlimited conversions
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {premiumFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-neutral-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="mb-8">
                  <div className="relative">
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 rounded-2xl opacity-50"></div>
                    <div className="relative bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-6 text-center">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-5xl font-bold text-white">$9.99</span>
                        <span className="text-neutral-400">/month</span>
                      </div>
                      <p className="text-neutral-500 text-sm">Cancel anytime • 7-day free trial</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onSignup}
                    className="flex-1 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-black hover:shadow-lg hover:shadow-yellow-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    Start Free Trial
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 py-4 rounded-xl font-bold text-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                  >
                    Maybe Later
                  </motion.button>
                </div>

                <p className="text-center text-xs text-neutral-600 mt-4">
                  No credit card required for trial • Instant access
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
