import React, { useState } from 'react';
import { Eye, ShieldCheck, Wifi, WifiOff, Code2, Play, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  onOpenCodeModal: () => void;
  onOpenAuditLog: () => void;
  pendingSyncCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  isOffline,
  setIsOffline,
  onOpenCodeModal,
  onOpenAuditLog,
  pendingSyncCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Technical Approach', href: '#technical-approach' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Features', href: '#features' },
    { label: 'Screening Demo', href: '#screening-demo' },
    { label: 'Impact', href: '#impact' },
    { label: 'Research', href: '#research' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo & Clinical Badge */}
          <div className="flex items-center gap-3">
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-teal-600 text-white shadow-xs group-hover:bg-teal-700 transition-colors">
                <Eye className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-slate-900 tracking-tight">SightSeer</span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 uppercase tracking-wider">AI</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest -mt-0.5">Mobile DR Triage</span>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l border-slate-200">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                ICDR & ABDM Compliant
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-teal-700 hover:bg-slate-100/80 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions & Offline Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Interactive Offline Simulation Toggle */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              id="offline-sync-toggle"
              title="Toggle simulated network state"
              className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                isOffline
                  ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                  : 'bg-teal-50 text-teal-900 border-teal-300 hover:bg-teal-100'
              }`}
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                  <span className="hidden sm:inline font-semibold">Offline Triage Active</span>
                  <span className="sm:hidden font-semibold">Offline</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold">
                    {pendingSyncCount} queued
                  </span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-teal-700" />
                  <span className="hidden sm:inline font-semibold">FastAPI Delta Syncing</span>
                  <span className="sm:hidden font-semibold">Online</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-teal-200 text-teal-900 text-[10px] font-bold">
                    84 KB
                  </span>
                </>
              )}
            </button>

            {/* Quick Action: Architecture Code Explorer */}
            <button
              onClick={onOpenCodeModal}
              id="open-code-explorer-btn"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Python Stack</span>
            </button>

            {/* Primary Action: Launch Screening Simulator */}
            <a
              href="#screening-demo"
              id="nav-launch-demo-btn"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Live Triage Demo</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="p-2 text-slate-600 hover:text-slate-900 xl:hidden rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-teal-700 hover:bg-slate-50 rounded-md"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCodeModal();
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-xs font-bold text-slate-700 bg-slate-50 rounded-md"
            >
              <span className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-teal-600" />
                View Python Architecture Code
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuditLog();
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-xs font-bold text-slate-700 bg-slate-50 rounded-md"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                Security & Audit Ledger
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
