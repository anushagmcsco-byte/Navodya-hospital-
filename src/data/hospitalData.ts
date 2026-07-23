import { AppointmentData, BlogPost, Department, Doctor, HealthPackage, InsuranceProvider, ResourceArticle } from '../types';

export const HOSPITAL_INFO = {
  name: 'Navodya Kidney & Multispecialty Hospital',
  tagline: 'Precision Renal Care & Advanced Multispecialty Excellence',
  taglineSub: 'Dedicated 24/7 Dialysis, Kidney Transplant & Super Specialty Center',
  phoneEmergency: '+91 98765 43210',
  phoneHelpline: '1800-200-8899',
  phoneOpd: '+91 80 4567 8900',
  email: 'care@navodyahospital.org',
  appointmentsEmail: 'appointments@navodyahospital.org',
  address: 'Navodya Medical Enclave, Ring Road, Healthcare Zone, City Centre - 560001',
  workingHours: 'OPD: 8:00 AM - 8:00 PM (Mon-Sat) | Emergency & Dialysis: 24x7 (365 Days)',
  accreditations: ['NABH Accredited Tertiary Hospital', 'NABL Certified Diagnostics', 'ISO 9001:2015 Quality Certified', 'Govt. Approved Organ Transplant Center'],
  stats: [
    { label: 'Dialysis Sessions Done', value: '120,000+' },
    { label: 'Kidney Transplants', value: '1,250+' },
    { label: 'Expert Specialists', value: '45+' },
    { label: 'Bed Capacity', value: '250 Beds' },
    { label: 'Patient Satisfaction', value: '99.2%' }
  ]
};

