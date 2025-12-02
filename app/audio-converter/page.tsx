'use client';

import { useState } from 'react';
import Navigation from '@/components/shared/Navigation';
import { Music, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const audioFormats = [
  { from: 'MP3', to: 'WAV', popular: true, description: 'High quality audio' },
  { from: 'WAV', to: 'MP3', popular: true, description: 'Compress audio' },
  { from: 'M4A', to: 'MP3', popular: true, description: 'Universal format' },
  { from: 'FLAC', to: 'MP3', popular: false, description: 'Lossless to MP3' },
  { from: 'OGG', to: 'MP3', popular: false, description: 'Convert OGG' },
  { from: 'AAC', to: 'MP3', popular: false, description: 'AAC to MP3' },
  { from: 'WMA', to: 'MP3', popular: false, description: 'Windows format' },
  { from: 'OPUS', to: 'MP3', popular: false, description: 'Modern codec' },
  { from: 'AIFF', to: 'WAV', popular: false, description: 'Apple format' },
];

export default function AudioConverter() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
            <Music className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">Audio Converter</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Convert Audio Files Instantly
          </h1>

          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Convert MP3, WAV, FLAC, AAC, and more. High-quality audio conversion in seconds.
          </p>
        </motion.div>

        {/* Conversion Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audioFormats.map((format, index) => (
            <motion.a
              key={index}
              href="/#conversion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative group p-6 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 hover:border-green-400/50 transition-all cursor-pointer"
            >
              {format.popular && (
                <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Popular
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-green-500/20 rounded-lg">
                    <span className="text-sm font-bold text-green-400">{format.from}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-green-400 transition-colors" />
                  <div className="px-4 py-2 bg-emerald-500/20 rounded-lg">
                    <span className="text-sm font-bold text-emerald-400">{format.to}</span>
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
