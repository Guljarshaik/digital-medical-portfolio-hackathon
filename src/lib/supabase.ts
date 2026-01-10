import { createClient } from '@supabase/supabase-js';
import mockData, { mockDataUser1 } from './mockData';
import { getCurrentUserId } from './mockState';

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Robust placeholder detection
const isPlaceholder = (val: string) =>
  !val ||
  val === 'your-project-url' ||
  val === 'your-anon-key' ||
  val.toLowerCase().includes('placeholder') ||
  val.startsWith('your-');

const USE_MOCK = isPlaceholder(supabaseUrl) || isPlaceholder(supabaseKey);

if (USE_MOCK) {
  console.warn(
    'Warning: Supabase credentials not found or are placeholders. Using mock data mode.'
  );
}

// Build mock client for demo/testing
function buildMockClient() {
  type TableName =
    | 'doctors'
    | 'patients'
    | 'appointments'
    | 'doctor_notes'
    | 'prescriptions'
    | 'medical_reports'
    | 'payments'
    | 'notifications';

  const tableMap: Record<TableName, any[]> = {
    doctors: [mockData.doctor, mockDataUser1.doctor],
    patients: [...mockData.patients, ...mockDataUser1.patients],
    appointments: [...mockData.appointments, ...mockDataUser1.appointments],
    doctor_notes: (mockData as any).doctor_notes?.concat((mockDataUser1 as any).doctor_notes || []) || [],
    prescriptions: (mockData as any).prescriptions?.concat((mockDataUser1 as any).prescriptions || []) || [],
    medical_reports: (mockData as any).medical_reports?.concat((mockDataUser1 as any).medical_reports || []) || [],
    payments: (mockData as any).payments?.concat((mockDataUser1 as any).payments || []) || [],
    notifications: (mockData as any).notifications?.concat((mockDataUser1 as any).notifications || []) || [],
  };

  function clone(v: any) {
    return JSON.parse(JSON.stringify(v));
  }

  function getDatasetForTable(table: TableName) {
    return tableMap[table] || [];
  }

  function filterByEq(rows: any[], key?: string, value?: any) {
    if (!key) return rows;
    return rows.filter((r) => {
      return (r as any)[key] === value;
    });
  }

  function from(table: TableName) {
    let rows = getDatasetForTable(table);
    const currentUser = getCurrentUserId();
    if (currentUser) {
      if (table === 'doctors') {
        rows = rows.filter((r) => r.id === currentUser);
      } else {
        rows = rows.filter((r) => r.doctor_id === currentUser);
      }
    }
    let selected: any[] | null = null;

    const api: any = {
      select: () => {
        selected = clone(rows);
        return api;
      },
      eq: (key: string, value: any) => {
        if (selected == null) selected = clone(rows);
        selected = filterByEq(selected!, key, value);
        return api;
      },
      order: (col: string, opts?: any) => {
        if (selected == null) selected = clone(rows);
        const ascending = opts?.ascending !== false;
        selected!.sort((a: any, b: any) => {
          const aVal = a[col] || '';
          const bVal = b[col] || '';
          const comparison = String(aVal).localeCompare(String(bVal));
          return ascending ? comparison : -comparison;
        });
        return api;
      },
      maybeSingle: async () => {
        const current = selected ?? clone(rows);
        return { data: current[0] ?? null, error: null };
      },
      single: async () => {
        const current = selected ?? clone(rows);
        return { data: current[0] ?? null, error: null };
      },
      then: async (onfulfilled: any) => {
        const current = selected ?? clone(rows);
        return onfulfilled({ data: current, error: null });
      },
      insert: async (payload: any) => {
        const newRow = { ...payload };
        if (!newRow.id) newRow.id = cryptoRandomId();
        tableMap[table].push(newRow);
        return { data: newRow, error: null };
      },
      update: (payload: any) => {
        return {
          eq: async (key: string, value: any) => {
            const rows = getDatasetForTable(table);
            const currentUser = getCurrentUserId();
            let filteredRows = currentUser && table !== 'doctors'
              ? rows.filter((r) => r.doctor_id === currentUser)
              : rows;

            let updated = 0;
            filteredRows.forEach((row: any) => {
              if (row[key] === value) {
                Object.assign(row, payload);
                if (payload.updated_at === undefined && row.updated_at !== undefined) {
                  row.updated_at = new Date().toISOString();
                }
                updated++;
              }
            });
            return { data: updated > 0 ? payload : null, error: null };
          },
        };
      },
      delete: () => {
        return {
          eq: async (key: string, value: any) => {
            const before = tableMap[table].length;
            tableMap[table] = tableMap[table].filter((r) => r[key] !== value);
            const after = tableMap[table].length;
            return { data: before - after, error: null };
          },
        };
      },
    };

    return api;
  }

  function cryptoRandomId() {
    return 'id-' + Math.random().toString(36).slice(2, 11);
  }

  // Mock auth for demo mode
  const mockAuth = {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      // Demo credentials
      const demoDoctors = [
        { email: 'sample.doctor@example.com', password: 'Password123!' },
        { email: 'user1@gmail.com', password: 'user1234' },
      ];
      const demoPatients = [
        { email: 'patient1@example.com', password: 'patient123' },
        { email: 'patient2@example.com', password: 'patient123' },
        { email: 'patient3@example.com', password: 'patient123' },
      ];

      const isValidDoctor = demoDoctors.some(d => d.email === email && d.password === password);
      const isValidPatient = demoPatients.some(p => p.email === email && p.password === password);

      if (isValidDoctor || isValidPatient) {
        return {
          data: {
            user: {
              id: email,
              email,
              user_metadata: { role: isValidDoctor ? 'doctor' : 'patient' },
            },
          },
          error: null,
        };
      }
      return {
        data: null,
        error: new Error('Invalid credentials'),
      };
    },
    signUp: async ({ email, password, options }: any) => {
      return {
        data: {
          user: {
            id: cryptoRandomId(),
            email,
            user_metadata: options.data || {},
          },
        },
        error: null,
      };
    },
    signOut: async () => {
      return { error: null };
    },
    getSession: async () => {
      return { data: { session: null } };
    },
    onAuthStateChange: () => {
      return {
        data: {
          subscription: { unsubscribe: () => { } }
        }
      };
    },
  };

  return { from, auth: mockAuth };
}

// Use mock client or real Supabase
let supabase: any;

try {
  if (USE_MOCK) {
    supabase = buildMockClient();
  } else {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  supabase = buildMockClient(); // Fallback to mock on crash
}

export { supabase };