export const DEPARTMENTS: Department[] = [
  {
    id: 'nephrology',
    name: 'Department of Nephrology & Kidney Care',
    iconName: 'Activity',
    shortDesc: 'Comprehensive care for acute & chronic kidney diseases, glomerulonephritis, and hypertension.',
    fullDesc: 'Our Nephrology division offers world-class diagnostic and therapeutic interventions for acute renal failure, chronic kidney disease (CKD), diabetic kidney disease, polycystic kidney disease, and refractory hypertension. Equipped with advanced CRRT and continuous monitoring.',
    keyServices: ['Acute Kidney Injury Management', 'Chronic Kidney Disease (CKD) Clinic', 'Continuous Renal Replacement Therapy (CRRT)', 'Diabetic Nephropathy Protocol', 'Kidney Biopsy with Immunofluorescence'],
    headDoctor: 'Dr. Navneet Sharma, DM (Nephrology)',
    highlight: true,
    accentColor: 'from-fuchsia-600 to-purple-800'
  },
  {
    id: 'dialysis-unit',
    name: '24x7 Dialysis & Hemofiltration Unit',
    iconName: 'RefreshCw',
    shortDesc: 'Ultra-modern 40-bed hemodialysis center with double-pass RO water plant and single-use dialyzers.',
    fullDesc: 'State-of-the-art dialysis facility operating 24 hours a day with dedicated suites for HCV/HBV, pediatric dialysis, nocturnal dialysis, and automated peritoneal dialysis (APD). Features ultra-pure water purification to ensure maximum patient safety and comfort.',
    keyServices: ['24x7 Emergency Hemodialysis', 'High-Flux Hemodiafiltration (HDF)', 'Isolated Dialysis for Hepatitis B/C Patients', 'SLED (Sustained Low-Efficiency Dialysis)', 'Peritoneal Dialysis Training & Support'],
    headDoctor: 'Dr. Ananya Roy, MD, DNB (Renal Medicine)',
    highlight: true,
    accentColor: 'from-pink-500 to-fuchsia-700'
  },
  {
    id: 'kidney-transplant',
    name: 'Renal Transplant & Immunology Center',
    iconName: 'HeartPulse',
    shortDesc: 'State-approved center for ABO-incompatible, cadaveric, and living donor kidney transplants.',
    fullDesc: 'Pioneering kidney transplant program with dedicated HEPA-filtered modular transplant ICUs, advanced tissue typing labs, immunogenetics support, and comprehensive long-term post-transplant follow-up.',
    keyServices: ['ABO-Incompatible (Cross-Match Positive) Transplant', 'Laparoscopic Donor Nephrectomy', 'Cadaveric Organ Transplant Program', 'Pediatric Kidney Transplant', 'Post-Transplant Rejection Management'],
    headDoctor: 'Dr. Rajeshwar Rao, MCh (Urology & Transplant)',
    highlight: true,
    accentColor: 'from-purple-700 to-indigo-900'
  },
  {
    id: 'urology',
    name: 'Urology, Stone & Prostate Laser Center',
    iconName: 'Zap',
    shortDesc: 'Advanced minimally invasive laser surgery for kidney stones, prostate enlargement, and urinary tract disorders.',
    fullDesc: 'Featuring Holmium Laser Lithotripsy, RIRS (Retrograde Intrarenal Surgery), PCNL, and 3D Laparoscopic Urology for complex urinary tract reconstructive procedures and urological cancers.',
    keyServices: ['Laser Lithotripsy (RIRS / PCNL for Kidney Stones)', 'Holmium Laser Enucleation of Prostate (HoLEP)', '3D Laparoscopic Urology & Reconstructive Surgery', 'Urodynamics & Female Urology Clinic', 'Erectile Dysfunction & Male Fertility Care'],
    headDoctor: 'Dr. Vivek Deshmukh, MCh (Urology)',
    highlight: false
  },
  {
    id: 'cardiology',
    name: 'Interventional Cardiology & Cardio-Renal Clinic',
    iconName: 'Heart',
    shortDesc: 'Dedicated Cardio-Renal clinic addressing complex heart-kidney disease interactions.',
    fullDesc: '24x7 Cath Lab for emergency Angioplasty (PPCI), 2D/3D Echocardiography, Dobutamine Stress Echo, and specialist management of Cardio-Renal Syndrome in patients with co-existing cardiac and renal dysfunction.',
    keyServices: ['Emergency Angioplasty (PPCI)', 'Cardio-Renal Disease Management', 'Pacemaker & ICD Implantation', 'Hypertension & Heart Failure Clinic', 'Color Doppler & Stress Echo'],
    headDoctor: 'Dr. Meenakshi Sundaram, DM (Cardiology)',
    highlight: false
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology & Hepatology',
    iconName: 'ShieldAlert',
    shortDesc: 'Comprehensive care for liver diseases, GI bleeding, pancreatic disorders, and endoscopies.',
    fullDesc: 'Advanced GI endoscopy suite equipped with high-definition endoscopes, ERCP capability, capsule endoscopy, and specialized care for chronic liver disease, NAFLD, and inflammatory bowel disease.',
    keyServices: ['Diagnostic & Therapeutic Endoscopy/Colonoscopy', 'ERCP for Bile Duct & Pancreatic Stones', 'Liver Cirrhosis & Portal Hypertension Clinic', 'GI Bleed Emergency Intervention'],
    headDoctor: 'Dr. Siddharth Varma, DM (Gastroenterology)',
    highlight: false
  },
  {
    id: 'critical-care',
    name: '24x7 Critical Care, MICU & Renal ICU',
    iconName: 'Crosshair',
    shortDesc: 'Advanced 30-bed ICU with dedicated ventilators, CRRT machines, and 1:1 nursing ratio.',
    fullDesc: 'Specialized Medical & Surgical Intensive Care Unit led by round-the-clock Intensivists. Specifically designed for critically ill renal patients requiring continuous hemodynamic and renal monitoring.',
    keyServices: ['24x7 Bedside Hemodialysis & CRRT', 'Invasive Hemodynamic Monitoring', 'ARCS Advanced Airway & Mechanical Ventilation', 'Septic Shock & Multi-Organ Failure Protocol'],
    headDoctor: 'Dr. K. S. Raghavan, MD, EDIC (Critical Care)',
    highlight: false
  },
  {
    id: 'general-surgery',
    name: 'General & Minimal Access Laparoscopic Surgery',
    iconName: 'Scissors',
    shortDesc: 'Precision laparoscopic surgeries for gallstones, hernias, vascular access, and AV Fistulas.',
    fullDesc: 'Specialized surgical team providing AV Fistula creation and graft placement for hemodialysis patients, emergency trauma surgeries, and advanced laparoscopic abdominal procedures.',
    keyServices: ['AV Fistula & AV Graft Creation for Dialysis', 'Laparoscopic Cholecystectomy & Hernia Surgery', 'Peritoneal Dialysis Catheter (Tenkhoff) Placement', 'Vascular Access Revision Surgeries'],
    headDoctor: 'Dr. Priya Nambiar, MS, FIAGES (Laparoscopic Surgeon)',
    highlight: false
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Navneet Sharma',
    title: 'Senior Consultant & Director - Nephrology',
    departmentId: 'nephrology',
    departmentName: 'Department of Nephrology',
    qualifications: 'MBBS, MD (Medicine), DM (Nephrology), FISN (USA)',
    experienceYears: 22,
    specializations: ['Glomerular Diseases', 'Diabetic Nephropathy', 'Chronic Kidney Disease', 'Refractory Hypertension'],
    opdSchedule: 'Mon - Sat: 10:00 AM - 2:00 PM',
    consultationFee: 900,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewCount: 342,
    bio: 'Dr. Navneet Sharma is a renowned Nephrologist with over two decades of clinical experience in managing complex renal conditions. He has published over 40 research papers in international renal journals and led over 1,000 successful dialysis programs.'
  },
  {
    id: 'doc-2',
    name: 'Dr. Rajeshwar Rao',
    title: 'Chief Transplant Surgeon & Urologist',
    departmentId: 'kidney-transplant',
    departmentName: 'Renal Transplant & Immunology Center',
    qualifications: 'MBBS, MS (Surgery), MCh (Urology), FRCS (Glasgow)',
    experienceYears: 19,
    specializations: ['Living Donor Kidney Transplant', 'ABO-Incompatible Transplant', 'Laparoscopic Donor Nephrectomy', 'Renal Cancer Surgery'],
    opdSchedule: 'Mon, Wed, Fri: 11:00 AM - 4:00 PM',
    consultationFee: 1100,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
    rating: 4.95,
    reviewCount: 289,
    bio: 'Pioneer in minimally invasive kidney transplants, Dr. Rao has performed over 1,200 kidney transplant surgeries with exceptional patient survival rates. Trained at top institutes in UK and India.'
  },
  {
    id: 'doc-3',
    name: 'Dr. Ananya Roy',
    title: 'Senior Consultant Nephrologist & Dialysis Head',
    departmentId: 'dialysis-unit',
    departmentName: '24x7 Dialysis & Hemofiltration Unit',
    qualifications: 'MBBS, MD (General Medicine), DNB (Nephrology)',
    experienceYears: 14,
    specializations: ['High-Flux Hemodiafiltration', 'Pediatric Dialysis', 'Continuous Renal Replacement Therapy (CRRT)', 'Vascular Access Management'],
    opdSchedule: 'Tue, Thu, Sat: 9:00 AM - 1:00 PM',
    consultationFee: 800,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    imageUrl: 'https://images.unsplash.com/photo-1594824813566-88855ce78961?auto=format&fit=crop&q=80&w=600',
    rating: 4.88,
    reviewCount: 215,
    bio: 'Dr. Ananya Roy specializes in advanced renal replacement therapy and dialysis optimization. She oversees Navodya Hospital\'s 40-bed ultra-pure dialysis unit.'
  },
  {
    id: 'doc-4',
    name: 'Dr. Vivek Deshmukh',
    title: 'Senior Urologist & Laser Stone Specialist',
    departmentId: 'urology',
    departmentName: 'Urology, Stone & Prostate Laser Center',
    qualifications: 'MBBS, MS (Gen Surg), MCh (Urology), Dip. Endourology (Germany)',
    experienceYears: 16,
    specializations: ['RIRS & PCNL for Kidney Stones', 'Laser Prostatectomy (HoLEP)', 'Urological Cancers', 'Reconstructive Urology'],
    opdSchedule: 'Mon - Sat: 2:00 PM - 6:00 PM',
    consultationFee: 850,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
    rating: 4.91,
    reviewCount: 198,
    bio: 'Specialist in stitchless laser stone removal and endoscopic prostate surgeries. Dr. Deshmukh has performed over 5,000 laser stone procedures with minimal downtime.'
  },
  {
    id: 'doc-5',
    name: 'Dr. Meenakshi Sundaram',
    title: 'Chief Interventional Cardiologist',
    departmentId: 'cardiology',
    departmentName: 'Interventional Cardiology',
    qualifications: 'MBBS, MD, DM (Cardiology), FACC (USA)',
    experienceYears: 18,
    specializations: ['Complex Coronary Angioplasty', 'Cardio-Renal Syndrome', 'Pacemaker Implantation', 'Heart Failure Therapy'],
    opdSchedule: 'Mon - Fri: 10:00 AM - 3:00 PM',
    consultationFee: 950,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    rating: 4.89,
    reviewCount: 260,
    bio: 'Expert in Cardio-Renal care, managing patients with combined cardiovascular and kidney disease. Pioneer in radial access angioplasties.'
  },
  {
    id: 'doc-6',
    name: 'Dr. Priya Nambiar',
    title: 'Consultant Vascular & Laparoscopic Surgeon',
    departmentId: 'general-surgery',
    departmentName: 'General & Minimal Access Surgery',
    qualifications: 'MBBS, MS (General Surgery), FIAGES, Vascular Access Fellowship',
    experienceYears: 12,
    specializations: ['AV Fistula Creation', 'AV Graft & Permcath Placement', 'Laparoscopic Surgery', 'Hernia & Gallbladder Surgeries'],
    opdSchedule: 'Mon - Sat: 9:00 AM - 1:00 PM',
    consultationFee: 750,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600',
    rating: 4.87,
    reviewCount: 174,
    bio: 'Dr. Priya Nambiar is renowned for creating durable AV Fistulas for long-term dialysis patients with high success and low complication rates.'
  }
];

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'renal-shield',
    title: 'Navodya Total Kidney Health Shield',
    subtitle: 'Comprehensive evaluation of renal function, electrolyte balance, and early CKD detection',
    price: 1999,
    originalPrice: 3800,
    targetGroup: 'Recommended for diabetic, hypertensive, or individuals over 35 with family history of kidney disease',
    totalTests: 28,
    popular: true,
    testCategories: [
      {
        category: 'Renal Function Profile',
        tests: ['Serum Creatinine', 'Blood Urea Nitrogen (BUN)', 'Estimated GFR (eGFR)', 'Serum Uric Acid', 'BUN/Creatinine Ratio']
      },
      {
        category: 'Urine Diagnostics',
        tests: ['Urine Microalbumin/Creatinine Ratio', 'Routine Urine Analysis (20 Parameters)', 'Urine Protein Estimation']
      },
      {
        category: 'Electrolytes & Minerals',
        tests: ['Serum Sodium', 'Serum Potassium', 'Serum Chloride', 'Serum Calcium', 'Serum Phosphorus']
      },
      {
        category: 'Imaging & Consultations',
        tests: ['USG Abdomen & KUB (Kidney, Ureter, Bladder)', 'Consultation with Senior Nephrologist', 'Dietitian Consultation']
      }
    ]
  },
  {
    id: 'master-check',
    title: 'Master Multispecialty Executive Health Check',
    subtitle: 'Whole body health assessment covering heart, kidneys, liver, diabetes & lipid profile',
    price: 3499,
    originalPrice: 6500,
    targetGroup: 'Ideal for annual health checkup for adults above 30 years',
    totalTests: 62,
    popular: false,
    testCategories: [
      {
        category: 'Cardiac & Lipid Profile',
        tests: ['ECG (12 Lead)', 'Lipid Profile (Total Cholesterol, HDL, LDL, Triglycerides)', 'hs-CRP']
      },
      {
        category: 'Kidney & Liver Function',
        tests: ['Creatinine, BUN, Electrolytes', 'SGOT, SGPT, Bilirubin, Alkaline Phosphatase', 'Serum Albumin/Globulin']
      },
      {
        category: 'Diabetes & Thyroid Profile',
        tests: ['Fasting Blood Sugar', 'HbA1c (3-Month Sugar Avg)', 'TSH (Thyroid Stimulating Hormone)']
      },
      {
        category: 'Radiology & Consults',
        tests: ['Chest X-Ray', 'USG Whole Abdomen', 'Physician & Nephrologist Consultation']
      }
    ]
  },
  {
    id: 'diabetic-kidney',
    title: 'Diabetic Kidney Protection Screening',
    subtitle: 'Targeted assessment to prevent and detect Diabetic Nephropathy in diabetic patients',
    price: 1499,
    originalPrice: 2800,
    targetGroup: 'All Type 1 & Type 2 Diabetic patients (Annual requirement)',
    totalTests: 18,
    popular: false,
    testCategories: [
      {
        category: 'Renal & Glycemic Markers',
        tests: ['Urine Microalbumin Test', 'Serum Creatinine & eGFR', 'HbA1c', 'Fasting & PP Blood Sugar']
      },
      {
        category: 'Vascular & Eye Screening',
        tests: ['Ankle-Brachial Index', 'Fundus Eye Screening Advice', 'Nephrologist Consultation']
      }
    ]
  },
  {
    id: 'dialysis-wellness',
    title: 'Monthly Dialysis Patient Wellness Panel',
    subtitle: 'Routine monitoring parameters for patients on regular hemodialysis',
    price: 1299,
    originalPrice: 2400,
    targetGroup: 'Patients undergoing maintenance hemodialysis',
    totalTests: 22,
    popular: false,
    testCategories: [
      {
        category: 'Dialysis Adequacy & Anemia',
        tests: ['Pre & Post Dialysis BUN (Kt/V Calculation)', 'Hemoglobin & Complete Blood Count', 'Serum Ferritin & Transferrin Saturation']
      },
      {
        category: 'Bone Mineral & Electrolyte Status',
        tests: ['Intact PTH (Parathyroid Hormone)', 'Serum Calcium, Phosphorus & Potassium', 'Serum Albumin']
      }
    ]
  }
];

