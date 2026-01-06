import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Doctor, Patient, UserRole } from '../types';
import mockData, { mockDataUser1, mockPatients } from '../lib/mockData';
import { setCurrentUserId } from '../lib/mockState';

// Always use mock mode - no Supabase

interface AuthContextType {
  user: User | null;
  doctor: Doctor | null;
  patient: Patient | null;
  role: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string, role: UserRole) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock mode: do not auto-sign-in. let user log in via UI.
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string, userRole: UserRole) => {
    // Mock authentication - no Supabase

    // Doctor login
    if (userRole === 'doctor') {
      if (email === mockData.doctor.email && password === 'Password123!') {
        const demoUser = { id: mockData.doctor.id, email: mockData.doctor.email } as unknown as User;
        setCurrentUserId(mockData.doctor.id);
        setUser(demoUser);
        setDoctor(mockData.doctor);
        setRole('doctor');
        setPatient(null);
        return { error: null };
      }

      if (email === mockDataUser1.doctor.email && password === 'user1234') {
        const demoUser = { id: mockDataUser1.doctor.id, email: mockDataUser1.doctor.email } as unknown as User;
        setCurrentUserId(mockDataUser1.doctor.id);
        setUser(demoUser);
        setDoctor(mockDataUser1.doctor);
        setRole('doctor');
        setPatient(null);
        return { error: null };
      }
    }

    // Patient login
    if (userRole === 'patient') {
      const foundPatient = mockPatients.find(p => p.email === email);
      if (foundPatient && password === 'patient123') {
        const demoUser = { id: foundPatient.user_id || foundPatient.id, email: foundPatient.email } as unknown as User;
        setCurrentUserId(foundPatient.user_id || foundPatient.id);
        setUser(demoUser);
        setPatient(foundPatient);
        setRole('patient');
        setDoctor(null);
        return { error: null };
      }
    }

    return { error: new Error('Invalid credentials (demo mode)') };
  };

  const signUp = async (email: string, _password: string, fullName: string) => {
    // Mock sign-up: create an in-memory doctor object
    const newDoctor: Doctor = {
      id: '00000000-0000-0000-0000-000000000003',
      email,
      full_name: fullName,
      specialization: '',
      phone: '',
      avatar_url: '',
      clinic_name: '',
      clinic_address: '',
      created_at: new Date().toISOString(),
    };
    const demoUser = { id: newDoctor.id, email: newDoctor.email } as unknown as User;
    setCurrentUserId(newDoctor.id);
    setUser(demoUser);
    setDoctor(newDoctor);
    setRole('doctor');
    setPatient(null);
    return { error: null };
  };

  const signOut = async () => {
    // Mock sign out - no Supabase
    setCurrentUserId(null);
    setUser(null);
    setDoctor(null);
    setPatient(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, doctor, patient, role, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
