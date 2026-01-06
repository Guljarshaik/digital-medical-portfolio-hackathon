-- Sample seed data for Doctor Dashboard
-- Run this after signing up to populate your dashboard with sample data

-- Note: Replace 'YOUR_DOCTOR_ID' with your actual doctor ID from auth.users
-- A default sample doctor ID is provided so this file can be run without
-- creating an auth user. Replace the ID below if you want to tie data to
-- a real Supabase auth user.

-- Default sample doctor (used by subsequent inserts)
INSERT INTO doctors (id, email, full_name, specialization, phone, avatar_url, clinic_name, clinic_address)
VALUES ('00000000-0000-0000-0000-000000000001', 'sample.doctor@example.com', 'Dr. Sample', 'General', '+1-555-0000', '', 'Sample Clinic', '100 Demo St');

-- Note: Replace '00000000-0000-0000-0000-000000000001' if you want a different doctor id

-- Sample Patients
INSERT INTO patients (doctor_id, full_name, age, gender, phone, email, address, blood_group, medical_history, status, is_new) VALUES
('00000000-0000-0000-0000-000000000001', 'John Smith', 45, 'Male', '+1-555-0101', 'john.smith@email.com', '123 Main St, New York, NY', 'A+', 'Hypertension, controlled with medication', 'active', false),
('00000000-0000-0000-0000-000000000001', 'Sarah Johnson', 32, 'Female', '+1-555-0102', 'sarah.j@email.com', '456 Oak Ave, Brooklyn, NY', 'O+', 'No significant medical history', 'active', true),
('00000000-0000-0000-0000-000000000001', 'Michael Brown', 58, 'Male', '+1-555-0103', 'mbrown@email.com', '789 Pine Rd, Queens, NY', 'B+', 'Type 2 Diabetes, managed with diet and medication', 'active', false),
('00000000-0000-0000-0000-000000000001', 'Emily Davis', 28, 'Female', '+1-555-0104', 'emily.davis@email.com', '321 Elm St, Manhattan, NY', 'AB+', 'Seasonal allergies', 'active', true),
('00000000-0000-0000-0000-000000000001', 'Robert Wilson', 67, 'Male', '+1-555-0105', 'rwilson@email.com', '654 Maple Dr, Bronx, NY', 'A-', 'Heart disease, previous MI in 2019', 'active', false);

-- Sample Appointments (today and upcoming)
INSERT INTO appointments (doctor_id, patient_id, appointment_date, appointment_time, status, reason, is_request)
SELECT
  '00000000-0000-0000-0000-000000000001',
  p.id,
  CURRENT_DATE,
  '09:00:00',
  'completed',
  'General checkup',
  false
FROM patients p WHERE p.full_name = 'John Smith' AND p.doctor_id = 'YOUR_DOCTOR_ID' LIMIT 1;

INSERT INTO appointments (doctor_id, patient_id, appointment_date, appointment_time, status, reason, is_request)
SELECT
  '00000000-0000-0000-0000-000000000001',
  p.id,
  CURRENT_DATE,
  '11:00:00',
  'ongoing',
  'Follow-up for diabetes management',
  false
FROM patients p WHERE p.full_name = 'Michael Brown' AND p.doctor_id = 'YOUR_DOCTOR_ID' LIMIT 1;

INSERT INTO appointments (doctor_id, patient_id, appointment_date, appointment_time, status, reason, is_request)
SELECT
  '00000000-0000-0000-0000-000000000001',
  p.id,
  CURRENT_DATE,
  '14:00:00',
  'upcoming',
  'Initial consultation',
  false
FROM patients p WHERE p.full_name = 'Sarah Johnson' AND p.doctor_id = 'YOUR_DOCTOR_ID' LIMIT 1;

-- Sample appointment request
INSERT INTO appointments (doctor_id, patient_id, appointment_date, appointment_time, status, reason, is_request)
SELECT
  '00000000-0000-0000-0000-000000000001',
  p.id,
  CURRENT_DATE + INTERVAL '2 days',
  '10:00:00',
  'upcoming',
  'Allergy consultation',
  true
FROM patients p WHERE p.full_name = 'Emily Davis' AND p.doctor_id = 'YOUR_DOCTOR_ID' LIMIT 1;

-- Sample Doctor Notes
INSERT INTO doctor_notes (doctor_id, patient_id, content)
SELECT
  '00000000-0000-0000-0000-000000000001',
  p.id,
  'Patient reported improved blood pressure readings. Continue current medication regimen. Schedule follow-up in 3 months.'
FROM patients p WHERE p.full_name = 'John Smith' AND p.doctor_id = 'YOUR_DOCTOR_ID' LIMIT 1;

-- Sample Prescriptions
INSERT INTO prescriptions (doctor_id, patient_id, diagnosis, medications, instructions)
SELECT
  '00000000-0000-0000-0000-000000000001',
  p.id,
  'Type 2 Diabetes Mellitus',
  '[
    {"name": "Metformin", "dosage": "500mg", "frequency": "Twice daily", "duration": "30 days"},
    {"name": "Glipizide", "dosage": "5mg", "frequency": "Once daily", "duration": "30 days"}
  ]'::jsonb,
  'Take medication with meals. Monitor blood sugar levels daily. Follow prescribed diet plan.'
FROM patients p WHERE p.full_name = 'Michael Brown' AND p.doctor_id = 'YOUR_DOCTOR_ID' LIMIT 1;

-- Sample Medical Reports
INSERT INTO medical_reports (doctor_id, patient_id, report_type, file_url, file_name, notes)
SELECT
  'YOUR_DOCTOR_ID',
  p.id,
  'Lab',
  'https://example.com/reports/bloodwork.pdf',
  'Complete Blood Count - March 2024',
  'All values within normal range'
FROM patients p WHERE p.full_name = 'John Smith' AND p.doctor_id = 'YOUR_DOCTOR_ID' LIMIT 1;

-- Sample Payments
INSERT INTO payments (doctor_id, patient_id, amount, status, invoice_number)
SELECT
  'YOUR_DOCTOR_ID',
  p.id,
  150.00,
  'paid',
  'INV-2024-001'
FROM patients p WHERE p.full_name = 'John Smith' AND p.doctor_id = 'YOUR_DOCTOR_ID' LIMIT 1;

INSERT INTO payments (doctor_id, patient_id, amount, status, invoice_number)
SELECT
  'YOUR_DOCTOR_ID',
  p.id,
  200.00,
  'pending',
  'INV-2024-002'
FROM patients p WHERE p.full_name = 'Sarah Johnson' AND p.doctor_id = 'YOUR_DOCTOR_ID' LIMIT 1;

-- Sample Notifications
INSERT INTO notifications (doctor_id, type, title, message, is_read) VALUES
('00000000-0000-0000-0000-000000000001', 'appointment', 'New Appointment Request', 'Emily Davis has requested an appointment for allergy consultation', false),
('00000000-0000-0000-0000-000000000001', 'patient', 'New Patient Registered', 'Sarah Johnson has been added to your patient list', true);
