'use client';

import { useState } from 'react';
import Navigation from '@/components/shared/Navigation';
import Hero from '@/components/sections/Hero';
import Tools from '@/components/sections/Tools';
import Features from '@/components/sections/Features';
import Conversion from '@/components/sections/Conversion';
import FileSelectionModal from '@/components/modals/FileSelectionModal';
import PremiumModal from '@/components/modals/PremiumModal';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'device' | 'drive' | 'dropbox' | 'onedrive' | 'url'>('device');
  const [isPremium, setIsPremium] = useState(true); // Simulated premium status - set to true for testing

  const handleOpenModal = (type: 'device' | 'drive' | 'dropbox' | 'onedrive' | 'url') => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleFileSelect = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // If there are already multiple files, add to them
    if (selectedFiles.length > 0 && isPremium) {
      setSelectedFiles([...selectedFiles, file]);
    } else if (selectedFile && isPremium) {
      // If there's already a single file, convert to array
      setSelectedFiles([selectedFile, file]);
      setSelectedFile(null);
    } else {
      // No existing files or not premium, just set single file
      setSelectedFile(file);
      setSelectedFiles([]);
    }

    // Smooth scroll to conversion section
    setTimeout(() => {
      document.getElementById('conversion')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleMultipleFiles = (files: File[]) => {
    console.log('handleMultipleFiles called with:', files.length, 'files');
    console.log('Current state - selectedFile:', selectedFile, 'selectedFiles:', selectedFiles.length);

    // Always clear single file when setting multiple files
    setSelectedFile(null);

    // If there's already files, append to them
    if (selectedFiles.length > 0) {
      const newFiles = [...selectedFiles, ...files];
      console.log('Appending to existing files, new total:', newFiles.length);
      setSelectedFiles(newFiles);
    } else if (selectedFile) {
      // If there's a single file, merge it with new files
      const newFiles = [selectedFile, ...files];
      console.log('Merging single file with new files, total:', newFiles.length);
      setSelectedFiles(newFiles);
    } else {
      // No existing files, just set the new ones
      console.log('Setting new files, total:', files.length);
      setSelectedFiles(files);
    }

    // Smooth scroll to conversion section
    setTimeout(() => {
      document.getElementById('conversion')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAddMoreFiles = (type: 'device' | 'drive' | 'dropbox' | 'onedrive' | 'url') => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    if (newFiles.length === 0) {
      setSelectedFile(null);
    }
  };

  const handlePremiumRequired = () => {
    setModalOpen(false);
    setPremiumModalOpen(true);
  };

  const handleSignup = () => {
    // Simulate upgrade to premium
    setIsPremium(true);
    setPremiumModalOpen(false);
    alert('Welcome to Premium! You can now convert multiple files at once.');
  };

  const handleCloseConversion = () => {
    setSelectedFile(null);
    setSelectedFiles([]);
  };

  const handleToolSelect = (from: string, to: string) => {
    // Open file selection modal when a tool is clicked
    console.log('Tool selected:', from, 'to', to);
    setModalType('device');
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero onSelectSource={handleOpenModal} />

      {(selectedFile || selectedFiles.length > 0) && (
        <Conversion
          selectedFile={selectedFile}
          selectedFiles={selectedFiles}
          onClose={handleCloseConversion}
          onAddMoreFiles={handleAddMoreFiles}
          onRemoveFile={handleRemoveFile}
        />
      )}

      <Tools onToolSelect={handleToolSelect} />

      <div className="bg-white">
        <Features />
      </div>

      <FileSelectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        onFileSelect={handleFileSelect}
        onMultipleFiles={handleMultipleFiles}
        onPremiumRequired={handlePremiumRequired}
        isPremium={isPremium}
      />

      <PremiumModal
        isOpen={premiumModalOpen}
        onClose={() => setPremiumModalOpen(false)}
        onSignup={handleSignup}
      />
    </main>
  );
}
