'use client';

import { useState } from 'react';
import Navigation from '@/components/shared/Navigation';
import { Archive, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const archiveFormats = [
  { from: 'ZIP', to: 'RAR', popular: true, description: 'Better compression' },
  { from: 'RAR', to: 'ZIP', popular: true, description: 'Universal format' },
  { from: '7Z', to: 'ZIP', popular: true, description: 'Extract 7Z files' },
  { from: 'TAR', to: 'ZIP', popular: false, description: 'Convert TAR' },
  { from: 'GZ', to: 'ZIP', popular: false, description: 'Decompress GZ' },
  { from: 'BZ2', to: 'ZIP', popular: false, description: 'Extract BZ2' },
  { from: 'XZ', to: 'ZIP', popular: false, description: 'Convert XZ' },
  { from: 'ISO', to: 'ZIP', popular: false, description: 'Extract ISO' },
];

export default function ArchiveTools() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black">
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
            <Archive className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-400 font-medium">Archive Tools</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Compress & Extract Archives
          </h1>

          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Convert ZIP, RAR, 7Z, TAR and more. Compress or extract archives easily.
          </p>
        </motion.div>

        {/* Conversion Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archiveFormats.map((format, index) => (
            <motion.a
              key={index}
              href="/#conversion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative group p-6 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer"
            >
              {format.popular && (
                <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Popular
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-amber-500/20 rounded-lg">
                    <span className="text-sm font-bold text-amber-400">{format.from}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
                  <div className="px-4 py-2 bg-yellow-500/20 rounded-lg">
                    <span className="text-sm font-bold text-yellow-400">{format.to}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-500">{format.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </main>
  );
}