export const PATIENT_RESOURCES: ResourceArticle[] = [
  {
    id: 'res-1',
    title: 'The Essential Renal Diet Guide: Sodium, Potassium & Fluid Limits',
    category: 'Diet & Nutrition',
    summary: 'A comprehensive meal planning guide for patients with Chronic Kidney Disease (CKD) stages 1-5.',
    readTime: '6 min read',
    tags: ['Renal Diet', 'CKD Care', 'Fluid Restrictions', 'Low Sodium'],
    author: 'Chief Clinical Dietitian - Navodya Hospital',
    content: `Managing your diet is one of the most effective ways to slow the progression of kidney disease and reduce complications.

### 1. Sodium Control (Salt)
- High sodium increases blood pressure and causes fluid retention.
- Limit sodium intake to less than **1,500 mg - 2,000 mg per day** (about 1/2 teaspoon of salt).
- Avoid processed foods, canned soups, papads, pickles, and fast food.
- Use fresh herbs, lemon juice, garlic, and pepper for flavoring instead of table salt.

### 2. Managing Potassium Levels
- Damaged kidneys cannot remove excess potassium, leading to dangerous heart rhythms.
- **Low Potassium Foods to Enjoy:** Apples, berries, cabbage, carrots, cucumbers, white rice, cauliflower.
- **High Potassium Foods to Limit:** Bananas, oranges, potatoes (unless leached), tomatoes, spinach, coconut water, fruit juices.
- *Tip for Potatoes:* Peel, chop, and soak potatoes in warm water for at least 2 hours before cooking (leaching process) to reduce potassium.

### 3. Phosphorus Balance
- High phosphorus pulls calcium from your bones, making them brittle.
- Limit dairy products, dark colas, nuts, organ meats, and packaged foods with phosphate additives.
- Take prescribed phosphorus binders with meals as directed by your Nephrologist.

### 4. Fluid Management for Dialysis Patients
- If you are on hemodialysis, calculate your daily fluid limit as: **500 ml + 24-hour urine output**.
- Keep track of ice cubes, soups, gelatins, and juicy fruits as fluid intake.
- Suck on hard lemon candy or ice chips to manage thirst without overloading fluids.`
  },
  {
    id: 'res-2',
    title: 'AV Fistula Care Handbook: Protecting Your Lifeline',
    category: 'Dialysis Life',
    summary: 'How to look after your Arteriovenous (AV) Fistula to prevent clotting, infection, and prolong its lifespan.',
    readTime: '5 min read',
    tags: ['AV Fistula', 'Dialysis Access', 'Vascular Care'],
    author: 'Dr. Priya Nambiar & Vascular Surgery Team',
    content: `Your Arteriovenous (AV) Fistula is your lifeline for hemodialysis. Proper daily care ensures smooth dialysis sessions and prevents surgical revisions.

### Daily Checking Routine (Look, Listen, Feel)
1. **Feel the Thrill:** Place your fingers lightly over the fistula daily. You should feel a continuous buzzing sensation (thrill).
2. **Listen for the Bruit:** Use a stethoscope or put your ear close to hear a soft swooshing sound.
3. **If the thrill or sound stops:** Contact Navodya Hospital Emergency (+91 98765 43210) IMMEDIATELY!

### Strict Rules for Your Fistula Arm
- **NO Blood Pressure readings** on the fistula arm.
- **NO IV lines or blood draws** on the fistula arm.
- Do NOT wear tight clothing, wristwatches, or heavy jewelry on that arm.
- Do NOT sleep on your fistula arm.
- Do NOT carry heavy grocery bags or lift weights exceeding 5 kg with the fistula arm.

### Hygiene & Infection Prevention
- Wash your fistula arm thoroughly with antibacterial soap and warm water before every dialysis session.
- Keep the access site clean and dry between sessions.
- Watch out for signs of infection: redness, swelling, warmth, tenderness, or pus drainage.`
  },
  {
    id: 'res-3',
    title: 'Pre-Procedure Instructions for Kidney Biopsy & Angiography',
    category: 'Pre-Op',
    summary: 'Essential guidelines to follow before undergoing a ultrasound-guided kidney biopsy or catheter angiography.',
    readTime: '4 min read',
    tags: ['Kidney Biopsy', 'Pre-Op Care', 'Medication Safety'],
    author: 'Department of Nephrology',
    content: `A ultrasound-guided renal biopsy provides crucial tissue diagnostics for glomerulonephritis, unexplained proteinuria, or transplant rejection.

### 1 Week Before Procedure
- **Stop Blood Thinners:** Inform your doctor about aspirin, clopidogrel, warfarin, apixaban, or NSAID pain relievers. These must be safely paused 5-7 days prior under medical supervision.
- Complete blood tests: Complete Blood Count, Coagulation Profile (PT/INR, APTT), and Blood Grouping.

### Night Before Procedure
- Fasting (NPO) after midnight (8 hours before procedure).
- Take regular blood pressure medications with a small sip of water early morning if advised by your doctor.

### What to Expect After Biopsy
- You will need to lie flat on your back for 6 to 8 hours to prevent bleeding.
- Drink plenty of fluids after the procedure as instructed to flush out any tiny blood clots.
- Mild pinkish tint in urine is normal for the first 24 hours. Report bright red blood or clots immediately.`
  },
  {
    id: 'res-4',
    title: 'Understanding Kidney Stones: Prevention & Modern Laser Treatments',
    category: 'Renal Care',
    summary: 'Causes of nephrolithiasis, dietary prevention tips, and advanced stitchless laser lithotripsy (RIRS).',
    readTime: '5 min read',
    tags: ['Kidney Stones', 'RIRS', 'Laser Lithotripsy', 'Urology'],
    author: 'Dr. Vivek Deshmukh - Senior Urologist',
    content: `Kidney stones are hard mineral deposits that form inside your kidneys. Early diagnosis prevents severe renal colic and kidney infection.

### Top Hydration Guidelines
- Drink **2.5 to 3 Liters of fluids daily** so that your urine remains light straw-colored.
- Add fresh lemon juice or lime to your water; citrate naturally inhibits stone crystal formation.

### Dietary Adjustments
- **Calcium Oxalate Stones:** Do not cut out dairy calcium! Dietary calcium binds to oxalate in the intestines and prevents absorption. Instead, reduce high-oxalate foods like spinach, nuts, beets, and dark chocolate.
- **Uric Acid Stones:** Reduce red meat, shellfish, and alcohol. Keep urine alkaline under doctor guidance.

### Advanced Laser Treatment: RIRS (Retrograde Intrarenal Surgery)
- No cuts or incisions on the body!
- A thin flexible endoscope passes through the natural urinary tract directly into the kidney.
- High-power Holmium Laser dusts the stone into microscopic powder which flushes out naturally.
- Same-day or overnight discharge with minimal recovery time.`
  }
];

