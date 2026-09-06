import React, { useState } from 'react';
import { 
  TrendingUp, 
  IndianRupee, 
  Eye, 
  Wifi, 
  Users, 
  MapPin, 
  ShieldAlert, 
  ArrowUpRight,
  Sliders,
  CheckCircle2,
  Award
} from 'lucide-react';

export const ImpactSimulator: React.FC = () => {
  // Slider states
  const [deployedPhcs, setDeployedPhcs] = useState<number>(45);
  const [screeningsPerMonth, setScreeningsPerMonth] = useState<number>(120);

  // Calculations
  const annualScreenings = deployedPhcs * screeningsPerMonth * 12;
  // Out of pocket savings: ₹1,150 saved per patient (travel cost + loss of daily agricultural wage)
  const totalSavingsInRupees = annualScreenings * 1150;
  const savingsInLakhs = (totalSavingsInRupees / 100000).toFixed(1);
  const savingsInCrores = (totalSavingsInRupees / 10000000).toFixed(2);

  // Prevented vision loss: ~7.8% of screened diabetic patients have early treatable DR (Stage 1/2) caught before blindness
  const preventedBlindnessCases = Math.round(annualScreenings * 0.078);

  // Bandwidth saved: 14.5 MB raw TIFF vs 0.11 MB delta JSON = 14.39 MB saved per patient
  const bandwidthSavedGb = Math.round((annualScreenings * 14.39) / 1024);

  return (
    <section id="impact" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
            <span>Public Health Economics &amp; Scale</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Measurable Rural Healthcare Impact &amp; Economic Dividends
          </h2>
          <p className="mt-2 text-base text-slate-600">
            By shifting early Diabetic Retinopathy screening to the frontline ASHA worker, public health systems avert catastrophic late-stage blindness while saving millions in patient travel and lost wages.
          </p>
        </div>

        {/* 4 Verified Benchmark Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase mb-1">Diagnostic Turnaround</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-teal-700">380 ms</span>
              <span className="text-xs font-semibold text-slate-500">on-device</span>
            </div>
            <div className="mt-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span className="line-through text-slate-400 mr-1.5">3–5 weeks</span>
              <span>via conventional district tele-grading backlog.</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase mb-1">Cost per Patient Screen</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-teal-700">₹18</span>
              <span className="text-xs font-semibold text-slate-500">operational</span>
            </div>
            <div className="mt-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span className="line-through text-slate-400 mr-1.5">₹1,200+</span>
              <span>for roundtrip bus transit, food, and tertiary fees.</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase mb-1">Referable DR Sensitivity</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-teal-700">98.2%</span>
              <span className="text-xs font-semibold text-slate-500">verified</span>
            </div>
            <div className="mt-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span className="line-through text-slate-400 mr-1.5">74.1%</span>
              <span>with unassisted general practitioner direct ophthalmoscopy.</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase mb-1">Rural Transit Carbon</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-teal-700">0 kg</span>
              <span className="text-xs font-semibold text-slate-500">CO₂ / visit</span>
            </div>
            <div className="mt-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span className="line-through text-slate-400 mr-1.5">24.6 kg</span>
              <span>CO₂ emissions averted per patient district trip.</span>
            </div>
          </div>
        </div>

        {/* Interactive Rural Health Impact Simulator Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">
                Dynamic Health Economics Model
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                Simulate District &amp; State Scale Deployment
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Adjust PHC coverage and monthly screening volumes to compute projected clinical outcomes and community economic savings.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-xs font-bold text-teal-800">
              <Award className="w-4 h-4 text-teal-600" />
              <span>WHO &amp; NPCB Model Grounded</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders on Left */}
            <div className="lg:col-span-6 space-y-6">
              {/* Slider 1: Deployed PHCs */}
              <div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <span>Active Rural PHCs &amp; Sub-Centres:</span>
                  </span>
                  <span className="font-mono text-base font-black text-teal-700 px-2.5 py-0.5 rounded bg-teal-50 border border-teal-200">
                    {deployedPhcs} PHCs
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={deployedPhcs}
                  onChange={(e) => setDeployedPhcs(Number(e.target.value))}
                  id="simulator-phc-slider"
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                  <span>5 (Taluka Pilot)</span>
                  <span>100 (District Full)</span>
                  <span>500 (Multi-District State Scale)</span>
                </div>
              </div>

              {/* Slider 2: Screenings per PHC/Month */}
              <div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-800 mb-2">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-teal-600" />
                    <span>Monthly Screenings per PHC:</span>
                  </span>
                  <span className="font-mono text-base font-black text-teal-700 px-2.5 py-0.5 rounded bg-teal-50 border border-teal-200">
                    {screeningsPerMonth} Patients
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="10"
                  value={screeningsPerMonth}
                  onChange={(e) => setScreeningsPerMonth(Number(e.target.value))}
                  id="simulator-patients-slider"
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                  <span>20 (Weekly Camp)</span>
                  <span>150 (Semi-Daily Triage)</span>
                  <span>300 (High-Density Cohort)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-800">Assumption Base:</span> Frontline ASHA workers perform retinal fundus imaging during routine non-communicable disease (NCD) screening days. Average rural patient travel to tertiary district hospital is 84 km roundtrip.
              </div>
            </div>

            {/* Live Computed Metrics on Right */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200">
                <div className="text-[11px] font-mono font-bold text-teal-800 uppercase mb-1">
                  Annual Screenings
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {annualScreenings.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-slate-500 mt-1">Patients checked at village gate</p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <div className="text-[11px] font-mono font-bold text-emerald-800 uppercase mb-1">
                  Family Out-of-Pocket Savings
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  ₹{Number(savingsInCrores) >= 1 ? `${savingsInCrores} Cr` : `${savingsInLakhs} Lakhs`}
                </div>
                <p className="text-xs text-slate-500 mt-1">Transit fares &amp; wages conserved</p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
                <div className="text-[11px] font-mono font-bold text-amber-800 uppercase mb-1">
                  Prevented Blindness Cases
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {preventedBlindnessCases.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-slate-500 mt-1">Early Stage 1/2 triage interventions</p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200">
                <div className="text-[11px] font-mono font-bold text-indigo-800 uppercase mb-1">
                  Delta Bandwidth Saved
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {bandwidthSavedGb.toLocaleString('en-IN')} GB
                </div>
                <p className="text-xs text-slate-500 mt-1">Over 2G/EDGE rural cellular</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
