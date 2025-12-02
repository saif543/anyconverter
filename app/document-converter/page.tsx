'use client';

import { useState } from 'react';
import Navigation from '@/components/shared/Navigation';
import { FileText, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const documentFormats = [
  { from: 'PDF', to: 'DOCX', popular: true, description: 'Edit PDFs in Word' },
  { from: 'DOCX', to: 'PDF', popular: true, description: 'Share securely' },
  { from: 'PDF', to: 'TXT', popular: false, description: 'Extract text' },
  { from: 'XLSX', to: 'PDF', popular: true, description: 'Excel to PDF' },
  { from: 'PPTX', to: 'PDF', popular: false, description: 'PowerPoint to PDF' },
  { from: 'ODT', to: 'DOCX', popular: false, description: 'OpenOffice to Word' },
  { from: 'RTF', to: 'DOCX', popular: false, description: 'Rich text format' },
  { from: 'EPUB', to: 'PDF', popular: false, description: 'eBook to PDF' },
  { from: 'PAGES', to: 'PDF', popular: false, description: 'Apple Pages' },
];

export default function DocumentConverter() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6">
            <FileText className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-400 font-medium">Document Converter</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Convert Documents Seamlessly
          </h1>

          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Convert PDF, Word, Excel, PowerPoint and more. Preserve formatting and layout.
          </p>
        </motion.div>

        {/* Conversion Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentFormats.map((format, index) => (
            <motion.a
              key={index}
              href="/#conversion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative group p-6 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 hover:border-orange-400/50 transition-all cursor-pointer"
            >
              {format.popular && (
                <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Popular
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-orange-500/20 rounded-lg">
                    <span className="text-sm font-bold text-orange-400">{format.from}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-orange-400 transition-colors" />
                  <div className="px-4 py-2 bg-red-500/20 rounded-lg">
                    <span className="text-sm font-bold text-red-400">{format.to}</span>
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
