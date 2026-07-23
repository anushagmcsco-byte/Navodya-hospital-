import React, { useState } from 'react';
import { KidneyAssessmentResult } from '../types';
import { 
  Activity, 
  CheckSquare, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Stethoscope, 
  Calendar,
  ShieldAlert,
  Info
} from 'lucide-react';

interface SymptomCheckerProps {
  onBookNephrologist: () => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onBookNephrologist }) => {
  const [answers, setAnswers] = useState<{
    hasDiabetes: boolean;
    hasHypertension: boolean;
    hasSwelling: boolean;
    hasFoamyUrine: boolean;
    hasNightUrine: boolean;
    hasFatigue: boolean;
    hasFamilyHistory: boolean;
    hasKidneyStones: boolean;
  }>({
    hasDiabetes: false,
    hasHypertension: false,
    hasSwelling: false,
    hasFoamyUrine: false,
    hasNightUrine: false,
    hasFatigue: false,
    hasFamilyHistory: false,
    hasKidneyStones: false
  });

  const [result, setResult] = useState<KidneyAssessmentResult | null>(null);

  const toggleOption = (key: keyof typeof answers) => {
    setAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateRisk = () => {
    let score = 0;
    if (answers.hasDiabetes) score += 25;
    if (answers.hasHypertension) score += 20;
    if (answers.hasSwelling) score += 15;
    if (answers.hasFoamyUrine) score += 20;
    if (answers.hasNightUrine) score += 10;
    if (answers.hasFatigue) score += 5;
    if (answers.hasFamilyHistory) score += 10;
    if (answers.hasKidneyStones) score += 10;

    let riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical' = 'Low';
    let summary = 'Your reported symptoms indicate a low probability of acute renal dysfunction.';
    let recommendations: string[] = [
      'Maintain adequate hydration (2.5L water daily).',
      'Schedule routine annual urine & creatinine health checkups.',
      'Maintain healthy blood pressure and blood sugar levels.'
    ];

    if (score >= 45) {
      riskLevel = 'Critical';
      summary = 'High probability of significant renal stress or Diabetic Nephropathy indicators.';
      recommendations = [
        'Urgent consultation with a Senior Nephrologist is strongly recommended.',
        'Get a Serum Creatinine, eGFR, and Urine Microalbumin test done immediately.',
        'Avoid self-medication with NSAID pain relievers (like ibuprofen or diclofenac) as they damage kidneys.'
      ];
    } else if (score >= 25) {
      riskLevel = 'High';
      summary = 'Moderate to high risk factors present for kidney function decline.';
      recommendations = [
        'Book an OPD consultation with a Nephrologist within 7 days.',
        'Perform basic Kidney Function Test (KFT) and USG Abdomen.',
        'Strictly monitor daily blood pressure and fasting blood sugar.'
      ];
    } else if (score >= 15) {
      riskLevel = 'Moderate';
      summary = 'Mild risk indicators detected. Preventive screening recommended.';
      recommendations = [
        'Consider Navodya Total Kidney Health Shield Package.',
        'Limit dietary sodium to under 2,000 mg per day.'
      ];
    }

    setResult({
      score,
      riskLevel,
      summary,
      recommendations,
      suggestedDoctorType: score >= 25 ? 'Senior Consultant Nephrologist' : 'General Physician / Preventive Care'
    });
  };

  const resetCalculator = () => {
    setAnswers({
      hasDiabetes: false,
      hasHypertension: false,
      hasSwelling: false,
      hasFoamyUrine: false,
      hasNightUrine: false,
      hasFatigue: false,
      hasFamilyHistory: false,
      hasKidneyStones: false
    });
    setResult(null);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="p-3 bg-sky-100 text-sky-800 rounded-2xl">
          <Activity className="w-8 h-8" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-md">
            Interactive Assessment Tool
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Kidney Health & CKD Risk Calculator
          </h2>
          <p className="text-xs text-slate-500">
            Check your symptoms against clinical risk indicators for early kidney disease screening.
          </p>
        </div>
      </div>

      {!result ? (
        <div className="space-y-6">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Select all conditions or symptoms that apply to you:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <button
              type="button"
              onClick={() => toggleOption('hasDiabetes')}
              className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                answers.hasDiabetes
                  ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-500/20'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <strong className="block text-slate-900 text-sm">Diabetes / High Blood Sugar</strong>
                <span className="text-xs text-slate-500">Type 1 or Type 2 diabetes for over 3 years</span>
              </div>
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${answers.hasDiabetes ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300'}`}>
                {answers.hasDiabetes && <CheckCircle2 className="w-4 h-4" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => toggleOption('hasHypertension')}
              className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                answers.hasHypertension
                  ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-500/20'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <strong className="block text-slate-900 text-sm">High Blood Pressure (Hypertension)</strong>
                <span className="text-xs text-slate-500">BP readings consistently above 130/85 mmHg</span>
              </div>
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${answers.hasHypertension ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300'}`}>
                {answers.hasHypertension && <CheckCircle2 className="w-4 h-4" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => toggleOption('hasSwelling')}
              className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                answers.hasSwelling
                  ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-500/20'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <strong className="block text-slate-900 text-sm">Swelling (Edema) in Feet, Legs or Face</strong>
                <span className="text-xs text-slate-500">Puffiness around eyes or fluid buildup in ankles</span>
              </div>
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${answers.hasSwelling ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300'}`}>
                {answers.hasSwelling && <CheckCircle2 className="w-4 h-4" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => toggleOption('hasFoamyUrine')}
              className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                answers.hasFoamyUrine
                  ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-500/20'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <strong className="block text-slate-900 text-sm">Foamy or Bubbly Urine</strong>
                <span className="text-xs text-slate-500">Indicates possible protein loss (proteinuria)</span>
              </div>
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${answers.hasFoamyUrine ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300'}`}>
                {answers.hasFoamyUrine && <CheckCircle2 className="w-4 h-4" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => toggleOption('hasNightUrine')}
              className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                answers.hasNightUrine
                  ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-500/20'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <strong className="block text-slate-900 text-sm">Frequent Urination at Night (Nocturia)</strong>
                <span className="text-xs text-slate-500">Waking up 3+ times at night to urinate</span>
              </div>
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${answers.hasNightUrine ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300'}`}>
                {answers.hasNightUrine && <CheckCircle2 className="w-4 h-4" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => toggleOption('hasKidneyStones')}
              className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                answers.hasKidneyStones
                  ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-500/20'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <strong className="block text-slate-900 text-sm">History of Kidney Stones or Flank Pain</strong>
                <span className="text-xs text-slate-500">Recurrent flank pain, burning urination or stone pass</span>
              </div>
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${answers.hasKidneyStones ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300'}`}>
                {answers.hasKidneyStones && <CheckCircle2 className="w-4 h-4" />}
              </div>
            </button>

          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={calculateRisk}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md transition-all"
            >
              <span>Calculate Risk Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* RESULT VIEW */
        <div className="space-y-6 animate-fadeIn">
          
          <div className={`p-6 rounded-2xl border ${
            result.riskLevel === 'Critical' || result.riskLevel === 'High'
              ? 'bg-rose-50 border-rose-300 text-rose-900'
              : result.riskLevel === 'Moderate'
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : 'bg-emerald-50 border-emerald-300 text-emerald-900'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider block">Assessed Risk Level</span>
                <h3 className="text-3xl font-black mt-0.5">{result.riskLevel} Risk ({result.score} / 100)</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold block">Recommended Specialist</span>
                <span className="text-sm font-extrabold">{result.suggestedDoctorType}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm mt-3 pt-3 border-t border-current/20 leading-relaxed font-medium">
              {result.summary}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-sky-600" />
              <span>Recommended Medical Actions:</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={resetCalculator}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-bold text-xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retake Assessment</span>
            </button>

            <button
              onClick={onBookNephrologist}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation With Nephrologist</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
