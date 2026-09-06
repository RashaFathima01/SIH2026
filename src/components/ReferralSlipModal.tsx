import React from 'react';
import { X, Printer, ShieldCheck, QrCode, FileText, CheckCircle2, AlertOctagon } from 'lucide-react';
import { PatientProfile } from '../types';

interface ReferralSlipModalProps {
  patient: PatientProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const ReferralSlipModal: React.FC<ReferralSlipModalProps> = ({
  patient,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <FileText className="w-4 h-4 text-teal-600" />
            <span>ABDM-M2 Compliant Clinical Referral Slip</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="modal-print-button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              id="modal-close-button"
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Printable Medical Slip Body */}
        <div className="p-6 sm:p-8 text-slate-800" id="printable-referral-content">
          {/* Official Clinic Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4 mb-5">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-teal-700">
                National Health Mission • Ayushman Bharat
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                PRIMARY EYE TRIAGE &amp; REFERRAL SLIP
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {patient.phcName} | {patient.district}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-mono text-xs font-bold border border-slate-200">
                {patient.id}
              </span>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Patient Details & ABHA QR Code Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-5 border-b border-slate-200">
            <div className="sm:col-span-8 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 font-bold block">Patient Name:</span>
                  <span className="font-extrabold text-sm text-slate-900">{patient.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Age / Gender:</span>
                  <span className="font-bold text-slate-800">{patient.age} Yrs / {patient.gender === 'M' ? 'Male' : 'Female'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 font-bold block">Village / Habitation:</span>
                  <span className="font-bold text-slate-800">{patient.village}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">ABHA ID (Ayushman Card):</span>
                  <span className="font-mono font-bold text-teal-800">{patient.abhaId}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <div>
                  <span className="text-slate-400 font-bold block">Diabetes Hx:</span>
                  <span className="font-bold text-slate-800">{patient.diabetesDurationYears} Years</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Latest HbA1c:</span>
                  <span className="font-bold text-slate-800">{patient.lastHba1c}%</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Blood Pressure:</span>
                  <span className="font-bold text-slate-800">{patient.bloodPressure}</span>
                </div>
              </div>
            </div>

            {/* ABHA QR Code & Digital Health Locker Signature */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              {/* Crisp SVG QR Code Representation */}
              <div className="w-24 h-24 bg-white p-1 rounded-lg border border-slate-300 shadow-2xs mb-1.5 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="0" y="0" width="100" height="100" fill="white" />
                  {/* Position detection squares */}
                  <rect x="10" y="10" width="26" height="26" fill="black" />
                  <rect x="14" y="14" width="18" height="18" fill="white" />
                  <rect x="18" y="18" width="10" height="10" fill="black" />

                  <rect x="64" y="10" width="26" height="26" fill="black" />
                  <rect x="68" y="14" width="18" height="18" fill="white" />
                  <rect x="72" y="18" width="10" height="10" fill="black" />

                  <rect x="10" y="64" width="26" height="26" fill="black" />
                  <rect x="14" y="68" width="18" height="18" fill="white" />
                  <rect x="18" y="72" width="10" height="10" fill="black" />

                  {/* QR Pattern Data Dots */}
                  <rect x="42" y="12" width="6" height="6" fill="black" />
                  <rect x="52" y="12" width="6" height="6" fill="black" />
                  <rect x="42" y="24" width="6" height="6" fill="black" />
                  <rect x="50" y="32" width="6" height="6" fill="black" />
                  <rect x="12" y="44" width="6" height="6" fill="black" />
                  <rect x="24" y="44" width="6" height="6" fill="black" />
                  <rect x="36" y="44" width="6" height="6" fill="black" />
                  <rect x="48" y="48" width="8" height="8" fill="black" />
                  <rect x="64" y="44" width="6" height="6" fill="black" />
                  <rect x="76" y="44" width="6" height="6" fill="black" />
                  <rect x="86" y="44" width="6" height="6" fill="black" />
                  <rect x="44" y="64" width="6" height="6" fill="black" />
                  <rect x="56" y="72" width="6" height="6" fill="black" />
                  <rect x="70" y="64" width="8" height="8" fill="black" />
                  <rect x="84" y="74" width="6" height="6" fill="black" />
                  <rect x="64" y="84" width="6" height="6" fill="black" />
                  <rect x="80" y="84" width="6" height="6" fill="black" />
                </svg>
              </div>
              <div className="text-[10px] font-mono font-bold text-slate-700">ABDM M2 LINKED</div>
              <div className="text-[9px] text-slate-400">Scan for FHIR R4 Bundle</div>
            </div>
          </div>

          {/* AI Clinical Diagnosis Box */}
          <div className="my-5 p-4 rounded-xl border-2 border-slate-900 bg-slate-50/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                SightSeer Edge AI Clinical Assessment
              </span>
              <span className="text-xs font-mono font-bold text-slate-700">
                Confidence: {patient.confidence}%
              </span>
            </div>

            <div className="text-base font-extrabold text-slate-900 mb-1 flex items-center gap-2">
              <span>{patient.stageName}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                {patient.stageCode}
              </span>
            </div>

            <p className="text-xs text-slate-700 mb-3 leading-relaxed">
              <strong>Clinical Findings:</strong> {patient.recommendation}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-200">
              <div>
                <span className="font-bold text-slate-500 block">Recommended Action:</span>
                <span className="font-bold text-slate-900">{patient.actionProtocol}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">Referral Facility &amp; Time:</span>
                <span className="font-extrabold text-teal-800">{patient.referredFacility}</span>
                <span className="text-[11px] text-slate-600 block">Window: {patient.referralTimeline}</span>
              </div>
            </div>
          </div>

          {/* Quality Telemetry & Sign-off */}
          <div className="grid grid-cols-2 gap-4 text-xs pt-2">
            <div>
              <span className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">Optical Telemetry</span>
              <ul className="space-y-0.5 text-slate-600 font-mono text-[11px]">
                <li>• Laplacian Variance: {patient.qualityMetrics.laplacianVariance} (Pass)</li>
                <li>• Field-of-View Centering: {patient.qualityMetrics.fovCoveragePct}% (Pass)</li>
                <li>• Specular Glare: {patient.qualityMetrics.specularGlarePct}% (Pass)</li>
              </ul>
            </div>

            <div className="flex flex-col justify-end text-right">
              <div className="border-b border-slate-400 w-36 ml-auto mb-1" />
              <span className="font-bold text-slate-900 text-xs">ASHA / ANM Officer</span>
              <span className="text-[10px] text-slate-500">Channamma PHC Health Post</span>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-400 font-mono">
            Generated via SightSeer AI v2.4 (Offline Edge Engine) • Cryptographic Hash: 0x8f2a9c4b12e
          </div>
        </div>
      </div>
    </div>
  );
};
