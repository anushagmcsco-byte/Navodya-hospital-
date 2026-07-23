import React from 'react';
import { DEPARTMENTS } from '../data/hospitalData';
import { 
  Activity, 
  RefreshCw, 
  HeartPulse, 
  Zap, 
  Heart, 
  ShieldAlert, 
  Crosshair, 
  Scissors, 
  ArrowRight,
  Calendar
} from 'lucide-react';

interface SpecialtiesGridProps {
  onSelectDepartment: (deptId: string) => void;
  onBookAppointment: (deptId: string) => void;
}

export const SpecialtiesGrid: React.FC<SpecialtiesGridProps> = ({
  onSelectDepartment,
  onBookAppointment
}) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'RefreshCw': return <RefreshCw className="w-6 h-6" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Heart': return <Heart className="w-6 h-6" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      case 'Crosshair': return <Crosshair className="w-6 h-6" />;
      case 'Scissors': return <Scissors className="w-6 h-6" />;
      default: return <Activity className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          Multispecialty Care
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Comprehensive Super Specialty Services
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          From advanced nephrology & dialysis to cardiology, gastroenterology, laparoscopic surgery, and 24x7 critical care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEPARTMENTS.map((dept) => (
          <div
            key={dept.id}
            className={`bg-white border rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative ${
              dept.highlight
                ? 'border-sky-300 ring-1 ring-sky-200'
                : 'border-slate-200'
            }`}
          >
            {dept.highlight && (
              <span className="absolute top-4 right-4 bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                Flagship Center
              </span>
            )}

            <div className="space-y-3">
              <div className="p-3 bg-sky-50 text-sky-700 rounded-xl w-fit">
                {getIconComponent(dept.iconName)}
              </div>

              <h3 className="font-extrabold text-slate-900 text-lg leading-snug">
                {dept.name}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {dept.shortDesc}
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Key Clinical Procedures</span>
                <ul className="text-xs text-slate-700 space-y-1">
                  {dept.keyServices.slice(0, 3).map((serv, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                      <span className="truncate">{serv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[10px] text-slate-500 font-semibold truncate">
                Head: {dept.headDoctor}
              </span>

              <button
                onClick={() => onBookAppointment(dept.id)}
                className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow transition-colors flex-shrink-0"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Slot</span>
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
