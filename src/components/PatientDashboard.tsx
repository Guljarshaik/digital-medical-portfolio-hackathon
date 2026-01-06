import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, FileText, Pill, ClipboardList, Activity, AlertCircle, Clock, LogOut } from 'lucide-react';

export type PatientViewType =
    | 'profile'
    | 'history'
    | 'medications'
    | 'prescriptions'
    | 'reports'
    | 'emergency'
    | 'visits';

export default function PatientDashboard() {
    const [currentView, setCurrentView] = useState<PatientViewType>('profile');
    const { patient, signOut } = useAuth();

    if (!patient) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">No patient data available</p>
                </div>
            </div>
        );
    }

    const menuItems = [
        { id: 'profile' as PatientViewType, label: 'Personal Profile', icon: User },
        { id: 'history' as PatientViewType, label: 'Medical History', icon: FileText },
        { id: 'medications' as PatientViewType, label: 'Medications', icon: Pill },
        { id: 'prescriptions' as PatientViewType, label: 'Prescriptions', icon: ClipboardList },
        { id: 'reports' as PatientViewType, label: 'Lab Reports', icon: Activity },
        { id: 'emergency' as PatientViewType, label: 'Emergency Details', icon: AlertCircle },
        { id: 'visits' as PatientViewType, label: 'Visit History', icon: Clock },
    ];

    const renderView = () => {
        switch (currentView) {
            case 'profile':
                return (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Profile</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded">{patient.full_name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded">{patient.age} years</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded">{patient.gender}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded">{patient.blood_group}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded">{patient.phone}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded">{patient.email}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <p className="text-gray-900 bg-gray-50 px-4 py-2 rounded">{patient.address}</p>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <strong>Note:</strong> To update your personal information, please contact your healthcare provider.
                            </p>
                        </div>
                    </div>
                );

            case 'history':
                return (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical History</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
                                <div className="bg-gray-50 px-4 py-3 rounded border border-gray-200">
                                    <p className="text-gray-900">{patient.medical_history || 'No medical history recorded'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'medications':
                return (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Medications</h2>
                        <div className="text-center text-gray-600 py-8">
                            <Pill className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p>No current medications on record</p>
                            <p className="text-sm mt-2">Your medications will appear here when prescribed by your doctor</p>
                        </div>
                    </div>
                );

            case 'prescriptions':
                return (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Prescriptions</h2>
                        <div className="text-center text-gray-600 py-8">
                            <ClipboardList className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p>No prescriptions available</p>
                            <p className="text-sm mt-2">Your prescriptions from doctors will appear here</p>
                        </div>
                    </div>
                );

            case 'reports':
                return (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Lab Reports</h2>
                        <div className="text-center text-gray-600 py-8">
                            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p>No lab reports available</p>
                            <p className="text-sm mt-2">Your test results and lab reports will appear here</p>
                        </div>
                    </div>
                );

            case 'emergency':
                return (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Details</h2>
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                                    <div className="bg-red-50 border-2 border-red-200 px-4 py-3 rounded font-bold text-red-900 text-lg">
                                        {patient.blood_group}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                                <div className="bg-gray-50 px-4 py-3 rounded border border-gray-200">
                                    {patient.allergies && patient.allergies.length > 0 ? (
                                        <ul className="list-disc list-inside space-y-1">
                                            {patient.allergies.map((allergy, index) => (
                                                <li key={index} className="text-gray-900">{allergy}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-600">No known allergies</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Chronic Conditions</label>
                                <div className="bg-gray-50 px-4 py-3 rounded border border-gray-200">
                                    {patient.chronic_conditions && patient.chronic_conditions.length > 0 ? (
                                        <ul className="list-disc list-inside space-y-1">
                                            {patient.chronic_conditions.map((condition, index) => (
                                                <li key={index} className="text-gray-900">{condition}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-600">No chronic conditions</p>
                                    )}
                                </div>
                            </div>

                            {patient.emergency_contact && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                                    <div className="bg-gray-50 px-4 py-3 rounded border border-gray-200 space-y-2">
                                        <p className="text-gray-900"><strong>Name:</strong> {patient.emergency_contact.name}</p>
                                        <p className="text-gray-900"><strong>Relationship:</strong> {patient.emergency_contact.relationship}</p>
                                        <p className="text-gray-900"><strong>Phone:</strong> {patient.emergency_contact.phone}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'visits':
                return (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Visit History</h2>
                        <div className="text-center text-gray-600 py-8">
                            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p>No visit history available</p>
                            <p className="text-sm mt-2">Your appointment and visit history will appear here</p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{patient.full_name}</p>
                            <p className="text-xs text-gray-500">Patient Portal</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentView === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setCurrentView(item.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-blue-50 text-blue-700 font-medium'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                                <span className="text-sm">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5 text-gray-400" />
                        <span className="text-sm">Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
                        <p className="text-gray-600 mt-1">View your medical information</p>
                    </div>

                    {renderView()}
                </div>
            </div>
        </div>
    );
}
