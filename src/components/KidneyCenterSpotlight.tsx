import React from 'react';
import { 
  Activity, 
  RefreshCw, 
  HeartPulse, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  PhoneCall, 
  Calendar,
  Sparkles,
  ArrowRight,
  Droplet
} from 'lucide-react';

interface KidneyCenterSpotlightProps {
  onBookAppointment: (departmentId?: string) => void;
}

export const KidneyCenterSpotlight: React.FC<KidneyCenterSpotlightProps> = ({ onBookAppointment }) => {
  return (
    <div className="space-y-12">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-purple-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Center of Excellence for Renal Care</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Advanced Kidney & Dialysis Super Specialty Unit
          </h1>

          <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
            Navodya Hospital combines cutting-edge hemodiafiltration, state-mandated kidney transplants, stitchless laser stone removal, and round-the-clock intensive renal care.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onBookAppointment('dialysis-unit')}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
            >
              <Droplet className="w-4 h-4" />
              <span>Book Dialysis Slot (24x7)</span>
            </button>

            <button
              onClick={() => onBookAppointment('nephrology')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors"
            >
              <Calendar className="w-4 h-4 text-sky-300" />
              <span>Nephrology OPD Consultation</span>
            </button>
          </div>
        </div>

      </div>

      {/* 4 Pillars of Kidney Care */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pillar 1: Dialysis Unit */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-sky-300 transition-all">
          <div className="p-3 bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white rounded-xl w-fit shadow">
            <RefreshCw className="w-6 h-6" />
          </div>
          <span className="text-xs font-black text-rose-600 uppercase tracking-widest block">Unit 1</span>
          <h3 className="text-2xl font-black text-slate-900">24x7 High-Flux Dialysis & HDF Unit</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Equipped with 40 advanced Fresenius hemodialysis machines and a double-pass Reverse Osmosis (RO) water purification plant ensuring zero bacterial endotoxins.
          </p>

          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>Strict 100% Single-Use Dialyzer & Blood Tubing Policy</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>Dedicated Isolated Suites for Hepatitis B / C Patients</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>Nocturnal & Automated Peritoneal Dialysis (APD) Options</span>
            </li>
          </ul>
        </div>

        {/* Pillar 2: Kidney Transplant */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-sky-300 transition-all">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl w-fit shadow">
            <HeartPulse className="w-6 h-6" />
          </div>
          <span className="text-xs font-black text-purple-600 uppercase tracking-widest block">Unit 2</span>
          <h3 className="text-2xl font-black text-slate-900">Renal Transplant Program</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Govt. Approved Organ Transplant Center specializing in ABO-Incompatible, cross-match positive, and cadaveric renal transplants with ultra-clean HEPA modular operating rooms.
          </p>

          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span>Laparoscopic Keyhole Donor Nephrectomy (Fast donor recovery)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span>Comprehensive Post-Transplant Immunosuppression Monitoring</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span>1,250+ Successful Transplants Completed to Date</span>
            </li>
          </ul>
        </div>

        {/* Pillar 3: Laser Lithotripsy */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-sky-300 transition-all">
          <div className="p-3 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-xl w-fit shadow">
            <Zap className="w-6 h-6" />
          </div>
          <span className="text-xs font-black text-sky-600 uppercase tracking-widest block">Unit 3</span>
          <h3 className="text-2xl font-black text-slate-900">Stitchless Laser Stone Center</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            High-power Holmium Laser Lithotripsy for RIRS (Retrograde Intrarenal Surgery) and PCNL. Breaks kidney stones into fine dust without external skin cuts.
          </p>

          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>Same-Day / Daycare Procedure for Most Stones</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>Flexible Endoscopy Reaching All Kidney Calyces</span>
            </li>
          </ul>
        </div>

        {/* Pillar 4: Renal ICU */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-sky-300 transition-all">
          <div className="p-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl w-fit shadow">
            <Activity className="w-6 h-6" />
          </div>
          <span className="text-xs font-black text-emerald-600 uppercase tracking-widest block">Unit 4</span>
          <h3 className="text-2xl font-black text-slate-900">Critical Care & CRRT ICU</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            30-bed intensive care unit equipped for Continuous Renal Replacement Therapy (CRRT) for hemodynamically unstable septic and multi-organ failure patients.
          </p>

          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>24x7 On-Site Intensivists & Dialysis Technologists</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>1:1 Dedicated Critical Care Nursing Ratio</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};
