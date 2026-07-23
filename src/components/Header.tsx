import React, { useState } from 'react';
import { PageType } from '../types';
import { NavodyaLogo } from './NavodyaLogo';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Calendar, 
  Menu, 
  X, 
  Search, 
  Activity, 
  ShieldCheck, 
  BookOpen, 
  PhoneCall, 
  HeartPulse, 
  ChevronRight,
  FileText,
  Lock
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  onOpenAppointmentWizard: (doctorId?: string, departmentId?: string) => void;
  onOpenTrackerModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  onOpenAppointmentWizard,
  onOpenTrackerModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const navItems: { id: PageType; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'kidney-center', label: 'Kidney & Dialysis Center', badge: '24x7' },
    { id: 'specialties', label: 'Specialties' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'blogs', label: 'Blogs & News' },
    { id: 'resources', label: 'Patient Resources' },
    { id: 'symptom-checker', label: 'Kidney Health Check' },
    { id: 'packages', label: 'Health Packages' },
    { id: 'contact', label: 'Contact & Location' },
  ];

  const handleNavClick = (page: PageType) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-100">
      {/* Top Utility Bar - Calming Navy Theme */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          {/* Emergency & Helpline info */}
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <a 
              href={`tel:${HOSPITAL_INFO.phoneEmergency}`}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold px-2.5 py-1 rounded-full text-xs transition-colors shadow-sm animate-pulse"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>24x7 Emergency: {HOSPITAL_INFO.phoneEmergency}</span>
            </a>

            <div className="hidden md:flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>Toll-Free OPD: <strong className="text-white">{HOSPITAL_INFO.phoneHelpline}</strong></span>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>24x7 Dialysis & ICU Running</span>
            </div>
          </div>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <button
              onClick={onOpenTrackerModal}
              className="flex items-center gap-1 text-slate-300 hover:text-sky-300 font-medium transition-colors"
              title="Track existing appointment status"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Track Appointment</span>
            </button>

            <span className="text-slate-700">|</span>

            <div className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline font-semibold text-emerald-300">NABH Accredited</span>
            </div>

            <span className="text-slate-700">|</span>

            {/* Admin Portal */}
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1 text-slate-300 hover:text-amber-300 font-semibold transition-colors"
              title="Admin Portal (CRUD Blogs & Appointments)"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Admin Panel</span>
            </button>

            <span className="text-slate-700">|</span>

            {/* Quick Search */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Search doctor, specialty or guide"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        
        {/* Hospital Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-none"
        >
          <NavodyaLogo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 rounded-md text-xs font-semibold transition-all flex items-center gap-1 ${
                  isActive
                    ? 'text-sky-800 bg-sky-50 font-bold'
                    : 'text-slate-700 hover:text-sky-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-sky-600 rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Book Appointment CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenAppointmentWizard()}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4 text-sky-200" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center justify-between ${
                    isActive
                      ? 'bg-sky-50 text-sky-800 border-l-4 border-sky-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointmentWizard();
              }}
              className="w-full flex items-center justify-center gap-2 bg-sky-600 text-white font-bold py-3 rounded-lg shadow"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Online</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackerModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-800 font-semibold py-2.5 rounded-lg border border-slate-200"
            >
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Track Existing Appointment</span>
            </button>

            <a
              href={`tel:${HOSPITAL_INFO.phoneEmergency}`}
              className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white font-bold py-2.5 rounded-lg text-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 24/7 Emergency ({HOSPITAL_INFO.phoneEmergency})</span>
            </a>
          </div>
        </div>
      )}

      {/* Quick Search Modal Overlay */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 relative animate-scaleUp">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Search className="w-5 h-5 text-sky-600" />
              <span>Search Navodya Hospital Services</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Find doctors, treatments, dialysis schedules, renal diet guides, or insurance partners.
            </p>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="e.g. Dr. Navneet Sharma, Dialysis, Kidney Stone, Renal Diet, Star Health..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                autoFocus
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto text-xs">
              <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mb-2">Popular Searches</div>
              
              <button
                onClick={() => {
                  setShowSearchModal(false);
                  setCurrentPage('kidney-center');
                }}
                className="w-full text-left p-2.5 hover:bg-sky-50 rounded-lg flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-slate-800 group-hover:text-sky-700">24x7 Hemodialysis Unit</span>
                  <p className="text-slate-500">Ultra-pure water RO plant, 40 beds, high-flux dialyzers</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
              </button>

              <button
                onClick={() => {
                  setShowSearchModal(false);
                  setCurrentPage('doctors');
                }}
                className="w-full text-left p-2.5 hover:bg-sky-50 rounded-lg flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-slate-800 group-hover:text-sky-700">Find Nephrologist or Kidney Surgeon</span>
                  <p className="text-slate-500">Dr. Navneet Sharma, Dr. Rajeshwar Rao & team</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
              </button>

              <button
                onClick={() => {
                  setShowSearchModal(false);
                  setCurrentPage('resources');
                }}
                className="w-full text-left p-2.5 hover:bg-sky-50 rounded-lg flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-slate-800 group-hover:text-sky-700">Renal Diet & Fluid Limit Guide</span>
                  <p className="text-slate-500">Sodium, potassium, and phosphorus management for CKD</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
