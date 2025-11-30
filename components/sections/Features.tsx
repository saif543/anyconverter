'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Sparkles, Cpu, Cloud, Globe } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Convert files in seconds with our optimized processing engine. No waiting, just results.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your files are encrypted and automatically deleted after 1 hour. We never access your data.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Sparkles,
    title: 'AI Powered',
    description: 'Smart compression, auto-enhancement, and intelligent format recommendations.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cpu,
    title: 'Client-Side Processing',
    description: 'Process files locally in your browser for instant results and maximum privacy.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Cloud,
    title: 'Cloud Integration',
    description: 'Connect with Google Drive, Dropbox, and OneDrive for seamless file management.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Globe,
    title: 'Works Everywhere',
    description: 'Access from any device, anywhere. Fully responsive and progressive web app.',
    color: 'from-pink-500 to-rose-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Everything you need,
            <br />
            <span className="gradient-text">nothing you don&apos;t</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Powerful features designed to make file conversion effortless and delightful.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-100 h-full">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-2.5 mb-5 group-hover:scale-110 transition-transform`}>
          <Icon className="w-full h-full text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-neutral-900 mb-3">
          {feature.title}
        </h3>
        <p className="text-neutral-600 leading-relaxed">
          {feature.description}
        </p>

        {/* Hover Effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      </div>
    </motion.div>
  );
}
