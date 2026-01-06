import { useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';

function App() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !role) {
    return <Login />;
  }

  // Role-based dashboard rendering
  if (role === 'patient') {
    return <PatientDashboard />;
  }

  if (role === 'doctor') {
    return <DoctorDashboard />;
  }

  // Fallback
  return <Login />;
}

export default App;