export const INSURANCE_PROVIDERS: InsuranceProvider[] = [
  { id: 'star-health', name: 'Star Health & Allied Insurance', type: 'Insurance Co', logoText: 'STAR HEALTH', contactNumber: '1800-425-2255', cashlessSupport: true },
  { id: 'icici-lombard', name: 'ICICI Lombard General Insurance', type: 'Insurance Co', logoText: 'ICICI LOMBARD', contactNumber: '1800-266-6', cashlessSupport: true },
  { id: 'hdfc-ergo', name: 'HDFC ERGO Health Insurance', type: 'Insurance Co', logoText: 'HDFC ERGO', contactNumber: '1800-266-0000', cashlessSupport: true },
  { id: 'care-health', name: 'Care Health Insurance (Religare)', type: 'Insurance Co', logoText: 'CARE HEALTH', contactNumber: '1800-102-4488', cashlessSupport: true },
  { id: 'max-bupa', name: 'Niva Bupa Health Insurance', type: 'Insurance Co', logoText: 'NIVA BUPA', contactNumber: '1860-500-8888', cashlessSupport: true },
  { id: 'bajaj-allianz', name: 'Bajaj Allianz General Insurance', type: 'Insurance Co', logoText: 'BAJAJ ALLIANZ', contactNumber: '1800-209-5858', cashlessSupport: true },
  { id: 'medi-assist', name: 'Medi Assist India TPA Services', type: 'TPA', logoText: 'MEDI ASSIST', contactNumber: '1800-425-9449', cashlessSupport: true },
  { id: 'vidal-health', name: 'Vidal Health TPA Services', type: 'TPA', logoText: 'VIDAL HEALTH', contactNumber: '1800-425-8888', cashlessSupport: true },
  { id: 'ayushman-bharat', name: 'Ayushman Bharat (PM-JAY)', type: 'Govt Scheme', logoText: 'PM-JAY', contactNumber: '14555', cashlessSupport: true },
  { id: 'cghs', name: 'CGHS & EHS Empanelled Center', type: 'Govt Scheme', logoText: 'CGHS / EHS', contactNumber: '1800-208-8900', cashlessSupport: true }
];

