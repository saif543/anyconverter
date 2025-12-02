'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Link as LinkIcon, Crown, AlertCircle } from 'lucide-react';

interface FileSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'device' | 'drive' | 'dropbox' | 'onedrive' | 'url';
  onFileSelect: (file: File | null) => void;
  onMultipleFiles?: (files: File[]) => void;
  onPremiumRequired?: () => void;
  isPremium?: boolean;
}

export default function FileSelectionModal({ isOpen, onClose, type, onFileSelect, onMultipleFiles, onPremiumRequired, isPremium = false }: FileSelectionModalProps) {
  const [url, setUrl] = useState('');
  const [showMultipleWarning, setShowMultipleWarning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      if (filesArray.length > 1 && !isPremium) {
        // Show premium requirement
        setShowMultipleWarning(true);
        if (onPremiumRequired) {
          onPremiumRequired();
        }
        return;
      }

      if (filesArray.length === 1) {
        onFileSelect(filesArray[0]);
        onClose();
      } else if (filesArray.length > 1 && isPremium && onMultipleFiles) {
        onMultipleFiles(filesArray);
        onClose();
      }
    }
  };

  const handleURLSubmit = () => {
    if (url.trim()) {
      // Create a mock file for URL (in real app, fetch the file)
      const mockFile = new File([''], url.split('/').pop() || 'file', { type: 'application/octet-stream' });
      onFileSelect(mockFile);
      onClose();
      setUrl('');
    }
  };

  const getModalContent = () => {
    switch (type) {
      case 'device':
        return (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-violet-400/30">
              <Upload className="w-10 h-10 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Choose File from Device</h3>
            <p className="text-neutral-400 mb-4">Select files from your computer to convert</p>

            {/* Premium Feature Badge */}
            {!isPremium && (
              <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                <div className="flex items-center justify-center gap-2 text-yellow-400 text-sm">
                  <Crown className="w-4 h-4" />
                  <span className="font-semibold">Multiple files requires Premium</span>
                </div>
              </div>
            )}

            {showMultipleWarning && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Multiple file upload is a premium feature. Upgrade to convert up to 20 files at once!</span>
              </motion.div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              multiple={isPremium}
              onChange={handleFileChange}
              className="hidden"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 text-white hover:shadow-lg hover:shadow-violet-500/50 transition-all"
            >
              {isPremium ? 'Browse Files (Multiple)' : 'Browse File'}
            </motion.button>
          </div>
        );

      case 'url':
        return (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-violet-400/30">
              <LinkIcon className="w-10 h-10 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Import from URL</h3>
            <p className="text-neutral-400 mb-8">Paste the URL of the file you want to convert</p>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/file.pdf"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:border-violet-400/50 focus:outline-none mb-4"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleURLSubmit}
              disabled={!url.trim()}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                url.trim()
                  ? 'bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 text-white hover:shadow-lg hover:shadow-violet-500/50'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              Import File
            </motion.button>
          </div>
        );

      case 'drive':
      case 'dropbox':
      case 'onedrive':
        const serviceName = type.charAt(0).toUpperCase() + type.slice(1);
        return (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-violet-400/30">
              <Upload className="w-10 h-10 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Connect to {serviceName}</h3>
            <p className="text-neutral-400 mb-8">Sign in to access your {serviceName} files</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                // Mock file selection for cloud services
                const mockFile = new File([''], `file-from-${type}.pdf`, { type: 'application/pdf' });
                onFileSelect(mockFile);
                onClose();
              }}
              className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 text-white hover:shadow-lg hover:shadow-violet-500/50 transition-all"
            >
              Connect to {serviceName}
            </motion.button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 rounded-3xl opacity-50"></div>

              <div className="relative bg-neutral-900 backdrop-blur-xl rounded-3xl p-8">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>

                {getModalContent()}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
