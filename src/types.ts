export type PageType = 
  | 'home' 
  | 'about' 
  | 'kidney-center' 
  | 'specialties' 
  | 'doctors' 
  | 'appointment' 
  | 'resources' 
  | 'packages' 
  | 'contact' 
  | 'symptom-checker'
  | 'blogs'
  | 'admin';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Kidney Health' | 'Dialysis Care' | 'Transplant' | 'Diet & Nutrition' | 'Medical Innovations' | 'Preventive Care';
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  qualifications: string;
  experienceYears: number;
  specializations: string[];
  opdSchedule: string;
  consultationFee: number;
  availableDays: string[];
  imageUrl: string;
  rating: number;
  reviewCount: number;
  bio: string;
}

export interface Department {
  id: string;
  name: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  keyServices: string[];
  headDoctor: string;
  accentColor?: string;
  highlight?: boolean;
}

export interface AppointmentData {
  bookingId: string;
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientAge: number;
  patientGender: 'male' | 'female' | 'other';
  patientPhone: string;
  patientEmail: string;
  symptoms: string;
  visitType: 'first' | 'followup' | 'second-opinion';
  isEmergencyPriority: boolean;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ResourceArticle {
  id: string;
  title: string;
  category: 'Renal Care' | 'Diet & Nutrition' | 'Dialysis Life' | 'Pre-Op' | 'Insurance' | 'General Health';
  summary: string;
  readTime: string;
  content: string;
  downloadablePdf?: string;
  tags: string[];
  author: string;
}

export interface HealthPackage {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  targetGroup: string;
  totalTests: number;
  testCategories: {
    category: string;
    tests: string[];
  }[];
  popular?: boolean;
}

export interface InsuranceProvider {
  id: string;
  name: string;
  type: 'TPA' | 'Insurance Co' | 'Govt Scheme';
  logoText: string;
  contactNumber: string;
  cashlessSupport: boolean;
}

export interface KidneyAssessmentResult {
  score: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  summary: string;
  recommendations: string[];
  suggestedDoctorType: string;
}
