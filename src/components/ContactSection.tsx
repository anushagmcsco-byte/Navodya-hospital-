import React, { useState } from 'react';
import { HOSPITAL_INFO } from '../data/hospitalData';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  PhoneCall, 
  Send, 
  Ambulance, 
  CheckCircle2,
  Building2,
  Navigation
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: 'Nephrology & Dialysis',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className="space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          24x7 Reach Us
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Hospital Location & Emergency Helplines
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Located in central medical enclave with easy access for emergency ambulances and outstation patients.
        </p>
      </div>

      {/* Emergency Hotline Alert */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800 text-white rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-2xl animate-pulse">
            <Ambulance className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase bg-white/20 px-2.5 py-0.5 rounded-full">
              24x7 Ambulance & Emergency Dialysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">
              Call Hotline: {HOSPITAL_INFO.phoneEmergency}
            </h2>
            <p className="text-xs text-rose-100">
              Immediate response for acute renal failure, fluid overload, severe chest pain or trauma.
            </p>
          </div>
        </div>

        <a
          href={`tel:${HOSPITAL_INFO.phoneEmergency}`}
          className="bg-white text-rose-700 hover:bg-rose-50 font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow"
        >
          Call Emergency Room Now
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Contact Info & Address */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="text-2xl font-black text-slate-900">Hospital Address & Hours</h3>

          <div className="space-y-4 text-xs text-slate-700">
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <MapPin className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 text-sm">Main Campus Address</strong>
                <span>{HOSPITAL_INFO.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <Clock className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 text-sm">Operational Timings</strong>
                <span>{HOSPITAL_INFO.workingHours}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <Phone className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 text-sm">OPD Appointments & Enquiries</strong>
                <span>Toll-Free: {HOSPITAL_INFO.phoneHelpline} | OPD: {HOSPITAL_INFO.phoneOpd}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <Mail className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 text-sm">Email Contact</strong>
                <span>{HOSPITAL_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Location Map Illustration */}
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 text-center space-y-3">
            <Navigation className="w-8 h-8 text-sky-700 mx-auto" />
            <h4 className="font-extrabold text-slate-900 text-sm">Interactive GPS Navigation</h4>
            <p className="text-xs text-slate-600">
              5 minutes from City Railway Station & Central Metro Hub. Valet parking available.
            </p>
            <button
              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(HOSPITAL_INFO.address)}`, '_blank')}
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow"
            >
              <span>Open in Google Maps</span>
            </button>
          </div>

        </div>

        {/* Right: Quick Inquiry Form */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="text-2xl font-black text-slate-900">General Inquiry & Feedback</h3>

          {inquirySent ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-base">Inquiry Submitted Successfully</h4>
              <p className="text-xs text-slate-600">
                Our patient care desk will reach out to <strong>{formData.phone}</strong> within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anusha Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Nephrology & Dialysis">Nephrology & Dialysis</option>
                    <option value="Kidney Transplant">Kidney Transplant</option>
                    <option value="Urology & Laser Stone">Urology & Laser Stone</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Insurance / Cashless TPA">Insurance / Cashless TPA</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Message / Medical Question</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ask about OPD timings, bed availability, dialysis slots or package prices..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Hospital Inquiry</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
