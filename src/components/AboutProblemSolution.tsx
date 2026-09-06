import React from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Users, 
  Clock, 
  Check, 
  X, 
  ShieldAlert, 
  ArrowRight,
  Sparkles,
  HeartPulse,
  Scale
} from 'lucide-react';

export const AboutProblemSolution: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-3">
            <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
            <span>The Rural Eye Care Crisis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Bridging the 80 km divide between preventable diabetic blindness and timely medical triage.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            In rural Primary Health Centres (PHCs), early Diabetic Retinopathy (DR) remains a silent epidemic. By the time symptoms manifest, irreversible microvascular damage has already occurred.
          </p>
        </div>

        {/* 3 Rural Disparity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-slate-900 tracking-tight mb-1">70%</div>
              <h3 className="text-base font-bold text-slate-800 mb-2">Unscreened Rural Diabetics</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Over 53 million rural citizens living with diabetes have never undergone a dilated fundus exam due to zero retinal imaging hardware at local sub-centres.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-amber-800">
              High risk of late Stage 3/4 presentation
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-slate-900 tracking-tight mb-1">80+ km</div>
              <h3 className="text-base font-bold text-slate-800 mb-2">Distance to Tertiary Hub</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Rural agricultural workers must sacrifice 2 full days of daily wages (₹800–1,200) and endure bumpy rural transit to reach district medical colleges for a 5-minute fundus check.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-rose-800">
              Loss of daily livelihood halts early checkups
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-800 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-slate-900 tracking-tight mb-1">1:100,000+</div>
              <h3 className="text-base font-bold text-slate-800 mb-2">Specialist Deficit</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                India has fewer than 22,000 ophthalmologists, with over 78% concentrated in tier-1 urban metros. A rural district eye wing faces backlogs of up to 4 months for routine reviews.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-cyan-900">
              Specialist time must be preserved for surgery
            </div>
          </div>
        </div>

        {/* Head-to-Head Comparison: Tabletop Fundus Camera vs SightSeer AI Mobile Kit */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-teal-400">
                  Hardware Paradigm Shift
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 text-white">
                  Tabletop Fundus Camera vs. SightSeer AI Handheld Kit
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
                150x Capital Expenditure Reduction
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase font-bold text-slate-400">
                  <th className="pb-3 w-1/3">Clinical Feature</th>
                  <th className="pb-3 w-1/3 text-slate-500">Conventional Tabletop Camera</th>
                  <th className="pb-3 w-1/3 text-teal-700">SightSeer AI Handheld Kit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-4 font-semibold text-slate-900">Capital Cost per Unit</td>
                  <td className="py-4 text-slate-600 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>₹15,00,000 – ₹30,00,000</span>
                  </td>
                  <td className="py-4 font-bold text-teal-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>&lt; ₹10,000 (Universal Smartphone + 20D Adapter)</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 font-semibold text-slate-900">Hardware Weight & Portability</td>
                  <td className="py-4 text-slate-600 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>20 – 35 kg (Fixed motorized bench)</span>
                  </td>
                  <td className="py-4 font-bold text-teal-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>&lt; 350 grams (Pocketable in ASHA worker kit bag)</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 font-semibold text-slate-900">Operator Qualification</td>
                  <td className="py-4 text-slate-600 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Certified Optometrist / Ophthalmologist</span>
                  </td>
                  <td className="py-4 font-bold text-teal-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Frontline ASHA / ANM Worker (2-hour training)</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 font-semibold text-slate-900">Power & Rural Grid Dependency</td>
                  <td className="py-4 text-slate-600 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Continuous 230V AC Power (Inverter mandatory)</span>
                  </td>
                  <td className="py-4 font-bold text-teal-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>8+ Hours on 5,000 mAh Smartphone Battery</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 font-semibold text-slate-900">Diagnostic Latency</td>
                  <td className="py-4 text-slate-600 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Manual grading queue (3 to 14 days)</span>
                  </td>
                  <td className="py-4 font-bold text-teal-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>380 milliseconds on-device without cloud</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 font-semibold text-slate-900">Rural Network Dependency</td>
                  <td className="py-4 text-slate-600 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Requires 15–25 MB uncompressed TIFF upload</span>
                  </td>
                  <td className="py-4 font-bold text-teal-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>100% Offline triage with &lt; 120 KB async delta sync</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
