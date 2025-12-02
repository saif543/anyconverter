'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, FileText, Image, Video, Music, Archive, Crown, ChevronLeft, ChevronRight } from 'lucide-react';

interface ToolsProps {
  onToolSelect?: (from: string, to: string) => void;
}

// Featured conversion tools
const featuredTools = [
  {
    id: 1,
    from: 'PDF',
    to: 'DOCX',
    fromIcon: FileText,
    toIcon: FileText,
    category: 'Document',
    description: 'Edit PDFs in Word',
    isPremium: false,
    gradient: 'from-red-500 to-orange-500',
  },
  {
    id: 2,
    from: 'JPG',
    to: 'PNG',
    fromIcon: Image,
    toIcon: Image,
    category: 'Image',
    description: 'Convert to transparent backgrounds',
    isPremium: false,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    from: 'MP4',
    to: 'MP3',
    fromIcon: Video,
    toIcon: Music,
    category: 'Video',
    description: 'Extract audio from video',
    isPremium: false,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    from: 'HEIC',
    to: 'JPG',
    fromIcon: Image,
    toIcon: Image,
    category: 'Image',
    description: 'iPhone photos to universal format',
    isPremium: false,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 5,
    from: 'DOCX',
    to: 'PDF',
    fromIcon: FileText,
    toIcon: FileText,
    category: 'Document',
    description: 'Share documents securely',
    isPremium: false,
    gradient: 'from-indigo-500 to-violet-500',
  },
  {
    id: 6,
    from: 'PNG',
    to: 'SVG',
    fromIcon: Image,
    toIcon: Image,
    category: 'Image',
    description: 'Vectorize images',
    isPremium: true,
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    id: 7,
    from: 'MOV',
    to: 'MP4',
    fromIcon: Video,
    toIcon: Video,
    category: 'Video',
    description: 'Universal video format',
    isPremium: false,
    gradient: 'from-rose-500 to-red-500',
  },
  {
    id: 8,
    from: 'WAV',
    to: 'MP3',
    fromIcon: Music,
    toIcon: Music,
    category: 'Audio',
    description: 'Compress audio files',
    isPremium: false,
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    id: 9,
    from: 'ZIP',
    to: 'RAR',
    fromIcon: Archive,
    toIcon: Archive,
    category: 'Archive',
    description: 'Better compression',
    isPremium: true,
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    id: 10,
    from: 'GIF',
    to: 'MP4',
    fromIcon: Image,
    toIcon: Video,
    category: 'Image',
    description: 'Animated GIFs to video',
    isPremium: false,
    gradient: 'from-fuchsia-500 to-purple-500',
  },
];

// Popular search suggestions
const searchSuggestions = [
  'PDF to Word',
  'JPG to PNG',
  'MP4 to MP3',
  'HEIC to JPG',
  'PNG to PDF',
  'Word to PDF',
  'MP3 to WAV',
  'RAR to ZIP',
];

export default function Tools({ onToolSelect }: ToolsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(featuredTools.length / itemsPerSlide);

  const filteredSuggestions = searchSuggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    // Extract "from" and "to" formats from query like "PDF to Word"
    const match = query.match(/(\w+)\s+to\s+(\w+)/i);
    if (match && onToolSelect) {
      onToolSelect(match[1].toLowerCase(), match[2].toLowerCase());
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Popular Conversion Tools
          </h2>
          <p className="text-neutral-400 text-lg">
            Quick access to your most-used file conversions
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16 relative"
        >
          <div className="relative">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="text"
                placeholder="What do you want to convert? (e.g., PDF to Word)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full pl-12 pr-4 py-4 bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-neutral-500 focus:outline-none focus:border-violet-400/50 transition-all"
              />
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {showSuggestions && searchQuery && filteredSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-full bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-50"
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(suggestion);
                        handleSearch(suggestion);
                      }}
                      className="w-full px-4 py-3 text-left text-white hover:bg-white/5 transition-colors flex items-center gap-3"
                    >
                      <Search className="w-4 h-4 text-neutral-500" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {searchSuggestions.slice(0, 4).map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery(suggestion);
                  handleSearch(suggestion);
                }}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-400/50 rounded-full text-sm text-neutral-400 hover:text-white transition-all"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Tools Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-3 rounded-full bg-neutral-900/90 backdrop-blur-xl border border-white/10 hover:border-violet-400/50 text-white hover:scale-110 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-3 rounded-full bg-neutral-900/90 backdrop-blur-xl border border-white/10 hover:border-violet-400/50 text-white hover:scale-110 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={carouselRef}>
            <motion.div
              className="flex gap-6"
              animate={{
                x: `-${currentSlide * 100}%`,
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredTools
                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                    .map((tool, index) => {
                      const FromIcon = tool.fromIcon;
                      const ToIcon = tool.toIcon;

                      return (
                        <motion.div
                          key={tool.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, rotateY: 5 }}
                          onClick={() => onToolSelect?.(tool.from.toLowerCase(), tool.to.toLowerCase())}
                          className="relative group cursor-pointer"
                          style={{ perspective: '1000px' }}
                        >
                          {/* Premium Badge */}
                          {tool.isPremium && (
                            <div className="absolute -top-2 -right-2 z-10 p-2 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50">
                              <Crown className="w-4 h-4 text-white" />
                            </div>
                          )}

                          {/* Card */}
                          <div className="relative p-6 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 hover:border-violet-400/50 transition-all overflow-hidden">
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                            {/* Category Badge */}
                            <div className="mb-4">
                              <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-neutral-400 border border-white/10">
                                {tool.category}
                              </span>
                            </div>

                            {/* Conversion Flow */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex flex-col items-center gap-2">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.gradient} bg-opacity-20`}>
                                  <FromIcon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-sm font-bold text-white">{tool.from}</span>
                              </div>

                              <ArrowRight className="w-5 h-5 text-violet-400 group-hover:translate-x-1 transition-transform" />

                              <div className="flex flex-col items-center gap-2">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.gradient} bg-opacity-20`}>
                                  <ToIcon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-sm font-bold text-white">{tool.to}</span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-neutral-500 text-center">{tool.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? 'bg-violet-400 w-8'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
