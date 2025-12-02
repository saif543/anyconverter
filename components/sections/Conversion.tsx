'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, File, Download, Loader2, CheckCircle2, FileText, Image, Video, Music, Archive, Upload } from 'lucide-react';

interface ConversionProps {
  selectedFile: File | null;
  selectedFiles?: File[];
  onClose: () => void;
  onAddMoreFiles?: (type: 'device' | 'drive' | 'dropbox' | 'onedrive' | 'url') => void;
  onRemoveFile?: (index: number) => void;
}

// Comprehensive format mapping
const formatCategories = {
  document: {
    name: 'Document',
    icon: FileText,
    inputs: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'pages', 'epub', 'xls', 'xlsx', 'ppt', 'pptx'],
    outputs: ['pdf', 'docx', 'doc', 'txt', 'rtf', 'odt', 'pages', 'epub', 'jpg', 'png']
  },
  image: {
    name: 'Image',
    icon: Image,
    inputs: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg', 'ico', 'heic', 'raw'],
    outputs: ['jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico', 'tiff', 'pdf', 'psd']
  },
  video: {
    name: 'Video',
    icon: Video,
    inputs: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm', 'mpeg', 'mpg', '3gp', 'm4v'],
    outputs: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm', 'gif', 'mp3', 'wav']
  },
  audio: {
    name: 'Audio',
    icon: Music,
    inputs: ['mp3', 'wav', 'ogg', 'flac', 'aac', 'wma', 'm4a', 'aiff', 'opus'],
    outputs: ['mp3', 'wav', 'ogg', 'flac', 'aac', 'wma', 'm4a', 'opus']
  },
  archive: {
    name: 'Archive',
    icon: Archive,
    inputs: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'],
    outputs: ['zip', 'rar', '7z', 'tar', 'gz']
  }
};

