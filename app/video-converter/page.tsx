'use client';

import { useState, useRef } from 'react';
import Navigation from '@/components/shared/Navigation';
import { Video, ArrowRight, Sparkles, Upload, CheckCircle2, X } from 'lucide-react';
import { motion } from 'framer-motion';

const videoFormats = [
  { from: 'MP4', to: 'MP3', popular: true, description: 'Extract audio' },
  { from: 'MOV', to: 'MP4', popular: true, description: 'Universal format' },
  { from: 'AVI', to: 'MP4', popular: true, description: 'Modern format' },
  { from: 'MKV', to: 'MP4', popular: false, description: 'Compress video' },
  { from: 'WEBM', to: 'MP4', popular: false, description: 'Web to standard' },
  { from: 'FLV', to: 'MP4', popular: false, description: 'Flash to MP4' },
  { from: 'WMV', to: 'MP4', popular: false, description: 'Windows format' },
  { from: 'MPEG', to: 'MP4', popular: false, description: 'Convert MPEG' },
  { from: 'GIF', to: 'MP4', popular: true, description: 'Animated to video' },
];

const formatOptions: Record<string, string[]> = {
  mp4: ['MP3', 'AVI', 'MOV', 'WEBM', 'GIF', 'MKV'],
  mov: ['MP4', 'AVI', 'MP3', 'WEBM', 'GIF'],
  avi: ['MP4', 'MOV', 'MP3', 'WEBM', 'MKV'],
  mkv: ['MP4', 'AVI', 'MOV', 'MP3', 'WEBM'],
  webm: ['MP4', 'AVI', 'MOV', 'MP3', 'GIF'],
  flv: ['MP4', 'AVI', 'MOV', 'MP3'],
  wmv: ['MP4', 'AVI', 'MOV', 'MP3'],
  mpeg: ['MP4', 'AVI', 'MOV', 'MP3'],
  mpg: ['MP4', 'AVI', 'MOV', 'MP3'],
};

export default function VideoConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [detectedFormat, setDetectedFormat] = useState<string>('');
  const [availableFormats, setAvailableFormats] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      setDetectedFormat(extension.toUpperCase());

      const formats = formatOptions[extension] || ['MP4', 'AVI', 'MP3'];
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Video className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">Video Converter</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Convert Videos to Any Format
          </h1>

          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Convert MP4, AVI, MOV, MKV, and more. Extract audio or compress videos easily.
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
                className="cursor-pointer text-center py-12 border-2 border-dashed border-purple-500/30 rounded-2xl hover:border-purple-500/50 transition-all bg-purple-500/5 hover:bg-purple-500/10"
              >
                <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Select Video File</h3>
                <p className="text-sm text-neutral-400">Click to browse or drag and drop</p>
                <p className="text-xs text-neutral-500 mt-2">Supports MP4, MOV, AVI, MKV, WEBM, and more</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                      <Video className="w-6 h-6 text-purple-400" />
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

                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-green-400">
                    Detected format: <strong>{detectedFormat}</strong>
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Convert to:</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {availableFormats.map((format) => (
                      <motion.button
                        key={format}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 hover:border-purple-400/60 text-purple-400 font-bold text-sm transition-all"
                      >
                        {format}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  Convert Now
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </motion.div>

        {/* Conversion Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoFormats.map((format, index) => (
            <motion.a
              key={index}
              href="/#conversion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative group p-6 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 hover:border-purple-400/50 transition-all cursor-pointer"
            >
              {format.popular && (
                <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Popular
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-purple-500/20 rounded-lg">
                    <span className="text-sm font-bold text-purple-400">{format.from}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-purple-400 transition-colors" />
                  <div className="px-4 py-2 bg-pink-500/20 rounded-lg">
                    <span className="text-sm font-bold text-pink-400">{format.to}</span>
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
