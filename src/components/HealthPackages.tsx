import React, { useState } from 'react';
import { HEALTH_PACKAGES } from '../data/hospitalData';
import { HealthPackage } from '../types';
import { 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Tag, 
  Clock, 
  X,
  FileCheck,
  Building2
} from 'lucide-react';

interface HealthPackagesProps {
  onBookPackage: (packageTitle: string) => void;
}

export const HealthPackages: React.FC<HealthPackagesProps> = ({ onBookPackage }) => {
  const [selectedPkgModal, setSelectedPkgModal] = useState<HealthPackage | null>(null);

  return (
    <div className="space-y-8">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          Preventive Care & Health Diagnostics
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Comprehensive Preventive Health Packages
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Targeted health screening packages for early detection of kidney dysfunction, diabetes, hypertension, and organ wellness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {HEALTH_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative ${
              pkg.popular
                ? 'border-sky-400 ring-2 ring-sky-200 bg-gradient-to-b from-sky-50/40 to-white'
                : 'border-slate-200'
            }`}
          >
            {pkg.popular && (
              <span className="absolute top-4 right-4 bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                Most Popular
              </span>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded uppercase">
                  {pkg.totalTests} Diagnostic Parameters Included
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">{pkg.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{pkg.subtitle}</p>
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-black text-sky-800">₹{pkg.price}</span>
                <span className="text-sm text-slate-400 line-through">₹{pkg.originalPrice}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Save {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}%
                </span>
              </div>

              <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                Target Group: {pkg.targetGroup}
              </div>

              {/* Sample Categories */}
              <div className="space-y-2">
                <div className="text-[10px] font-extrabold uppercase text-slate-400">Package Highlights</div>
                <ul className="text-xs text-slate-700 space-y-1.5">
                  {pkg.testCategories.map((cat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">{cat.category}:</strong>{' '}
                        <span className="text-slate-600">{cat.tests.slice(0, 3).join(', ')}...</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedPkgModal(pkg)}
                className="text-xs font-bold text-slate-700 hover:text-sky-700"
              >
                View Complete Test List
              </button>

              <button
                onClick={() => onBookPackage(pkg.title)}
                className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Package</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Package Detail Modal */}
      {selectedPkgModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative space-y-6 max-h-[85vh] overflow-y-auto animate-scaleUp">
            <button
              onClick={() => setSelectedPkgModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-black uppercase text-sky-700 bg-sky-100 px-2.5 py-1 rounded">
                {selectedPkgModal.totalTests} Parameters
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">{selectedPkgModal.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{selectedPkgModal.subtitle}</p>
            </div>

            <div className="space-y-4">
              {selectedPkgModal.testCategories.map((cat, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-sky-900 text-sm mb-2">{cat.category}</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                    {cat.tests.map((test, j) => (
                      <li key={j} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                        <span>{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <div className="text-xl font-black text-sky-800">
                ₹{selectedPkgModal.price}
              </div>

              <button
                onClick={() => {
                  const title = selectedPkgModal.title;
                  setSelectedPkgModal(null);
                  onBookPackage(title);
                }}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow"
              >
                Book Package Slot
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
