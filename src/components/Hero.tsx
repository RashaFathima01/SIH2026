import React, { useState } from 'react';
import { 
  Sparkles, 
  Smartphone, 
  Cpu, 
  Eye, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Zap, 
  Scan, 
  Activity,
  Layers
} from 'lucide-react';

interface HeroProps {
  onOpenCodeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCodeModal }) => {
  const [activeHudMetric, setActiveHudMetric] = useState<string>('sharpness');
  const [showHeatmapScan, setShowHeatmapScan] = useState<boolean>(true);

  return (
    <section id="home" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-slate-200/80 bg-linear-to-b from-white via-slate-50 to-slate-50">
      {/* Subtle clinical backdrop grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition & Typography */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-5 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-teal-600 animate-pulse" />
              <span>Early Detection. Accessible Care.</span>
              <span className="text-teal-400 font-normal">|</span>
              <span className="text-teal-700 font-medium">CDSCO Class-B Ready</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] mb-5">
              Empowering ASHA workers with{' '}
              <span className="relative text-teal-600">
                Python-powered AI
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-teal-300 opacity-60" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>{' '}
              for diabetic eye screening.
            </h1>

            {/* Explanatory Body Copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-7 max-w-2xl">
              Transforming <span className="font-semibold text-slate-800">sub-₹10,000 smartphones</span> into clinical-grade retinal triage stations. Replacing bulky <span className="font-semibold text-slate-800">₹15–30 Lakh tabletop fundus cameras</span> with universal 3D-printed clip-on 20D indirect ophthalmoscopy optics and on-device INT8 deep learning—detecting Diabetic Retinopathy in under 400 milliseconds at the rural village gate.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <a
                href="#screening-demo"
                id="hero-launch-screening-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-xs hover:shadow-md transition-all group cursor-pointer"
              >
                <span>Launch Interactive Screening</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <button
                onClick={onOpenCodeModal}
                id="hero-explore-code-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-sm font-bold shadow-2xs transition-colors cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-teal-600" />
                <span>Inspect Python Stack</span>
              </button>
            </div>

            {/* 3 Pillar Cards (Sub-₹10,000 Kit, Python Edge AI, Grad-CAM XAI) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-teal-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-2.5">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm text-slate-900 mb-0.5">Sub-₹10,000 Kit</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Clip-on 20D condensing lens + 3D printed barrel. 150x cheaper than tabletop fundus cameras.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-teal-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-2.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm text-slate-900 mb-0.5">Python Edge AI</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  MobileNetV3 + A-FPN in 14.8 MB INT8 ONNX runtime. 380 ms latency with 0% cloud dependence.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-teal-300 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-2.5">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm text-slate-900 mb-0.5">Grad-CAM XAI</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Visual lesion attention maps showing microaneurysms and hemorrhages for clinician trust.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Retinal Scanner Visual with Laser & Telemetry HUD */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-lg">
              {/* Header inside device frame */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-slate-800">20D Fundus Optical Stream</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowHeatmapScan(!showHeatmapScan)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-colors cursor-pointer ${
                      showHeatmapScan
                        ? 'bg-teal-50 border-teal-300 text-teal-800'
                        : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                  >
                    {showHeatmapScan ? 'Grad-CAM: ON' : 'Grad-CAM: OFF'}
                  </button>
                  <span className="text-slate-400 font-mono text-[11px]">30 FPS</span>
                </div>
              </div>

              {/* Viewport with Retinal Fundus Anatomy + Laser Scanner */}
              <div className="relative mt-3.5 aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
                {/* SVG Fundus Graphic */}
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full select-none"
                  aria-label="Realistic human retinal fundus diagram"
                >
                  <defs>
                    {/* Retinal tissue gradient background */}
                    <radialGradient id="retinaGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#b93822" />
                      <stop offset="65%" stopColor="#8d2315" />
                      <stop offset="90%" stopColor="#551208" />
                      <stop offset="100%" stopColor="#220703" />
                    </radialGradient>

                    {/* Optic Disc Gradient */}
                    <radialGradient id="opticDiscGrad" cx="45%" cy="45%" r="55%">
                      <stop offset="0%" stopColor="#fff5cc" />
                      <stop offset="60%" stopColor="#f7d08a" />
                      <stop offset="100%" stopColor="#d88b35" />
                    </radialGradient>

                    {/* Macula gradient */}
                    <radialGradient id="maculaGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#3d0a04" />
                      <stop offset="40%" stopColor="#5a1409" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>

                    {/* Grad-CAM Attention Heatmap overlay */}
                    <radialGradient id="gradCamHotspot1" cx="62%" cy="42%" r="28%">
                      <stop offset="0%" stopColor="#ff0000" stopOpacity="0.85" />
                      <stop offset="35%" stopColor="#ff7700" stopOpacity="0.65" />
                      <stop offset="70%" stopColor="#ffee00" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00ffcc" stopOpacity="0" />
                    </radialGradient>

                    <radialGradient id="gradCamHotspot2" cx="38%" cy="58%" r="22%">
                      <stop offset="0%" stopColor="#ff0055" stopOpacity="0.75" />
                      <stop offset="45%" stopColor="#ffaa00" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>

                  {/* Base Retinal Globe */}
                  <circle cx="200" cy="200" r="190" fill="url(#retinaGrad)" />

                  {/* Choroidal texture overlay */}
                  <circle cx="200" cy="200" r="190" fill="#000" opacity="0.1" />

                  {/* Optic Disc (Nasal side ~ x:120, y:200) */}
                  <ellipse cx="125" cy="195" rx="36" ry="42" fill="url(#opticDiscGrad)" stroke="#eb9f45" strokeWidth="1.5" />
                  <ellipse cx="122" cy="195" rx="16" ry="20" fill="#fffae6" opacity="0.9" />

                  {/* Retinal Vasculature - Superior & Inferior Temporal Arcardes */}
                  {/* Superior Temporal Artery & Vein */}
                  <path
                    d="M 125 180 C 135 130, 180 90, 250 85 C 290 82, 330 110, 360 145"
                    fill="none"
                    stroke="#500705"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 125 180 C 140 135, 185 96, 250 90 C 290 87, 330 115, 360 150"
                    fill="none"
                    stroke="#a61c16"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Small arterioles branching to macula */}
                  <path d="M 210 98 C 220 120, 235 150, 245 170" fill="none" stroke="#901410" strokeWidth="1.5" />
                  <path d="M 260 92 C 265 115, 270 140, 268 175" fill="none" stroke="#901410" strokeWidth="1.5" />

                  {/* Inferior Temporal Arcade */}
                  <path
                    d="M 125 210 C 140 260, 185 305, 255 315 C 300 320, 340 290, 370 250"
                    fill="none"
                    stroke="#500705"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 125 210 C 145 255, 190 299, 255 310 C 300 315, 340 285, 370 245"
                    fill="none"
                    stroke="#ab1d16"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  <path d="M 215 295 C 225 270, 240 240, 248 225" fill="none" stroke="#901410" strokeWidth="1.5" />

                  {/* Nasal vessels */}
                  <path d="M 115 185 C 90 160, 60 150, 25 155" fill="none" stroke="#901410" strokeWidth="2.5" />
                  <path d="M 115 205 C 85 230, 55 240, 20 235" fill="none" stroke="#901410" strokeWidth="2.5" />

                  {/* Macula & Central Fovea (Temporal center ~ x:260, y:198) */}
                  <circle cx="258" cy="198" r="48" fill="url(#maculaGrad)" />
                  <circle cx="258" cy="198" r="7" fill="#2d0502" />
                  <circle cx="258" cy="198" r="1.5" fill="#fceade" opacity="0.8" />

                  {/* Grad-CAM Lesion Heatmap Overlay (Toggleable) */}
                  {showHeatmapScan && (
                    <g className="transition-opacity duration-300">
                      <rect x="0" y="0" width="400" height="400" fill="url(#gradCamHotspot1)" />
                      <rect x="0" y="0" width="400" height="400" fill="url(#gradCamHotspot2)" />
                    </g>
                  )}

                  {/* Concentric Clinical Crosshairs */}
                  <circle cx="200" cy="200" r="170" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 6" opacity="0.35" />
                  <circle cx="200" cy="200" r="110" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 4" opacity="0.3" />
                  <line x1="200" y1="15" x2="200" y2="385" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.25" />
                  <line x1="15" y1="200" x2="385" y2="200" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.25" />

                  {/* Clinical Target Reticle around Optic Disc & Macula */}
                  <rect x="95" y="165" width="60" height="60" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.7" />
                  <text x="100" y="160" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">OPTIC DISC</text>

                  <rect x="228" y="168" width="60" height="60" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.7" />
                  <text x="235" y="163" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">MACULA/FAZ</text>
                </svg>

                {/* Vertical Laser Scanner Animation Bar */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-full h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-[scanLaser_3.2s_ease-in-out_infinite]" />
                </div>

                {/* Floating Real-time Telemetry Pills */}
                <div className="absolute top-2 left-2 flex flex-col gap-1.5 pointer-events-none">
                  <div className="px-2 py-1 rounded bg-slate-900/80 backdrop-blur-xs border border-slate-700/60 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Laplacian: 156.4 (Pass &gt; 120)</span>
                  </div>
                  <div className="px-2 py-1 rounded bg-slate-900/80 backdrop-blur-xs border border-slate-700/60 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Hough FOV: 98.6%</span>
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 pointer-events-none">
                  <div className="px-2 py-1 rounded bg-slate-900/80 backdrop-blur-xs border border-slate-700/60 text-[10px] font-mono text-amber-300 flex items-center gap-1.5 shadow-xs">
                    <Activity className="w-3 h-3 text-amber-400" />
                    <span>ONNX INT8: 378 ms</span>
                  </div>
                </div>
              </div>

              {/* HUD Telemetry Selector Tabs underneath */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-center">
                <button
                  onClick={() => setActiveHudMetric('sharpness')}
                  className={`p-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    activeHudMetric === 'sharpness'
                      ? 'bg-teal-50 border-teal-300 text-teal-900'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-slate-400">OpenCV Sharpness</div>
                  <div className="text-xs font-extrabold text-teal-700">156.4 Var</div>
                </button>

                <button
                  onClick={() => setActiveHudMetric('fov')}
                  className={`p-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    activeHudMetric === 'fov'
                      ? 'bg-teal-50 border-teal-300 text-teal-900'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-slate-400">Hough Centering</div>
                  <div className="text-xs font-extrabold text-teal-700">98.6% Area</div>
                </button>

                <button
                  onClick={() => setActiveHudMetric('glare')}
                  className={`p-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    activeHudMetric === 'glare'
                      ? 'bg-teal-50 border-teal-300 text-teal-900'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold text-slate-400">Specular Glare</div>
                  <div className="text-xs font-extrabold text-teal-700">1.1% Pixels</div>
                </button>
              </div>

              <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-200/60 flex items-center justify-between">
                <span>Clinical Quality Gate:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> All 3 Gatekeeper Tests Passed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Benchmarks Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">0.968</span>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 mt-1">AUC-ROC Metric</span>
              <span className="text-xs text-slate-500 mt-0.5">Validated on Messidor-2 & EyePACS</span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">98.2%</span>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 mt-1">Clinical Sensitivity</span>
              <span className="text-xs text-slate-500 mt-0.5">Referable DR (Stages 2, 3, 4)</span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">&lt; 120 KB</span>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 mt-1">Sync Size</span>
              <span className="text-xs text-slate-500 mt-0.5">Encrypted Delta JSON + Vector Latents</span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">₹0 / Free</span>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 mt-1">Patient Travel Cost</span>
              <span className="text-xs text-slate-500 mt-0.5">Screened at primary village gate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
