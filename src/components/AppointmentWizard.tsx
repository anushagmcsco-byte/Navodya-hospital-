import React, { useState } from 'react';
import { DEPARTMENTS, DOCTORS } from '../data/hospitalData';
import { AppointmentData } from '../types';
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Share2, 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  Stethoscope, 
  Sparkles,
  ShieldCheck,
  Phone,
  FileText
} from 'lucide-react';

interface AppointmentWizardProps {
  initialDoctorId?: string;
  initialDepartmentId?: string;
  onAppointmentBooked?: (appointment: AppointmentData) => void;
  onClose?: () => void;
}

export const AppointmentWizard: React.FC<AppointmentWizardProps> = ({
  initialDoctorId,
  initialDepartmentId,
  onAppointmentBooked,
  onClose
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedDeptId, setSelectedDeptId] = useState<string>(
    initialDepartmentId || DEPARTMENTS[0].id
  );
  const [selectedDocId, setSelectedDocId] = useState<string>(
    initialDoctorId || ''
  );
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM - 11:00 AM');
  
  // Patient Details
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState<number | ''>(45);
  const [patientGender, setPatientGender] = useState<'male' | 'female' | 'other'>('male');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [visitType, setVisitType] = useState<'first' | 'followup' | 'second-opinion'>('first');
  const [isEmergencyPriority, setIsEmergencyPriority] = useState(false);

  // Final Confirmation Data
  const [completedBooking, setCompletedBooking] = useState<AppointmentData | null>(null);

  // Time Slots
  const morningSlots = ['09:00 AM - 09:30 AM', '09:30 AM - 10:00 AM', '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM', '11:30 AM - 12:00 PM'];
  const afternoonSlots = ['12:30 PM - 01:00 PM', '02:00 PM - 02:30 PM', '03:00 PM - 03:30 PM', '03:30 PM - 04:00 PM'];
  const eveningSlots = ['04:30 PM - 05:00 PM', '05:30 PM - 06:00 PM', '06:30 PM - 07:00 PM'];

  // Doctors in selected department
  const filteredDoctors = DOCTORS.filter(d => d.departmentId === selectedDeptId);
  const selectedDeptObj = DEPARTMENTS.find(d => d.id === selectedDeptId);
  const selectedDocObj = DOCTORS.find(d => d.id === selectedDocId);

  const handleNextStep1 = () => {
    if (!selectedDeptId) return;
    setStep(2);
  };

  const handleNextStep2 = () => {
    if (!selectedDate || !selectedTimeSlot) return;
    setStep(3);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;

    const bookingId = `NAV-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: AppointmentData = {
      bookingId,
      departmentId: selectedDeptId,
      departmentName: selectedDeptObj?.name || 'Department of Nephrology',
      doctorId: selectedDocId || (filteredDoctors[0]?.id || 'doc-1'),
      doctorName: selectedDocObj?.name || (filteredDoctors[0]?.name || 'Dr. Navneet Sharma'),
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      patientName,
      patientAge: Number(patientAge) || 30,
      patientGender,
      patientPhone,
      patientEmail,
      symptoms,
      visitType,
      isEmergencyPriority,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setCompletedBooking(newBooking);
    if (onAppointmentBooked) {
      onAppointmentBooked(newBooking);
    }
    setStep(4);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  // Generate next 10 dates for calendar picker
  const availableDates = Array.from({ length: 10 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      dateStr: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto my-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-indigo-900 text-white p-6 sm:p-8 relative">
        <div className="relative z-10 flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-sky-500/20 text-sky-200 border border-sky-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              Online Patient Portal
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Schedule Your Consultation
            </h2>
            <p className="text-sky-200 text-xs sm:text-sm mt-1">
              Select doctor, date & slot for instant OPD token generation with SMS confirmation.
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-sky-200 hover:text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-xs font-semibold"
            >
              Close
            </button>
          )}
        </div>

        {/* Step Progress Tracker */}
        <div className="mt-8 grid grid-cols-4 gap-2 border-t border-sky-700/60 pt-4 text-xs font-semibold">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-white' : 'text-sky-400 opacity-60'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? 'bg-sky-400 text-slate-900' : 'bg-sky-950 border border-sky-700 text-sky-300'}`}>1</span>
            <span className="hidden sm:inline">1. Department & Doctor</span>
          </div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-white' : 'text-sky-400 opacity-60'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? 'bg-sky-400 text-slate-900' : 'bg-sky-950 border border-sky-700 text-sky-300'}`}>2</span>
            <span className="hidden sm:inline">2. Date & Time Slot</span>
          </div>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-white' : 'text-sky-400 opacity-60'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${step >= 3 ? 'bg-sky-400 text-slate-900' : 'bg-sky-950 border border-sky-700 text-sky-300'}`}>3</span>
            <span className="hidden sm:inline">3. Patient Info</span>
          </div>
          <div className={`flex items-center gap-2 ${step === 4 ? 'text-white' : 'text-sky-400 opacity-60'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${step === 4 ? 'bg-emerald-400 text-slate-900' : 'bg-sky-950 border border-sky-700 text-sky-300'}`}>4</span>
            <span className="hidden sm:inline">4. Confirmation Token</span>
          </div>
        </div>
      </div>

      {/* STEP 1: Select Specialty & Doctor */}
      {step === 1 && (
        <div className="p-6 sm:p-8 space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-600" />
              <span>Select Clinical Specialty / Department</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {DEPARTMENTS.map((dept) => {
                const isSelected = selectedDeptId === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => {
                      setSelectedDeptId(dept.id);
                      setSelectedDocId(''); // Reset doctor selection
                    }}
                    className={`p-4 rounded-xl text-left border transition-all relative ${
                      isSelected
                        ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-500/30'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {dept.highlight && (
                      <span className="absolute top-2 right-2 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase">
                        24x7 Center
                      </span>
                    )}
                    <h4 className="font-bold text-slate-900 text-sm">{dept.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{dept.shortDesc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-sky-600" />
              <span>Select Specialist Doctor (Optional - or choose First Available)</span>
            </label>

            {filteredDoctors.length === 0 ? (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                You will be assigned to the On-Duty Senior Consultant for this department.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDocId('')}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 ${
                    selectedDocId === ''
                      ? 'border-sky-600 bg-sky-50 ring-2 ring-sky-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold text-xs">
                    Auto
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">First Available Consultant</div>
                    <div className="text-[11px] text-slate-500">Earliest available OPD slot</div>
                  </div>
                </button>

                {filteredDoctors.map((doc) => {
                  const isSelected = selectedDocId === doc.id;
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setSelectedDocId(doc.id)}
                      className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                        isSelected
                          ? 'border-sky-600 bg-sky-50 ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <img
                        src={doc.imageUrl}
                        alt={doc.name}
                        className="w-11 h-11 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-xs text-slate-900">{doc.name}</div>
                        <div className="text-[11px] text-sky-700 font-semibold">{doc.title}</div>
                        <div className="text-[10px] text-slate-500">{doc.qualifications}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleNextStep1}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow transition-all"
            >
              <span>Continue to Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 2: Pick Date & Time Slot */}
      {step === 2 && (
        <div className="p-6 sm:p-8 space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-600" />
              <span>Select Appointment Date</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {availableDates.map((item) => {
                const isSelected = selectedDate === item.dateStr;
                return (
                  <button
                    key={item.dateStr}
                    type="button"
                    onClick={() => setSelectedDate(item.dateStr)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-sky-600 text-white border-sky-600 shadow-md scale-105'
                        : 'border-slate-200 hover:border-sky-300 hover:bg-sky-50 text-slate-700'
                    }`}
                  >
                    <div className={`text-[10px] font-bold uppercase ${isSelected ? 'text-sky-200' : 'text-slate-500'}`}>
                      {item.dayName}
                    </div>
                    <div className="text-xl font-extrabold my-0.5">{item.dayNum}</div>
                    <div className={`text-[11px] font-medium ${isSelected ? 'text-sky-100' : 'text-slate-600'}`}>
                      {item.monthName}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Select Preferred Consultation Time Slot</span>
            </label>

            <div className="space-y-4">
              {/* Morning */}
              <div>
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Morning Slots</div>
                <div className="flex flex-wrap gap-2">
                  {morningSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                        selectedTimeSlot === slot
                          ? 'bg-sky-600 text-white border-sky-600 shadow'
                          : 'bg-slate-50 border-slate-200 hover:bg-sky-50 text-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Afternoon */}
              <div>
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Afternoon Slots</div>
                <div className="flex flex-wrap gap-2">
                  {afternoonSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                        selectedTimeSlot === slot
                          ? 'bg-sky-600 text-white border-sky-600 shadow'
                          : 'bg-slate-50 border-slate-200 hover:bg-sky-50 text-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Evening */}
              <div>
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Evening Slots</div>
                <div className="flex flex-wrap gap-2">
                  {eveningSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                        selectedTimeSlot === slot
                          ? 'bg-sky-600 text-white border-sky-600 shadow'
                          : 'bg-slate-50 border-slate-200 hover:bg-sky-50 text-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-bold text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNextStep2}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow transition-all"
            >
              <span>Next: Patient Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 3: Patient Information */}
      {step === 3 && (
        <form onSubmit={handleSubmitBooking} className="p-6 sm:p-8 space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Patient Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Chandra"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Age <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={110}
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Gender <span className="text-rose-500">*</span>
                </label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number (For SMS Confirmation) <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="patient@example.com"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Visit Purpose / Consultation Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setVisitType('first')}
                className={`py-2 px-3 rounded-lg text-xs font-bold border ${
                  visitType === 'first'
                    ? 'bg-sky-100 border-sky-600 text-sky-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                First Visit
              </button>
              <button
                type="button"
                onClick={() => setVisitType('followup')}
                className={`py-2 px-3 rounded-lg text-xs font-bold border ${
                  visitType === 'followup'
                    ? 'bg-sky-100 border-sky-600 text-sky-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                Follow-up OPD
              </button>
              <button
                type="button"
                onClick={() => setVisitType('second-opinion')}
                className={`py-2 px-3 rounded-lg text-xs font-bold border ${
                  visitType === 'second-opinion'
                    ? 'bg-sky-100 border-sky-600 text-sky-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                Second Opinion
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Brief Symptoms / Past Lab Report Notes
            </label>
            <textarea
              rows={2}
              placeholder="e.g. High creatinine (2.5), swelling in legs, high BP, kidney stone pain..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            ></textarea>
          </div>

          {/* Emergency / Urgent Dialysis Priority Flag */}
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
            <input
              type="checkbox"
              id="emergencyFlag"
              checked={isEmergencyPriority}
              onChange={(e) => setIsEmergencyPriority(e.target.checked)}
              className="mt-1 w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
            />
            <label htmlFor="emergencyFlag" className="text-xs text-rose-900 cursor-pointer">
              <strong className="block text-rose-700 font-extrabold">Mark as Urgent Renal Priority / Emergency Dialysis</strong>
              Check this if patient has severe acute breathlessness, sudden urine stoppage, or critical potassium levels requiring immediate emergency room admission.
            </label>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-bold text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-lg transition-all transform hover:scale-[1.02]"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirm & Generate OPD Token</span>
            </button>
          </div>

        </form>
      )}

      {/* STEP 4: Token Confirmation Slip */}
      {step === 4 && completedBooking && (
        <div className="p-6 sm:p-8 space-y-6 print:p-0">
          
          <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-6 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Appointment Successfully Confirmed
            </span>

            <h3 className="text-2xl font-black text-slate-900">
              OPD Token ID: <span className="text-sky-700 font-mono underline">{completedBooking.bookingId}</span>
            </h3>

            <p className="text-xs text-slate-600 max-w-lg mx-auto">
              An SMS with token details has been dispatched to <strong>{completedBooking.patientPhone}</strong>. Please present this token at the reception desk 15 minutes prior to your time slot.
            </p>
          </div>

          {/* Printable Ticket Slip */}
          <div className="bg-slate-50 border border-slate-300 rounded-2xl p-6 space-y-4 shadow-sm print:shadow-none print:border-slate-800">
            
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <h4 className="font-black text-slate-900 text-base">NAVODYA KIDNEY & MULTISPECIALTY HOSPITAL</h4>
                <p className="text-[10px] text-slate-500 uppercase font-semibold">24x7 Dialysis & Organ Transplant Center</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-sky-800 bg-sky-100 px-2.5 py-1 rounded-md">
                  OPD PASS
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium block text-[10px]">Patient Name</span>
                <strong className="text-slate-900 text-sm">{completedBooking.patientName}</strong>
                <span className="text-slate-500 block">Age: {completedBooking.patientAge} | Gender: {completedBooking.patientGender}</span>
              </div>

              <div>
                <span className="text-slate-400 font-medium block text-[10px]">Department</span>
                <strong className="text-slate-900 text-sm">{completedBooking.departmentName}</strong>
              </div>

              <div>
                <span className="text-slate-400 font-medium block text-[10px]">Consultant Doctor</span>
                <strong className="text-sky-800 text-sm">{completedBooking.doctorName}</strong>
              </div>

              <div>
                <span className="text-slate-400 font-medium block text-[10px]">Appointment Date</span>
                <strong className="text-slate-900 text-sm">{completedBooking.date}</strong>
              </div>

              <div>
                <span className="text-slate-400 font-medium block text-[10px]">Time Slot</span>
                <strong className="text-rose-700 text-sm font-bold">{completedBooking.timeSlot}</strong>
              </div>

              <div>
                <span className="text-slate-400 font-medium block text-[10px]">OPD Room No.</span>
                <strong className="text-slate-900 text-sm">Cabinet #104 (Ground Floor)</strong>
              </div>
            </div>

            {completedBooking.symptoms && (
              <div className="pt-2 border-t border-slate-200 text-xs">
                <span className="text-slate-400 text-[10px] block">Patient Notes / Symptoms:</span>
                <p className="text-slate-700 italic">{completedBooking.symptoms}</p>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between items-center">
              <span>Helpline: +91 98765 43210</span>
              <span>Generated on: {new Date().toLocaleDateString()}</span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center pt-2 print:hidden">
            <button
              onClick={handlePrintSlip}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print Appointment Slip</span>
            </button>

            <button
              onClick={() => {
                setStep(1);
                setCompletedBooking(null);
              }}
              className="flex items-center gap-2 bg-sky-100 text-sky-800 hover:bg-sky-200 font-bold px-5 py-2.5 rounded-xl text-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Another Appointment</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
