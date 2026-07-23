import React, { useState, useEffect } from 'react';
import { PageType, AppointmentData, BlogPost } from './types';
import { HOSPITAL_INFO, DEPARTMENTS, DOCTORS, FAQS, SAMPLE_BLOGS, SAMPLE_APPOINTMENTS } from './data/hospitalData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NavodyaLogo } from './components/NavodyaLogo';
import { AppointmentWizard } from './components/AppointmentWizard';
import { PatientResources } from './components/PatientResources';
import { DoctorDirectory } from './components/DoctorDirectory';
import { KidneyCenterSpotlight } from './components/KidneyCenterSpotlight';
import { SpecialtiesGrid } from './components/SpecialtiesGrid';
import { HealthPackages } from './components/HealthPackages';
import { SymptomChecker } from './components/SymptomChecker';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { AppointmentTrackerModal } from './components/AppointmentTrackerModal';
import { BlogSection } from './components/BlogSection';
import { AdminPanel } from './components/AdminPanel';

import { 
  Calendar, 
  PhoneCall, 
  Activity, 
  ShieldCheck, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  HeartPulse, 
  Droplet, 
  Zap, 
  Stethoscope, 
  FileText, 
  HelpCircle,
  Users,
  Search,
  Sparkles,
  Building2
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<string | undefined>();
  const [selectedDeptForBooking, setSelectedDeptForBooking] = useState<string | undefined>();
  const [showTrackerModal, setShowTrackerModal] = useState(false);
  
  // Local list of user booked appointments in current session
  const [userBookings, setUserBookings] = useState<AppointmentData[]>(SAMPLE_APPOINTMENTS);

  // Persistent Blogs State with LocalStorage
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('navodya_hospital_blogs');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading blogs from localStorage:', e);
    }
    return SAMPLE_BLOGS;
  });

  const handleAddBlog = (newBlog: BlogPost) => {
    const updated = [newBlog, ...blogs];
    setBlogs(updated);
    try {
      localStorage.setItem('navodya_hospital_blogs', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving blogs:', e);
    }
  };

  const handleUpdateBlog = (updatedBlog: BlogPost) => {
    const updated = blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b);
    setBlogs(updated);
    try {
      localStorage.setItem('navodya_hospital_blogs', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving blogs:', e);
    }
  };

  const handleDeleteBlog = (blogId: string) => {
    const updated = blogs.filter(b => b.id !== blogId);
    setBlogs(updated);
    try {
      localStorage.setItem('navodya_hospital_blogs', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving blogs:', e);
    }
  };

  const handleResetBlogs = () => {
    setBlogs(SAMPLE_BLOGS);
    try {
      localStorage.setItem('navodya_hospital_blogs', JSON.stringify(SAMPLE_BLOGS));
    } catch (e) {
      console.error('Error resetting blogs:', e);
    }
  };

  const handleUpdateAppointmentStatus = (bookingId: string, status: AppointmentData['status']) => {
    setUserBookings(prev => prev.map(a => a.bookingId === bookingId ? { ...a, status } : a));
  };

  const handleOpenAppointmentWizard = (doctorId?: string, departmentId?: string) => {
    setSelectedDoctorForBooking(doctorId);
    setSelectedDeptForBooking(departmentId);
    setShowAppointmentModal(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAppointmentBooked = (appointment: AppointmentData) => {
    setUserBookings(prev => [appointment, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 selection:bg-sky-500 selection:text-white">
      
      {/* Global Hospital Navigation Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenAppointmentWizard={handleOpenAppointmentWizard}
        onOpenTrackerModal={() => setShowTrackerModal(true)}
      />

      {/* Main Page Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-12">
        
        {/* ================= PAGE: HOME ================= */}
        {currentPage === 'home' && (
          <div className="space-y-16">
            
            {/* HERO SECTION */}
            <section className="bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
              
              {/* Background Ambient Glow */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500/20 to-rose-500/20 border border-sky-400/30 text-sky-200 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>NABH Accredited Tertiary Care Center</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                    Precision Kidney Care & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-rose-300 to-purple-300">Multispecialty</span> Excellence
                  </h1>

                  <p className="text-sky-100/90 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
                    Navodya Hospital offers round-the-clock 24x7 Hemodialysis, Organ Transplant ICUs, Holmium Laser Lithotripsy, and Super Specialty Care delivered by world-renowned specialists.
                  </p>

                  {/* Quick CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => handleOpenAppointmentWizard()}
                      className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-sky-500/25 transition-all transform hover:-translate-y-0.5"
                    >
                      <Calendar className="w-4 h-4 text-sky-100" />
                      <span>Book OPD Appointment</span>
                    </button>

                    <a
                      href={`tel:${HOSPITAL_INFO.phoneEmergency}`}
                      className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-5 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-colors animate-pulse"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>24x7 Emergency Line</span>
                    </a>

                    <button
                      onClick={() => setCurrentPage('symptom-checker')}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-xl text-xs sm:text-sm border border-white/20 transition-colors"
                    >
                      <Activity className="w-4 h-4 text-sky-300" />
                      <span>Kidney Symptom Check</span>
                    </button>
                  </div>

                </div>

                {/* Right Hero Info Card */}
                <div className="lg:col-span-5 bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 space-y-4 shadow-xl">
                  
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-rose-400" />
                      <span className="font-extrabold text-sm text-white">24x7 Dialysis Unit</span>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                      40 Beds Running
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5 space-y-1">
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Ultra-Pure Water</span>
                      <strong className="text-white text-sm">Double Pass RO</strong>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5 space-y-1">
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Dialyzer Safety</span>
                      <strong className="text-emerald-300 text-sm">100% Single Use</strong>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5 space-y-1">
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Transplant Success</span>
                      <strong className="text-white text-sm">1,250+ Transplants</strong>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5 space-y-1">
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Infection Control</span>
                      <strong className="text-sky-300 text-sm">Isolated HBV/HCV</strong>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setCurrentPage('kidney-center')}
                      className="w-full bg-white text-slate-900 hover:bg-sky-50 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow"
                    >
                      <span>Explore Kidney & Dialysis Center</span>
                      <ArrowRight className="w-4 h-4 text-sky-700" />
                    </button>
                  </div>

                </div>

              </div>

              {/* Stats Bar */}
              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {HOSPITAL_INFO.stats.slice(0, 4).map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-[11px] text-sky-200 font-medium uppercase mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

            </section>

            {/* FLAGSHIP SPOTLIGHT */}
            <KidneyCenterSpotlight onBookAppointment={handleOpenAppointmentWizard} />

            {/* DOCTORS DIRECTORY PREVIEW */}
            <section className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-black uppercase text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                    Medical Faculty
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Leading Specialist Doctors</h2>
                </div>
                <button
                  onClick={() => setCurrentPage('doctors')}
                  className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1"
                >
                  <span>View All 45+ Specialists</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {DOCTORS.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:border-sky-300 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <img src={doc.imageUrl} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-200" />
                        <div>
                          <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">{doc.departmentName}</span>
                          <h3 className="font-bold text-slate-900 text-sm mt-0.5">{doc.name}</h3>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{doc.title}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">{doc.bio}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">{doc.experienceYears}+ Yrs Exp</span>
                      <button
                        onClick={() => handleOpenAppointmentWizard(doc.id, doc.departmentId)}
                        className="bg-sky-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow"
                      >
                        Book Slot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SYMPTOM CHECKER BANNER */}
            <section className="bg-gradient-to-r from-sky-900 to-indigo-900 text-white rounded-3xl p-8 sm:p-10 flex flex-wrap items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 max-w-xl">
                <span className="bg-sky-500/20 text-sky-200 text-xs font-black px-3 py-1 rounded-full uppercase border border-sky-400/30">
                  Self Health Assessment
                </span>
                <h3 className="text-2xl sm:text-3xl font-black">
                  Experiencing Leg Swelling, High BP, or Foamy Urine?
                </h3>
                <p className="text-xs text-sky-200">
                  Take our 2-minute interactive Kidney Risk Assessment to check early clinical indicators for Chronic Kidney Disease (CKD).
                </p>
              </div>

              <button
                onClick={() => setCurrentPage('symptom-checker')}
                className="bg-white text-slate-900 hover:bg-sky-50 font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow"
              >
                Launch Symptom Checker
              </button>
            </section>

            {/* MULTISPECIALTY SERVICES GRID */}
            <SpecialtiesGrid
              onSelectDepartment={(deptId) => setCurrentPage('specialties')}
              onBookAppointment={(deptId) => handleOpenAppointmentWizard(undefined, deptId)}
            />

            {/* HEALTH PACKAGES PREVIEW */}
            <HealthPackages onBookPackage={(pkgTitle) => handleOpenAppointmentWizard()} />

            {/* LATEST BLOGS & PUBLICATIONS PREVIEW */}
            <section className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-black uppercase text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                    Clinical Publications
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Latest Health & Kidney Blogs</h2>
                </div>
                <button
                  onClick={() => {
                    setCurrentPage('blogs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1"
                >
                  <span>Explore All Medical Articles ({blogs.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogs.slice(0, 3).map((blog) => (
                  <article key={blog.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:border-sky-300 transition-all flex flex-col justify-between">
                    <div>
                      <img src={blog.imageUrl} alt={blog.title} className="w-full h-40 object-cover" />
                      <div className="p-5 space-y-2">
                        <span className="text-[10px] font-black text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full uppercase">
                          {blog.category}
                        </span>
                        <h3 
                          onClick={() => {
                            setCurrentPage('blogs');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="font-bold text-slate-900 text-sm hover:text-sky-700 cursor-pointer line-clamp-2"
                        >
                          {blog.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2">{blog.excerpt}</p>
                      </div>
                    </div>
                    <div className="p-5 pt-0 text-[11px] font-bold text-slate-400 border-t border-slate-100 flex items-center justify-between">
                      <span>{blog.author}</span>
                      <span className="text-sky-600">{blog.readTime}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-6 shadow-sm">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-black text-sky-700 bg-sky-100 px-3 py-1 rounded-full uppercase">
                  Patient FAQs
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {FAQS.map((faq, i) => (
                  <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed pl-6">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ================= PAGE: ABOUT ================= */}
        {currentPage === 'about' && <AboutSection />}

        {/* ================= PAGE: KIDNEY CENTER ================= */}
        {currentPage === 'kidney-center' && (
          <KidneyCenterSpotlight onBookAppointment={handleOpenAppointmentWizard} />
        )}

        {/* ================= PAGE: SPECIALTIES ================= */}
        {currentPage === 'specialties' && (
          <SpecialtiesGrid
            onSelectDepartment={(deptId) => {}}
            onBookAppointment={(deptId) => handleOpenAppointmentWizard(undefined, deptId)}
          />
        )}

        {/* ================= PAGE: DOCTORS ================= */}
        {currentPage === 'doctors' && (
          <DoctorDirectory
            onBookDoctor={(docId, deptId) => handleOpenAppointmentWizard(docId, deptId)}
          />
        )}

        {/* ================= PAGE: APPOINTMENT WIZARD ================= */}
        {currentPage === 'appointment' && (
          <AppointmentWizard
            initialDoctorId={selectedDoctorForBooking}
            initialDepartmentId={selectedDeptForBooking}
            onAppointmentBooked={handleAppointmentBooked}
          />
        )}

        {/* ================= PAGE: PATIENT RESOURCES ================= */}
        {currentPage === 'resources' && <PatientResources />}

        {/* ================= PAGE: SYMPTOM CHECKER ================= */}
        {currentPage === 'symptom-checker' && (
          <SymptomChecker
            onBookNephrologist={() => handleOpenAppointmentWizard(undefined, 'nephrology')}
          />
        )}

        {/* ================= PAGE: HEALTH PACKAGES ================= */}
        {currentPage === 'packages' && (
          <HealthPackages onBookPackage={(pkgTitle) => handleOpenAppointmentWizard()} />
        )}

        {/* ================= PAGE: CONTACT ================= */}
        {currentPage === 'contact' && <ContactSection />}

        {/* ================= PAGE: BLOGS ================= */}
        {currentPage === 'blogs' && (
          <BlogSection
            blogs={blogs}
            onBookAppointment={handleOpenAppointmentWizard}
            setCurrentPage={setCurrentPage}
          />
        )}

        {/* ================= PAGE: ADMIN PANEL ================= */}
        {currentPage === 'admin' && (
          <AdminPanel
            blogs={blogs}
            onAddBlog={handleAddBlog}
            onUpdateBlog={handleUpdateBlog}
            onDeleteBlog={handleDeleteBlog}
            onResetBlogs={handleResetBlogs}
            appointments={userBookings}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            setCurrentPage={setCurrentPage}
          />
        )}

      </main>

      {/* APPOINTMENT WIZARD OVERLAY MODAL */}
      {showAppointmentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto my-auto">
            <AppointmentWizard
              initialDoctorId={selectedDoctorForBooking}
              initialDepartmentId={selectedDeptForBooking}
              onAppointmentBooked={handleAppointmentBooked}
              onClose={() => setShowAppointmentModal(false)}
            />
          </div>
        </div>
      )}

      {/* APPOINTMENT TRACKER MODAL */}
      {showTrackerModal && (
        <AppointmentTrackerModal
          onClose={() => setShowTrackerModal(false)}
          userBookedAppointments={userBookings}
        />
      )}

      {/* Global Hospital Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        onOpenAppointmentWizard={() => handleOpenAppointmentWizard()}
      />

    </div>
  );
}
