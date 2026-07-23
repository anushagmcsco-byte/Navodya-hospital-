import React from 'react';
import { PageType } from '../types';
import { NavodyaLogo } from './NavodyaLogo';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { 
  Phone, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  Heart, 
  PhoneCall, 
  Clock, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageType) => void;
  onOpenAppointmentWizard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, onOpenAppointmentWizard }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t-4 border-rose-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1 & 2: Brand & Helplines */}
          <div className="lg:col-span-2 space-y-4">
            <NavodyaLogo variant="dark-full" size="md" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Navodya Kidney & Multispecialty Hospital is a premier tertiary care center equipped with 24x7 high-flux dialysis, organ transplant ICUs, and super-specialty outpatient clinics.
            </p>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-[10px] font-black uppercase text-rose-400 tracking-wider block">
                24x7 Emergency Room & Dialysis Line
              </span>
              <a 
                href={`tel:${HOSPITAL_INFO.phoneEmergency}`}
                className="text-xl font-black text-white hover:text-rose-300 transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-5 h-5 text-rose-500 animate-pulse" />
                <span>{HOSPITAL_INFO.phoneEmergency}</span>
              </a>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('kidney-center')} className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>24x7 Dialysis Center</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('specialties')} className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Medical Specialties</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('doctors')} className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Our Doctors & Surgeons</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('blogs')} className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Blogs & Medical News</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('symptom-checker')} className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Kidney Health Assessment</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Patient Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Patient Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('resources')} className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Renal Diet Guide & Calculator</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('resources')} className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Cashless TPA & Insurance</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('packages')} className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Health Checkup Packages</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenAppointmentWizard} className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Book Online Appointment</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Hospital Contact & Location</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Accreditation & Address */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Hospital Campus
            </h4>
            <div className="text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>{HOSPITAL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-emerald-300 font-bold">NABH & NABL Accredited</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Navodya Kidney & Multispecialty Hospital. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Care</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Patient Rights Charter</span>
            <span>•</span>
            <button 
              onClick={() => setCurrentPage('admin')} 
              className="text-amber-400 hover:text-amber-300 font-bold transition-colors"
            >
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
