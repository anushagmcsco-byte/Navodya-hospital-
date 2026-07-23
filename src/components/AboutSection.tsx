import React from 'react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  HeartPulse, 
  CheckCircle2, 
  Activity,
  FileCheck
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-12">
      
      {/* Title Header */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
        <span className="inline-flex items-center gap-1.5 bg-sky-500/20 text-sky-200 border border-sky-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5 text-sky-300" />
          About Navodya Hospital
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Pioneering Renal Excellence & Compassionate Healthcare
        </h1>
        <p className="text-sky-100 text-sm sm:text-base leading-relaxed max-w-3xl">
          Founded with a dedicated mission to fight kidney disease and provide comprehensive super-specialty medical care under one roof. NABH accredited with state-of-the-art dialysis, organ transplant, and emergency trauma facilities.
        </p>
      </div>

      {/* Hospital Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {HOSPITAL_INFO.stats.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 text-center space-y-1 shadow-sm">
            <span className="text-2xl sm:text-3xl font-black text-sky-800 block">{stat.value}</span>
            <span className="text-xs text-slate-500 font-semibold block">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Quality Accreditations & Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-4">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <span>Accreditations & Quality Standards</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Navodya Hospital adheres strictly to national healthcare standards and infection control protocols.
          </p>

          <ul className="space-y-3 pt-2">
            {HOSPITAL_INFO.accreditations.map((acc, i) => (
              <li key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{acc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-3xl p-8 space-y-4">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-sky-600" />
            <span>Our Patient-First Philosophy</span>
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Every kidney patient at Navodya Hospital receives individualized, holistic treatment. From custom renal diet counseling to 24/7 dialysis support and financial navigation for organ transplants, we stand by our patients and their families at every step.
          </p>

          <div className="p-4 bg-white rounded-2xl border border-sky-200 text-xs space-y-2">
            <strong className="block text-sky-900 font-extrabold text-sm">Managing Director's Pledge</strong>
            <p className="text-slate-600 italic">
              "To ensure no kidney patient is ever denied world-class dialysis or transplantation due to lack of advanced infrastructure or compassionate care."
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
