'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Zap, Image, FileText, Video, Music, Archive } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-neutral-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-semibold text-white">
                ConvertFlow
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <DropdownMenu
              title="Tools"
              items={[
                { icon: Image, label: 'Image Converter', desc: 'JPG, PNG, WEBP, SVG', href: '#image' },
                { icon: Video, label: 'Video Converter', desc: 'MP4, AVI, MOV, WEBM', href: '#video' },
                { icon: Music, label: 'Audio Converter', desc: 'MP3, WAV, AAC, FLAC', href: '#audio' },
                { icon: FileText, label: 'Document Converter', desc: 'PDF, DOCX, TXT', href: '#document' },
                { icon: Archive, label: 'Archive Tools', desc: 'ZIP, RAR, 7Z', href: '#archive' },
                { icon: Zap, label: 'Batch Convert', desc: 'Convert multiple files', href: '#batch' },
              ]}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#api">API</NavLink>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors">
              Sign in
            </button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(139, 92, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2.5 text-white rounded-lg font-semibold text-sm shadow-md transition-all overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 30%, #8b5cf6 70%, #ec4899 100%)',
                boxShadow: '0 2px 12px rgba(139, 92, 246, 0.25), inset 0 -1px 4px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.15)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10" />
              <span className="relative z-10">Get Started</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-800 transition-colors text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-neutral-900 border-t border-neutral-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              <MobileNavLink href="#features">Features</MobileNavLink>
              <MobileNavLink href="#pricing">Pricing</MobileNavLink>
              <MobileNavLink href="#tools">Tools</MobileNavLink>
              <MobileNavLink href="#api">API</MobileNavLink>
              <div className="pt-4 space-y-2">
                <button className="w-full px-4 py-2.5 text-sm font-medium text-neutral-300 border border-neutral-700 rounded-lg hover:bg-neutral-800 transition-colors">
                  Sign in
                </button>
                <button
                  className="relative w-full px-4 py-2.5 text-white rounded-lg font-semibold text-sm shadow-md overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 30%, #8b5cf6 70%, #ec4899 100%)',
                    boxShadow: '0 2px 12px rgba(139, 92, 246, 0.25), inset 0 -1px 4px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10" />
                  <span className="relative z-10">Get Started</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-neutral-300 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="block px-4 py-2 text-base font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-lg transition-colors"
    >
      {children}
    </a>
  );
}

interface DropdownItem {
  icon: any;
  label: string;
  desc: string;
  href: string;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
  activeDropdown: string | null;
  setActiveDropdown: (dropdown: string | null) => void;
}

function DropdownMenu({ title, items, activeDropdown, setActiveDropdown }: DropdownMenuProps) {
  const isOpen = activeDropdown === title;

  return (
    <div
      className="relative"
      onMouseEnter={() => setActiveDropdown(title)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      {/* Trigger Button */}
      <button className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 mt-2 w-80 bg-neutral-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden"
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-blue-500/10 pointer-events-none" />

            {/* Menu Items */}
            <div className="relative p-2">
              {items.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex items-start space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-sky-500/20 to-blue-600/20 rounded-lg flex items-center justify-center group-hover:from-sky-500/30 group-hover:to-blue-600/30 transition-all">
                    <item.icon className="w-5 h-5 text-sky-400" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white group-hover:text-sky-400 transition-colors">
                      {item.label}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      {item.desc}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronDown className="w-4 h-4 text-neutral-400 -rotate-90" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Bottom Highlight */}
            <div className="h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
