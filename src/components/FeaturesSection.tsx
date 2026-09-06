import React from 'react';
import { 
  Eye, 
  WifiOff, 
  Volume2, 
  ShieldCheck, 
  Cpu, 
  CheckCircle, 
  Sparkles, 
  FileCheck2, 
  Smartphone,
  Lock,
  ArrowRight
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Clinical Engineering Pillars</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineered for low-resource rural Primary Health Centres.
          </h2>
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            SightSeer AI addresses extreme edge constraints: intermittent rural power, zero cellular bandwidth, diverse Indian languages, and stringent patient privacy standards.
          </p>
        </div>

        {/* 3 Core Pillars Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Pillar 1: Lightweight Explainable AI (XAI) */}
          <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs hover:border-teal-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-teal-700 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Lightweight Explainable AI</h3>
              <p className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider mb-3">
                Grad-CAM Activation Maps
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Unlike opaque 'black-box' deep learning models, SightSeer provides verifiable optical explanations. Class Activation Maps highlight exact spatial coordinates of microaneurysms, hemorrhages, and exudates.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Clinician verification before referral dispatch</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>0% cloud latency for explainability computation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Interactive opacity slider for field examination</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-mono text-slate-500">
              Backbone: MobileNetV3 + A-FPN Fused Layer
            </div>
          </div>

          {/* Pillar 2: Accessibility-First Field Design */}
          <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs hover:border-teal-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-100/70 text-cyan-800 flex items-center justify-center mb-5">
                <Volume2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Accessibility-First Design</h3>
              <p className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-wider mb-3">
                11-Language Native Speech &amp; High Contrast
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Designed specifically for frontline ASHA and ANM healthcare workers operating in harsh outdoor lighting and diverse linguistic regions across rural India.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-700 shrink-0" />
                  <span>Natural speech audio prompts in 11 Indian languages</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-700 shrink-0" />
                  <span>High-contrast touch targets for direct sunlight viewing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-700 shrink-0" />
                  <span>Auditory patient feedback eliminates literacy barriers</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-mono text-slate-500">
              Languages: HI, BN, TE, MR, TA, GU, UR, KN, OR, PA, EN
            </div>
          </div>

          {/* Pillar 3: Offline-First Zero-Trust Architecture */}
          <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs hover:border-teal-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100/70 text-indigo-700 flex items-center justify-center mb-5">
                <WifiOff className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Offline-First Architecture</h3>
              <p className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider mb-3">
                SQLCipher AES-256 &amp; Delta-Sync
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Zero internet required during village screening camps. Screenings are stored in local encrypted databases and seamlessly synced via lightweight payloads when cellular connectivity is reached.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>On-device INT8 neural execution (380 ms)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>&lt; 120 KB batched delta payload over 2G/EDGE</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>AES-256-GCM encrypted biometric and vector storage</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-mono text-slate-500">
              Bandwidth: 99.2% reduction vs raw fundus upload
            </div>
          </div>
        </div>

        {/* ABDM Standards Compliance Callout Box */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-teal-100 text-teal-800 text-xs font-bold mb-2">
                <FileCheck2 className="w-3.5 h-3.5 text-teal-700" />
                <span>Ayushman Bharat Digital Mission (ABDM) Integration</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Full Milestone M1, M2 &amp; M3 Certification Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Directly integrates into India&apos;s National Health Stack. Automatically creates and links ABHA addresses, issues standard FHIR R4 DiagnosticReports, and facilitates longitudinal EMR access.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                <div className="text-xs font-bold text-teal-700 uppercase font-mono">Milestone M1</div>
                <div className="font-extrabold text-sm text-slate-900 mt-0.5">ABHA Creation</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Aadhaar / OTP Verify</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                <div className="text-xs font-bold text-teal-700 uppercase font-mono">Milestone M2</div>
                <div className="font-extrabold text-sm text-slate-900 mt-0.5">HIP Health Provider</div>
                <div className="text-[11px] text-slate-500 mt-0.5">FHIR R4 DiagnosticReport</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                <div className="text-xs font-bold text-teal-700 uppercase font-mono">Milestone M3</div>
                <div className="font-extrabold text-sm text-slate-900 mt-0.5">HIU Health User</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Longitudinal Tele-Review</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
