import { useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import LandingPage from './components/LandingPage';
import { useEffect, useState } from 'react';

function App() {
  const { user, role, loading } = useAuth();
  const [renderError, setRenderError] = useState<Error | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    console.log('App state:', { user, role, loading });
  }, [user, role, loading]);

  if (renderError) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-4">{renderError.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

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
    if (!showLogin) {
      return <LandingPage onGetStarted={() => setShowLogin(true)} />;
    }
    return <Login onBack={() => setShowLogin(false)} />;
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