export const SAMPLE_APPOINTMENTS: AppointmentData[] = [
  {
    bookingId: 'NAV-89421',
    departmentId: 'nephrology',
    departmentName: 'Department of Nephrology',
    doctorId: 'doc-1',
    doctorName: 'Dr. Navneet Sharma',
    date: '2026-07-25',
    timeSlot: '10:30 AM - 11:00 AM',
    patientName: 'Ramesh Chandra',
    patientAge: 52,
    patientGender: 'male',
    patientPhone: '+91 98123 45678',
    patientEmail: 'ramesh.c@example.com',
    symptoms: 'Elevated creatinine level (2.4), mild pedal edema, fatigue.',
    visitType: 'first',
    isEmergencyPriority: false,
    status: 'Confirmed',
    createdAt: '2026-07-22T14:30:00'
  }
];

export const FAQS = [
  {
    question: 'How do I schedule a dialysis session at Navodya Hospital?',
    answer: 'You can book online through our Appointment Booking section by selecting "24x7 Dialysis & Hemofiltration Unit", or call our 24/7 Dialysis Helpline (+91 98765 43210). We offer flexible morning, afternoon, evening, and nocturnal shifts.'
  },
  {
    question: 'Does Navodya Hospital offer Cashless TPA & Health Insurance facilities?',
    answer: 'Yes! We are empanelled with over 30 leading health insurance companies and TPAs including Star Health, ICICI Lombard, HDFC ERGO, Care, Medi Assist, Vidal, Ayushman Bharat PM-JAY, and CGHS. Our dedicated Insurance Desk located on Ground Floor assists with seamless cashless pre-authorizations.'
  },
  {
    question: 'What documents are required for my first Nephrology consultation?',
    answer: 'Please bring your recent blood reports (Serum Creatinine, BUN, Electrolytes, HbA1c), Urine routine & Microalbumin reports, USG Abdomen report, list of current medications, and any past medical summaries.'
  },
  {
    question: 'What are the visiting hours for ICU and Inpatient Wards?',
    answer: 'ICU Visiting Hours: 11:00 AM - 12:00 PM and 5:00 PM - 6:00 PM (1 visitor at a time). Ward Visiting Hours: 4:00 PM - 7:00 PM daily.'
  },
  {
    question: 'Are emergency dialysis services available at night?',
    answer: 'Yes, our Dialysis Unit and ICU run 24x7 with dedicated round-the-clock Nephrologists, ICU Intensivists, and certified Dialysis Technologists for hyperkalemia, acute pulmonary edema, or urgent renal failure.'
  }
];

