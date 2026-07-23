import React, { useState } from 'react';
import { DOCTORS, DEPARTMENTS } from '../data/hospitalData';
import { Doctor } from '../types';
import { 
  Search, 
  Filter, 
  Calendar, 
  Star, 
  Award, 
  Clock, 
  UserCheck, 
  ArrowRight,
  X,
  Stethoscope,
  Building2
} from 'lucide-react';

interface DoctorDirectoryProps {
  onBookDoctor: (doctorId: string, departmentId: string) => void;
}

export const DoctorDirectory: React.FC<DoctorDirectoryProps> = ({ onBookDoctor }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDocModal, setSelectedDocModal] = useState<Doctor | null>(null);

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesDept = selectedDepartment === 'all' || doc.departmentId === selectedDepartment;
    const matchesQuery = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      doc.departmentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesQuery;
  });

  return (
    <div className="space-y-8">
      
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          <Stethoscope className="w-3.5 h-3.5" />
          Senior Medical Faculty
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Our Specialist Doctors & Surgeons
        </h1>
        <p className="text-sm text-slate-600">
          Meet our team of board-certified Nephrologists, Transplant Surgeons, Urologists, Cardiologists, and Critical Care Specialists.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search doctor by name, disease, or treatment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500 hidden sm:inline" />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Departments ({DOCTORS.length})</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="p-6 space-y-4">
              
              <div className="flex items-start gap-4">
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-sky-100 shadow-sm flex-shrink-0"
                />
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 block w-fit mb-1">
                    {doc.departmentName}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-sky-700 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold line-clamp-1">{doc.title}</p>
                  <div className="text-[10px] text-slate-400 mt-0.5">{doc.qualifications}</div>
                </div>
              </div>

              {/* Experience & Rating */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl text-xs">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span><strong>{doc.experienceYears}+ Yrs</strong> Exp</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 justify-end">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span><strong>{doc.rating}</strong> ({doc.reviewCount})</span>
                </div>
              </div>

              {/* Specializations tags */}
              <div className="flex flex-wrap gap-1">
                {doc.specializations.slice(0, 3).map((spec, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {spec}
                  </span>
                ))}
              </div>

              {/* OPD Schedule */}
              <div className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span>{doc.opdSchedule}</span>
              </div>

            </div>

            {/* Card Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedDocModal(doc)}
                className="text-xs font-bold text-slate-700 hover:text-sky-700"
              >
                View Full Profile
              </button>

              <button
                onClick={() => onBookDoctor(doc.id, doc.departmentId)}
                className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book OPD Slot</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Doctor Full Profile Modal */}
      {selectedDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative space-y-6 animate-scaleUp">
            <button
              onClick={() => setSelectedDocModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-100 pb-6">
              <img
                src={selectedDocModal.imageUrl}
                alt={selectedDocModal.name}
                className="w-28 h-28 rounded-2xl object-cover border-2 border-sky-200 shadow-md"
              />
              <div className="text-center sm:text-left space-y-1">
                <span className="text-xs font-bold uppercase text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded">
                  {selectedDocModal.departmentName}
                </span>
                <h3 className="text-2xl font-black text-slate-900">{selectedDocModal.name}</h3>
                <p className="text-xs font-bold text-slate-700">{selectedDocModal.title}</p>
                <p className="text-xs text-slate-500">{selectedDocModal.qualifications}</p>
                
                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-600 pt-2">
                  <span>Experience: {selectedDocModal.experienceYears}+ Years</span>
                  <span>OPD Fee: ₹{selectedDocModal.consultationFee}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Biography & Expertise</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedDocModal.bio}</p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Key Clinical Specializations</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDocModal.specializations.map((spec, i) => (
                  <span key={i} className="text-xs bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-lg font-medium">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedDocModal(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const doc = selectedDocModal;
                  setSelectedDocModal(null);
                  onBookDoctor(doc.id, doc.departmentId);
                }}
                className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow"
              >
                <Calendar className="w-4 h-4" />
                <span>Book OPD Appointment</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