export default function Conversion({ selectedFile, selectedFiles = [], onClose, onAddMoreFiles, onRemoveFile }: ConversionProps) {
  const [outputFormat, setOutputFormat] = useState('');
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Combine single file and multiple files
  const allFiles = useMemo(() => {
    console.log('Conversion component - selectedFile:', selectedFile, 'selectedFiles:', selectedFiles.length);
    if (selectedFile) {
      console.log('Returning single file as array');
      return [selectedFile];
    }
    console.log('Returning multiple files:', selectedFiles.length);
    return selectedFiles;
  }, [selectedFile, selectedFiles]);

  const hasMultipleFiles = allFiles.length > 1;

  // Progress steps
  const steps = [
    { id: 1, name: 'Upload', description: 'File uploaded' },
    { id: 2, name: 'Select Format', description: 'Choose output format' },
    { id: 3, name: 'Convert', description: 'Processing file' },
    { id: 4, name: 'Download', description: 'Ready to download' },
  ];

  const currentStep = converted ? 4 : converting ? 3 : outputFormat ? 2 : 1;

  // Detect file type and get available formats (use first file if multiple)
  const { fileType, availableFormats, categoryName } = useMemo(() => {
    const firstFile = allFiles[0];
    if (!firstFile) return { fileType: '', availableFormats: [], categoryName: '' };

    const extension = firstFile.name.split('.').pop()?.toLowerCase() || '';

    // Find which category this file belongs to
    for (const [key, category] of Object.entries(formatCategories)) {
      if (category.inputs.includes(extension)) {
        return {
          fileType: extension,
          availableFormats: category.outputs.filter(fmt => fmt !== extension), // Don't show same format
          categoryName: category.name
        };
      }
    }

    // Default fallback
    return {
      fileType: extension,
      availableFormats: ['pdf', 'jpg', 'png', 'docx', 'mp4', 'mp3'],
      categoryName: 'Document'
    };
  }, [allFiles]);

  const handleConvert = () => {
    if (!outputFormat) return;

    setConverting(true);
    // Simulate conversion
    setTimeout(() => {
      setConverting(false);
      setConverted(true);
    }, 3000);
  };

  if (allFiles.length === 0) return null;

  return (
    <section id="conversion" className="relative min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Static Twinkling Stars */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const size = Math.random() * 2 + 0.5;
          const opacity = Math.random() * 0.6 + 0.2;
          const duration = Math.random() * 3 + 2;
          const delay = Math.random() * 5;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
                boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.5)`,
              }}
              animate={{
                opacity: [opacity * 0.3, opacity, opacity * 0.5, opacity],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: delay,
              }}
            />
          );
        })}
      </div>

      {/* Shooting Stars */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => {
          const startX = Math.random() * 10;
          const startY = Math.random() * 100;
          const travelX = Math.random() * 30 + 30;
          const travelY = Math.random() * 50 + 50;
          const endX = startX + travelX;
          const endY = startY + travelY;
          const angle = Math.atan2(travelY, travelX) * (180 / Math.PI);
          const length = Math.random() * 100 + 50;
          const thickness = Math.random() * 2 + 0.5;
          const duration = Math.random() * 2 + 1.5;
          const delay = Math.random() * 15;
          const opacity = Math.random() * 0.5 + 0.3;

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                width: length,
                height: thickness,
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.7) 50%, rgba(139, 92, 246, 0.5) 75%, transparent 100%)',
                borderRadius: '50px',
                boxShadow: `0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(139, 92, 246, 0.3)`,
                transformOrigin: 'left center',
                rotate: `${angle}deg`,
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: [`0%`, `${travelX * 10}px`],
                y: [`0%`, `${travelY * 10}px`],
                opacity: [0, opacity, opacity * 0.8, 0],
                scale: [0, 1, 1, 0.3],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                repeatDelay: 10,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Convert Your File
          </h2>
          <p className="text-neutral-400 text-lg">
            Choose your output format and convert
          </p>
        </motion.div>

        {/* Conversion Card with 3D Glass Effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          style={{ perspective: '1000px' }}
        >
          {/* Animated gradient border glow */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 rounded-3xl opacity-50 blur-sm"></div>
          <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 rounded-3xl opacity-70"></div>

          {/* Main glass card */}
          <motion.div
            className="relative rounded-3xl p-8 border border-white/20 overflow-hidden bg-neutral-900/90"
            style={{
              background: 'linear-gradient(135deg, rgba(23, 23, 23, 0.95) 0%, rgba(10, 10, 10, 0.98) 50%, rgba(0, 0, 0, 0.95) 100%)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: `
                0 8px 32px 0 rgba(0, 0, 0, 0.5),
                inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
                inset 0 -1px 0 0 rgba(255, 255, 255, 0.1),
                0 20px 60px rgba(139, 92, 246, 0.3),
                0 0 0 1px rgba(255, 255, 255, 0.05)
              `,
            }}
            whileHover={{
              rotateX: 2,
              rotateY: -2,
              scale: 1.01,
              transition: { duration: 0.3 }
            }}
          >
            {/* Top glass shine effect */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

            {/* Frosted glass overlay patterns */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
              }}></div>
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
              }}></div>
            </div>

            {/* Inner content wrapper with relative positioning */}
            <div className="relative z-10">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-neutral-400" />
            </button>

            {/* Progress Stepper */}
            <div className="mb-8 px-4">
              <div className="flex items-center justify-between relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </div>

                {/* Steps */}
                {steps.map((step, index) => {
                  const isCompleted = step.id < currentStep;
                  const isCurrent = step.id === currentStep;
                  const isPending = step.id > currentStep;

                  return (
                    <div key={step.id} className="flex flex-col items-center relative z-10" style={{ flex: 1 }}>
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{
                          scale: isCurrent ? 1.1 : 1,
                          backgroundColor: isCompleted || isCurrent
                            ? 'rgba(139, 92, 246, 1)'
                            : 'rgba(255, 255, 255, 0.1)'
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 ${
                          isCompleted || isCurrent
                            ? 'border-violet-400 shadow-lg shadow-violet-500/50'
                            : 'border-white/20'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <span className={`text-sm font-bold ${
                            isCurrent ? 'text-white' : 'text-neutral-500'
                          }`}>
                            {step.id}
                          </span>
                        )}
                      </motion.div>
                      <div className="text-center">
                        <div className={`text-xs font-semibold mb-0.5 ${
                          isCompleted || isCurrent ? 'text-white' : 'text-neutral-500'
                        }`}>
                          {step.name}
                        </div>
                        <div className="text-[10px] text-neutral-600 hidden sm:block">
                          {step.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* File List & Add More Sources */}
            <div className="mb-8 pb-8 border-b border-white/10">
              {/* Add More Files Sources - Always Visible */}
              {onAddMoreFiles && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-neutral-400 mb-3">
                    Select Files From
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddMoreFiles('device')}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-400/50 transition-all flex flex-col items-center gap-1"
                  >
                    <Upload className="w-5 h-5 text-violet-400" />
                    <span className="text-[10px] text-neutral-400">Device</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddMoreFiles('drive')}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-400/50 transition-all flex flex-col items-center gap-1"
                  >
                    <svg className="w-5 h-5 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                    </svg>
                    <span className="text-[10px] text-neutral-400">Drive</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddMoreFiles('dropbox')}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-400/50 transition-all flex flex-col items-center gap-1"
                  >
                    <svg className="w-5 h-5 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.004 2.25l-6.004 10.5h4.004v9l6.004-10.5h-4.004v-9z"/>
                    </svg>
                    <span className="text-[10px] text-neutral-400">Dropbox</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddMoreFiles('onedrive')}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-400/50 transition-all flex flex-col items-center gap-1"
                  >
                    <svg className="w-5 h-5 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-3H8v-2h3V9h2v3h3v2h-3v3h-2z"/>
                    </svg>
                    <span className="text-[10px] text-neutral-400">OneDrive</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddMoreFiles('url')}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-400/50 transition-all flex flex-col items-center gap-1"
                  >
                    <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className="text-[10px] text-neutral-400">URL</span>
                  </motion.button>
                  </div>
                </div>
              )}

              {/* Files List */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Selected Files ({allFiles.length})
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                {allFiles.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 group hover:border-violet-400/30 transition-all"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-violet-400/30 flex-shrink-0">
                      <File className="w-6 h-6 text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{file.name}</h4>
                      <p className="text-xs text-neutral-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    {onRemoveFile && allFiles.length > 1 && (
                      <button
                        onClick={() => onRemoveFile(index)}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-neutral-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>
                ))}
                </div>

                {hasMultipleFiles && (
                  <div className="mt-4 p-3 rounded-xl bg-violet-500/10 border border-violet-400/20">
                    <p className="text-xs text-violet-300 text-center">
                      <strong>{allFiles.length} files</strong> will be converted to <strong>{outputFormat ? outputFormat.toUpperCase() : '...'}</strong>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Format Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-neutral-300">
                  Convert to:
                </label>
                <span className="text-xs text-neutral-500">
                  Detected: <span className="text-violet-400 uppercase font-semibold">{fileType}</span> ({categoryName})
                </span>
              </div>

              {/* Available formats for this file type */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  Available Formats
                </h4>
                <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-3">
                  {availableFormats.map((format) => (
                    <motion.button
                      key={format}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setOutputFormat(format)}
                      className={`p-3 rounded-xl font-semibold uppercase text-sm transition-all ${
                        outputFormat === format
                          ? 'bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-pink-500/20 border-2 border-violet-400/70 text-violet-400'
                          : 'bg-white/5 border border-white/10 text-neutral-400 hover:border-violet-400/50 hover:text-white'
                      }`}
                    >
                      {format}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* All Categories - View Other Options */}
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Browse All Formats
                  </h4>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                  {Object.entries(formatCategories).map(([key, category]) => {
                    const Icon = category.icon;
                    return (
                      <motion.button
                        key={key}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                        className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                          selectedCategory === key
                            ? 'bg-violet-500/20 border-2 border-violet-400/70 text-violet-400'
                            : 'bg-white/5 border border-white/10 text-neutral-400 hover:border-violet-400/50 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{category.name}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Show formats for selected category */}
                {selectedCategory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2"
                  >
                    {formatCategories[selectedCategory as keyof typeof formatCategories].outputs.map((format) => (
                      <motion.button
                        key={format}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setOutputFormat(format);
                          setSelectedCategory(null);
                        }}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:border-violet-400/50 hover:text-white text-xs font-semibold uppercase transition-all"
                      >
                        {format}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Convert Button */}
            {!converted && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConvert}
                disabled={!outputFormat || converting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                  outputFormat && !converting
                    ? 'bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 text-white hover:shadow-lg hover:shadow-violet-500/50'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                {converting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Converting...
                  </>
                ) : (
                  'Convert Now'
                )}
              </motion.button>
            )}

            {/* Download Button (after conversion) */}
            {converted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="text-green-500 font-semibold">Conversion Complete!</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 text-white hover:shadow-lg hover:shadow-violet-500/50 transition-all flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download {outputFormat.toUpperCase()}
                </motion.button>
              </motion.div>
            )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
