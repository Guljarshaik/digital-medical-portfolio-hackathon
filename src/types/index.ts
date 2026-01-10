export type UserRole = 'patient' | 'doctor';

export interface Doctor {
  id: string;
  user_id?: string;
  email: string;
  full_name: string;
  specialization: string;
  phone: string;
  avatar_url: string;
  clinic_name: string;
  clinic_address: string;
  created_at: string;
}

export interface Patient {
  id: string;
  user_id?: string;
  doctor_id?: string;
  full_name: string;
  age?: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  blood_group?: string;
  blood_type?: string;
  medical_history?: string;
  status?: 'active' | 'inactive';
  is_new?: boolean;
  created_at: string;
  date_of_birth?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  avatar_url?: string;
  allergies?: string[];
  chronic_conditions?: string[];
  emergency_contact?: EmergencyContact;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface VisitHistory {
  id: string;
  patient_id: string;
  doctor_id: string;
  visit_date: string;
  reason: string;
  diagnosis: string;
  notes: string;
  prescription_id?: string;
}

export interface Appointment {
  id: string;
  doctor_id: string;
  patient_id: string;
  appointment_date: string;
  appointment_time: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  reason: string;
  notes: string;
  is_request: boolean;
  created_at: string;
  patient?: Patient;
}

export interface DoctorNote {
  id: string;
  doctor_id: string;
  patient_id: string;
  appointment_id?: string;
  content: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
}

export interface Prescription {
  id: string;
  doctor_id: string;
  patient_id: string;
  appointment_id?: string;
  medications: Medication[];
  diagnosis: string;
  instructions: string;
  created_at: string;
  patient?: Patient;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface MedicalReport {
  id: string;
  doctor_id: string;
  patient_id: string;
  report_type: 'Lab' | 'Scan' | 'Prescription';
  file_url: string;
  file_name: string;
  notes: string;
  created_at: string;
  patient?: Patient;
}

export interface Payment {
  id: string;
  doctor_id: string;
  patient_id: string;
  appointment_id?: string;
  amount: number;
  status: 'paid' | 'pending';
  payment_date: string;
  invoice_number: string;
  patient?: Patient;
}

export interface Notification {
  id: string;
  doctor_id: string;
  type: 'appointment' | 'patient' | 'payment';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
