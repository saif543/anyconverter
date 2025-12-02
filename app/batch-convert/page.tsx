'use client';

import { useState } from 'react';
import Navigation from '@/components/shared/Navigation';
import { Zap, ArrowRight, CheckCircle2, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const batchFeatures = [
  'Convert up to 50 files at once',
  'Automatic format detection',
  'Bulk rename files',
  'Preserve folder structure',
  'Faster processing speed',
  'Download as single ZIP',
  'Priority queue processing',
  'Advanced settings per file',
];

export default function BatchConvert() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full mb-6">
            <Zap className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-400 font-medium">Batch Conversion</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Convert Multiple Files at Once
          </h1>

          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-8">
            Save time by converting dozens of files simultaneously. Perfect for bulk operations.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-400 font-medium">Premium Feature</span>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Batch Conversion Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {batchFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-neutral-900/50 border border-white/10"
              >
                <CheckCircle2 className="w-5 h-5 text-violet-400 flex-shrink-0" />
                <span className="text-neutral-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <a
            href="/#conversion"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-violet-500/50 transition-all"
          >
            <Zap className="w-5 h-5" />
            Start Batch Converting
          </a>
        </motion.div>

        {/* How It Works */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Select Files',
                description: 'Choose multiple files from your device, cloud storage, or drag and drop'
              },
              {
                step: '2',
                title: 'Choose Format',
                description: 'Select the output format for all files or customize individually'
              },
              {
                step: '3',
                title: 'Convert & Download',
                description: 'Process all files simultaneously and download as ZIP or individually'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-violet-400/30">
                  <span className="text-2xl font-bold text-violet-400">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
