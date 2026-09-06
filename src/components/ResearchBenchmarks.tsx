import React, { useState } from 'react';
import { 
  BookOpen, 
  Database, 
  Table, 
  Layers, 
  ShieldCheck, 
  Copy, 
  Check, 
  Code, 
  Cpu,
  CheckCircle2
} from 'lucide-react';
import { 
  QUANTIZATION_BENCHMARKS, 
  DATASET_BENCHMARKS, 
  ICDR_STAGES_GUIDE, 
  FHIR_R4_SNIPPET 
} from '../data/researchData';

export const ResearchBenchmarks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'datasets' | 'benchmarks' | 'icdr' | 'fhir'>('benchmarks');
  const [copiedFhir, setCopiedFhir] = useState(false);

  const handleCopyFhir = () => {
    navigator.clipboard.writeText(FHIR_R4_SNIPPET);
    setCopiedFhir(true);
    setTimeout(() => setCopiedFhir(false), 2000);
  };

  return (
    <section id="research" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>Clinical Evidence &amp; Governance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Peer-Reviewed Benchmarks, Mathematical Formulations &amp; Standards
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Validated against gold-standard international fundus databases and engineered to meet India&apos;s National Health Authority guidelines.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 mb-8">
          <button
            onClick={() => setActiveTab('benchmarks')}
            id="tab-btn-benchmarks"
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'benchmarks'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Mobile Quantization Matrix (INT8 vs FP32)
          </button>

          <button
            onClick={() => setActiveTab('datasets')}
            id="tab-btn-datasets"
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'datasets'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Datasets &amp; Loss Math (Ordinal + Focal)
          </button>

          <button
            onClick={() => setActiveTab('icdr')}
            id="tab-btn-icdr"
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'icdr'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            ICDR 5-Stage Clinical Grading Guide
          </button>

          <button
            onClick={() => setActiveTab('fhir')}
            id="tab-btn-fhir"
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'fhir'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            ABDM &amp; FHIR R4 DiagnosticReport
          </button>
        </div>

        {/* Tab 1: Quantization Benchmarks Table */}
        {activeTab === 'benchmarks' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Mobile Edge Execution Latency &amp; Accuracy Trade-Offs
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Benchmark evaluated on Quad-core ARM Cortex-A53 (Redmi 9 / Galaxy M04 class hardware).
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
                ARM NEON Optimized
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/60 font-mono text-[11px] uppercase text-slate-500 font-bold">
                    <th className="py-3 px-4">Runtime Engine</th>
                    <th className="py-3 px-4">Binary Size</th>
                    <th className="py-3 px-4">RAM Peak</th>
                    <th className="py-3 px-4">Inference Latency</th>
                    <th className="py-3 px-4">AUC-ROC</th>
                    <th className="py-3 px-4">Referable Sensitivity</th>
                    <th className="py-3 px-4">Target Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {QUANTIZATION_BENCHMARKS.map((b, i) => (
                    <tr
                      key={i}
                      className={b.highlight ? 'bg-teal-50/70 font-semibold' : 'hover:bg-slate-50'}
                    >
                      <td className="py-3.5 px-4 font-mono">
                        <div className="flex items-center gap-1.5">
                          {b.highlight && <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />}
                          <span className={b.highlight ? 'text-teal-900 font-bold' : 'text-slate-800'}>
                            {b.framework}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">{b.modelSizeMb} MB</td>
                      <td className="py-3.5 px-4 font-mono text-slate-700">{b.ramPeakMb} MB</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {b.latencyMs} ms
                      </td>
                      <td className="py-3.5 px-4 font-mono text-teal-700 font-bold">{b.aucRoc}</td>
                      <td className="py-3.5 px-4 font-mono text-teal-700 font-bold">{b.sensitivityPct}%</td>
                      <td className="py-3.5 px-4 text-xs text-slate-600">{b.targetEnv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
              <strong>Key Finding:</strong> ONNX Runtime symmetric INT8 quantization achieves a 4.6x reduction in model footprint and a 3.7x latency speedup while retaining 99.7% of full FP32 clinical diagnostic sensitivity.
            </div>
          </div>
        )}

        {/* Tab 2: Datasets & Loss Mathematics */}
        {activeTab === 'datasets' && (
          <div className="space-y-6">
            {/* Multi-Center Datasets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {DATASET_BENCHMARKS.map((d, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                    Dataset 0{i + 1}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">{d.name}</h4>
                  <div className="text-xs font-mono font-bold text-teal-700 mb-2">{d.images}</div>
                  <p className="text-xs text-slate-600 mb-3">{d.centers}</p>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 text-xs text-slate-600">
                    <span className="font-bold text-slate-700 block">Clinical Cohort:</span>
                    {d.demographics}
                  </div>
                </div>
              ))}
            </div>

            {/* Mathematical Loss Formulation Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-base font-bold text-slate-900 mb-2">
                Multi-Task Loss Formulation: Ordinal Cross-Entropy + Focal Loss
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Conventional multi-class cross-entropy treats misclassifying Stage 0 as Stage 1 identically to misclassifying Stage 0 as Stage 4 (which could lead to catastrophic untreated blindness). SightSeer AI incorporates an ordinal penalty formulation combined with focal weighting to counter extreme class imbalances in rural cohorts:
              </p>

              <div className="p-4 rounded-xl bg-slate-950 text-teal-400 font-mono text-xs sm:text-sm overflow-x-auto mb-4 border border-slate-800">
                <code>
                  {`L_total = L_ordinal + α · L_focal

Where:
L_ordinal = - Σ_{k=1}^{K-1} [ y_k · log(σ(f_k(x))) + (1 - y_k) · log(1 - σ(f_k(x))) ]
L_focal   = - α_t · (1 - p_t)^γ · log(p_t)  [with γ = 2.0, α = 0.25]`}
                </code>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <strong className="text-slate-800 block mb-1">1. Mathematical Ordinality:</strong>
                  Penalizes distant severity ranking jumps quadratically, ensuring monotonic diagnostic confidence across Stages 0 through 4.
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <strong className="text-slate-800 block mb-1">2. Focal Parameter (γ = 2.0):</strong>
                  Down-weights easy well-classified normal retina cases while focusing gradient updates on hard, subtle microaneurysms.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: ICDR 5-Stage Classification Guide */}
        {activeTab === 'icdr' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                International Clinical Diabetic Retinopathy (ICDR) Disease Severity Scale
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Standard clinical protocol mapped directly into SightSeer AI&apos;s triage recommendation engine.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/60 font-mono text-[11px] uppercase text-slate-500 font-bold">
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4">Clinical Designation</th>
                    <th className="py-3 px-4">Ophthalmoscopic Findings</th>
                    <th className="py-3 px-4">Triage Risk</th>
                    <th className="py-3 px-4">Mandated Protocol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ICDR_STAGES_GUIDE.map((stage, i) => {
                    const badgeClass = {
                      emerald: 'bg-emerald-100 text-emerald-800',
                      amber: 'bg-amber-100 text-amber-800',
                      orange: 'bg-orange-100 text-orange-800',
                      rose: 'bg-rose-100 text-rose-800',
                    }[stage.color];

                    return (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{stage.stage}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">{stage.title}</td>
                        <td className="py-3.5 px-4 text-xs text-slate-600 max-w-xs">{stage.findings}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase font-mono ${badgeClass}`}>
                            {stage.risk}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-700 font-medium">{stage.action}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: ABDM & FHIR R4 Interoperability */}
        {activeTab === 'fhir' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  NRCES &amp; ABDM Standardized Health Data Model
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Every screening report generated on the smartphone is structured as an HL7® FHIR® R4 DiagnosticReport record compliant with the National Resource Centre for EHR Standards (NRCES).
                </p>

                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <strong className="block text-slate-900">LOINC Code: 81247-9</strong>
                    Diabetic retinopathy study fundus photograph examination.
                  </li>
                  <li className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <strong className="block text-slate-900">SNOMED CT: 394594003</strong>
                    Clinical ophthalmology finding ontology binding.
                  </li>
                  <li className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <strong className="block text-slate-900">Milestone M2 Encrypted Envelope:</strong>
                    Secured using ephemeral AES-256-GCM keys prior to delta sync.
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-200 shadow-md">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
                <span className="font-mono font-bold text-teal-400">FHIR_R4_DiagnosticReport.json</span>
                <button
                  onClick={handleCopyFhir}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedFhir ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-[11px] font-semibold text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span className="text-[11px] font-semibold">Copy JSON</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed max-h-[380px] select-text text-teal-200">
                <pre>
                  <code>{FHIR_R4_SNIPPET}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