export const SAMPLE_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '5 Crucial Early Warning Signs of Chronic Kidney Disease (CKD) You Should Never Ignore',
    slug: '5-crucial-early-warning-signs-of-chronic-kidney-disease',
    excerpt: 'Kidney disease is often called a silent killer because early stages present subtle symptoms like morning facial puffiness, foamy urine, and unexplained leg swelling. Learn how to catch CKD before stage 3.',
    content: `Chronic Kidney Disease (CKD) affects millions worldwide, yet nearly 90% of individuals with early stage kidney impairment are completely unaware of their condition. Because kidneys possess immense functional reserve, symptoms typically emerge only when up to 60-70% of renal function is lost.

### 1. Persistent Foamy or Bubbling Urine
When kidney filters (glomeruli) are damaged, proteins like albumin leak into the urine. This results in persistent foam or bubbles that do not clear easily with flushing.

### 2. Pedal Edema & Morning Eye Puffiness
Impaired sodium excretion and fluid retention lead to swelling around the ankles, feet, and morning puffiness around the eyes.

### 3. Unexplained Fatigue, Brain Fog, & Pallor
Healthy kidneys produce erythropoietin (EPO), a hormone that signals bone marrow to produce red blood cells. Declining kidney function leads to renal anemia, causing constant exhaustion and difficulty concentrating.

### 4. Nocturia & Changes in Urination Frequency
Waking up multiple times at night to pass urine or feeling a sudden increased urge to urinate can indicate tubular dysfunction in the kidneys.

### 5. Metallic Taste in Mouth & Loss of Appetite
As blood urea nitrogen (BUN) and creatinine accumulate in the bloodstream (uremia), patients often report a metallic metallic taste or ammonia breath, accompanied by nausea and aversion to high-protein foods.

### What Should You Do Next?
If you notice two or more of these symptoms, schedule a routine Kidney Health Panel comprising Serum Creatinine, eGFR, Urine Serum Albumin-to-Creatinine Ratio (UACR), and Ultrasonography. Early detection allows nephrologists to initiate ACE-inhibitors, SGLT2 inhibitors, and targeted lifestyle modifications that slow CKD progression dramatically.`,
    category: 'Kidney Health',
    author: 'Dr. Navneet Sharma',
    authorRole: 'Senior Consultant Nephrologist & HOD',
    publishedAt: '2026-07-15',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    tags: ['CKD', 'Kidney Symptoms', 'Creatinine', 'Nephrology', 'Preventive Care'],
    featured: true
  },
  {
    id: 'blog-2',
    title: 'Hemodialysis vs Peritoneal Dialysis: A Comprehensive Clinical Comparison',
    slug: 'hemodialysis-vs-peritoneal-dialysis-clinical-comparison',
    excerpt: 'Understanding the differences, lifestyle advantages, and medical suitabilities between in-center Hemodialysis (HD) and home-based Automated Peritoneal Dialysis (APD).',
    content: `When end-stage renal disease (ESRD / Stage 5 CKD) occurs, renal replacement therapy becomes essential. Choosing between Hemodialysis (HD) and Peritoneal Dialysis (PD) is a crucial decision guided by medical feasibility, vascular access status, and patient lifestyle preferences.

### What is Hemodialysis (HD)?
Hemodialysis uses a specialized machine and a artificial filter (dialyzer) to pump the patient's blood out, cleanse it of toxins, excess potassium, and fluid, and return filtered blood.
- **Frequency:** Typically 3 sessions per week, each lasting 4 hours in a specialized dialysis center.
- **Access:** Requires an AV Fistula, AV Graft, or Central Venous Catheter.
- **Key Advantage:** Performed under continuous supervision of certified dialysis technicians and staff nephrologists.

### What is Peritoneal Dialysis (PD)?
Peritoneal Dialysis utilizes the lining of the patient's abdomen (the peritoneum) as a natural filter. A sterile cleansing fluid (dialisate) is instilled via a permanent catheter into the abdomen, absorbs wastes over several hours, and is then drained.
- **Types:** Continuous Ambulatory PD (CAPD) done manually during the day, or Automated PD (APD) performed overnight while sleeping using a cycler machine.
- **Access:** Requires a Tenckhoff peritoneal catheter placed in minor surgery.
- **Key Advantage:** Independence from hospital visits and smoother blood pressure stabilization.

### How Navodya Hospital Helps You Choose
Our Multidisciplinary Renal Team evaluates heart function, vascular anatomy, peritoneal membrane permeability, and home support to customize the optimal dialysis modality for every patient.`,
    category: 'Dialysis Care',
    author: 'Dr. Rajeshwar Rao',
    authorRole: 'Chief Transplant Surgeon & Urologist',
    publishedAt: '2026-07-10',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    tags: ['Dialysis', 'Hemodialysis', 'Peritoneal Dialysis', 'AV Fistula', 'ESRD'],
    featured: false
  },
  {
    id: 'blog-3',
    title: 'The Renal Diet Masterclass: Potassium, Sodium, and Fluid Limits Decoded',
    slug: 'renal-diet-masterclass-potassium-sodium-fluid-limits',
    excerpt: 'Managing dietary intake is as vital as medication for kidney patients. Discover top low-potassium foods, smart salt substitutes to avoid, and fluid management formulas.',
    content: `Dietary therapy forms the cornerstone of managing chronic kidney disease and preventing dangerous electrolyte surges. When kidneys fail to regulate electrolyte equilibrium, high potassium (hyperkalemia) can trigger dangerous cardiac arrhythmias, while excess sodium causes severe fluid overload.

### 1. Controlling Sodium (Salt) Intake
- **Daily Target:** Less than 2,000 mg of sodium (approx. 1 teaspoon of table salt).
- **Beware of Potassium-Based Salt Substitutes:** Many commercial "low-sodium" salts replace sodium chloride with potassium chloride, which can prove fatal for CKD patients!
- **Herbal Alternatives:** Use lemon juice, garlic, ginger, coriander, cumin, and tamarind to add rich flavor without sodium.

### 2. Understanding High vs. Low Potassium Foods
- **Avoid / Limit:** Bananas, oranges, potatoes, tomatoes, spinach, coconut water, and dry fruits.
- **Safe Low-Potassium Choices:** Apples, berries, papayas, guava (without seeds), cabbage, cauliflower, bottle gourd (lauki), and ridge gourd (torai).
- **Leaching Technique:** Boil vegetables in excess water, discard the water, and then cook to reduce potassium content by up to 50%.

### 3. Precision Fluid Excretion Formula
For dialysis patients or those with severe pedal edema:
- **Daily Fluid Limit:** Total 24-hour urine output + 500 mL (for insensible losses).
- Count curds, dal soup, tea, milk, and ice cubes toward your daily fluid limit!`,
    category: 'Diet & Nutrition',
    author: 'Mrs. Sangeetha Mehra',
    authorRole: 'Lead Renal Nutritionist & Dietitian',
    publishedAt: '2026-07-04',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800',
    tags: ['Renal Diet', 'CKD Nutrition', 'Low Potassium', 'Sodium Control', 'Fluid Limit'],
    featured: false
  },
  {
    id: 'blog-4',
    title: 'Advances in Holmium Laser Lithotripsy for Painless Kidney Stone Removal',
    slug: 'advances-in-holmium-laser-lithotripsy-kidney-stones',
    excerpt: 'How modern high-power 100W Holmium & Thulium Fiber Lasers (TFL) pulverize kidney stones into fine dust without incision, allowing same-day discharge.',
    content: `Kidney stone disease (Urolithiasis) affects up to 12% of the population, causing excruciating flank pain, hematuria (blood in urine), and recurrent urinary tract infections. Traditional open surgery and even older shockwave lithotripsy (ESWL) have been replaced by state-of-the-art incisionless laser endoscopic procedures.

### What is RIRS (Retrograde Intrarenal Surgery)?
Using ultra-thin, flexible fiberoptic endoscopes passed naturally through the urinary tract, urologists reach stones tucked inside the renal calyces. A high-energy Holmium:YAG laser fiber is then advanced through the working channel.

### The Power of "Dusting" vs. "Fragmentation"
With modern 100W high-frequency laser consoles:
- **Stone Dusting:** The laser vaporizes stone bonds, turning dense calcium oxalate or uric acid stones into fine particulate dust that passes painlessly in urine.
- **No Incision or Scarring:** Performed entirely through natural anatomical pathways under short spinal anesthesia.
- **Rapid Recovery:** Most patients are discharged within 12 to 24 hours and resume normal work in 2 days.

### Preventive Measures Against Stone Recurrence
1. Drink 3 to 3.5 liters of water daily to maintain pale, clear urine.
2. Limit excessive animal protein and oxalate-rich foods (chocolates, dark tea, spinach, nuts).
3. Undergo a 24-hour Metabolic Urine Evaluation to identify personal biochemical stone risk factors.`,
    category: 'Medical Innovations',
    author: 'Dr. Rajeshwar Rao',
    authorRole: 'Chief Urologist & Laser Surgeon',
    publishedAt: '2026-06-28',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    tags: ['Kidney Stones', 'RIRS', 'Laser Lithotripsy', 'Urology', 'Incisionless Surgery'],
    featured: false
  }
];

