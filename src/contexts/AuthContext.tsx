import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Doctor, Patient, UserRole } from '../types';
import { setCurrentUserId } from '../lib/mockState';

interface AuthContextType {
  user: User | null;
  doctor: Doctor | null;
  patient: Patient | null;
  role: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string, role: UserRole) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error: Error | null }>;
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
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          setUser(session.user);
          setCurrentUserId(session.user.id);

          const userRole = session.user.user_metadata?.role || 'patient';
          setRole(userRole as UserRole);

          if (userRole === 'doctor') {
            const { data } = await supabase
              .from('doctors')
              .select('*')
              .eq('user_id', session.user.id)
              .single();
            if (data) setDoctor(data);
          } else {
            const { data } = await supabase
              .from('patients')
              .select('*')
              .eq('user_id', session.user.id)
              .single();
            if (data) setPatient(data);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: string, session: any) => {
        console.log('Auth state changed:', event);
        if (session?.user) {
          setUser(session.user);
          setCurrentUserId(session.user.id);
        } else {
          setUser(null);
          setDoctor(null);
          setPatient(null);
          setRole(null);
        }
      });

      return () => subscription?.unsubscribe?.();
    } catch (error) {
      console.error('Auth subscription error:', error);
    }
  }, []);

  const signIn = async (email: string, password: string, userRole: UserRole) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      if (data.user) {
        setUser(data.user);
        setCurrentUserId(data.user.id);
        setRole(userRole);

        // Fetch user profile
        if (userRole === 'doctor') {
          const { data: doctorData } = await supabase
            .from('doctors')
            .select('*')
            .eq('user_id', data.user.id)
            .single();
          if (doctorData) setDoctor(doctorData);
        } else {
          const { data: patientData } = await supabase
            .from('patients')
            .select('*')
            .eq('user_id', data.user.id)
            .single();
          if (patientData) setPatient(patientData);
        }
      }

      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userRole: UserRole) => {
    try {
      // Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: userRole,
          },
        },
      });

      if (error) {
        return { error };
      }

      if (data.user) {
        setUser(data.user);
        setCurrentUserId(data.user.id);
        setRole(userRole);

        // Create profile in appropriate table
        if (userRole === 'doctor') {
          const newDoctor: Doctor = {
            id: crypto.randomUUID(),
            user_id: data.user.id,
            email,
            full_name: fullName,
            specialization: '',
            phone: '',
            avatar_url: '',
            clinic_name: '',
            clinic_address: '',
            created_at: new Date().toISOString(),
          };

          const { error: insertError } = await supabase
            .from('doctors')
            .insert([newDoctor]);

          if (insertError) throw insertError;
          setDoctor(newDoctor);
        } else {
          const newPatient: Patient = {
            id: crypto.randomUUID(),
            user_id: data.user.id,
            email,
            full_name: fullName,
            date_of_birth: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zip_code: '',
            gender: '',
            blood_type: '',
            avatar_url: '',
            created_at: new Date().toISOString(),
          };

          const { error: insertError } = await supabase
            .from('patients')
            .insert([newPatient]);

          if (insertError) throw insertError;
          setPatient(newPatient);
        }
      }

      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUserId(null);
      setUser(null);
      setDoctor(null);
      setPatient(null);
      setRole(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
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
