import mockData, { mockDataUser1 } from './mockData';
import { getCurrentUserId } from './mockState';
import type { Prescription, MedicalReport, Appointment, VisitHistory } from '../types';

// Get prescriptions for a specific patient
export function getPatientPrescriptions(patientId: string): Prescription[] {
    const userId = getCurrentUserId();

    // Check both mock data sources
    const allPrescriptions = [
        ...mockData.prescriptions,
        ...mockDataUser1.prescriptions,
    ];

    return allPrescriptions.filter(p => p.patient_id === patientId);
}

// Get medical reports for a specific patient
export function getPatientReports(patientId: string): MedicalReport[] {
    const allReports = [
        ...mockData.medical_reports,
        ...mockDataUser1.medical_reports,
    ];

    return allReports.filter(r => r.patient_id === patientId);
}

// Get appointments/visit history for a specific patient
export function getPatientVisits(patientId: string): Appointment[] {
    const allAppointments = [
        ...mockData.appointments,
        ...mockDataUser1.appointments,
    ];

    return allAppointments
        .filter(a => a.patient_id === patientId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

// Get medications from prescriptions
export function getPatientMedications(patientId: string) {
    const prescriptions = getPatientPrescriptions(patientId);
    const medications = prescriptions.flatMap(p =>
        p.medications.map(med => ({
            ...med,
            prescriptionId: p.id,
            diagnosis: p.diagnosis,
            prescribedDate: p.created_at,
        }))
    );

    return medications;
}

// Create mock visit history from appointments
export function getPatientVisitHistory(patientId: string): VisitHistory[] {
    const appointments = getPatientVisits(patientId);
    const prescriptions = getPatientPrescriptions(patientId);

    return appointments
        .filter(a => a.status === 'completed')
        .map(a => {
            const prescription = prescriptions.find(p => p.appointment_id === a.id);

            return {
                id: a.id,
                patient_id: patientId,
                doctor_id: a.doctor_id,
                visit_date: a.appointment_date,
                reason: a.reason,
                diagnosis: prescription?.diagnosis || a.notes || 'N/A',
                notes: a.notes || '',
                prescription_id: prescription?.id,
            };
        });
}
