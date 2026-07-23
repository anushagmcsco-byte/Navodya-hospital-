import React, { useState } from 'react';
import { SAMPLE_APPOINTMENTS } from '../data/hospitalData';
import { AppointmentData } from '../types';
import { 
  FileText, 
  Search, 
  X, 
  CheckCircle2, 
  Clock, 
  Printer,
  Calendar,
  User
} from 'lucide-react';

interface AppointmentTrackerModalProps {
  onClose: () => void;
  userBookedAppointments?: AppointmentData[];
}

export const AppointmentTrackerModal: React.FC<AppointmentTrackerModalProps> = ({
  onClose,
  userBookedAppointments = []
}) => {
  const [searchId, setSearchId] = useState('');
  const [searchedAppointment, setSearchedAppointment] = useState<AppointmentData | null>(null);
  const [notFound, setNotFound] = useState(false);

  const allAppointments = [...userBookedAppointments, ...SAMPLE_APPOINTMENTS];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toLowerCase();
    const found = allAppointments.find(
      a => a.bookingId.toLowerCase() === query || a.patientPhone.includes(query)
    );

    if (found) {
      setSearchedAppointment(found);
      setNotFound(false);
    } else {
      setSearchedAppointment(null);
      setNotFound(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 relative space-y-6 animate-scaleUp">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-100 text-sky-800 rounded-2xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">Track Appointment Status</h3>
            <p className="text-xs text-slate-500">Enter your Booking Reference ID (e.g. NAV-89421) or Mobile Number</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            required
            placeholder="Enter NAV-89421 or 9812345678"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </form>

        {/* Demo Quick Suggestion */}
        <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          Try sample reference ID: <button onClick={() => setSearchId('NAV-89421')} className="font-bold text-sky-700 underline">NAV-89421</button>
        </div>

        {notFound && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-medium">
            No appointment record found matching "{searchId}". Please check your booking ID or mobile number.
          </div>
        )}

        {searchedAppointment && (
          <div className="bg-slate-50 border border-slate-300 rounded-2xl p-5 space-y-3 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-xs font-black text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded">
                STATUS: {searchedAppointment.status.toUpperCase()}
              </span>
              <span className="text-xs font-bold font-mono text-slate-900">{searchedAppointment.bookingId}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Patient Name</span>
                <strong className="text-slate-900">{searchedAppointment.patientName}</strong>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Consultant Doctor</span>
                <strong className="text-sky-800">{searchedAppointment.doctorName}</strong>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Date</span>
                <strong className="text-slate-900">{searchedAppointment.date}</strong>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Time Slot</span>
                <strong className="text-rose-700 font-bold">{searchedAppointment.timeSlot}</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 bg-slate-900 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
