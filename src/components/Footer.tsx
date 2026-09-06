import React from 'react';
import { Eye, ArrowUp, ShieldCheck, Heart, Github, FileText, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenCodeModal: () => void;
  onOpenAuditLog: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCodeModal, onOpenAuditLog }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-teal-600 text-white font-bold">
                <Eye className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-white tracking-tight">SightSeer</span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-400">AI</span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider -mt-0.5 font-semibold">
                  Offline-First Mobile DR Triage
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Empowering frontline community health workers with explainable edge AI for early Diabetic Retinopathy detection across rural Primary Health Centres (PHCs).
            </p>

            <div className="flex items-center gap-2 text-[11px] text-teal-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-teal-500" />
              <span>ABDM-M2 &amp; ICDR Compliant Clinical Standard</span>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Application Modules
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home &amp; Overview</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">Rural Disparity &amp; Solution</a>
              </li>
              <li>
                <a href="#technical-approach" className="hover:text-white transition-colors">5-Tier Architecture</a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-white transition-colors">Diagnostic Pipeline</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">Clinical Features</a>
              </li>
            </ul>
          </div>

          {/* Clinical & Triage Tools */}
          <div>
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Frontline Field Tools
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#screening-demo" className="hover:text-white transition-colors">ASHA Screening Simulator</a>
              </li>
              <li>
                <a href="#impact" className="hover:text-white transition-colors">Health Economics Simulator</a>
              </li>
              <li>
                <a href="#research" className="hover:text-white transition-colors">Quantization Benchmark Table</a>
              </li>
              <li>
                <button onClick={onOpenAuditLog} className="hover:text-white transition-colors text-left cursor-pointer">
                  Security &amp; Audit Log
                </button>
              </li>
              <li>
                <button onClick={onOpenCodeModal} className="hover:text-white transition-colors text-left cursor-pointer">
                  Architecture Python Code
                </button>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Core Tech Stack
            </div>
            <ul className="space-y-1.5 font-mono text-[11px] text-slate-400">
              <li>• PyTorch 2.3+ (A-FPN)</li>
              <li>• OpenCV 4.10 Gatekeeper</li>
              <li>• ONNX Runtime INT8 Mobile</li>
              <li>• FastAPI 3.11 Delta Gateway</li>
              <li>• SQLite + SQLCipher AES-256</li>
              <li>• HL7 FHIR R4 Schema</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-xs">
            SightSeer AI — Early Detection. Accessible Care. Built for rural community health workers.
          </div>

          <button
            onClick={scrollToTop}
            id="back-to-top-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-xs font-semibold cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
