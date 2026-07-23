import React, { useState } from 'react';
import { PATIENT_RESOURCES, INSURANCE_PROVIDERS } from '../data/hospitalData';
import { ResourceArticle } from '../types';
import { 
  BookOpen, 
  Droplet, 
  Activity, 
  FileText, 
  ShieldCheck, 
  Download, 
  Search, 
  ChevronRight, 
  Apple, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  Printer, 
  HelpCircle,
  Calculator,
  UserCheck
} from 'lucide-react';

export const PatientResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'diet' | 'dialysis' | 'articles' | 'insurance' | 'forms' | 'lab-reports'>('diet');
  const [selectedArticle, setSelectedArticle] = useState<ResourceArticle | null>(PATIENT_RESOURCES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fluid & Sodium Calculator State
  const [urineOutputMl, setUrineOutputMl] = useState<number>(300);
  const [ckdStage, setCkdStage] = useState<'dialysis' | 'ckd-3-4' | 'transplant'>('dialysis');

  // Lab Report Lookup State
  const [billNo, setBillNo] = useState('NAV-LAB-9842');
  const [dob, setDob] = useState('1975-08-14');
  const [searchedReport, setSearchedReport] = useState<boolean>(false);

  // Form Download Modal
  const [downloadModalForm, setDownloadModalForm] = useState<string | null>(null);

  // Calculate daily fluid allowance
  const calculatedFluidMl = ckdStage === 'dialysis' ? urineOutputMl + 500 : 2000;

  const downloadableForms = [
    { title: 'New Patient OPD Registration Form', size: '180 KB', type: 'PDF' },
    { title: 'Dialysis Consent & Medical History Form', size: '240 KB', type: 'PDF' },
    { title: 'Kidney Biopsy Pre-Procedure Checklist', size: '150 KB', type: 'PDF' },
    { title: 'Organ Donation Pledge & Declaration', size: '320 KB', type: 'PDF' },
    { title: 'Cashless TPA Pre-Authorization Form', size: '210 KB', type: 'PDF' }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-indigo-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-sky-500/20 text-sky-200 border border-sky-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-sky-300" />
            Patient Education & Support Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Comprehensive Patient Resources
          </h1>
          <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
            Access renal diet planners, dialysis handbooks, pre-procedure instructions, insurance TPA desk guidelines, downloadable medical forms, and online lab results.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('diet')}
          className={`flex items-center gap-2 px-4 py-3 font-bold text-xs sm:text-sm whitespace-nowrap rounded-t-xl transition-all ${
            activeTab === 'diet'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
          }`}
        >
          <Apple className="w-4 h-4" />
          <span>Renal Diet & Fluid Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('dialysis')}
          className={`flex items-center gap-2 px-4 py-3 font-bold text-xs sm:text-sm whitespace-nowrap rounded-t-xl transition-all ${
            activeTab === 'dialysis'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
          }`}
        >
          <Droplet className="w-4 h-4" />
          <span>Dialysis Patient Guide</span>
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className={`flex items-center gap-2 px-4 py-3 font-bold text-xs sm:text-sm whitespace-nowrap rounded-t-xl transition-all ${
            activeTab === 'articles'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Health Guides & Knowledgebase</span>
        </button>

        <button
          onClick={() => setActiveTab('insurance')}
          className={`flex items-center gap-2 px-4 py-3 font-bold text-xs sm:text-sm whitespace-nowrap rounded-t-xl transition-all ${
            activeTab === 'insurance'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Cashless TPA & Insurance</span>
        </button>

        <button
          onClick={() => setActiveTab('forms')}
          className={`flex items-center gap-2 px-4 py-3 font-bold text-xs sm:text-sm whitespace-nowrap rounded-t-xl transition-all ${
            activeTab === 'forms'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Download Forms</span>
        </button>

        <button
          onClick={() => setActiveTab('lab-reports')}
          className={`flex items-center gap-2 px-4 py-3 font-bold text-xs sm:text-sm whitespace-nowrap rounded-t-xl transition-all ${
            activeTab === 'lab-reports'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Online Lab Reports Demo</span>
        </button>
      </div>

      {/* TAB 1: Renal Diet & Fluid Calculator */}
      {activeTab === 'diet' && (
        <div className="space-y-6">
          
          {/* Fluid Calculator Box */}
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-sky-600 text-white rounded-xl shadow">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Interactive Daily Fluid Intake Estimator</h3>
                <p className="text-xs text-slate-600">Calculate recommended daily water & liquid intake for kidney patients.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Patient Condition</label>
                <select
                  value={ckdStage}
                  onChange={(e) => setCkdStage(e.target.value as any)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                >
                  <option value="dialysis">On Maintenance Hemodialysis / Peritoneal Dialysis</option>
                  <option value="ckd-3-4">CKD Stage 3-4 (Non-Dialysis)</option>
                  <option value="transplant">Post Kidney Transplant</option>
                </select>
              </div>

              {ckdStage === 'dialysis' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    24-Hour Urine Output (ml)
                  </label>
                  <input
                    type="number"
                    step={50}
                    value={urineOutputMl}
                    onChange={(e) => setUrineOutputMl(Number(e.target.value))}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                  />
                </div>
              )}
            </div>

            {/* Result Box */}
            <div className="bg-white border border-sky-300 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-500 block uppercase">Recommended Max Fluid Allowance</span>
                <span className="text-3xl font-black text-sky-800">{calculatedFluidMl} ml / Day</span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  ({(calculatedFluidMl / 1000).toFixed(1)} Liters, including water, tea, soup & ice cubes)
                </span>
              </div>
              <div className="text-right text-xs text-slate-600 max-w-xs">
                <span className="font-bold text-sky-700 block">Formula Used:</span>
                {ckdStage === 'dialysis' 
                  ? '500 ml baseline + 24-hr urine output'
                  : '2.0 Liters baseline or as prescribed by Nephrologist'}
              </div>
            </div>
          </div>

          {/* Food Potassium & Sodium Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Allowed / Recommended Foods */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Kidney-Friendly Foods to Enjoy</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 block">Low Potassium Fruits:</strong>
                    Apples, blueberries, strawberries, pineapples, grapes, cranberries.
                  </div>
                </li>
                <li className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 block">Low Potassium Vegetables:</strong>
                    Cabbage, cauliflower, cucumbers, green beans, radishes, onions, bell peppers.
                  </div>
                </li>
                <li className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 block">Healthy Proteins:</strong>
                    Egg whites, skinless chicken breast, fresh fish, tofu (in moderation).
                  </div>
                </li>
              </ul>
            </div>

            {/* Foods to Limit */}
            <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>High Potassium & High Sodium Foods to Limit</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-rose-100">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 block">High Potassium Fruits (Restrict):</strong>
                    Bananas, oranges, mangoes, kiwis, avocados, dried dates & raisins.
                  </div>
                </li>
                <li className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-rose-100">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 block">High Sodium Foods (Avoid):</strong>
                    Pickles, papads, canned soups, soy sauce, processed cheeses, packaged snacks.
                  </div>
                </li>
                <li className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-rose-100">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 block">High Phosphorus Drinks:</strong>
                    Dark cola beverages, packaged energy drinks, condensed milk.
                  </div>
                </li>
              </ul>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: Dialysis Patient Guide */}
      {activeTab === 'dialysis' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-2xl font-black text-slate-900">24x7 Dialysis Patient Care Handbook</h3>
            <p className="text-xs text-slate-500">Essential instructions for patients on maintenance hemodialysis at Navodya Hospital.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 space-y-2">
              <span className="bg-sky-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded uppercase">Step 1</span>
              <h4 className="font-bold text-slate-900 text-sm">Before Dialysis Session</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Take your regular BP medications only as directed by your Nephrologist. Wash your AV Fistula arm thoroughly with soap and water before entering the dialysis hall.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 space-y-2">
              <span className="bg-sky-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded uppercase">Step 2</span>
              <h4 className="font-bold text-slate-900 text-sm">During 4-Hour Dialysis</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Relax in our ergonomic recliner beds. Enjoy free Wi-Fi and entertainment. Report any cramping, dizziness, or nausea immediately to the attending technician.
              </p>
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 space-y-2">
              <span className="bg-sky-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded uppercase">Step 3</span>
              <h4 className="font-bold text-slate-900 text-sm">After Dialysis Session</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apply pressure to needle insertion sites for 15-20 minutes. Keep the pressure bandage dry for 6 hours. Check your fistula thrill daily.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Health Articles */}
      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Health Article</div>
            {PATIENT_RESOURCES.map((art) => (
              <button
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedArticle?.id === art.id
                    ? 'border-sky-600 bg-sky-50/80 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-[10px] font-extrabold uppercase text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                  {art.category}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-1.5">{art.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{art.summary}</p>
                <div className="text-[10px] text-slate-400 mt-2">{art.readTime} • By {art.author}</div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
            {selectedArticle && (
              <>
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-extrabold uppercase text-sky-700 bg-sky-100 px-2.5 py-1 rounded">
                    {selectedArticle.category}
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-2">{selectedArticle.title}</h2>
                  <div className="text-xs text-slate-500 mt-1">Author: {selectedArticle.author}</div>
                </div>

                <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line">
                  {selectedArticle.content}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: Insurance & Cashless TPAs */}
      {activeTab === 'insurance' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <span>Cashless Health Insurance & TPA Network Desk</span>
            </h3>
            <p className="text-xs text-slate-600">
              Navodya Hospital offers hassle-free cashless hospitalization and dialysis approvals with over 30 insurance partners.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4">
              {INSURANCE_PROVIDERS.map((ins) => (
                <div key={ins.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2">
                  <div className="w-12 h-12 bg-sky-900 text-white font-black text-[10px] rounded-lg flex items-center justify-center mx-auto uppercase tracking-tighter">
                    {ins.logoText}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">{ins.name}</h4>
                  <span className="inline-block bg-emerald-100 text-emerald-800 font-extrabold text-[9px] px-2 py-0.5 rounded uppercase">
                    Cashless Supported
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Downloadable Forms */}
      {activeTab === 'forms' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Official Downloadable Patient Forms</h3>
          <p className="text-xs text-slate-500">Download and fill forms before visiting the hospital to save OPD waiting time.</p>

          <div className="space-y-3 pt-2">
            {downloadableForms.map((form, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4 hover:border-sky-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-100 text-rose-700 rounded-lg font-black text-xs">
                    {form.type}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{form.title}</h4>
                    <span className="text-xs text-slate-500">File size: {form.size}</span>
                  </div>
                </div>

                <button
                  onClick={() => setDownloadModalForm(form.title)}
                  className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Preview & Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: Online Lab Reports Lookup Demo */}
      {activeTab === 'lab-reports' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Digital Diagnostic Lab Report Portal</h3>
            <p className="text-xs text-slate-500">Enter your Sample ID / Bill Number and Date of Birth to view electronic lab reports.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bill / Sample Registration Number</label>
              <input
                type="text"
                value={billNo}
                onChange={(e) => setBillNo(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Patient Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-800"
              />
            </div>

            <button
              onClick={() => setSearchedReport(true)}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow"
            >
              Search Electronic Report
            </button>
          </div>

          {searchedReport && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">RENAL FUNCTION DIAGNOSTIC PANEL</h4>
                  <span className="text-[10px] text-emerald-800 font-bold">Status: VERIFIED BY PATHOLOGIST</span>
                </div>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded">Sample #{billNo}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-slate-600">Serum Creatinine</span>
                  <span className="font-bold text-slate-900">1.2 mg/dL <span className="text-emerald-600 text-[10px]">(Normal: 0.7 - 1.3)</span></span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-slate-600">Blood Urea Nitrogen (BUN)</span>
                  <span className="font-bold text-slate-900">18 mg/dL <span className="text-emerald-600 text-[10px]">(Normal: 7 - 20)</span></span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-slate-600">Estimated GFR (eGFR)</span>
                  <span className="font-bold text-slate-900">88 mL/min/1.73m² <span className="text-emerald-600 text-[10px]">(Normal: {'>'}60)</span></span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">Serum Potassium</span>
                  <span className="font-bold text-slate-900">4.2 mmol/L <span className="text-emerald-600 text-[10px]">(Normal: 3.5 - 5.0)</span></span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => window.print()}
                  className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-lg"
                >
                  Print Report Copy
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Form Download Modal */}
      {downloadModalForm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 relative animate-scaleUp">
            <button
              onClick={() => setDownloadModalForm(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900">{downloadModalForm}</h3>
            <p className="text-xs text-slate-500">
              Your official PDF document is ready for viewing and printing.
            </p>

            <div className="bg-slate-100 border border-slate-200 rounded-xl p-8 text-center space-y-3">
              <FileText className="w-12 h-12 text-sky-600 mx-auto" />
              <div className="text-xs font-bold text-slate-800">Navodya Hospital Official Document</div>
              <div className="text-[10px] text-slate-500">PDF • Verified Digital Copy</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  alert(`Downloading ${downloadModalForm}...`);
                  setDownloadModalForm(null);
                }}
                className="w-full bg-sky-600 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Save PDF Document</span>
              </button>

              <button
                onClick={() => setDownloadModalForm(null)}
                className="bg-slate-100 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
