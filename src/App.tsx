/**
 * SightSeer AI — Main Application Entry Point
 * Offline-First, Explainable Mobile AI Screening & Clinical Triage System
 * for Early Diabetic Retinopathy (DR) Detection in Rural Primary Health Centers (PHCs)
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutProblemSolution } from './components/AboutProblemSolution';
import { TechnicalApproach } from './components/TechnicalApproach';
import { ScreeningSimulator } from './components/ScreeningSimulator';
import { FeaturesSection } from './components/FeaturesSection';
import { ImpactSimulator } from './components/ImpactSimulator';
import { ResearchBenchmarks } from './components/ResearchBenchmarks';
import { SecurityAuditLog } from './components/SecurityAuditLog';
import { CodeExplorerModal } from './components/CodeExplorerModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isOffline, setIsOffline] = useState<boolean>(true);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(3);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleToggleOffline = (newOfflineState: boolean) => {
    setIsOffline(newOfflineState);
    if (!newOfflineState) {
      triggerToast('FastAPI Delta-Gateway Connected: Synchronizing 3 encrypted records (< 120 KB)');
      setTimeout(() => {
        setPendingSyncCount(0);
        triggerToast('Delta Sync Complete: 3 Records Ingested into Central Tertiary Registry');
      }, 1800);
    } else {
      triggerToast('Offline Triage Mode Activated: Encrypting patient records to local SQLCipher AES-256 DB');
      setPendingSyncCount((prev) => prev + 1);
    }
  };

  const handleOpenAuditLog = () => {
    const elem = document.getElementById('audit-ledger');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-teal-100 selection:text-teal-900">
      {/* Dynamic Toast Notification for Network / Sync State */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 text-xs flex items-center gap-3 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white font-bold ml-auto"
          >
            ✕
          </button>
        </div>
      )}

      {/* Navigation Bar with Live Status and Offline Toggle */}
      <Navbar
        isOffline={isOffline}
        setIsOffline={handleToggleOffline}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onOpenAuditLog={handleOpenAuditLog}
        pendingSyncCount={pendingSyncCount}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenCodeModal={() => setIsCodeModalOpen(true)} />

        {/* The Rural Disparity & Mobile Kit Paradigm Shift */}
        <AboutProblemSolution />

        {/* 5-Tier Python Architecture & Interactive Workflow Stepper */}
        <TechnicalApproach />

        {/* Frontline ASHA Worker Screening Simulator */}
        <ScreeningSimulator onQueueSync={() => setPendingSyncCount((prev) => prev + 1)} />

        {/* Clinical Engineering Pillars & ABDM Certification Callout */}
        <FeaturesSection />

        {/* Public Health Impact & Interactive Economics Simulator */}
        <ImpactSimulator />

        {/* Research Benchmarks, Quantization Matrix & FHIR Schema */}
        <ResearchBenchmarks />

        {/* Zero-Trust Cryptographic Audit Ledger */}
        <SecurityAuditLog />
      </main>

      {/* Python Architecture Code Modal */}
      <CodeExplorerModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />

      {/* Clinical Footer */}
      <Footer
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onOpenAuditLog={handleOpenAuditLog}
      />
    </div>
  );
}
