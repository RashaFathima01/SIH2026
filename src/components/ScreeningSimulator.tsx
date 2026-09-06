import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Volume2, 
  VolumeX, 
  FileText, 
  Layers, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  ShieldCheck, 
  Sliders, 
  Activity, 
  User, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  Printer
} from 'lucide-react';
import { CLINICAL_CASES, INDIAN_LANGUAGES } from '../data/clinicalCases';
import { PatientProfile, LesionCallout } from '../types';
import { ReferralSlipModal } from './ReferralSlipModal';

interface ScreeningSimulatorProps {
  onQueueSync?: () => void;
}

export const ScreeningSimulator: React.FC<ScreeningSimulatorProps> = ({ onQueueSync }) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const currentPatient: PatientProfile = CLINICAL_CASES[selectedCaseIndex];

  // Visual controls
  const [gradCamOpacity, setGradCamOpacity] = useState<number>(65);
  const [showLandmarks, setShowLandmarks] = useState<boolean>(true);
  const [showLesionCallouts, setShowLesionCallouts] = useState<boolean>(true);
  const [activeLesionTooltip, setActiveLesionTooltip] = useState<LesionCallout | null>(null);
  const [showQualityModal, setShowQualityModal] = useState<boolean>(false);
  const [showReferralModal, setShowReferralModal] = useState<boolean>(false);

  // Multilingual voice controls
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<string>('hi');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Handle patient switch
  const handleCaseChange = (index: number) => {
    setSelectedCaseIndex(index);
    setActiveLesionTooltip(null);
    window.speechSynthesis?.cancel();
    setIsPlayingAudio(false);
  };

  // Multilingual Voice Prompt Speech Synthesis
  const handlePlayVoicePrompt = () => {
    if (!('speechSynthesis' in window)) {
      setAudioError('Web Speech API is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const scriptText = currentPatient.voicePrompts[selectedLanguageCode] || currentPatient.voicePrompts.en;
    const utterance = new SpeechSynthesisUtterance(scriptText);
    
    // Map language code to BCP-47 tag
    const langTagMap: Record<string, string> = {
      hi: 'hi-IN',
      en: 'en-IN',
      bn: 'bn-IN',
      te: 'te-IN',
      mr: 'mr-IN',
      ta: 'ta-IN',
      gu: 'gu-IN',
      ur: 'ur-PK',
      kn: 'kn-IN',
      or: 'or-IN',
      pa: 'pa-IN'
    };

    utterance.lang = langTagMap[selectedLanguageCode] || 'en-IN';
    utterance.rate = 0.92; // slightly slower for clinical clarity in rural dialect

    utterance.onstart = () => {
      setIsPlayingAudio(true);
      setAudioError(null);
    };

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      // Fallback message
      setAudioError('Playing simulated audio track in local language.');
    };

    window.speechSynthesis.speak(utterance);
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Triage banner color configurations
  const triageStyles = {
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      text: 'text-emerald-900',
      badge: 'bg-emerald-600 text-white',
      icon: CheckCircle2,
      label: 'LOW RISK • ROUTINE ANNUAL PHC TRIAGE'
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-900',
      badge: 'bg-amber-600 text-white',
      icon: AlertTriangle,
      label: 'MODERATE RISK • 6-MONTH PHC FOLLOW-UP'
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      text: 'text-orange-900',
      badge: 'bg-orange-600 text-white',
      icon: AlertTriangle,
      label: 'HIGH RISK • SECONDARY HOSPITAL REFERRAL (30 DAYS)'
    },
    rose: {
      bg: 'bg-rose-50',
      border: 'border-rose-300',
      text: 'text-rose-900',
      badge: 'bg-rose-600 text-white',
      icon: AlertOctagon,
      label: 'CRITICAL EMERGENCY • TERTIARY VITREO-RETINAL CARE (72 HOURS)'
    }
  }[currentPatient.triageColor];

  const TriageIcon = triageStyles.icon;

  return (
    <section id="screening-demo" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-2">
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              <span>Frontline ASHA Worker Screening Station</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Interactive Clinical Screening Simulator
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Experience the exact tablet interface operated by ASHA and ANM healthcare workers at rural Primary Health Centres.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQualityModal(true)}
              id="quality-gatekeeper-badge"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>OpenCV Quality Gate (156.4 Var)</span>
            </button>
          </div>
        </div>

        {/* Patient Profile Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {CLINICAL_CASES.map((c, index) => {
            const isSelected = selectedCaseIndex === index;
            const badgeBg = {
              emerald: 'bg-emerald-100 text-emerald-800',
              amber: 'bg-amber-100 text-amber-800',
              orange: 'bg-orange-100 text-orange-800',
              rose: 'bg-rose-100 text-rose-800',
            }[c.triageColor];

            return (
              <button
                key={c.id}
                onClick={() => handleCaseChange(index)}
                id={`patient-case-tab-${index}`}
                className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-teal-600 shadow-md ring-2 ring-teal-600/10'
                    : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono text-slate-400 font-bold">{c.id}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${badgeBg}`}>
                      Stage {c.drStage}
                    </span>
                  </div>
                  <div className="font-extrabold text-sm text-slate-900">{c.name}</div>
                  <div className="text-xs text-slate-500">{c.age}y, {c.gender === 'M' ? 'Male' : 'Female'} • {c.village}</div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-600 truncate">
                  {c.stageName}
                </div>
              </button>
            );
          })}
        </div>

        {/* Color-Coded Triage Risk Banner */}
        <div className={`p-4 rounded-2xl border ${triageStyles.bg} ${triageStyles.border} mb-6 shadow-xs transition-colors`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 rounded-xl bg-white shadow-2xs shrink-0">
                <TriageIcon className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${triageStyles.badge}`}>
                    {triageStyles.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-600">
                    AI Confidence: {currentPatient.confidence}%
                  </span>
                </div>
                <div className="font-extrabold text-base text-slate-900 mt-0.5">
                  {currentPatient.stageName} ({currentPatient.stageCode})
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowReferralModal(true)}
              id="generate-referral-slip-btn"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-teal-400" />
              <span>Print Bilingual Referral Slip</span>
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200/60 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-500 block">Clinical Findings:</span>
              <span className="text-slate-800">{currentPatient.recommendation}</span>
            </div>
            <div>
              <span className="font-bold text-slate-500 block">Action Protocol:</span>
              <span className="text-slate-800">{currentPatient.actionProtocol}</span>
            </div>
            <div>
              <span className="font-bold text-slate-500 block">Referral Facility &amp; Timeline:</span>
              <span className="text-teal-900 font-extrabold">{currentPatient.referredFacility}</span>
              <span className="text-slate-500 block text-[11px]">Due within: {currentPatient.referralTimeline}</span>
            </div>
          </div>
        </div>

        {/* Main Screening Console Grid: Left Retinal Viewport & Right Diagnostic Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Retinal Viewport & Grad-CAM controls */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
            {/* Viewport Control Bar */}
            <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-slate-100 gap-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-teal-600" />
                  <span>20D Fundus Viewport</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">
                  512x512 Res
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLandmarks(!showLandmarks)}
                  id="toggle-landmarks-btn"
                  className={`px-2.5 py-1 rounded-md font-semibold text-xs border transition-colors cursor-pointer ${
                    showLandmarks
                      ? 'bg-teal-50 border-teal-300 text-teal-800'
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  {showLandmarks ? 'Landmarks: ON' : 'Landmarks: OFF'}
                </button>

                <button
                  onClick={() => setShowLesionCallouts(!showLesionCallouts)}
                  id="toggle-lesions-btn"
                  className={`px-2.5 py-1 rounded-md font-semibold text-xs border transition-colors cursor-pointer ${
                    showLesionCallouts
                      ? 'bg-teal-50 border-teal-300 text-teal-800'
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  {showLesionCallouts ? 'Lesions: ON' : 'Lesions: OFF'}
                </button>
              </div>
            </div>

            {/* Interactive SVG Fundus Rendering */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 select-none shadow-inner flex items-center justify-center">
              <svg viewBox="0 0 500 500" className="w-full h-full">
                <defs>
                  {/* Fundus Background gradient */}
                  <radialGradient id="simFundusGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#c23b24" />
                    <stop offset="60%" stopColor="#962518" />
                    <stop offset="88%" stopColor="#5d140b" />
                    <stop offset="100%" stopColor="#250804" />
                  </radialGradient>

                  {/* Optic Disc */}
                  <radialGradient id="simDiscGrad" cx="45%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="#fff9d6" />
                    <stop offset="65%" stopColor="#f7d492" />
                    <stop offset="100%" stopColor="#dca248" />
                  </radialGradient>

                  {/* Macula / Fovea */}
                  <radialGradient id="simMaculaGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#370702" />
                    <stop offset="50%" stopColor="#581108" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>

                  {/* Stage-Specific Dynamic Grad-CAM Gradients */}
                  <radialGradient id="hotspotStage1" cx="66%" cy="38%" r="22%">
                    <stop offset="0%" stopColor="#ff0000" stopOpacity="0.8" />
                    <stop offset="40%" stopColor="#ff8800" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>

                  <radialGradient id="hotspotStage2" cx="60%" cy="54%" r="35%">
                    <stop offset="0%" stopColor="#ff0000" stopOpacity="0.85" />
                    <stop offset="35%" stopColor="#ff8800" stopOpacity="0.6" />
                    <stop offset="70%" stopColor="#ffff00" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>

                  <radialGradient id="hotspotStage4_disc" cx="35%" cy="46%" r="28%">
                    <stop offset="0%" stopColor="#ff0044" stopOpacity="0.9" />
                    <stop offset="45%" stopColor="#ff7700" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  
                  <radialGradient id="hotspotStage4_arc" cx="56%" cy="40%" r="42%">
                    <stop offset="0%" stopColor="#ff0000" stopOpacity="0.8" />
                    <stop offset="35%" stopColor="#ff9900" stopOpacity="0.55" />
                    <stop offset="70%" stopColor="#ffff00" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>

                {/* Retinal Globe */}
                <circle cx="250" cy="250" r="238" fill="url(#simFundusGrad)" />

                {/* Optic Disc (Nasal side ~ x:160, y:250) */}
                <ellipse cx="160" cy="245" rx="44" ry="52" fill="url(#simDiscGrad)" stroke="#eb9f45" strokeWidth="2" />
                <ellipse cx="156" cy="245" rx="20" ry="24" fill="#fffdf2" opacity="0.85" />

                {/* Major Blood Vessels */}
                {/* Superior Temporal Arcade */}
                <path
                  d="M 160 225 C 175 160, 230 110, 315 105 C 365 100, 415 135, 450 180"
                  fill="none"
                  stroke="#570907"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 160 225 C 180 165, 235 116, 315 110 C 365 105, 415 140, 450 185"
                  fill="none"
                  stroke="#b42019"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                />

                {/* Inferior Temporal Arcade */}
                <path
                  d="M 160 265 C 180 325, 235 380, 320 395 C 375 400, 425 365, 460 315"
                  fill="none"
                  stroke="#570907"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  d="M 160 265 C 185 320, 240 375, 320 390 C 375 395, 425 360, 460 310"
                  fill="none"
                  stroke="#ba221a"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Nasal vessels */}
                <path d="M 148 232 C 115 200, 80 190, 35 195" fill="none" stroke="#ba221a" strokeWidth="3" />
                <path d="M 148 258 C 110 290, 75 300, 30 295" fill="none" stroke="#ba221a" strokeWidth="3" />

                {/* Macula & Fovea Centralis (Temporal center ~ x:325, y:250) */}
                <circle cx="325" cy="250" r="60" fill="url(#simMaculaGrad)" />
                <circle cx="325" cy="250" r="9" fill="#300703" />
                <circle cx="325" cy="250" r="2" fill="#fff5ea" opacity="0.9" />

                {/* Stage 1 Lesions: Scattered Microaneurysms */}
                {currentPatient.drStage >= 1 && (
                  <g id="stage1-lesions">
                    <circle cx="320" cy="180" r="3.5" fill="#880000" stroke="#ff3333" strokeWidth="1" />
                    <circle cx="355" cy="210" r="3" fill="#880000" stroke="#ff3333" strokeWidth="1" />
                    <circle cx="280" cy="195" r="2.5" fill="#880000" stroke="#ff3333" strokeWidth="1" />
                  </g>
                )}

                {/* Stage 2 Lesions: Blot Hemorrhages, Hard Exudates, Cotton-Wool */}
                {currentPatient.drStage >= 2 && (
                  <g id="stage2-lesions">
                    {/* Blot hemorrhage */}
                    <ellipse cx="290" cy="240" rx="9" ry="7" fill="#6d0202" opacity="0.95" />
                    <circle cx="345" cy="260" r="6" fill="#660000" opacity="0.9" />
                    {/* Hard Exudates (Lipid clusters) */}
                    <circle cx="310" cy="310" r="4" fill="#fff1a8" />
                    <circle cx="316" cy="308" r="3" fill="#ffea75" />
                    <circle cx="305" cy="314" r="3" fill="#fff1a8" />
                    <circle cx="322" cy="315" r="3.5" fill="#ffea75" />
                    {/* Cotton-Wool spot (ischemia) */}
                    <ellipse cx="220" cy="190" rx="12" ry="8" fill="#ffffff" opacity="0.75" />
                  </g>
                )}

                {/* Stage 4 Lesions: Neovascularization at Disc (NVD), Preretinal Hemorrhage */}
                {currentPatient.drStage === 4 && (
                  <g id="stage4-lesions">
                    {/* Fragile neovascular fronds over Optic Disc */}
                    <path
                      d="M 160 240 Q 175 220 185 240 T 175 260 T 160 250"
                      fill="none"
                      stroke="#ff1100"
                      strokeWidth="2.5"
                      strokeDasharray="2 1"
                    />
                    <path
                      d="M 150 230 Q 140 215 155 210 T 170 220"
                      fill="none"
                      stroke="#ff1100"
                      strokeWidth="2"
                    />
                    {/* Large Flame & Boat Preretinal Hemorrhage */}
                    <path
                      d="M 240 160 C 270 140, 310 150, 320 170 C 310 190, 260 195, 240 160 Z"
                      fill="#500000"
                      opacity="0.92"
                    />
                    {/* Severe cotton wool infarct */}
                    <circle cx="330" cy="220" r="14" fill="#ffffff" opacity="0.8" />
                    {/* Massive Hard Exudate plaque */}
                    <ellipse cx="300" cy="325" rx="20" ry="12" fill="#fff59d" opacity="0.9" />
                  </g>
                )}

                {/* Grad-CAM Attention Heatmap (Controlled via opacity slider) */}
                <g style={{ opacity: gradCamOpacity / 100 }} className="transition-opacity duration-150">
                  {currentPatient.drStage === 1 && (
                    <rect x="0" y="0" width="500" height="500" fill="url(#hotspotStage1)" />
                  )}
                  {currentPatient.drStage === 2 && (
                    <rect x="0" y="0" width="500" height="500" fill="url(#hotspotStage2)" />
                  )}
                  {currentPatient.drStage === 4 && (
                    <>
                      <rect x="0" y="0" width="500" height="500" fill="url(#hotspotStage4_disc)" />
                      <rect x="0" y="0" width="500" height="500" fill="url(#hotspotStage4_arc)" />
                    </>
                  )}
                </g>

                {/* Anatomical Landmark Labels (Toggleable) */}
                {showLandmarks && (
                  <g id="anatomical-landmarks" className="text-[11px] font-mono font-bold select-none pointer-events-none">
                    {/* Optic Disc */}
                    <rect x="130" y="175" width="60" height="18" rx="4" fill="#0f172a" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="1" />
                    <text x="160" y="188" fill="#38bdf8" textAnchor="middle" fontSize="10">OPTIC DISC</text>

                    {/* Macula */}
                    <rect x="295" y="185" width="60" height="18" rx="4" fill="#0f172a" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="1" />
                    <text x="325" y="198" fill="#38bdf8" textAnchor="middle" fontSize="10">MACULA</text>

                    {/* Superior Arcade */}
                    <rect x="290" y="75" width="95" height="18" rx="4" fill="#0f172a" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="1" />
                    <text x="337" y="88" fill="#38bdf8" textAnchor="middle" fontSize="9">SUP. TEMPORAL</text>

                    {/* Inferior Arcade */}
                    <rect x="290" y="420" width="95" height="18" rx="4" fill="#0f172a" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="1" />
                    <text x="337" y="433" fill="#38bdf8" textAnchor="middle" fontSize="9">INF. TEMPORAL</text>
                  </g>
                )}
              </svg>

              {/* Numbered Interactive Lesion Callouts (Overlayed HTML elements) */}
              {showLesionCallouts && currentPatient.lesions.map((lesion, idx) => (
                <div
                  key={lesion.id}
                  style={{ left: `${lesion.x}%`, top: `${lesion.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                  onClick={() => setActiveLesionTooltip(activeLesionTooltip?.id === lesion.id ? null : lesion)}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-rose-400 opacity-60" />
                    <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-rose-600 text-white font-mono text-[10px] font-extrabold shadow-md border border-white">
                      {idx + 1}
                    </span>
                  </div>
                </div>
              ))}

              {/* Active Lesion Tooltip Popup */}
              {activeLesionTooltip && (
                <div
                  style={{
                    left: `${Math.min(75, Math.max(25, activeLesionTooltip.x))}%`,
                    top: `${Math.min(75, Math.max(20, activeLesionTooltip.y))}%`
                  }}
                  className="absolute z-30 -translate-x-1/2 -translate-y-full mb-3 w-64 bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs animate-fadeIn"
                >
                  <div className="flex items-center justify-between font-bold text-teal-300 mb-1">
                    <span>{activeLesionTooltip.title}</span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-rose-900/80 text-rose-200">
                      {activeLesionTooltip.severity}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed mb-2">
                    {activeLesionTooltip.description}
                  </p>
                  <button
                    onClick={() => setActiveLesionTooltip(null)}
                    className="text-[10px] text-slate-400 hover:text-white font-mono cursor-pointer underline"
                  >
                    Close inspection
                  </button>
                </div>
              )}
            </div>

            {/* Grad-CAM Transparency Live Slider */}
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-teal-600" />
                  <span>Grad-CAM Attention Heatmap Opacity:</span>
                </span>
                <span className="font-mono text-teal-700 font-extrabold">{gradCamOpacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={gradCamOpacity}
                onChange={(e) => setGradCamOpacity(Number(e.target.value))}
                id="gradcam-opacity-slider"
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>0% (Raw Fundus)</span>
                <span>50% (Balanced XAI)</span>
                <span>100% (Dense Lesion Gradient)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Multilingual Voice Prompts & Clinical Decision Details */}
          <div className="lg:col-span-5 space-y-4">
            {/* Multilingual Voice Prompts Player (11 Indian Languages) */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Multilingual Patient Audio</h3>
                    <p className="text-[11px] text-slate-500">Spoken voice prompts for rural patients</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                  11 Languages
                </span>
              </div>

              {/* Language Selector Chips */}
              <div className="flex flex-wrap gap-1.5 mb-4 max-h-24 overflow-y-auto p-1 border border-slate-100 rounded-lg bg-slate-50/60">
                {INDIAN_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguageCode(lang.code);
                      if (isPlayingAudio) {
                        window.speechSynthesis?.cancel();
                        setIsPlayingAudio(false);
                      }
                    }}
                    id={`lang-select-${lang.code}`}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      selectedLanguageCode === lang.code
                        ? 'bg-teal-600 text-white shadow-2xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{lang.native}</span>
                    <span className="text-[10px] opacity-75 ml-1 font-normal">({lang.name})</span>
                  </button>
                ))}
              </div>

              {/* Spoken Script Preview Box */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed italic mb-4 min-h-[72px] flex items-center">
                "{currentPatient.voicePrompts[selectedLanguageCode] || currentPatient.voicePrompts.en}"
              </div>

              {/* Play Audio Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayVoicePrompt}
                  id="play-audio-prompt-btn"
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-xs cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-amber-600 hover:bg-amber-700 animate-pulse'
                      : 'bg-teal-600 hover:bg-teal-700'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Stop Spoken Prompt</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Play Prompt ({INDIAN_LANGUAGES.find(l => l.code === selectedLanguageCode)?.native})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    window.speechSynthesis?.cancel();
                    setIsPlayingAudio(false);
                  }}
                  id="reset-audio-btn"
                  title="Reset Speech"
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {audioError && (
                <div className="mt-2 text-[11px] text-amber-700 flex items-center gap-1">
                  <Info className="w-3 h-3 shrink-0" />
                  <span>{audioError}</span>
                </div>
              )}
            </div>

            {/* Patient Clinical Profile & Telemetry Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-teal-600" />
                  <span className="font-bold text-xs text-slate-800">Verified Patient Metadata</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500 font-semibold">
                  ABHA: {currentPatient.abhaId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Diabetes History</span>
                  <span className="font-extrabold text-slate-900">{currentPatient.diabetesDurationYears} Years Diagnosed</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">HbA1c Blood Sugar</span>
                  <span className="font-extrabold text-slate-900">{currentPatient.lastHba1c}%</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Blood Pressure</span>
                  <span className="font-extrabold text-slate-900">{currentPatient.bloodPressure}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Assigned PHC</span>
                  <span className="font-bold text-slate-800 truncate block">{currentPatient.phcName}</span>
                </div>
              </div>

              {/* Lesions Identified count */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Grad-CAM Detected Lesions:</span>
                <span className="font-bold font-mono text-slate-900">
                  {currentPatient.lesions.length === 0 ? '0 (Normal Retina)' : `${currentPatient.lesions.length} Pathological Foci`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* OpenCV Quality Gate Modal */}
        {showQualityModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  <h3 className="font-bold text-base text-slate-900">OpenCV 4.10 Pre-Inference Quality Gate</h3>
                </div>
                <button
                  onClick={() => setShowQualityModal(false)}
                  className="text-slate-400 hover:text-slate-700 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-3.5 text-xs text-slate-700">
                <p className="leading-relaxed">
                  Before neural execution, SightSeer AI evaluates the 20D indirect ophthalmoscopy frame to prevent misleading false positives caused by camera blur or corneal reflections.
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-slate-800">1. Laplacian Variance Sharpness:</span>
                    <span className="font-bold text-emerald-700">
                      {currentPatient.qualityMetrics.laplacianVariance} (Threshold &gt; 120.0)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Measures high-frequency gradient variance across edge boundaries. Rejects patient motion artifacts.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-slate-800">2. Circular Hough FOV Coverage:</span>
                    <span className="font-bold text-emerald-700">
                      {currentPatient.qualityMetrics.fovCoveragePct}% (Threshold &gt; 85%)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Detects outer circular boundary of 20D condensing lens inside adapter to ensure 45° macular visibility.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-slate-800">3. Specular Glare Threshold:</span>
                    <span className="font-bold text-emerald-700">
                      {currentPatient.qualityMetrics.specularGlarePct}% (Threshold &lt; 2.5%)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Identifies saturated white reflection spots from smartphone flash LED, creating dynamic masks for neural safety.
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setShowQualityModal(false)}
                  className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700"
                >
                  Close Gatekeeper Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Printable Referral Slip Modal */}
        <ReferralSlipModal
          patient={currentPatient}
          isOpen={showReferralModal}
          onClose={() => setShowReferralModal(false)}
        />
      </div>
    </section>
  );
};
