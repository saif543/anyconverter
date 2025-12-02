'use client';

import { useState, useRef } from 'react';
import Navigation from '@/components/shared/Navigation';
import { Image, ArrowRight, Sparkles, Upload, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const imageFormats = [
  { from: 'JPG', to: 'PNG', popular: true },
  { from: 'PNG', to: 'JPG', popular: true },
  { from: 'HEIC', to: 'JPG', popular: true },
  { from: 'WEBP', to: 'PNG', popular: false },
  { from: 'SVG', to: 'PNG', popular: false },
  { from: 'GIF', to: 'MP4', popular: true },
  { from: 'BMP', to: 'JPG', popular: false },
  { from: 'TIFF', to: 'JPG', popular: false },
  { from: 'ICO', to: 'PNG', popular: false },
  { from: 'RAW', to: 'JPG', popular: false },
];

const formatOptions: Record<string, string[]> = {
  jpg: ['PNG', 'WEBP', 'PDF', 'BMP', 'TIFF', 'ICO'],
  jpeg: ['PNG', 'WEBP', 'PDF', 'BMP', 'TIFF', 'ICO'],
  png: ['JPG', 'WEBP', 'PDF', 'SVG', 'ICO', 'BMP'],
  webp: ['JPG', 'PNG', 'GIF', 'PDF'],
  gif: ['MP4', 'PNG', 'WEBP'],
  svg: ['PNG', 'JPG', 'PDF'],
  heic: ['JPG', 'PNG', 'PDF'],
  bmp: ['JPG', 'PNG', 'PDF'],
  tiff: ['JPG', 'PNG', 'PDF'],
  ico: ['PNG', 'JPG'],
};

export default function ImageConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [detectedFormat, setDetectedFormat] = useState<string>('');
  const [availableFormats, setAvailableFormats] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Detect file format
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      setDetectedFormat(extension.toUpperCase());

      // Get available formats for this file type
      const formats = formatOptions[extension] || ['PNG', 'JPG', 'PDF'];
      setAvailableFormats(formats);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setDetectedFormat('');
    setAvailableFormats([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <Image className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">Image Converter</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Convert Images to Any Format
          </h1>

          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Fast, free, and easy image conversion. Support for JPG, PNG, WEBP, SVG, HEIC, and more.
          </p>
        </motion.div>

        {/* File Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="relative p-8 rounded-3xl bg-neutral-900/80 backdrop-blur-xl border border-white/10">
            {!selectedFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer text-center py-12 border-2 border-dashed border-blue-500/30 rounded-2xl hover:border-blue-500/50 transition-all bg-blue-500/5 hover:bg-blue-500/10"
              >
                <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Select Image File</h3>
                <p className="text-sm text-neutral-400">Click to browse or drag and drop</p>
                <p className="text-xs text-neutral-500 mt-2">Supports JPG, PNG, WEBP, SVG, HEIC, GIF, and more</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* File Info */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                      <Image className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{selectedFile.name}</h4>
                      <p className="text-xs text-neutral-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={clearFile}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Detected Format */}
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-green-400">
                    Detected format: <strong>{detectedFormat}</strong>
                  </span>
                </div>

                {/* Available Output Formats */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Convert to:</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {availableFormats.map((format) => (
                      <motion.button
                        key={format}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 hover:border-blue-400/60 text-blue-400 font-bold text-sm transition-all"
                      >
                        {format}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Convert Button */}
                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                  Convert Now
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </motion.div>

        {/* Conversion Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imageFormats.map((format, index) => (
            <motion.a
              key={index}
              href="/#conversion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative group p-6 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 hover:border-blue-400/50 transition-all cursor-pointer"
            >
              {format.popular && (
                <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Popular
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-blue-500/20 rounded-lg">
                    <span className="text-sm font-bold text-blue-400">{format.from}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-blue-400 transition-colors" />
                  <div className="px-4 py-2 bg-cyan-500/20 rounded-lg">
                    <span className="text-sm font-bold text-cyan-400">{format.to}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </main>
  );
}
