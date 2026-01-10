import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, UserCircle, Stethoscope, ArrowLeft, UserPlus } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onBack?: () => void;
}

export default function Login({ onBack }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password, selectedRole);
      if (error) setError(error.message);
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    // Validation
    if (!fullName.trim()) {
      setError('Full name is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const { error } = await signUp(email, password, fullName, selectedRole);
      if (error) setError(error.message);
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setIsSignUp(false);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
  };

  const handleBack = () => {
    setSelectedRole(null);
    setIsSignUp(false);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
  };

  // Landing page with role selection
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="mb-8 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to home
            </button>
          )}
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-6 shadow-lg">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Medical Portfolio</h1>
            <p className="text-lg text-gray-600">Select your role to continue</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Patient Login Card */}
            <button
              onClick={() => handleRoleSelect('patient')}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-blue-500 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                  <UserCircle className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Login</h2>
                  <p className="text-gray-600">Access your medical records and health information</p>
                </div>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Continue as Patient</span>
                  <LogIn className="w-5 h-5 ml-2" />
                </div>
              </div>
            </button>

            {/* Doctor Login Card */}
            <button
              onClick={() => handleRoleSelect('doctor')}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-indigo-500 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-200"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-500 transition-colors duration-300">
                  <Stethoscope className="w-10 h-10 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor Login</h2>
                  <p className="text-gray-600">Manage patients and medical records</p>
                </div>
                <div className="flex items-center text-indigo-600 font-medium">
                  <span>Continue as Doctor</span>
                  <LogIn className="w-5 h-5 ml-2" />
                </div>
              </div>
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Secure healthcare management platform
          </p>
        </div>
      </div>
    );
  }

  // Login form after role selection
  const roleConfig = {
    patient: {
      title: isSignUp ? 'Patient Sign Up' : 'Patient Login',
      icon: UserCircle,
      color: 'blue',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-600',
      focusRing: 'focus:ring-blue-500',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-700',
    },
    doctor: {
      title: isSignUp ? 'Doctor Sign Up' : 'Doctor Login',
      icon: Stethoscope,
      color: 'indigo',
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-indigo-600',
      focusRing: 'focus:ring-indigo-500',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
      buttonBg: 'bg-indigo-600 hover:bg-indigo-700',
    },
  };

  const config = roleConfig[selectedRole];
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to role selection
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col items-center mb-8">
            <div className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mb-4`}>
              <IconComponent className={`w-8 h-8 ${config.textColor}`} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
            <p className="text-gray-600 text-sm mt-2">
              {isSignUp ? 'Create a new account' : 'Sign in to your account'}
            </p>
          </div>

          <form onSubmit={isSignUp ? handleSignUpSubmit : handleSignIn} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${config.focusRing} focus:border-transparent outline-none transition-all`}
                  placeholder={selectedRole === 'patient' ? 'John Doe' : 'Dr. Jane Smith'}
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${config.focusRing} focus:border-transparent outline-none transition-all`}
                placeholder={selectedRole === 'patient' ? 'patient@example.com' : 'doctor@hospital.com'}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${config.focusRing} focus:border-transparent outline-none transition-all`}
                placeholder="••••••••"
                required
              />
              {isSignUp && (
                <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
              )}
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${config.focusRing} focus:border-transparent outline-none transition-all`}
                  placeholder="••••••••"
                  required={isSignUp}
                />
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${config.buttonBg} text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isSignUp ? (
                    <>
                      <UserPlus className="w-5 h-5" />
                      Create Account
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      Sign In
                    </>
                  )}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={toggleMode}
                className={`ml-2 font-medium ${config.textColor} hover:underline transition-colors`}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Secure {selectedRole} portal for healthcare management
        </p>
      </div>
    </div>
  );
}
