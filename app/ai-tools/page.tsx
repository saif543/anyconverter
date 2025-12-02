'use client';

import { useState } from 'react';
import Navigation from '@/components/shared/Navigation';
import { Sparkles, Wand2, Image, FileText, Crown, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const aiTools = [
  {
    icon: Image,
    title: 'AI Image Upscaler',
    description: 'Enhance image quality up to 4x using AI',
    gradient: 'from-blue-500 to-cyan-500',
    isPremium: true,
    features: ['4x resolution', 'Noise reduction', 'Detail enhancement']
  },
  {
    icon: Image,
    title: 'Background Remover',
    description: 'Remove backgrounds from images instantly',
    gradient: 'from-purple-500 to-pink-500',
    isPremium: false,
    features: ['Auto detection', 'Edge refinement', 'Transparent PNG']
  },
  {
    icon: Wand2,
    title: 'Image Colorization',
    description: 'Add realistic colors to black & white photos',
    gradient: 'from-green-500 to-emerald-500',
    isPremium: true,
    features: ['Natural colors', 'Smart detection', 'Vintage support']
  },
  {
    icon: FileText,
    title: 'OCR Text Extraction',
    description: 'Extract text from images and PDFs',
    gradient: 'from-orange-500 to-red-500',
    isPremium: false,
    features: ['Multi-language', 'High accuracy', 'Editable output']
  },
  {
    icon: Image,
    title: 'AI Art Generator',
    description: 'Create images from text descriptions',
    gradient: 'from-violet-500 to-purple-500',
    isPremium: true,
    features: ['Multiple styles', 'HD quality', 'Fast generation']
  },
  {
    icon: Wand2,
    title: 'Smart Crop & Resize',
    description: 'AI-powered intelligent cropping',
    gradient: 'from-teal-500 to-cyan-500',
    isPremium: false,
    features: ['Face detection', 'Object focus', 'Aspect ratios']
  },
  {
    icon: Image,
    title: 'Image Restoration',
    description: 'Repair old or damaged photos',
    gradient: 'from-rose-500 to-red-500',
    isPremium: true,
    features: ['Scratch removal', 'Color correction', 'Quality boost']
  },
  {
    icon: FileText,
    title: 'AI Compression',
    description: 'Smart compression without quality loss',
    gradient: 'from-amber-500 to-yellow-500',
    isPremium: false,
    features: ['Up to 80% smaller', 'No visible loss', 'Fast processing']
  },
  {
    icon: Wand2,
    title: 'Object Removal',
    description: 'Remove unwanted objects from photos',
    gradient: 'from-fuchsia-500 to-purple-500',
    isPremium: true,
    features: ['Smart fill', 'Context aware', 'Natural results']
  },
];

export default function AITools() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-400 font-medium">AI-Powered Tools</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              AI-Powered
            </span>{' '}
            Conversion Tools
          </h1>

          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Transform your files with cutting-edge AI technology. Enhance, restore, and create like never before.
          </p>
        </motion.div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {aiTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.a
                key={index}
                href="/#conversion"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03, rotateY: 5 }}
                className="relative group cursor-pointer"
                style={{ perspective: '1000px' }}
              >
                {tool.isPremium && (
                  <div className="absolute -top-2 -right-2 z-10 p-2 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className="relative p-6 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 hover:border-violet-400/50 transition-all overflow-hidden h-full">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                  {/* Icon */}
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} bg-opacity-20 flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 mb-4">{tool.description}</p>

                  {/* Features */}
                  <ul className="space-y-1 mb-4">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-neutral-500">
                        <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${tool.gradient}`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-sm font-medium text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Try it now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Why AI Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 border border-violet-500/20">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-violet-400" />
              <h2 className="text-2xl font-bold text-white">Why Use AI Tools?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">⚡ Lightning Fast</h3>
                <p className="text-sm text-neutral-400">Process files in seconds with GPU-accelerated AI models</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">🎯 Professional Results</h3>
                <p className="text-sm text-neutral-400">Studio-quality output without technical expertise</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">🔒 Privacy First</h3>
                <p className="text-sm text-neutral-400">Files are processed securely and deleted after conversion</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">💡 Smart Automation</h3>
                <p className="text-sm text-neutral-400">AI handles complex tasks automatically for best results</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
